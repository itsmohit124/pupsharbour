import config from '@/payload.config'
import { getPayload, type Payload } from 'payload'
import { beforeAll, describe, expect, it } from 'vitest'

import type { User } from '@/payload-types'
import { seed } from '@/seed'
import { PAGES } from '@/seed/pages'

let payload: Payload
const PW = 'a-very-long-test-password'
const users: Record<string, User> = {}
const as = (u: User) => ({ user: u, overrideAccess: false as const })

beforeAll(async () => {
  payload = await getPayload({ config: await config })
  expect(await seed(payload)).toBe('seeded')
  for (const role of ['super_admin', 'editor', 'contributor', 'recruiter'] as const) {
    users[role] = (await payload.create({
      collection: 'users',
      data: { email: `${role}@content.test`, password: PW, name: role, role },
      context: { system: true },
    })) as User
  }
})

describe('seeded content', () => {
  it('creates every page, all 13 services in 4 groups, and the industries', async () => {
    const pages = await payload.find({ collection: 'pages', limit: 50 })
    expect(pages.docs.map((p) => p.slug).sort()).toEqual(PAGES.map((p) => p.slug).sort())
    for (const slug of ['home', 'about', 'services', 'approach', 'industries', 'insights', 'careers', 'contact']) {
      expect(pages.docs.some((p) => p.slug === slug)).toBe(true)
    }
    const services = await payload.find({ collection: 'services', limit: 50 })
    expect(services.totalDocs).toBe(13)
    expect(services.docs.filter((s) => s.flagship).map((s) => s.slug)).toEqual(['company-analysis-and-360-survey'])
    const groups = await payload.find({ collection: 'service-groups', depth: 1 })
    expect(groups.totalDocs).toBe(4)
    expect((await payload.find({ collection: 'industries' })).totalDocs).toBe(6)
  })

  it('is idempotent: a second run skips', async () => {
    expect(await seed(payload)).toBe('skipped')
  })

  it('every service has its "services include" items and focus line', async () => {
    const { docs } = await payload.find({ collection: 'services', limit: 50 })
    for (const s of docs) {
      expect(s.items?.length, s.title).toBeGreaterThanOrEqual(8)
      expect(s.focus, s.title).toBeTruthy()
    }
  })
})

describe('content permissions', () => {
  const draftPage = { title: 'Draft', slug: 'draft-test', layout: [] }

  it('a contributor can save a draft but cannot publish', async () => {
    const doc = await payload.create({ collection: 'pages', data: { ...draftPage, _status: 'draft' }, draft: true, ...as(users.contributor) })
    expect(doc._status).toBe('draft')
    await expect(
      payload.update({ collection: 'pages', id: doc.id, data: { _status: 'published' }, ...as(users.contributor) }),
    ).rejects.toThrow()
  })

  it('the public never sees drafts', async () => {
    const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: 'draft-test' } }, overrideAccess: false })
    expect(docs).toHaveLength(0)
  })

  it('an editor can publish but cannot delete pages', async () => {
    const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: 'draft-test' } }, draft: true, overrideAccess: true })
    const pub = await payload.update({ collection: 'pages', id: docs[0].id, data: { _status: 'published' }, ...as(users.editor) })
    expect(pub._status).toBe('published')
    await expect(payload.delete({ collection: 'pages', id: docs[0].id, ...as(users.editor) })).rejects.toThrow()
    await payload.delete({ collection: 'pages', id: docs[0].id, ...as(users.super_admin) })
  })

  it('a contributor cannot change live collections (groups, industries)', async () => {
    const { docs } = await payload.find({ collection: 'industries', limit: 1 })
    await expect(payload.update({ collection: 'industries', id: docs[0].id, data: { title: 'x' }, ...as(users.contributor) })).rejects.toThrow()
  })

  it('a recruiter cannot edit website content or read business enquiries, but can read applications', async () => {
    const { docs } = await payload.find({ collection: 'pages', limit: 1 })
    await expect(payload.update({ collection: 'pages', id: docs[0].id, data: { title: 'x' }, ...as(users.recruiter) })).rejects.toThrow()
    // recruiters only ever get hiring requirements (see "hiring requirements visibility")
    const rec = await payload.find({ collection: 'enquiries', ...as(users.recruiter) })
    expect(rec.docs.every((d) => d.type === 'hiring')).toBe(true)
    await expect(payload.find({ collection: 'applications', ...as(users.recruiter) })).resolves.toBeDefined()
  })

  it('nobody (even super_admin) can create submissions through the API', async () => {
    await expect(
      payload.create({
        collection: 'enquiries',
        data: { type: 'business', companyName: 'x', contactPerson: 'x', email: 'x@x.in', phone: '+919876543210', message: 'x' },
        ...as(users.super_admin),
      }),
    ).rejects.toThrow()
  })

  it('an editor cannot change site settings (phone/WhatsApp), but can change the header', async () => {
    await expect(payload.updateGlobal({ slug: 'site-settings', data: { phone: '+919999999999' }, ...as(users.editor) })).rejects.toThrow()
    await expect(payload.updateGlobal({ slug: 'header', data: {}, ...as(users.editor) })).resolves.toBeDefined()
  })
})

