import { describe, expect, it } from 'vitest'

import type { Role } from '@/access/permissions'
import {
  checkPassword,
  checkUserCreate,
  checkUserDelete,
  checkUserUpdate,
  type RuleUser,
} from '@/auth/userRules'

let nextId = 1
const u = (role: Role, extra: Partial<RuleUser> = {}): RuleUser => ({
  id: nextId++,
  role,
  active: true,
  ...extra,
})

describe('checkUserCreate', () => {
  it('allows trusted system creation (bootstrap) without an actor', () => {
    expect(checkUserCreate({ actor: null, system: true, data: { role: 'super_admin' } })).toBeNull()
  })

  it('blocks creation with no actor outside system context (e.g. /first-register)', () => {
    expect(checkUserCreate({ actor: null, data: { role: 'editor' } })).toMatch(/not allowed/i)
  })

  it('requires a role', () => {
    expect(checkUserCreate({ actor: u('super_admin'), data: {} })).toMatch(/role/i)
  })

  it('super_admin can create any role', () => {
    expect(checkUserCreate({ actor: u('super_admin'), data: { role: 'admin' } })).toBeNull()
    expect(checkUserCreate({ actor: u('super_admin'), data: { role: 'super_admin' } })).toBeNull()
  })

  it('admin cannot create admins or super_admins', () => {
    expect(checkUserCreate({ actor: u('admin'), data: { role: 'admin' } })).toMatch(/cannot assign/i)
    expect(checkUserCreate({ actor: u('admin'), data: { role: 'super_admin' } })).toMatch(
      /cannot assign/i,
    )
    expect(checkUserCreate({ actor: u('admin'), data: { role: 'recruiter' } })).toBeNull()
  })

  it('editor cannot create users at all', () => {
    expect(checkUserCreate({ actor: u('editor'), data: { role: 'contributor' } })).toMatch(
      /cannot assign/i,
    )
  })
})

describe('checkUserUpdate', () => {
  it('a user can edit their own profile (non-privileged fields)', () => {
    const me = u('editor')
    expect(checkUserUpdate({ actor: me, original: me, data: { name: 'New' }, activeSuperAdmins: 1 })).toBeNull()
  })

  it('nobody can change their own role (no self-promotion or self-demotion)', () => {
    const me = u('admin')
    expect(
      checkUserUpdate({ actor: me, original: me, data: { role: 'super_admin' }, activeSuperAdmins: 1 }),
    ).toMatch(/own role/i)
    const sa = u('super_admin')
    expect(
      checkUserUpdate({ actor: sa, original: sa, data: { role: 'editor' }, activeSuperAdmins: 2 }),
    ).toMatch(/own role/i)
  })

  it('submitting your own unchanged role is fine (admin UI sends full docs)', () => {
    const me = u('admin')
    expect(checkUserUpdate({ actor: me, original: me, data: { role: 'admin' }, activeSuperAdmins: 1 })).toBeNull()
  })

  it('nobody can deactivate themselves', () => {
    const me = u('admin')
    expect(
      checkUserUpdate({ actor: me, original: me, data: { active: false }, activeSuperAdmins: 1 }),
    ).toMatch(/deactivate yourself/i)
  })

  it('admin cannot edit super_admins or other admins', () => {
    expect(
      checkUserUpdate({ actor: u('admin'), original: u('super_admin'), data: { name: 'x' }, activeSuperAdmins: 2 }),
    ).toMatch(/cannot manage/i)
    expect(
      checkUserUpdate({ actor: u('admin'), original: u('admin'), data: { name: 'x' }, activeSuperAdmins: 1 }),
    ).toMatch(/cannot manage/i)
  })

  it('admin can change an editor into a recruiter, but not into an admin', () => {
    expect(
      checkUserUpdate({ actor: u('admin'), original: u('editor'), data: { role: 'recruiter' }, activeSuperAdmins: 1 }),
    ).toBeNull()
    expect(
      checkUserUpdate({ actor: u('admin'), original: u('editor'), data: { role: 'admin' }, activeSuperAdmins: 1 }),
    ).toMatch(/cannot assign/i)
  })

  it('the last active super_admin cannot be demoted or deactivated', () => {
    const last = u('super_admin')
    const other = u('super_admin')
    expect(
      checkUserUpdate({ actor: other, original: last, data: { role: 'admin' }, activeSuperAdmins: 1 }),
    ).toMatch(/last active super_admin/i)
    expect(
      checkUserUpdate({ actor: other, original: last, data: { active: false }, activeSuperAdmins: 1 }),
    ).toMatch(/last active super_admin/i)
    expect(
      checkUserUpdate({ actor: other, original: last, data: { role: 'admin' }, activeSuperAdmins: 2 }),
    ).toBeNull()
  })

  it('trusted system updates are allowed', () => {
    expect(
      checkUserUpdate({ actor: null, system: true, original: u('editor'), data: { mustChangePassword: false }, activeSuperAdmins: 1 }),
    ).toBeNull()
  })

  it('updates with no actor outside system context are blocked', () => {
    expect(
      checkUserUpdate({ actor: null, original: u('editor'), data: { name: 'x' }, activeSuperAdmins: 1 }),
    ).toMatch(/not allowed/i)
  })
})

describe('checkUserDelete', () => {
  it('nobody can delete themselves', () => {
    const me = u('super_admin')
    expect(checkUserDelete({ actor: me, target: me, activeSuperAdmins: 3 })).toMatch(/yourself/i)
  })

  it('admin cannot delete super_admins or admins', () => {
    expect(checkUserDelete({ actor: u('admin'), target: u('super_admin'), activeSuperAdmins: 3 })).toMatch(
      /cannot manage/i,
    )
    expect(checkUserDelete({ actor: u('admin'), target: u('admin'), activeSuperAdmins: 3 })).toMatch(
      /cannot manage/i,
    )
  })

  it('admin can delete an editor', () => {
    expect(checkUserDelete({ actor: u('admin'), target: u('editor'), activeSuperAdmins: 1 })).toBeNull()
  })

  it('the last active super_admin cannot be deleted', () => {
    expect(
      checkUserDelete({ actor: u('super_admin'), target: u('super_admin'), activeSuperAdmins: 1 }),
    ).toMatch(/last active super_admin/i)
  })

  it('a deactivated super_admin can be deleted even if only one active remains', () => {
    expect(
      checkUserDelete({ actor: u('super_admin'), target: u('super_admin', { active: false }), activeSuperAdmins: 1 }),
    ).toBeNull()
  })
})

describe('checkPassword', () => {
  it('accepts a 12+ char password different from the email', () => {
    expect(checkPassword('a-long-passphrase', 'me@x.com')).toBeNull()
  })
  it('rejects passwords under 12 characters', () => {
    expect(checkPassword('short-pass1', 'me@x.com')).toMatch(/12/)
  })
  it('rejects passwords over 128 characters', () => {
    expect(checkPassword('a'.repeat(129), 'me@x.com')).toMatch(/128/)
  })
  it('rejects a password equal to the email (case-insensitive)', () => {
    expect(checkPassword('Someone@Example.com', 'someone@example.com')).toMatch(/email/i)
  })
})
