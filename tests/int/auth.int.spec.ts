import config from '@/payload.config'
import { getPayload, type Payload } from 'payload'
import { beforeAll, describe, expect, it } from 'vitest'

import { runBootstrap } from '@/auth/runBootstrap'
import type { User } from '@/payload-types'

let payload: Payload
const PW = 'a-very-long-test-password'

/** Act as `user` through the Local API with access control ENFORCED (like a real HTTP request). */
const as = (user: User) => ({ user, overrideAccess: false as const })

async function makeUser(role: User['role'], extra: Partial<User> = {}): Promise<User> {
  return (await payload.create({
    collection: 'users',
    data: { email: `${role}-${Math.random().toString(36).slice(2)}@t.test`, password: PW, name: role, role, ...extra },
    context: { system: true },
  })) as User
}

describe('auth & permissions (Payload wiring)', () => {
  let owner: User

  beforeAll(async () => {
    payload = await getPayload({ config: await config })
  })

  describe('first-user bootstrap', () => {
    it('creates exactly one super_admin from env on an empty DB, then is a no-op', async () => {
      const env = { BOOTSTRAP_ADMIN_EMAIL: 'owner@pupsharbour.test', BOOTSTRAP_ADMIN_PASSWORD: 'owner-password-1234' }
      expect(await runBootstrap(payload, env)).toBe('created')
      expect(await runBootstrap(payload, env)).toBe('skipped:users-exist')

      const { docs } = await payload.find({ collection: 'users', overrideAccess: true })
      expect(docs).toHaveLength(1)
      owner = docs[0] as User
      expect(owner).toMatchObject({ role: 'super_admin', active: true, mustChangePassword: true })
    })

    it('the bootstrap admin is limited until they change their password', async () => {
      await expect(
        payload.create({ collection: 'users', data: { email: 'x@t.test', password: PW, name: 'x', role: 'editor' }, ...as(owner) }),
      ).rejects.toThrow()

      const updated = (await payload.update({ collection: 'users', id: owner.id, data: { password: 'my-brand-new-password' }, ...as(owner) })) as User
      expect(updated.mustChangePassword).toBe(false)
      owner = (await payload.findByID({ collection: 'users', id: owner.id, overrideAccess: true })) as User

      const created = await payload.create({ collection: 'users', data: { email: 'ed@t.test', password: PW, name: 'ed', role: 'editor' }, ...as(owner) })
      expect(created.role).toBe('editor')
    })

    it('refuses user creation with no actor outside system context (the /first-register path)', async () => {
      await expect(
        payload.create({ collection: 'users', data: { email: 'intruder@t.test', password: PW, name: 'i', role: 'super_admin' } }),
      ).rejects.toThrow(/not allowed/i)
    })
  })

  describe('role escalation', () => {
    it('admin can create a recruiter but not an admin or super_admin', async () => {
      const admin = await makeUser('admin')
      const r = await payload.create({ collection: 'users', data: { email: 'rec@t.test', password: PW, name: 'r', role: 'recruiter' }, ...as(admin) })
      expect(r.role).toBe('recruiter')
      for (const role of ['admin', 'super_admin'] as const) {
        await expect(
          payload.create({ collection: 'users', data: { email: `${role}x@t.test`, password: PW, name: 'x', role }, ...as(admin) }),
        ).rejects.toThrow()
      }
    })

    it('a user cannot change their own role (field access drops it; the stored role is unchanged)', async () => {
      const admin = await makeUser('admin')
      await payload
        .update({ collection: 'users', id: admin.id, data: { role: 'super_admin' }, ...as(admin) })
        .catch(() => undefined) // either a 403 or a silent drop is acceptable…
      const stored = await payload.findByID({ collection: 'users', id: admin.id, overrideAccess: true })
      expect(stored.role).toBe('admin') // …but the role must never change
    })

    it('a user cannot deactivate or un-flag themselves', async () => {
      const ed = await makeUser('editor', { mustChangePassword: true } as Partial<User>)
      await payload
        .update({ collection: 'users', id: ed.id, data: { active: false, mustChangePassword: false }, ...as(ed) })
        .catch(() => undefined)
      const stored = await payload.findByID({ collection: 'users', id: ed.id, overrideAccess: true })
      expect(stored).toMatchObject({ active: true, mustChangePassword: true })
    })

    it('an editor only ever sees their own user record and cannot edit others', async () => {
      const editor = await makeUser('editor')
      const { docs } = await payload.find({ collection: 'users', ...as(editor) })
      expect(docs.map((d) => d.id)).toEqual([editor.id])
      await expect(
        payload.update({ collection: 'users', id: owner.id, data: { name: 'pwned' }, ...as(editor) }),
      ).rejects.toThrow()
    })

    it('admin cannot edit or delete a super_admin', async () => {
      const admin = await makeUser('admin')
      await expect(payload.update({ collection: 'users', id: owner.id, data: { name: 'x' }, ...as(admin) })).rejects.toThrow(/cannot manage/i)
      await expect(payload.delete({ collection: 'users', id: owner.id, ...as(admin) })).rejects.toThrow(/cannot manage/i)
    })
  })

  describe('super_admin invariants', () => {
    it('cannot delete yourself, and the last active super_admin cannot be demoted', async () => {
      await expect(payload.delete({ collection: 'users', id: owner.id, ...as(owner) })).rejects.toThrow(/yourself/i)

      const second = await makeUser('super_admin')
      // owner demotes second: fine while 2 active super_admins exist
      await payload.update({ collection: 'users', id: second.id, data: { role: 'admin' }, ...as(owner) })
      // now owner is the last one: second (re-promoted by system) cannot demote them
      const third = await makeUser('super_admin')
      await payload.update({ collection: 'users', id: third.id, data: { active: false }, ...as(owner) })
      const thirdActive = await makeUser('super_admin')
      await payload.delete({ collection: 'users', id: thirdActive.id, ...as(owner) })
      await expect(
        payload.update({ collection: 'users', id: owner.id, data: { role: 'admin' }, user: third, overrideAccess: true }),
      ).rejects.toThrow()
    })
  })

  describe('login', () => {
    it('deactivated users cannot sign in', async () => {
      const u = await makeUser('editor', { active: false })
      await expect(payload.login({ collection: 'users', data: { email: u.email, password: PW } })).rejects.toThrow(/deactivated/i)
    })

    it('a successful login is written to the audit log', async () => {
      const u = await makeUser('editor')
      await payload.login({ collection: 'users', data: { email: u.email, password: PW } })
      const { docs } = await payload.find({
        collection: 'audit-logs',
        where: { and: [{ action: { equals: 'login' } }, { targetId: { equals: String(u.id) } }] },
        overrideAccess: true,
      })
      expect(docs).toHaveLength(1)
      expect(docs[0].actorEmail).toBe(u.email)
    })

    it('locks the account after 5 failed attempts', async () => {
      const u = await makeUser('editor')
      for (let i = 0; i < 5; i++) {
        await expect(payload.login({ collection: 'users', data: { email: u.email, password: 'wrong-password-xx' } })).rejects.toThrow()
      }
      await expect(payload.login({ collection: 'users', data: { email: u.email, password: PW } })).rejects.toThrow(/locked/i)
    })

    it('rejects weak passwords on create and update', async () => {
      await expect(makeUser('editor', { password: 'short' } as Partial<User>)).rejects.toThrow(/12/)
      const u = await makeUser('editor')
      await expect(payload.update({ collection: 'users', id: u.id, data: { password: 'tiny' }, ...as(u) })).rejects.toThrow(/12/)
    })
  })

  describe('audit log is append-only', () => {
    it('even a super_admin cannot create, edit or delete entries through the API', async () => {
      const { docs } = await payload.find({ collection: 'audit-logs', ...as(owner), limit: 1 })
      expect(docs.length).toBe(1) // super_admin can read
      await expect(payload.create({ collection: 'audit-logs', data: { action: 'login' }, ...as(owner) })).rejects.toThrow()
      await expect(payload.update({ collection: 'audit-logs', id: docs[0].id, data: { summary: 'x' }, ...as(owner) })).rejects.toThrow()
      await expect(payload.delete({ collection: 'audit-logs', id: docs[0].id, ...as(owner) })).rejects.toThrow()
    })

    it('editors cannot read the audit log', async () => {
      const editor = await makeUser('editor')
      await expect(payload.find({ collection: 'audit-logs', ...as(editor) })).rejects.toThrow()
    })

    it('records role changes as role-change', async () => {
      const ed = await makeUser('editor')
      await payload.update({ collection: 'users', id: ed.id, data: { role: 'recruiter' }, ...as(owner) })
      const { docs } = await payload.find({
        collection: 'audit-logs',
        where: { and: [{ action: { equals: 'role-change' } }, { targetId: { equals: String(ed.id) } }] },
        overrideAccess: true,
      })
      expect(docs).toHaveLength(1)
      expect(docs[0].changedFields).toContain('role')
    })
  })
})