describe('content gaps from the first chat (v1) are filled', () => {
  const pageText = async (slug: string) =>
    JSON.stringify((await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, depth: 0 })).docs[0]?.layout ?? [])

  it('has a For Employers page with sectors, the 6-step recruitment process, Why Partner and the hiring form', async () => {
    const page = (await payload.find({ collection: 'pages', where: { slug: { equals: 'employers' } }, depth: 0 })).docs[0]
    expect(page).toBeTruthy()
    const types = (page.layout ?? []).map((b) => b.blockType)
    expect(types).toEqual(expect.arrayContaining(['pageHeader', 'list', 'process', 'features', 'hiringForm']))
    const process = (page.layout ?? []).find((b) => b.blockType === 'process') as { steps: unknown[] }
    expect(process.steps).toHaveLength(6)
    const text = JSON.stringify(page.layout)
    for (const s of ['Strengthen Your Business', 'Pharmaceuticals & Healthcare', 'Why Partner', 'Submit Hiring Requirement']) expect(text).toContain(s)
  })

  it('Careers has Why Apply Through Pups Harbour and the v1 disclaimer', async () => {
    const text = await pageText('careers')
    for (const s of ['Pups Harbour?', 'Interview Scheduling Assistance', 'Registration does not guarantee employment', 'Supply Chain & Logistics']) expect(text).toContain(s)
  })

  it('Contact has the business and candidate enquiry paths', async () => {
    const text = await pageText('contact')
    for (const s of ['Business enquiries', 'Candidate enquiries', 'Brighter Careers']) expect(text).toContain(s)
  })

  it('Home offers the Employer / Job Seeker choice and About tells the 2021 story, philosophy and v1 values', async () => {
    expect(await pageText('home')).toContain("I'm an Employer")
    const about = await pageText('about')
    for (const s of ['Established in 2021', 'Right People. Right Processes. Better Performance.', 'Professionalism', 'Customer Focus', 'Continuous Improvement']) expect(about).toContain(s)
  })

  it('site settings carry all three phone numbers and Gujarat', async () => {
    const s = await payload.findGlobal({ slug: 'site-settings' })
    expect([s.phone, s.businessPhone, s.recruitmentPhone]).toEqual(['+91 62064 54663', '+91 99985 29394', '+91 97248 75844'])
    expect(s.location).toBe('Gujarat, India')
  })

  it('v1 service bullets are merged into the 13 services', async () => {
    const items = async (slug: string) =>
      ((await payload.find({ collection: 'services', where: { slug: { equals: slug } } })).docs[0].items ?? []).map((i) => i.text)
    expect(await items('statutory-compliance-audits')).toContain('PF and ESIC Administration Support')
    expect(await items('staffing-solutions')).toContain('Contractor Documentation')
    expect(await items('performance-management-system')).toContain('HR MIS Reporting')
    expect(await items('workforce-cost-optimization')).toContain('Payroll Processing Support')
    expect((await payload.count({ collection: 'services' })).totalDocs).toBe(13)
  })

  it('the menu includes For Employers', async () => {
    const h = await payload.findGlobal({ slug: 'header' })
    expect((h.nav ?? []).map((n) => n.href)).toContain('/employers')
  })
})

describe('hiring requirements visibility', () => {
  it('recruiters see hiring requirements only; business enquiries stay admin-only', async () => {
    for (const type of ['hiring', 'business'] as const) {
      await payload.create({
        collection: 'enquiries',
        data: { type, companyName: `${type} co`, contactPerson: 'x', email: 'x@x.in', phone: '+919876543210', message: 'x', position: 'Engineer' },
        overrideAccess: true,
      })
    }
    const rec = await payload.find({ collection: 'enquiries', ...as(users.recruiter) })
    expect(rec.docs.length).toBeGreaterThan(0)
    expect(rec.docs.every((d) => d.type === 'hiring')).toBe(true)
    const all = await payload.find({ collection: 'enquiries', ...as(users.super_admin) })
    expect(all.docs.some((d) => d.type === 'business')).toBe(true)
    await expect(payload.find({ collection: 'enquiries', ...as(users.editor) })).rejects.toThrow()
  })
})

describe('seed reset safety', () => {
  it('refuses to reset when staff have edited website content, unless forced', async () => {
    const { docs } = await payload.find({ collection: 'industries', limit: 1 })
    await payload.update({ collection: 'industries', id: docs[0].id, data: { summary: 'Edited by staff' }, ...as(users.editor) })
    await expect(seed(payload, { reset: true })).rejects.toThrow(/staff edits/i)
    expect((await payload.findByID({ collection: 'industries', id: docs[0].id })).summary).toBe('Edited by staff')
    await expect(seed(payload, { reset: true, force: true })).resolves.toBe('seeded')
  })
})
