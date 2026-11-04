import type { GlobalConfig } from 'payload'

import { allow, anyone } from '@/access'
import { hrefField, linkField } from '@/fields/common'
import { revalidateGlobal } from '@/hooks/revalidate'
import { normalizeIndianMobile } from '@/lib/phone'

const phone = (name: string, label: string, required = true, description?: string) => ({
  name,
  label,
  type: 'text' as const,
  required,
  admin: description ? { description } : undefined,
  validate: (v: string | null | undefined) =>
    (!required && !v) || (v && normalizeIndianMobile(v)) ? true : 'Enter a valid Indian mobile number.',
})

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: { group: 'Website settings', description: 'Company name, contact details and WhatsApp.' },
  access: { read: anyone, update: allow('globals.settings') },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'Pups Harbour Consultancy' },
    { name: 'tagline', type: 'text', defaultValue: 'Your Partner in Business Growth' },
    { name: 'strapline', type: 'text', defaultValue: 'Guiding People. Building Futures.' },
    { name: 'pillarsLine', type: 'text', defaultValue: 'Brand · Marketing · HR · Strategy' },
    phone('phone', 'Main phone', true, 'Shown in the header area, footer and contact page.'),
    phone('whatsapp', 'WhatsApp number', true, 'Used by every WhatsApp button on the site.'),
    phone('businessPhone', 'Business enquiries phone', false, 'For employers and business clients (Contact page, For Employers).'),
    phone('recruitmentPhone', 'Recruitment / candidates phone', false, 'For job seekers (Careers and Contact pages).'),
    {
      name: 'whatsappMessage',
      type: 'text',
      defaultValue: 'Hello Pups Harbour, I would like to know more about your services.',
    },
    { name: 'email', type: 'email', required: true },
    { name: 'hours', type: 'text', defaultValue: 'Monday – Friday, 9:00 AM – 6:00 PM' },
    { name: 'location', type: 'text', defaultValue: 'Gujarat, India' },
    { name: 'website', type: 'text', defaultValue: 'www.pupsharbour.com' },
    { name: 'foundedYear', type: 'number', defaultValue: 2021, admin: { description: 'Shown as "Since 2021".' } },
    { name: 'linkedin', type: 'text', admin: { description: 'Full https:// URL of the LinkedIn page.' } },
  ],
}

export const Header: GlobalConfig = {
  slug: 'header',
  admin: { group: 'Website settings', description: 'Main menu and header buttons.' },
  access: { read: anyone, update: allow('globals.layout') },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'nav',
      label: 'Menu',
      type: 'array',
      fields: [
        { type: 'row', fields: [{ name: 'label', type: 'text', required: true }, hrefField()] },
        {
          type: 'row',
          fields: [
            {
              name: 'dropdown',
              type: 'select',
              defaultValue: 'none',
              options: [
                { label: 'No dropdown', value: 'none' },
                { label: 'Services (automatic)', value: 'services' },
              ],
            },
            {
              name: 'hideWhenEmpty',
              type: 'select',
              defaultValue: 'never',
              options: [
                { label: 'Always show', value: 'never' },
                { label: 'Hide while no Insights are published', value: 'insights' },
              ],
            },
          ],
        },
      ],
    },
    linkField('secondaryCta', 'Outline button'),
    linkField('primaryCta', 'Gold button'),
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: { group: 'Website settings', description: 'Footer text and links. Services are listed automatically.' },
  access: { read: anyone, update: allow('globals.layout') },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: 'about', type: 'textarea' },
    {
      name: 'quickLinks',
      type: 'array',
      fields: [{ type: 'row', fields: [{ name: 'label', type: 'text', required: true }, hrefField()] }],
    },
    {
      name: 'legalLinks',
      type: 'array',
      fields: [{ type: 'row', fields: [{ name: 'label', type: 'text', required: true }, hrefField()] }],
    },
    { name: 'closingLine', type: 'text' },
  ],
}
