/**
 * Section ("block") schemas. Each slug here MUST have exactly one renderer in
 * `src/blocks/registry.tsx` (enforced by tests/unit/blockRegistry.spec.ts).
 *
 * Editors can add, reorder, duplicate, hide or delete sections on a page, and edit/remove any
 * item inside a section, but they cannot change markup or styling: the look comes from the
 * component and the design tokens, so the site stays consistent.
 */
import type { Block, Field } from 'payload'

import { iconField, linkField } from '@/fields/common'

const sectionSettings: Field = {
  name: 'settings',
  type: 'group',
  label: 'Section settings',
  admin: { description: 'Visibility, anchor and background for this section.' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'hidden',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Hide without deleting.', width: '33%' },
        },
        {
          name: 'anchorId',
          type: 'text',
          admin: { description: 'Optional #anchor for links (letters, numbers, dashes).', width: '33%' },
          validate: (v: string | null | undefined) =>
            !v || /^[a-z0-9-]+$/.test(v) ? true : 'Lowercase letters, numbers and dashes only.',
        },
        {
          name: 'theme',
          type: 'select',
          defaultValue: 'light',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Soft tint', value: 'soft' },
            { label: 'Dark plum', value: 'dark' },
          ],
          admin: { width: '33%' },
        },
      ],
    },
  ],
}

const heading = (required = true): Field[] => [
  { name: 'eyebrow', type: 'text', admin: { description: 'Small uppercase label shown above the headline.' } },
  { name: 'heading', type: 'text', required, admin: { description: 'Main headline of this section.' } },
  {
    name: 'highlight',
    type: 'text',
    admin: { description: 'Words shown in gold italics right after the headline (optional).' },
  },
  { name: 'intro', type: 'textarea', admin: { description: 'Paragraph directly under the headline.' } },
]

/** Data field names (incl. nested array/group fields), so the admin guide lists only what this block has. */
function fieldNames(fields: Field[]): string[] {
  return fields.flatMap((f) => {
    const own = 'name' in f && f.name && f.type !== 'ui' ? [f.name] : []
    const nested = 'fields' in f && Array.isArray(f.fields) ? fieldNames(f.fields as Field[]) : []
    return [...own, ...nested]
  })
}

const block = (slug: string, label: string, fields: Field[], plural?: string): Block => ({
  slug,
  labels: { singular: label, plural: plural ?? `${label} sections` },
  interfaceName: `${slug[0].toUpperCase()}${slug.slice(1)}Block`,
  admin: {
    // Collapsed row shows the section type, its live headline, item count and Hidden badge.
    components: { Label: { path: '/components/admin/SectionRowLabel#SectionRowLabel', clientProps: { blockSlug: slug } } },
    // Real screenshot of this section, shown in the "Add section" picker.
    images: { thumbnail: { url: `/admin-guide/sections/${slug}.png`, alt: `${label} section preview` } },
  },
  fields: [
    {
      // "About this section": preview image + where every field appears on the site.
      name: 'sectionGuide',
      type: 'ui',
      admin: {
        components: {
          Field: {
            path: '/components/admin/SectionGuide#SectionGuide',
            clientProps: { blockSlug: slug, fieldNames: [...new Set(fieldNames([...fields, sectionSettings]))] },
          },
        },
      },
    },
    ...fields,
    sectionSettings,
  ],
})

const iconItems = (name: string, label: string, withDescription = true): Field => ({
  name,
  label,
  type: 'array',
  admin: { initCollapsed: true },
  fields: [
    {
      type: 'row',
      fields: [iconField(), { name: 'title', type: 'text', required: true }],
    },
    ...(withDescription ? [{ name: 'description', type: 'textarea' } as Field] : []),
  ],
})

export const Hero = block('hero', 'Hero', [
  ...heading(),
  { name: 'body', type: 'textarea' },
  linkField('primaryCta', 'Primary button'),
  linkField('secondaryCta', 'Secondary button'),
  {
    name: 'waypoints',
    type: 'array',
    maxRows: 6,
    admin: { description: 'Labels along the lighthouse light-path.', initCollapsed: true },
    fields: [{ type: 'row', fields: [iconField(), { name: 'label', type: 'text', required: true }] }],
  },
  iconItems('highlights', 'Highlights (icon row)', false),
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    admin: { description: 'Optional photo. Without one, the lighthouse illustration is shown.' },
  },
])

