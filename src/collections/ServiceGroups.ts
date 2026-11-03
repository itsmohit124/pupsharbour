import type { CollectionConfig } from 'payload'

import { liveContent } from '@/access/content'
import { iconField, orderField, slugField } from '@/fields/common'

export const ServiceGroups: CollectionConfig = {
  slug: 'service-groups',
  labels: { singular: 'Service group', plural: 'Service groups' },
  admin: { group: 'Website', useAsTitle: 'title', defaultColumns: ['title', 'order'] },
  defaultSort: 'order',
  ...liveContent('service-groups'),
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    { name: 'summary', type: 'textarea', required: true },
    iconField('icon', true),
    orderField,
    { name: 'services', type: 'join', collection: 'services', on: 'group', defaultSort: 'order' },
  ],
}
