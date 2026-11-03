import { APIError, type CollectionConfig, type FieldAccess, type PayloadRequest } from 'payload'

import { allow, can, capabilityOrSelf } from '@/access'
import { assignableRoles, ROLES, type Principal } from '@/access/permissions'
import { auditHooks, writeAudit } from '@/audit/writeAudit'
import { normalizeIndianMobile } from '@/lib/phone'
import {
  checkPassword,
  checkUserCreate,
  checkUserDelete,
  checkUserUpdate,
  type RuleUser,
} from '@/auth/userRules'

const audit = auditHooks('users')
const forbid = (reason: string) => new APIError(reason, 403, undefined, true)
const isProd = process.env.NODE_ENV === 'production'

const actorOf = (req: PayloadRequest) => (req.user ?? null) as RuleUser | null
const isSystem = (req: PayloadRequest) => req.context?.system === true

async function activeSuperAdmins(req: PayloadRequest): Promise<number> {
  const { totalDocs } = await req.payload.count({
    collection: 'users',
    where: { and: [{ role: { equals: 'super_admin' } }, { active: { not_equals: false } }] },
    overrideAccess: true,
    req,
  })
  return totalDocs
}

/** Privileged fields: only user managers may set them, and never on their own account. */
const managerNotSelf: FieldAccess = ({ req, id }) =>
  can(req.user as Principal, 'users.manage') && (id === undefined || String(id) !== String(req.user?.id))

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Staff user', plural: 'Staff users' },
  admin: {
    group: 'System',
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role', 'active', 'updatedAt'],
    // Everyone can still reach their own account page; only managers see the list.
    hidden: ({ user }) => !can(user as never, 'users.manage'),
  },
  auth: {
    tokenExpiration: 60 * 60 * 2, // 2h
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000, // 15 min
    useSessions: true,
    cookies: { secure: isProd, sameSite: 'Lax' },
    forgotPassword: { expiration: 60 * 60 * 1000, minRequestInterval: 60 * 1000 },
  },
  access: {
    admin: ({ req }) => can(req.user as Principal, 'admin.access'),
    create: allow('users.manage'),
    read: capabilityOrSelf('users.manage'),
    update: capabilityOrSelf('users.manage'),
    delete: allow('users.manage'),
    unlock: allow('users.manage'),
  },
  hooks: {
    // Runs for create, update and resetPassword (which skips beforeChange), with the plaintext password.
    beforeOperation: [
      async ({ args, operation, req }) => {
        if (!['create', 'update', 'updateByID', 'resetPassword'].includes(operation)) return args
        const data = (args as { data?: { password?: unknown; email?: string } }).data
        if (typeof data?.password === 'string') {
          const reason = checkPassword(data.password, data.email ?? req.user?.email)
          if (reason) throw new APIError(reason, 400, undefined, true)
        }
        return args
      },
    ],
    beforeChange: [
      async ({ data, operation, originalDoc, req }) => {
        const actor = actorOf(req)
        const system = isSystem(req)
        if (operation === 'create') {
          const reason = checkUserCreate({ actor, system, data })
          if (reason) throw forbid(reason)
        } else if (originalDoc) {
          const reason = checkUserUpdate({
            actor,
            system,
            original: originalDoc as RuleUser,
            data,
            activeSuperAdmins: await activeSuperAdmins(req),
          })
          if (reason) throw forbid(reason)
        }
        // Remember a self-service password change so afterChange can clear mustChangePassword.
        if (operation === 'update' && typeof data.password === 'string' && actor && originalDoc) {
          if (String(actor.id) === String(originalDoc.id)) req.context.selfPasswordChange = true
        }
        return data
      },
    ],
    afterChange: [
      audit.afterChange,
      async ({ doc, req }) => {
        if (req.context.selfPasswordChange && doc.mustChangePassword) {
          req.context.selfPasswordChange = false
          await req.payload.update({
            collection: 'users',
            id: doc.id,
            data: { mustChangePassword: false },
            overrideAccess: true,
            req,
            context: { system: true, skipAudit: true },
          })
          return { ...doc, mustChangePassword: false }
        }
        return doc
      },
    ],
    afterOperation: [
      // A completed password reset (invite or forgot-password) also satisfies "must change password".
      async ({ operation, result, req }) => {
        if (operation !== 'resetPassword') return result
        const user = (result as { user?: { id: number | string; mustChangePassword?: boolean } })?.user
        if (user?.mustChangePassword) {
          await req.payload.update({
            collection: 'users',
            id: user.id,
            data: { mustChangePassword: false },
            overrideAccess: true,
            req,
            context: { system: true, skipAudit: true },
          })
        }
        return result
      },
    ],
    beforeDelete: [
      async ({ id, req }) => {
        const target = (await req.payload.findByID({
          collection: 'users',
          id,
          overrideAccess: true,
          req,
          depth: 0,
        })) as RuleUser
        const reason = checkUserDelete({
          actor: actorOf(req),
          system: isSystem(req),
          target,
          activeSuperAdmins: await activeSuperAdmins(req),
        })
        if (reason) throw forbid(reason)
      },
    ],
    afterDelete: [audit.afterDelete],
    beforeLogin: [
      ({ user }) => {
        if ((user as RuleUser).active === false) {
          throw new APIError('This account has been deactivated.', 401, undefined, true)
        }
        return user
      },
    ],
    afterLogin: [
      async ({ req, user }) => {
        req.user = { ...user, collection: 'users' }
        await writeAudit(req, { action: 'login', targetCollection: 'users', targetId: user.id })
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'phone',
      type: 'text',
      label: 'Mobile',
      admin: { description: 'Indian mobile number, stored as +91XXXXXXXXXX.' },
      validate: (value: string | null | undefined) =>
        !value || normalizeIndianMobile(value) ? true : 'Enter a valid 10-digit Indian mobile number.',
      hooks: {
        beforeChange: [({ value }) => (value ? (normalizeIndianMobile(value) ?? value) : value)],
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      index: true,
      options: ROLES.map((r) => ({ label: r.replace('_', ' '), value: r })),
      access: { create: managerNotSelf, update: managerNotSelf },
      admin: {
        description: 'What this person can do. See docs/permissions in the repo for the full matrix.',
      },
      // UX only: managers see the roles they may hand out, plus the record's current value (so saving
      // your own profile, which resends your role, still validates). Payload also applies this during
      // validation, so system writes (no user) and non-managers get the full list. The real
      // enforcement is checkUserCreate/checkUserUpdate in the hooks, which give clear 403 reasons.
      filterOptions: ({ options, req, siblingData }) => {
        const allowed: string[] = assignableRoles(req.user as Principal)
        if (!req.user || allowed.length === 0) return options
        const current = (siblingData as { role?: string } | undefined)?.role
        return options.filter((o) => {
          const value = typeof o === 'string' ? o : o.value
          return allowed.includes(value) || value === current
        })
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      index: true,
      access: { create: managerNotSelf, update: managerNotSelf },
      admin: { description: 'Untick to block sign-in without deleting the account.' },
    },
    {
      name: 'mustChangePassword',
      type: 'checkbox',
      defaultValue: false,
      // Only the system sets this (bootstrap / invites). Cleared automatically after a password change.
      access: { create: () => false, update: () => false },
      admin: {
        readOnly: true,
        description: 'Until the password is changed, this account can only edit its own profile.',
      },
    },
  ],
  timestamps: true,
}