export const PageHeader = block('pageHeader', 'Page header', [
  ...heading(),
  {
    name: 'breadcrumb',
    type: 'text',
    admin: { description: 'Shown above the title, e.g. "About Us".' },
  },
])

export const Stats = block('stats', 'Stats bar', [
  {
    name: 'items',
    type: 'array',
    minRows: 1,
    maxRows: 6,
    fields: [
      {
        type: 'row',
        fields: [
          iconField(),
          { name: 'value', type: 'text', required: true },
          { name: 'label', type: 'text', required: true },
        ],
      },
    ],
  },
])

export const RichContent = block('richContent', 'Text', [
  ...heading(),
  {
    name: 'paragraphs',
    type: 'array',
    admin: { initCollapsed: false },
    fields: [{ name: 'text', type: 'textarea', required: true }],
  },
  {
    name: 'bullets',
    type: 'array',
    fields: [{ name: 'text', type: 'text', required: true }],
  },
  { name: 'closing', type: 'text', admin: { description: 'Emphasised closing line.' } },
  {
    name: 'layout',
    type: 'select',
    defaultValue: 'centered',
    options: [
      { label: 'Centred', value: 'centered' },
      { label: 'Heading left, text right', value: 'split' },
    ],
  },
])

export const Pillars = block('pillars', 'Pillars', [
  ...heading(),
  {
    name: 'items',
    label: 'Pillars',
    type: 'array',
    admin: { initCollapsed: true },
    fields: [
      { type: 'row', fields: [iconField(), { name: 'title', type: 'text', required: true }] },
      { name: 'description', type: 'textarea' },
      {
        name: 'bullets',
        label: 'Focus areas (optional)',
        type: 'array',
        fields: [{ name: 'text', type: 'text', required: true }],
      },
    ],
  },
])

export const AudienceSplit = block('audienceSplit', 'Audience choice (Employer / Job seeker)', [
  ...heading(false),
  {
    name: 'cards',
    type: 'array',
    minRows: 1,
    maxRows: 3,
    fields: [
      { type: 'row', fields: [iconField(), { name: 'eyebrow', type: 'text' }, { name: 'title', type: 'text', required: true }] },
      { name: 'text', type: 'textarea' },
      {
        name: 'bullets',
        type: 'array',
        fields: [{ name: 'text', type: 'text', required: true }],
      },
      {
        name: 'phone',
        type: 'select',
        defaultValue: 'none',
        admin: { description: 'Show one of the phone numbers from Site settings on this card.' },
        options: [
          { label: 'No phone', value: 'none' },
          { label: 'Main phone', value: 'main' },
          { label: 'Business enquiries phone', value: 'business' },
          { label: 'Recruitment phone', value: 'recruitment' },
        ],
      },
      linkField('cta', 'Button'),
    ],
  },
])

export const Features = block('features', 'Feature grid', [
  ...heading(),
  iconItems('items', 'Features'),
  {
    name: 'columns',
    type: 'select',
    defaultValue: '3',
    options: ['2', '3', '4'].map((v) => ({ label: `${v} columns`, value: v })),
  },
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'cards',
    options: [
      { label: 'Cards', value: 'cards' },
      { label: 'Plain (heading on the left)', value: 'aside' },
    ],
  },
])

export const ServiceEcosystem = block('serviceEcosystem', 'Service ecosystem', [
  ...heading(),
  { name: 'centerLabel', type: 'text', defaultValue: 'End-to-End People Solutions' },
  {
    name: 'showServices',
    type: 'checkbox',
    defaultValue: false,
    admin: { description: 'List the services under each group.' },
  },
  linkField('cta', 'Button'),
])

export const ServicesDetail = block('servicesDetail', 'All services (detailed)', [...heading(false)])

