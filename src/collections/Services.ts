import type { CollectionConfig } from 'payload'

import { draftContent } from '@/access/content'
import { iconField, orderField, slugField } from '@/fields/common'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    group: 'Website',
    useAsTitle: 'title',
    defaultColumns: ['title', 'group', 'flagship', 'order', '_status'],
    preview: (doc) => `/api/preview?path=${encodeURIComponent(`/services/${doc.slug}`)}`,
  },
  defaultSort: 'order',
  ...draftContent('services'),
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'shortTitle', type: 'text', admin: { description: 'Used in menus and the footer.' } },
    slugField('title'),
    { name: 'group', type: 'relationship', relationTo: 'service-groups', required: true, index: true },
    { name: 'flagship', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    iconField('icon', true),
    orderField,
    { name: 'summary', type: 'textarea', required: true },
    {
      name: 'items',
      label: 'Our services include',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'focus', label: 'Our focus', type: 'textarea' },
    { name: 'disclaimer', type: 'textarea' },
  ],
}
