import type { CollectionConfig } from 'payload'

import { allow, anyone } from '@/access'
import { auditHooks } from '@/audit/writeAudit'

const audit = auditHooks('media')

/** Public images (logos, team photos, illustrations). Resumes live in a separate private collection. */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Website' },
  access: {
    read: anyone,
    create: allow('media.upload'),
    update: allow('media.upload'),
    delete: allow('media.delete'),
  },
  hooks: { afterChange: [audit.afterChange], afterDelete: [audit.afterDelete] },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Describe the image for screen readers and SEO.' },
    },
  ],
  upload: {
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/svg+xml'],
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 768 },
      { name: 'hero', width: 1920 },
    ],
    adminThumbnail: 'thumbnail',
  },
}