export const Process = block('process', 'Process steps', [
  ...heading(),
  {
    name: 'steps',
    type: 'array',
    minRows: 1,
    fields: [
      { type: 'row', fields: [iconField(), { name: 'title', type: 'text', required: true }, { name: 'subtitle', type: 'text' }] },
      { name: 'description', type: 'textarea' },
      { name: 'activities', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    ],
  },
  { name: 'showActivities', type: 'checkbox', defaultValue: false },
  linkField('cta', 'Button'),
])

export const Packages = block('packages', 'Engagement packages', [
  ...heading(),
  {
    name: 'tiers',
    type: 'array',
    minRows: 1,
    maxRows: 4,
    fields: [
      { type: 'row', fields: [{ name: 'name', type: 'text', required: true }, { name: 'subtitle', type: 'text' }] },
      { name: 'description', type: 'textarea' },
      { name: 'includesPrevious', type: 'text', admin: { description: 'e.g. "Everything in Basic, plus:"' } },
      { name: 'items', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
      { name: 'featured', type: 'checkbox', defaultValue: false },
    ],
  },
  { name: 'note', type: 'text' },
  linkField('cta', 'Button'),
])

export const List = block('list', 'Simple list', [
  ...heading(),
  { name: 'items', type: 'array', fields: [iconField(), { name: 'text', type: 'text', required: true }] },
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'checks',
    options: [
      { label: 'Check list', value: 'checks' },
      { label: 'Chips', value: 'chips' },
      { label: 'Icon tiles', value: 'tiles' },
    ],
  },
])

export const VisionMission = block('visionMission', 'Vision & mission', [
  { name: 'visionHeading', type: 'text', defaultValue: 'Our Vision' },
  { name: 'vision', type: 'textarea', required: true },
  { name: 'missionHeading', type: 'text', defaultValue: 'Our Mission' },
  { name: 'mission', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
])

export const Industries = block('industries', 'Industries', [
  ...heading(),
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'strip',
    options: [
      { label: 'Image strip', value: 'strip' },
      { label: 'Detailed cards', value: 'detailed' },
    ],
  },
  linkField('cta', 'Button'),
])

export const LiveDemo = block('liveDemo', 'Live demo', [
  ...heading(),
  {
    name: 'modules',
    type: 'array',
    fields: [{ type: 'row', fields: [iconField(), { name: 'label', type: 'text', required: true }] }],
  },
  linkField('cta', 'Button'),
])

export const Testimonials = block('testimonials', 'Testimonials', [
  ...heading(),
  {
    name: 'note',
    type: 'text',
    admin: { description: 'This section hides itself while no testimonials are published.' },
  },
])

export const InsightsList = block('insightsList', 'Latest insights', [
  ...heading(),
  { name: 'limit', type: 'number', defaultValue: 3, min: 1, max: 12 },
])

export const CTA = block('cta', 'Call to action', [
  ...heading(),
  linkField('primaryCta', 'Primary button'),
  linkField('secondaryCta', 'Secondary button'),
  { name: 'showWhatsApp', type: 'checkbox', defaultValue: true },
])

export const EnquiryForm = block('enquiryForm', 'Business enquiry form', [
  ...heading(),
  { name: 'submitLabel', type: 'text', defaultValue: 'Send Business Enquiry' },
  { name: 'successMessage', type: 'textarea', defaultValue: 'Thank you. Our team will contact you within one business day.' },
])

export const HiringForm = block('hiringForm', 'Employer hiring-requirement form', [
  ...heading(),
  { name: 'submitLabel', type: 'text', defaultValue: 'Submit Hiring Requirement' },
  { name: 'successMessage', type: 'textarea', defaultValue: 'Thank you. Our recruitment team will contact you to understand your hiring needs.' },
])

export const ApplicationForm = block('applicationForm', 'Job-seeker (resume) form', [
  ...heading(),
  { name: 'submitLabel', type: 'text', defaultValue: 'Submit Your Resume' },
  { name: 'note', type: 'text' },
  { name: 'successMessage', type: 'textarea', defaultValue: 'Thank you. Our recruitment team will review your profile and contact you if there is a suitable opportunity.' },
])

export const ContactInfo = block('contactInfo', 'Contact details', [
  ...heading(),
  { name: 'closing', type: 'text' },
])

export const ALL_BLOCKS: Block[] = [
  Hero, PageHeader, Stats, RichContent, Pillars, Features, ServiceEcosystem, ServicesDetail,
  Process, Packages, List, VisionMission, Industries, LiveDemo, Testimonials, InsightsList, CTA,
  EnquiryForm, HiringForm, ApplicationForm, ContactInfo, AudienceSplit,
]

export const BLOCK_SLUGS = ALL_BLOCKS.map((b) => b.slug)
