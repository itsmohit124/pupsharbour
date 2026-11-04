/**
 * Access + hooks shared by every website-content collection, derived from the permission matrix.
 *
 * - Draft-enabled collections (Pages, Services, Insights): contributors may save drafts, editors+
 *   may publish, only admins may delete or restore old versions.
 * - Live collections without drafts (service groups, industries, testimonials): any change is
 *   immediately public, so it needs `content.publish`.
 */
import { APIError, type CollectionBeforeOperationHook, type CollectionConfig } from 'payload'

import { allow, anyone, draftOrPublish, publishedOrDrafter } from '@/access'
import { can, type Principal } from '@/access/permissions'
import { auditHooks } from '@/audit/writeAudit'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

/** Remember autosave writes so audit + cache purge only run on real saves/publishes. */
const markAutosave: CollectionBeforeOperationHook = ({ args, req }) => {
  if ((args as { autosave?: boolean })?.autosave) req.context.autosave = true
  return args
}

const restoreNeedsDelete: CollectionBeforeOperationHook = ({ operation, req, args }) => {
  if (operation === 'restoreVersion' && !can(req.user as Principal, 'content.delete')) {
    throw new APIError('Only admins can restore previous versions.', 403, undefined, true)
  }
  return args
}

type Parts = Pick<CollectionConfig, 'access' | 'hooks' | 'versions'>

export function draftContent(slug: string, { autosave = false } = {}): Parts {
  const audit = auditHooks(slug)
  return {
    // Autosave keeps Live Preview in sync while typing; publishing is still an explicit action.
    versions: { drafts: { autosave: autosave ? { interval: 800 } : false }, maxPerDoc: 50 },
    access: {
      read: publishedOrDrafter,
      readVersions: allow('content.draft'),
      create: draftOrPublish,
      update: draftOrPublish,
      delete: allow('content.delete'),
    },
    hooks: {
      beforeOperation: [markAutosave, restoreNeedsDelete],
      afterChange: [audit.afterChange, revalidateAfterChange],
      afterDelete: [audit.afterDelete, revalidateAfterDelete],
    },
  }
}

export function liveContent(slug: string): Parts {
  const audit = auditHooks(slug)
  return {
    access: {
      read: anyone,
      create: allow('content.publish'),
      update: allow('content.publish'),
      delete: allow('content.delete'),
    },
    hooks: {
      afterChange: [audit.afterChange, revalidateAfterChange],
      afterDelete: [audit.afterDelete, revalidateAfterDelete],
    },
  }
}
