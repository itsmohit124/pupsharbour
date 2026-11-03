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

  it('a recruiter cannot edit website content or read enquiries, but can read applications', async () => {
    const { docs } = await payload.find({ collection: 'pages', limit: 1 })
    await expect(payload.update({ collection: 'pages', id: docs[0].id, data: { title: 'x' }, ...as(users.recruiter) })).rejects.toThrow()
    await expect(payload.find({ collection: 'enquiries', ...as(users.recruiter) })).rejects.toThrow()
    await expect(payload.find({ collection: 'applications', ...as(users.recruiter) })).resolves.toBeDefined()
  })

  it('nobody (even super_admin) can create submissions through the API', async () => {
    await expect(
      payload.create({
        collection: 'enquiries',
        data: { companyName: 'x', contactPerson: 'x', email: 'x@x.in', phone: '+919876543210', message: 'x' },
        ...as(users.super_admin),
      }),
    ).rejects.toThrow()
  })

  it('an editor cannot change site settings (phone/WhatsApp), but can change the header', async () => {
    await expect(payload.updateGlobal({ slug: 'site-settings', data: { phone: '+919999999999' }, ...as(users.editor) })).rejects.toThrow()
    await expect(payload.updateGlobal({ slug: 'header', data: {}, ...as(users.editor) })).resolves.toBeDefined()
  })
})
