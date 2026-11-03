import { describe, expect, it } from 'vitest'

import {
  CAPABILITIES,
  ROLES,
  assignableRoles,
  can,
  type Capability,
  type Role,
} from '@/access/permissions'

/**
 * The approved permission matrix, written out cell-by-cell.
 * If you change a permission, change it here first (test-first), then in permissions.ts.
 */
const Y = true
const N = false
//                                   super_admin admin editor contributor recruiter
const EXPECTED: Record<Capability, [boolean, boolean, boolean, boolean, boolean]> = {
  'admin.access':                   [Y, Y, Y, Y, Y],
  'content.draft':                  [Y, Y, Y, Y, N],
  'content.publish':                [Y, Y, Y, N, N],
  'content.delete':                 [Y, Y, N, N, N], // delete docs + restore old versions
  'media.upload':                   [Y, Y, Y, Y, N],
  'media.delete':                   [Y, Y, Y, N, N],
  'globals.layout':                 [Y, Y, Y, N, N], // Header, Footer
  'globals.settings':               [Y, Y, N, N, N], // phone, WhatsApp, email
  'enquiries.read':                 [Y, Y, N, N, N], // read, update status, notes
  'enquiries.manage':               [Y, Y, N, N, N], // delete, export
  'applications.read':              [Y, Y, N, N, Y], // read, resume download, status
  'applications.manage':            [Y, Y, N, N, N], // delete, export
  'users.manage':                   [Y, Y, N, N, N],
  'audit.read':                     [Y, Y, N, N, N],
  'self.edit':                      [Y, Y, Y, Y, Y],
}

const user = (role: Role, active = true) => ({ role, active })

describe('permission matrix', () => {
  it('covers every capability exactly once', () => {
    expect([...CAPABILITIES].sort()).toEqual(Object.keys(EXPECTED).sort())
  })

  it('has the five roles in a stable order', () => {
    expect(ROLES).toEqual(['super_admin', 'admin', 'editor', 'contributor', 'recruiter'])
  })

  for (const cap of Object.keys(EXPECTED) as Capability[]) {
    ROLES.forEach((role, i) => {
      const expected = EXPECTED[cap][i]
      it(`${role} ${expected ? 'CAN' : 'CANNOT'} ${cap}`, () => {
        expect(can(user(role), cap)).toBe(expected)
      })
    })
  }
})

describe('can() denies by default', () => {
  it.each(CAPABILITIES)('anonymous cannot %s', (cap) => {
    expect(can(null, cap)).toBe(false)
    expect(can(undefined, cap)).toBe(false)
  })

  it.each(CAPABILITIES)('deactivated super_admin cannot %s', (cap) => {
    expect(can(user('super_admin', false), cap)).toBe(false)
  })

  it('a user with an unknown or missing role gets nothing', () => {
    expect(can({ role: 'hacker' as Role, active: true }, 'admin.access')).toBe(false)
    expect(can({ active: true } as never, 'admin.access')).toBe(false)
  })

  it.each(CAPABILITIES.filter((c) => c !== 'admin.access' && c !== 'self.edit'))(
    'a super_admin who must change their password cannot %s until they do',
    (cap) => {
      expect(can({ role: 'super_admin', active: true, mustChangePassword: true }, cap)).toBe(false)
    },
  )

  it('a user who must change their password can still open the admin and edit themselves', () => {
    const u = { role: 'super_admin' as const, active: true, mustChangePassword: true }
    expect(can(u, 'admin.access')).toBe(true)
    expect(can(u, 'self.edit')).toBe(true)
    expect(assignableRoles(u)).toEqual([])
  })

  it('an unknown capability is denied', () => {
    expect(can(user('super_admin'), 'nuke.everything' as Capability)).toBe(false)
  })
})

describe('assignableRoles()', () => {
  it('super_admin may assign any role', () => {
    expect(assignableRoles(user('super_admin'))).toEqual([...ROLES])
  })

  it('admin may assign only editor, contributor, recruiter', () => {
    expect(assignableRoles(user('admin'))).toEqual(['editor', 'contributor', 'recruiter'])
  })

  it.each(['editor', 'contributor', 'recruiter'] as Role[])('%s may assign nothing', (role) => {
    expect(assignableRoles(user(role))).toEqual([])
  })

  it('anonymous or deactivated users may assign nothing', () => {
    expect(assignableRoles(null)).toEqual([])
    expect(assignableRoles(user('super_admin', false))).toEqual([])
  })
})
