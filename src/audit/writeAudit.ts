/**
 * Append-only audit trail. Entries are written through the Local API with `overrideAccess`
 * (the `audit-logs` collection denies create/update/delete to everyone over the API), inside the
 * caller's transaction (`req`) so an audited change and its log entry commit or roll back together.
 */
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  PayloadRequest,
} from 'payload'

export const AUDIT_ACTIONS = [
  'create',
  'update',
  'delete',
  'publish',
  'unpublish',
  'role-change',
  'login',
  'resume-download',
] as const
export type AuditAction = (typeof AUDIT_ACTIONS)[number]

/** Fields that are noise or secret and are never recorded as "changed". */
const IGNORED_FIELDS = new Set([
  'id',
  'collection',
  'updatedAt',
  'resetPasswordRequestedAt',
  'createdAt',
  'hash',
  'salt',
  'password',
  'sessions',
  'loginAttempts',
  'lockUntil',
  'resetPasswordToken',
  'resetPasswordExpiration',
  '_verificationToken',
])

export function clientIp(req: PayloadRequest): string | undefined {
  const h = req.headers
  if (!h) return undefined
  return (
    h.get('x-nf-client-connection-ip') ??
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    h.get('x-real-ip') ??
    undefined
  )
}

export function changedFields(
  before: Record<string, unknown> | undefined,
  after: Record<string, unknown>,
): string[] {
  const keys = new Set([...Object.keys(before ?? {}), ...Object.keys(after)])
  return [...keys]
    .filter((k) => !IGNORED_FIELDS.has(k))
    .filter((k) => JSON.stringify(before?.[k]) !== JSON.stringify(after[k]))
    .sort()
}

export async function writeAudit(
  req: PayloadRequest,
  entry: {
    action: AuditAction
    targetCollection: string
    targetId?: string | number
    summary?: string
    changedFields?: string[]
  },
): Promise<void> {
  const user = req.user as { id?: number | string; email?: string } | null | undefined
  await req.payload.create({
    collection: 'audit-logs',
    data: {
      action: entry.action,
      actor: (user?.id as number | undefined) ?? null,
      actorEmail: user?.email ?? (req.context?.system ? 'system' : 'anonymous'),
      targetCollection: entry.targetCollection,
      targetId: entry.targetId === undefined ? undefined : String(entry.targetId),
      summary: entry.summary,
      changedFields: entry.changedFields ?? [],
      ip: clientIp(req),
    },
    overrideAccess: true,
    req,
    context: { skipAudit: true },
  })
}

/** Classify a change on a draft-enabled or auth collection into the most specific action. */
function classify(
  operation: 'create' | 'update',
  before: Record<string, unknown> | undefined,
  after: Record<string, unknown>,
): AuditAction {
  if (operation === 'update' && before?.role !== undefined && before.role !== after.role) {
    return 'role-change'
  }
  const wasPublished = before?._status === 'published'
  const isPublished = after._status === 'published'
  if (isPublished && !wasPublished) return 'publish'
  if (wasPublished && after._status === 'draft') return 'unpublish'
  return operation
}

/** Hooks that audit every create/update/delete of a collection. */
export function auditHooks(slug: string): {
  afterChange: CollectionAfterChangeHook
  afterDelete: CollectionAfterDeleteHook
} {
  return {
    afterChange: async ({ doc, previousDoc, operation, req, context }) => {
      if (context?.skipAudit || context?.autosave) return doc
      const before = operation === 'update' ? (previousDoc as Record<string, unknown>) : undefined
      await writeAudit(req, {
        action: classify(operation, before, doc as Record<string, unknown>),
        targetCollection: slug,
        targetId: doc.id,
        summary: req.context?.selfPasswordChange ? 'Changed own password' : undefined,
        changedFields: changedFields(before, doc as Record<string, unknown>),
      })
      return doc
    },
    afterDelete: async ({ id, req, context, doc }) => {
      if (context?.skipAudit) return doc
      await writeAudit(req, { action: 'delete', targetCollection: slug, targetId: id })
      return doc
    },
  }
}
