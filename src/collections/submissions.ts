/**
 * Form submissions. Nobody can create these through the REST API or admin: they are created only
 * by our validated, rate-limited form routes (src/app/(frontend)/api/forms/*) via the Local API.
 */
import path from 'path'
import { fileURLToPath } from 'url'
import type { Access, CollectionAfterChangeHook, CollectionConfig, Field } from 'payload'

import { allow, nobody } from '@/access'
import { can, type Principal } from '@/access/permissions'
import { auditHooks } from '@/audit/writeAudit'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const status = (options: string[]): Field => ({
  name: 'status',
  type: 'select',
  defaultValue: options[0],
  index: true,
  options: options.map((o) => ({ label: o[0].toUpperCase() + o.slice(1), value: o })),
  admin: { position: 'sidebar' },
})

const internal: Field[] = [
  { name: 'notes', type: 'textarea', admin: { position: 'sidebar', description: 'Internal notes (never shown publicly).' } },
  { name: 'consent', type: 'checkbox', admin: { readOnly: true, position: 'sidebar' } },
  { name: 'sourcePage', type: 'text', admin: { readOnly: true, position: 'sidebar' } },
]

/** Submitted fields are read-only in the admin: staff can change status/notes, not the person's data. */
const ro = (f: Field): Field => ({ ...f, admin: { ...(('admin' in f && f.admin) || {}), readOnly: true } }) as Field

function notify(kind: string, summary: (doc: Record<string, unknown>) => string): CollectionAfterChangeHook {
  return async ({ doc, operation, req }) => {
    if (operation !== 'create') return doc
    try {
      const settings = await req.payload.findGlobal({ slug: 'site-settings', req, overrideAccess: true })
      const to = process.env.NOTIFY_EMAIL || settings?.email
      if (to) {
        await req.payload.sendEmail({
          to,
          subject: `New ${kind} on pupsharbour.com`,
          text: `${summary(doc)}\n\nOpen it in the admin: ${process.env.NEXT_PUBLIC_SERVER_URL ?? ''}/admin`,
        })
      }
    } catch (err) {
      req.payload.logger.error({ err }, `Failed to send ${kind} notification`)
    }
    return doc
  }
}

/**
 * Enquiries hold two kinds of submission. Admins see both; recruiters (`hiring.read`) see only
 * employer hiring requirements; business enquiries stay admin-only.
 */
const enquiryAccess: Access = ({ req }) => {
  const user = req.user as Principal
  if (can(user, 'enquiries.read')) return true
  if (can(user, 'hiring.read')) return { type: { equals: 'hiring' } }
  return false
}

const enquiryAudit = auditHooks('enquiries')
export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  labels: { singular: 'Business enquiry', plural: 'Business enquiries' },
  admin: {
    group: 'Submissions',
    useAsTitle: 'companyName',
    defaultColumns: ['createdAt', 'type', 'companyName', 'contactPerson', 'position', 'phone', 'status'],
    hidden: ({ user }) => !can(user as Principal, 'enquiries.read') && !can(user as Principal, 'hiring.read'),
    description: 'Business enquiries (Contact page) and hiring requirements (For Employers page). Filter by Type.',
  },
  defaultSort: '-createdAt',
  access: {
    read: enquiryAccess,
    update: enquiryAccess,
    create: nobody,
    delete: allow('enquiries.manage'),
  },
  hooks: {
    afterChange: [
      enquiryAudit.afterChange,
      notify('enquiry', (d) =>
        d.type === 'hiring'
          ? `Hiring requirement: ${d.position} × ${d.vacancies ?? '?'} at ${d.companyName} (${d.contactPerson}, ${d.phone})`
          : `Business enquiry: ${d.companyName} (${d.contactPerson}, ${d.phone})`,
      ),
    ],
    afterDelete: [enquiryAudit.afterDelete],
  },
  fields: [
    status(['new', 'contacted', 'qualified', 'won', 'lost']),
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'business',
      index: true,
      options: [
        { label: 'Business enquiry', value: 'business' },
        { label: 'Hiring requirement', value: 'hiring' },
      ],
      admin: { position: 'sidebar', readOnly: true },
    },
    ...[
      { name: 'companyName', type: 'text', required: true },
      { name: 'contactPerson', type: 'text', required: true },
      { name: 'designation', type: 'text' },
      { name: 'email', type: 'email', required: true },
      { name: 'phone', type: 'text', required: true },
      { name: 'industry', type: 'text' },
      { name: 'organisationSize', type: 'text' },
      { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
      { name: 'message', label: 'Requirement / message', type: 'textarea' },
      {
        type: 'collapsible',
        label: 'Hiring requirement',
        admin: { condition: (data: Record<string, unknown>) => data?.type === 'hiring' },
        fields: [
          { name: 'position', label: 'Position / job title', type: 'text' },
          { name: 'vacancies', label: 'Number of vacancies', type: 'number' },
          { name: 'location', label: 'Job location', type: 'text' },
          { name: 'experience', label: 'Experience required', type: 'text' },
          { name: 'timeline', label: 'Expected hiring timeline', type: 'text' },
          { name: 'jobDescription', type: 'upload', relationTo: 'job-descriptions' },
        ],
      },
    ].map((f) => ro(f as Field)),
    ...internal,
  ],
  timestamps: true,
}

