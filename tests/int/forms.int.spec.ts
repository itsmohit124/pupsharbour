import config from '@/payload.config'
import { getPayload, type Payload } from 'payload'
import { beforeAll, describe, expect, it } from 'vitest'

import { POST as postApplication } from '@/app/(frontend)/api/forms/application/route'
import { POST as postEnquiry } from '@/app/(frontend)/api/forms/enquiry/route'
import { POST as postHiring } from '@/app/(frontend)/api/forms/hiring/route'
import { seed } from '@/seed'

let payload: Payload
const ORIGIN = 'http://localhost:3000'

const enquiry = {
  companyName: 'Acme Pvt Ltd',
  contactPerson: 'Asha Patel',
  email: 'asha@acme.in',
  phone: '98765 43210',
  services: ['company-analysis-and-360-survey', 'talent-acquisition'],
  message: 'We need a 360° survey.',
  consent: true,
  website: '',
}

const jsonReq = (body: unknown, headers: Record<string, string> = {}) =>
  new Request(`${ORIGIN}/api/forms/enquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: ORIGIN, 'x-forwarded-for': `10.0.0.${Math.floor(Math.random() * 250)}`, ...headers },
    body: JSON.stringify(body),
  })

beforeAll(async () => {
  process.env.NEXT_PUBLIC_SERVER_URL = ORIGIN
  payload = await getPayload({ config: await config })
  await seed(payload)
})

describe('POST /api/forms/enquiry', () => {
  it('stores a valid enquiry with normalised phone and linked services', async () => {
    const res = await postEnquiry(jsonReq(enquiry))
    expect(res.status).toBe(200)
    const { docs } = await payload.find({ collection: 'enquiries', depth: 1, overrideAccess: true })
    expect(docs).toHaveLength(1)
    expect(docs[0]).toMatchObject({ companyName: 'Acme Pvt Ltd', phone: '+919876543210', status: 'new', consent: true })
    expect((docs[0].services as { slug: string }[]).map((s) => s.slug).sort()).toEqual(['company-analysis-and-360-survey', 'talent-acquisition'])
  })

  it('works without JavaScript: a plain form post stores the enquiry and redirects back (no PII in URL)', async () => {
    const before = (await payload.count({ collection: 'enquiries', overrideAccess: true })).totalDocs
    const fd = new URLSearchParams({ ...enquiry, services: 'talent-acquisition', consent: 'on', website: '' } as never)
    const res = await postEnquiry(
      new Request(`${ORIGIN}/api/forms/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'text/html', Origin: ORIGIN, Referer: `${ORIGIN}/contact`, 'x-forwarded-for': '10.9.9.9' },
        body: fd,
      }),
    )
    expect(res.status).toBe(303)
    expect(res.headers.get('location')).toBe(`${ORIGIN}/contact?form=sent#enquiry`)
    expect((await payload.count({ collection: 'enquiries', overrideAccess: true })).totalDocs).toBe(before + 1)
  })

  it('a no-JS redirect never points off-site, even with a hostile referer', async () => {
    const res = await postEnquiry(
      new Request(`${ORIGIN}/api/forms/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'text/html', Origin: ORIGIN, Referer: 'https://evil.example/phish', 'x-forwarded-for': '10.9.9.8' },
        body: new URLSearchParams({ companyName: '' }),
      }),
    )
    expect(res.status).toBe(303)
    expect(res.headers.get('location')).toBe(`${ORIGIN}/?form=error#enquiry`)
  })

  it('rejects cross-origin posts (CSRF)', async () => {
    const res = await postEnquiry(jsonReq(enquiry, { Origin: 'https://evil.example' }))
    expect(res.status).toBe(403)
  })

  it('returns field errors for invalid input and stores nothing', async () => {
    const before = (await payload.count({ collection: 'enquiries', overrideAccess: true })).totalDocs
    const res = await postEnquiry(jsonReq({ ...enquiry, email: 'bad', phone: '1' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(Object.keys(body.fields)).toEqual(expect.arrayContaining(['email', 'phone']))
    expect((await payload.count({ collection: 'enquiries', overrideAccess: true })).totalDocs).toBe(before)
  })

  it('silently rejects bots that fill the honeypot', async () => {
    const res = await postEnquiry(jsonReq({ ...enquiry, website: 'spam.example' }))
    expect(res.status).toBe(400)
  })

  it('rate-limits an IP after 5 submissions', async () => {
    const ip = { 'x-forwarded-for': '203.0.113.7' }
    const codes = []
    for (let i = 0; i < 6; i++) codes.push((await postEnquiry(jsonReq(enquiry, ip))).status)
    expect(codes.slice(0, 5).every((c) => c === 200)).toBe(true)
    expect(codes[5]).toBe(429)
  })
})

describe('POST /api/forms/application', () => {
  const form = (file: File | null, extra: Record<string, string> = {}) => {
    const fd = new FormData()
    for (const [k, v] of Object.entries({ fullName: 'Ravi Kumar', phone: '7488835182', email: 'ravi@x.in', consent: 'true', website: '', ...extra })) fd.set(k, v)
    if (file) fd.set('resume', file)
    return new Request(`${ORIGIN}/api/forms/application`, {
      method: 'POST',
      headers: { Origin: ORIGIN, 'x-forwarded-for': `10.1.0.${Math.floor(Math.random() * 250)}` },
      body: fd,
    })
  }
  const MIN_PDF = '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[]/Count 0>>endobj\nxref\n0 3\n0000000000 65535 f \ntrailer<</Size 3/Root 1 0 R>>\nstartxref\n0\n%%EOF\n'
  const pdf = () => new File([new TextEncoder().encode(MIN_PDF)], 'My CV.pdf', { type: 'application/pdf' })

  it('stores the application and a privately named resume', async () => {
    const res = await postApplication(form(pdf()))
    expect(res.status).toBe(200)
    const { docs } = await payload.find({ collection: 'applications', depth: 1, overrideAccess: true })
    expect(docs).toHaveLength(1)
    const resume = docs[0].resume as { filename: string; mimeType: string }
    expect(resume.mimeType).toBe('application/pdf')
    expect(resume.filename).toMatch(/^[0-9a-f-]{36}\.pdf$/) // original name never used
  })

  it('rejects a disguised file (PNG renamed to .pdf)', async () => {
    const png = new File([new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0, 0, 0, 0])], 'cv.pdf', { type: 'application/pdf' })
    const res = await postApplication(form(png))
    expect(res.status).toBe(400)
  })

  it('rejects a corrupt PDF with a friendly 400 (not a 500)', async () => {
    const broken = new File([new TextEncoder().encode('%PDF-1.4 truncated')], 'cv.pdf', { type: 'application/pdf' })
    const res = await postApplication(form(broken))
    expect(res.status).toBe(400)
    expect((await res.json()).fields.resume).toMatch(/could not read/i)
  })

  it('requires a resume', async () => {
    const res = await postApplication(form(null))
    expect(res.status).toBe(400)
    expect((await res.json()).fields.resume).toBeTruthy()
  })

  it('resumes are not readable anonymously', async () => {
    await expect(payload.find({ collection: 'resumes', overrideAccess: false })).rejects.toThrow()
  })
})

describe('POST /api/forms/hiring', () => {
  const MIN_PDF = '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[]/Count 0>>endobj\nxref\n0 3\n0000000000 65535 f \ntrailer<</Size 3/Root 1 0 R>>\nstartxref\n0\n%%EOF\n'
  const req = (file: File | null, extra: Record<string, string> = {}) => {
    const fd = new FormData()
    const base = { companyName: 'Hire Co', contactPerson: 'HR Head', email: 'hr@hire.in', phone: '9876543210', position: 'Quality Engineer', vacancies: '2', location: 'Vadodara', consent: 'true', website: '' }
    for (const [k, v] of Object.entries({ ...base, ...extra })) fd.set(k, v)
    if (file) fd.set('jobDescription', file)
    return new Request(`${ORIGIN}/api/forms/hiring`, { method: 'POST', headers: { Origin: ORIGIN, 'x-forwarded-for': `10.2.0.${Math.floor(Math.random() * 250)}` }, body: fd })
  }

  it('stores a hiring requirement (type=hiring) with an optional private JD', async () => {
    const res = await postHiring(req(new File([new TextEncoder().encode(MIN_PDF)], 'JD.pdf', { type: 'application/pdf' })))
    expect(res.status).toBe(200)
    const { docs } = await payload.find({ collection: 'enquiries', where: { type: { equals: 'hiring' } }, depth: 1, overrideAccess: true })
    const doc = docs.find((d) => d.companyName === 'Hire Co')!
    expect(doc).toMatchObject({ position: 'Quality Engineer', vacancies: 2, location: 'Vadodara', phone: '+919876543210', status: 'new' })
    expect((doc.jobDescription as { filename: string }).filename).toMatch(/^[0-9a-f-]{36}\.pdf$/)
    await expect(payload.find({ collection: 'job-descriptions', overrideAccess: false })).rejects.toThrow()
  })

  it('works without a JD file', async () => {
    expect((await postHiring(req(null, { companyName: 'No JD Co' }))).status).toBe(200)
  })

  it('rejects a disguised JD file and a missing position', async () => {
    const png = new File([new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0, 0, 0, 0])], 'jd.pdf', { type: 'application/pdf' })
    expect((await postHiring(req(png))).status).toBe(400)
    const res = await postHiring(req(null, { position: '' }))
    expect(res.status).toBe(400)
    expect((await res.json()).fields.position).toBeTruthy()
  })
})
