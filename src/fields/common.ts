import type { Field } from 'payload'

import { ICON_OPTIONS } from '@/lib/icons'

export const iconField = (name = 'icon', required = false): Field => ({
  name,
  type: 'select',
  options: ICON_OPTIONS,
  required,
  admin: { description: 'Pick from the curated icon set.' },
})

/** Internal path ("/contact#enquiry") or full https URL. Rejects javascript:/data: and other schemes. */
export const isSafeHref = (v: string) =>
  /^\/(?!\/)/.test(v) || /^#[\w-]+$/.test(v) || /^https:\/\/[^\s]+$/.test(v) ||
  /^mailto:[^\s]+$/.test(v) || /^tel:\+?[\d\s-]+$/.test(v)

export const hrefField = (name = 'href', required = true): Field => ({
  name,
  type: 'text',
  required,
  validate: (value: string | null | undefined) =>
    (!required && !value) || (value && isSafeHref(value))
      ? true
      : 'Use a site path like /contact, an #anchor, https://, mailto: or tel: link.',
})

export const linkField = (name: string, label: string, required = false): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    { name: 'label', type: 'text', required },
    hrefField('href', required),
  ],
})

export const slugField = (from = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: { position: 'sidebar', description: `URL segment. Auto-filled from the ${from}.` },
  validate: (v: string | null | undefined) =>
    !!v && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v) ? true : 'Lowercase letters, numbers and dashes only.',
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (value) return value
        const source = (data as Record<string, unknown> | undefined)?.[from]
        return typeof source === 'string' ? slugify(source) : value
      },
    ],
  },
})

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/°/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const orderField: Field = {
  name: 'order',
  type: 'number',
  defaultValue: 0,
  admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
}

/** Optional background photo for a card. The card switches to white text over a dark overlay. */
export const cardImageField = (name = 'image'): Field => ({
  name,
  label: 'Background image',
  type: 'upload',
  relationTo: 'media',
  admin: { description: 'Optional background photo for this card. Text turns white over a dark overlay so it stays readable.' },
})