const applicationAudit = auditHooks('applications')
export const Applications: CollectionConfig = {
  slug: 'applications',
  labels: { singular: 'Job application', plural: 'Job applications' },
  admin: {
    group: 'Submissions',
    useAsTitle: 'fullName',
    defaultColumns: ['createdAt', 'fullName', 'currentDesignation', 'totalExperience', 'status'],
    hidden: ({ user }) => !can(user as Principal, 'applications.read'),
  },
  defaultSort: '-createdAt',
  access: {
    read: allow('applications.read'),
    update: allow('applications.read'),
    create: nobody,
    delete: allow('applications.manage'),
  },
  hooks: {
    afterChange: [applicationAudit.afterChange, notify('job application', (d) => `${d.fullName} (${d.currentDesignation ?? '-'}, ${d.totalExperience ?? '-'})`)],
    afterDelete: [applicationAudit.afterDelete],
  },
  fields: [
    status(['new', 'shortlisted', 'interviewed', 'placed', 'rejected']),
    ...[
      { name: 'fullName', type: 'text', required: true },
      { name: 'phone', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'currentLocation', type: 'text' },
      { name: 'qualification', type: 'text' },
      { name: 'totalExperience', type: 'text' },
      { name: 'currentDesignation', type: 'text' },
      { name: 'preferredLocation', type: 'text' },
      { name: 'expectedCtc', label: 'Expected CTC', type: 'text' },
      { name: 'currentCtc', label: 'Current / last drawn CTC', type: 'text' },
      { name: 'noticePeriod', type: 'text' },
      { name: 'resume', type: 'upload', relationTo: 'resumes' },
    ].map((f) => ro(f as Field)),
    ...internal,
  ],
  timestamps: true,
}

export const Resumes: CollectionConfig = {
  slug: 'resumes',
  admin: {
    group: 'Submissions',
    hidden: ({ user }) => !can(user as Principal, 'applications.read'),
    description: 'Private files. Only staff with access to applications can download them.',
  },
  access: {
    read: allow('applications.read'),
    create: nobody,
    update: nobody,
    delete: allow('applications.manage'),
  },
  upload: {
    // Outside /public and served only through Payload's access-checked file route.
    staticDir: path.resolve(dirname, '../../data/resumes'),
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  fields: [],
}

/** Private job-description files attached to hiring requirements. */
export const JobDescriptions: CollectionConfig = {
  slug: 'job-descriptions',
  labels: { singular: 'Job description file', plural: 'Job description files' },
  admin: {
    group: 'Submissions',
    hidden: ({ user }) => !can(user as Principal, 'enquiries.read') && !can(user as Principal, 'hiring.read'),
    description: 'Private files. Only staff who can see hiring requirements can download them.',
  },
  access: {
    read: ({ req }) => can(req.user as Principal, 'enquiries.read') || can(req.user as Principal, 'hiring.read'),
    create: nobody,
    update: nobody,
    delete: allow('enquiries.manage'),
  },
  upload: {
    staticDir: path.resolve(dirname, '../../data/job-descriptions'),
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  fields: [],
}