describe('regression: saving your own profile resends your role', () => {
  it('an admin can update their own name while the form resubmits role=admin', async () => {
    const admin = (await payload.create({
      collection: 'users',
      data: { email: 'self-save@t.test', password: PW, name: 'Before', role: 'admin' },
      context: { system: true },
    })) as User
    const saved = await payload.update({
      collection: 'users',
      id: admin.id,
      data: { name: 'After', role: 'admin', active: true },
      ...as(admin),
    })
    expect(saved.name).toBe('After')
    expect(saved.role).toBe('admin')
  })
})

describe('audit detail', () => {
  it('a self-service password change is recorded with a clear summary and no secret fields', async () => {
    const u = (await payload.create({
      collection: 'users',
      data: { email: 'pwchange@t.test', password: PW, name: 'p', role: 'editor' },
      context: { system: true },
    })) as User
    await payload.update({ collection: 'users', id: u.id, data: { password: 'another-long-password' }, ...as(u) })
    const { docs } = await payload.find({
      collection: 'audit-logs',
      where: { and: [{ action: { equals: 'update' } }, { targetId: { equals: String(u.id) } }] },
      overrideAccess: true,
    })
    expect(docs[0].summary).toBe('Changed own password')
    expect(docs[0].changedFields).not.toEqual(expect.arrayContaining(['hash', 'salt', 'password', 'resetPasswordRequestedAt']))
  })
})
