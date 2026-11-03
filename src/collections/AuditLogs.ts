import type { CollectionConfig } from 'payload'

import { allow, can, nobody } from '@/access'
import { AUDIT_ACTIONS } from '@/audit/writeAudit'

/** Append-only: nobody can create, edit or delete entries over the API or the admin UI. */
export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  labels: { singular: 'Audit log entry', plural: 'Audit log' },
  admin: {
    group: 'System',
    useAsTitle: 'action',
    defaultColumns: ['createdAt', 'action', 'actorEmail', 'targetCollection', 'targetId'],
    hidden: ({ user }) => !can(user as never, 'audit.read'),
    description: 'Read-only record of sign-ins, publishes, deletions, role changes and downloads.',
  },
  access: {
    read: allow('audit.read'),
    create: nobody,
    update: nobody,
    delete: nobody,
  },
  defaultSort: '-createdAt',
  fields: [
    { name: 'action', type: 'select', required: true, index: true, options: [...AUDIT_ACTIONS] },
    { name: 'actor', type: 'relationship', relationTo: 'users', index: true },
    { name: 'actorEmail', type: 'text' },
    { name: 'targetCollection', type: 'text', index: true },
    { name: 'targetId', type: 'text', index: true },
    { name: 'summary', type: 'text' },
    { name: 'changedFields', type: 'json' },
    { name: 'ip', type: 'text' },
  ],
  timestamps: true,
}
