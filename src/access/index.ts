/**
 * Payload access adapters. Every collection/global/field access function in this codebase is built
 * from these, so the permission matrix in `permissions.ts` stays the single source of truth.
 */
import type { Access, FieldAccess, PayloadRequest } from 'payload'

import { can, type Capability, type Principal } from './permissions'

export { can } from './permissions'
export type { Capability, Role } from './permissions'

const principal = (req: PayloadRequest): Principal => req.user as Principal

/** Collection/global access: allowed iff the current user has the capability. */
export const allow =
  (capability: Capability): Access =>
  ({ req }) =>
    can(principal(req), capability)

/** Field access variant (field access may only return a boolean). */
export const allowField =
  (capability: Capability): FieldAccess =>
  ({ req }) =>
    can(principal(req), capability)

/** Public read for published docs; anyone who can draft also sees drafts. */
export const publishedOrDrafter: Access = ({ req }) => {
  if (can(principal(req), 'content.draft')) return true
  return { _status: { equals: 'published' } }
}

/**
 * Create/update for draft-enabled content: drafting needs `content.draft`; anything that would make
 * the doc published needs `content.publish`.
 */
export const draftOrPublish: Access = ({ req, data }) => {
  const user = principal(req)
  if ((data as { _status?: string } | undefined)?._status === 'published') {
    return can(user, 'content.publish')
  }
  return can(user, 'content.draft')
}

/** Holders of `capability` get everything; other authenticated users get only their own user doc. */
export const capabilityOrSelf =
  (capability: Capability, selfCapability: Capability = 'self.edit'): Access =>
  ({ req }) => {
    const user = principal(req)
    if (can(user, capability)) return true
    if (req.user && can(user, selfCapability)) return { id: { equals: req.user.id } }
    return false
  }

export const nobody: Access = () => false
export const anyone: Access = () => true
