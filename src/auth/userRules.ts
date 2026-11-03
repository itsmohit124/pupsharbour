/**
 * Business rules for managing staff accounts. Pure functions: each returns `null` when the
 * operation is allowed, or a human-readable reason when it is not. The Users collection hooks
 * call these and turn a reason into a 403.
 *
 * These are a second line of defence on top of collection/field access (which are derived from
 * `can()`), and they cover things access functions cannot express: no self-promotion, no
 * managing peers or superiors, and never losing the last active super_admin.
 */
import { assignableRoles, type Role } from '@/access/permissions'

export type RuleUser = {
  id: number | string
  role?: Role | null
  active?: boolean | null
  mustChangePassword?: boolean | null
}

type UserData = { role?: Role | null; active?: boolean | null; [key: string]: unknown }

export const MIN_PASSWORD_LENGTH = 12
export const MAX_PASSWORD_LENGTH = 128

const NO_ACTOR = 'This operation is not allowed without an authenticated administrator.'

function canManage(actor: RuleUser, role: Role | null | undefined): boolean {
  return !!role && assignableRoles(actor).includes(role)
}

export function checkUserCreate(args: {
  actor: RuleUser | null
  system?: boolean
  data: UserData
}): string | null {
  const { actor, system, data } = args
  if (!actor) return system ? null : NO_ACTOR
  if (!data.role) return 'A role is required.'
  if (!canManage(actor, data.role)) return `You cannot assign the role "${data.role}".`
  return null
}

export function checkUserUpdate(args: {
  actor: RuleUser | null
  system?: boolean
  original: RuleUser
  data: UserData
  activeSuperAdmins: number
}): string | null {
  const { actor, system, original, data, activeSuperAdmins } = args
  if (!actor) return system ? null : NO_ACTOR

  const roleChanging = data.role !== undefined && data.role !== original.role
  const deactivating = data.active === false && original.active !== false
  const isSelf = String(actor.id) === String(original.id)

  if (isSelf) {
    if (roleChanging) return 'You cannot change your own role.'
    if (deactivating) return 'You cannot deactivate yourself.'
    return null
  }

  if (!canManage(actor, original.role)) return `You cannot manage a user with role "${original.role}".`
  if (roleChanging && !canManage(actor, data.role)) return `You cannot assign the role "${data.role}".`

  const losesSuperAdmin = original.role === 'super_admin' && original.active !== false
  if (losesSuperAdmin && (roleChanging || deactivating) && activeSuperAdmins <= 1) {
    return 'You cannot demote or deactivate the last active super_admin.'
  }
  return null
}

export function checkUserDelete(args: {
  actor: RuleUser | null
  system?: boolean
  target: RuleUser
  activeSuperAdmins: number
}): string | null {
  const { actor, system, target, activeSuperAdmins } = args
  if (!actor) return system ? null : NO_ACTOR
  if (String(actor.id) === String(target.id)) return 'You cannot delete yourself.'
  if (!canManage(actor, target.role)) return `You cannot manage a user with role "${target.role}".`
  if (target.role === 'super_admin' && target.active !== false && activeSuperAdmins <= 1) {
    return 'You cannot delete the last active super_admin.'
  }
  return null
}

export function checkPassword(password: string, email?: string | null): string | null {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    return `Password must be at most ${MAX_PASSWORD_LENGTH} characters.`
  }
  if (email && password.trim().toLowerCase() === email.trim().toLowerCase()) {
    return 'Password must not be the same as your email.'
  }
  return null
}
