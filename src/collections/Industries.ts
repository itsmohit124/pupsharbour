import type { CollectionConfig } from 'payload'

import { liveContent } from '@/access/content'
import { iconField, orderField, slugField } from '@/fields/common'

export const Industries: CollectionConfig = {
  slug: 'industries',
  admin: { group: 'Website', useAsTitle: 'title', defaultColumns: ['title', 'order'] },
  defaultSort: 'order',
  ...liveContent('industries'),
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    iconField('icon', true),
    orderField,
    { name: 'summary', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Optional photo for the card.' } },
  ],
}
