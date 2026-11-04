/**
 * Single source of truth for who can do what.
 *
 * Roles are defined in code (not editable at runtime) so permissions are reviewable in PRs and
 * cannot be escalated from the admin UI. Every collection/global/field access function must be
 * derived from `can()`. Anything not granted here is denied.
 */

export const ROLES = ['super_admin', 'admin', 'editor', 'contributor', 'recruiter'] as const
export type Role = (typeof ROLES)[number]

export const CAPABILITIES = [
  'admin.access',
  'content.draft',
  'content.publish',
  'content.delete',
  'media.upload',
  'media.delete',
  'globals.layout',
  'globals.settings',
  'enquiries.read',
  'enquiries.manage',
  'applications.read',
  'applications.manage',
  'hiring.read',
  'users.manage',
  'audit.read',
  'self.edit',
] as const
export type Capability = (typeof CAPABILITIES)[number]

const ALL: readonly Capability[] = CAPABILITIES

const GRANTS: Readonly<Record<Role, ReadonlySet<Capability>>> = {
  super_admin: new Set(ALL),
  admin: new Set(ALL),
  editor: new Set<Capability>([
    'admin.access',
    'content.draft',
    'content.publish',
    'media.upload',
    'media.delete',
    'globals.layout',
    'self.edit',
  ]),
  contributor: new Set<Capability>(['admin.access', 'content.draft', 'media.upload', 'self.edit']),
  recruiter: new Set<Capability>(['admin.access', 'applications.read', 'hiring.read', 'self.edit']),
}

/** Roles each role is allowed to hand out. Nobody can grant a role above their own tier. */
const ASSIGNABLE: Readonly<Record<Role, readonly Role[]>> = {
  super_admin: ROLES,
  admin: ['editor', 'contributor', 'recruiter'],
  editor: [],
  contributor: [],
  recruiter: [],
}

/** The minimal shape of a principal. Matches the `users` collection's `role` + `active` fields. */
export type Principal =
  | { role?: Role | null; active?: boolean | null; mustChangePassword?: boolean | null }
  | null
  | undefined

/** What a user who still has to change their (bootstrap/temporary) password is limited to. */
const PASSWORD_CHANGE_ONLY: ReadonlySet<Capability> = new Set<Capability>(['admin.access', 'self.edit'])

export function isRole(value: unknown): value is Role {
  return typeof value === 'string' && (ROLES as readonly string[]).includes(value)
}

function activeRole(user: Principal): Role | null {
  if (!user || user.active === false || !isRole(user.role)) return null
  return user.role
}

export function can(user: Principal, capability: Capability): boolean {
  const role = activeRole(user)
  if (!role) return false
  if (user?.mustChangePassword && !PASSWORD_CHANGE_ONLY.has(capability)) return false
  return GRANTS[role].has(capability)
}

export function assignableRoles(user: Principal): Role[] {
  const role = activeRole(user)
  if (!role || user?.mustChangePassword) return []
  return [...ASSIGNABLE[role]]
}
