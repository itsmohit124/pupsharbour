import type { CollectionConfig } from 'payload'

import { draftContent } from '@/access/content'
import { ALL_BLOCKS } from '@/blocks/configs'
import { slugField } from '@/fields/common'

const RESERVED = ['admin', 'api', 'preview', 'media', 'brand', '_next']

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    group: 'Website',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description: 'Each page is a stack of sections. Add, reorder, hide or remove sections and edit every item inside them.',
    preview: (doc) => `/api/preview?path=${encodeURIComponent(doc.slug === 'home' ? '/' : `/${doc.slug}`)}`,
  },
  ...draftContent('pages', { autosave: true }),
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      ...slugField('title'),
      validate: (v: string | null | undefined) => {
        if (!v || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v)) return 'Lowercase letters, numbers and dashes only.'
        if (RESERVED.includes(v)) return `"${v}" is reserved.`
        return true
      },
      admin: { position: 'sidebar', description: 'URL: /<slug>. Use "home" for the homepage.' },
    } as never,
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Sections',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: ALL_BLOCKS,
              admin: { initCollapsed: true },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'meta',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', maxLength: 90, admin: { description: 'Shown in Google results and the browser tab. Aim for 50–65 characters.' } },
                { name: 'description', type: 'textarea', maxLength: 300, admin: { description: 'Shown under the title in Google results. Aim for 120–160 characters.' } },
                { name: 'image', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
