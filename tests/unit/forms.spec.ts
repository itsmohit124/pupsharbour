import { describe, expect, it } from 'vitest'

import { MAX_DOCUMENT_BYTES as MAX_RESUME_BYTES, sniffDocument as sniffResume } from '@/lib/fileType'
import { createRateLimiter } from '@/lib/rateLimit'
import { applicationSchema, enquirySchema, hiringSchema } from '@/lib/validation/forms'

const enquiry = {
  companyName: 'Acme Pvt Ltd',
  contactPerson: 'Asha Patel',
  designation: 'HR Head',
  email: 'asha@acme.in',
  phone: '98765 43210',
  industry: 'Manufacturing',
  organisationSize: '51–200',
  services: ['company-analysis-and-360-survey'],
  message: 'We need a 360 survey for 120 staff.',
  consent: true,
  website: '',
}

describe('enquirySchema', () => {
  it('accepts a complete enquiry and normalises the phone', () => {
    const r = enquirySchema.safeParse(enquiry)
    expect(r.success).toBe(true)
    expect(r.success && r.data.phone).toBe('+919876543210')
  })

  it('requires company, contact person, email, phone, message and consent', () => {
    const r = enquirySchema.safeParse({ website: '' })
    expect(r.success).toBe(false)
    const fields = r.success ? [] : r.error.issues.map((i) => i.path[0])
    expect(fields).toEqual(expect.arrayContaining(['companyName', 'contactPerson', 'email', 'phone', 'message', 'consent']))
  })

  it('rejects an invalid email or phone', () => {
    expect(enquirySchema.safeParse({ ...enquiry, email: 'nope' }).success).toBe(false)
    expect(enquirySchema.safeParse({ ...enquiry, phone: '12345' }).success).toBe(false)
  })

  it('rejects submissions where the honeypot is filled (bots)', () => {
    expect(enquirySchema.safeParse({ ...enquiry, website: 'http://spam' }).success).toBe(false)
  })

  it('rejects consent=false', () => {
    expect(enquirySchema.safeParse({ ...enquiry, consent: false }).success).toBe(false)
  })

  it('caps long text to prevent abuse', () => {
    expect(enquirySchema.safeParse({ ...enquiry, message: 'x'.repeat(5001) }).success).toBe(false)
    expect(enquirySchema.safeParse({ ...enquiry, services: Array(30).fill('a') }).success).toBe(false)
  })

  it('trims whitespace', () => {
    const r = enquirySchema.safeParse({ ...enquiry, companyName: '  Acme  ' })
    expect(r.success && r.data.companyName).toBe('Acme')
  })
})

describe('applicationSchema', () => {
  const app = { fullName: 'Ravi Kumar', phone: '+91 74888 35182', email: 'ravi@x.in', consent: true, website: '' }
  it('accepts the minimum required fields', () => {
    expect(applicationSchema.safeParse(app).success).toBe(true)
  })
  it('requires name, phone, email and consent', () => {
    const r = applicationSchema.safeParse({ website: '' })
    const fields = r.success ? [] : r.error.issues.map((i) => i.path[0])
    expect(fields).toEqual(expect.arrayContaining(['fullName', 'phone', 'email', 'consent']))
  })
})

describe('sniffResume', () => {
  const bytes = (...b: number[]) => new Uint8Array([...b, ...Array(16).fill(0)])
  it('detects PDF, DOCX (zip) and legacy DOC by magic bytes', () => {
    expect(sniffResume(bytes(0x25, 0x50, 0x44, 0x46, 0x2d), 'cv.pdf')).toEqual({ ok: true, mimetype: 'application/pdf', ext: 'pdf' })
    expect(sniffResume(bytes(0x50, 0x4b, 0x03, 0x04), 'cv.docx')).toMatchObject({ ok: true, ext: 'docx' })
    expect(sniffResume(bytes(0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1), 'cv.doc')).toMatchObject({ ok: true, ext: 'doc' })
  })
  it('rejects a renamed executable or image', () => {
    expect(sniffResume(bytes(0x4d, 0x5a), 'cv.pdf').ok).toBe(false)
    expect(sniffResume(bytes(0x89, 0x50, 0x4e, 0x47), 'cv.pdf').ok).toBe(false)
  })
  it('rejects a mismatched extension (zip renamed to .pdf)', () => {
    expect(sniffResume(bytes(0x50, 0x4b, 0x03, 0x04), 'cv.pdf').ok).toBe(false)
  })
  it('rejects empty and oversized files', () => {
    expect(sniffResume(new Uint8Array(), 'cv.pdf').ok).toBe(false)
    const big = new Uint8Array(MAX_RESUME_BYTES + 1)
    big.set([0x25, 0x50, 0x44, 0x46])
    expect(sniffResume(big, 'cv.pdf').ok).toBe(false)
  })
})

describe('createRateLimiter', () => {
  it('allows N hits per window per key, then blocks, then resets', () => {
    let now = 0
    const limit = createRateLimiter({ max: 3, windowMs: 1000, now: () => now })
    expect([limit('ip1'), limit('ip1'), limit('ip1')]).toEqual([true, true, true])
    expect(limit('ip1')).toBe(false)
    expect(limit('ip2')).toBe(true) // independent keys
    now = 1001
    expect(limit('ip1')).toBe(true)
  })
})

describe('hiringSchema', () => {
  const hiring = {
    companyName: 'Acme Pvt Ltd',
    contactPerson: 'Asha Patel',
    email: 'asha@acme.in',
    phone: '98765 43210',
    position: 'Production Engineer',
    vacancies: '3',
    location: 'Ahmedabad',
    experience: '3–5 years',
    timeline: 'Within 30 days',
    consent: true,
    website: '',
  }
  it('accepts a complete hiring requirement and coerces vacancies to a number', () => {
    const r = hiringSchema.safeParse(hiring)
    expect(r.success).toBe(true)
    expect(r.success && r.data.vacancies).toBe(3)
    expect(r.success && r.data.phone).toBe('+919876543210')
  })
  it('requires company, contact, email, phone, position and consent', () => {
    const r = hiringSchema.safeParse({ website: '' })
    const fields = r.success ? [] : r.error.issues.map((i) => i.path[0])
    expect(fields).toEqual(expect.arrayContaining(['companyName', 'contactPerson', 'email', 'phone', 'position', 'consent']))
  })
  it('rejects silly vacancy counts', () => {
    expect(hiringSchema.safeParse({ ...hiring, vacancies: '0' }).success).toBe(false)
    expect(hiringSchema.safeParse({ ...hiring, vacancies: '100000' }).success).toBe(false)
    expect(hiringSchema.safeParse({ ...hiring, vacancies: 'many' }).success).toBe(false)
  })
  it('allows vacancies to be left empty', () => {
    const r = hiringSchema.safeParse({ ...hiring, vacancies: '' })
    expect(r.success && r.data.vacancies).toBeUndefined()
  })
})
