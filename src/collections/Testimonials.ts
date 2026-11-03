import type { CollectionConfig } from 'payload'

import { liveContent } from '@/access/content'
import { orderField } from '@/fields/common'

/** Real client quotes only. The Testimonials section hides itself while this is empty. */
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { group: 'Website', useAsTitle: 'name', defaultColumns: ['name', 'company', 'order'] },
  defaultSort: 'order',
  ...liveContent('testimonials'),
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'name', type: 'text', required: true },
    { name: 'designation', type: 'text' },
    { name: 'company', type: 'text' },
    { name: 'outcome', type: 'text', admin: { description: 'Measurable result, e.g. "Hiring time cut by 40%".' } },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    orderField,
  ],
}
