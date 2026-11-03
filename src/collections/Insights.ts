import type { CollectionConfig } from 'payload'

import { draftContent } from '@/access/content'
import { slugField } from '@/fields/common'

export const Insights: CollectionConfig = {
  slug: 'insights',
  labels: { singular: 'Insight article', plural: 'Insights' },
  admin: {
    group: 'Website',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    preview: (doc) => `/api/preview?path=${encodeURIComponent(`/insights/${doc.slug}`)}`,
  },
  defaultSort: '-publishedAt',
  ...draftContent('insights'),
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'hr',
      options: [
        { label: 'HR & People', value: 'hr' },
        { label: 'Compliance & Labour Law', value: 'compliance' },
        { label: 'Recruitment', value: 'recruitment' },
        { label: 'Business Growth', value: 'business' },
      ],
    },
    { name: 'publishedAt', type: 'date', required: true, admin: { position: 'sidebar' } },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'body', type: 'richText', required: true },
    { name: 'sourceUrl', type: 'text', admin: { description: 'Optional original post (e.g. LinkedIn).' } },
  ],
}
