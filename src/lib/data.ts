import 'server-only'

import config from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import type {
  Footer,
  Header,
  Industry,
  Insight,
  Page,
  Service,
  ServiceGroup,
  SiteSetting,
  Testimonial,
} from '@/payload-types'

export const payloadClient = cache(async () => getPayload({ config }))

/** Draft content is only ever fetched when an authorised editor enabled preview (see /api/preview). */
export const isDraft = cache(async () => (await draftMode()).isEnabled)

export type ServiceGroupWithServices = ServiceGroup & { items: Service[] }

export type SiteData = {
  settings: SiteSetting
  header: Header
  footer: Footer
  groups: ServiceGroupWithServices[]
  services: Service[]
  industries: Industry[]
  testimonials: Testimonial[]
  insightsCount: number
}

export const getSiteData = cache(async (): Promise<SiteData> => {
  const payload = await payloadClient()
  const draft = await isDraft()
  const [settings, header, footer, groups, services, industries, testimonials, insights] =
    await Promise.all([
      payload.findGlobal({ slug: 'site-settings', depth: 0 }),
      payload.findGlobal({ slug: 'header', depth: 0 }),
      payload.findGlobal({ slug: 'footer', depth: 0 }),
      payload.find({ collection: 'service-groups', sort: 'order', limit: 50, depth: 0 }),
      payload.find({ collection: 'services', sort: 'order', limit: 100, depth: 0, draft, overrideAccess: draft }),
      payload.find({ collection: 'industries', sort: 'order', limit: 50, depth: 1 }),
      payload.find({ collection: 'testimonials', sort: 'order', limit: 50, depth: 1 }),
      payload.count({ collection: 'insights', where: { _status: { equals: 'published' } } }),
    ])

  const groupId = (s: Service) => (typeof s.group === 'object' ? s.group?.id : s.group)
  return {
    settings,
    header,
    footer,
    services: services.docs,
    groups: groups.docs.map((g) => ({ ...g, items: services.docs.filter((s) => groupId(s) === g.id) })),
    industries: industries.docs,
    testimonials: testimonials.docs,
    insightsCount: insights.totalDocs,
  }
})

export const getPage = cache(async (slug: string): Promise<Page | null> => {
  const payload = await payloadClient()
  const draft = await isDraft()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft,
    overrideAccess: draft,
  })
  return docs[0] ?? null
})

export const getService = cache(async (slug: string): Promise<Service | null> => {
  const payload = await payloadClient()
  const draft = await isDraft()
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    draft,
    overrideAccess: draft,
  })
  return docs[0] ?? null
})

export const getInsights = cache(async (limit = 50): Promise<Insight[]> => {
  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'insights',
    sort: '-publishedAt',
    limit,
    depth: 1,
    where: { _status: { equals: 'published' } },
  })
  return docs
})

export const getInsight = cache(async (slug: string): Promise<Insight | null> => {
  const payload = await payloadClient()
  const draft = await isDraft()
  const { docs } = await payload.find({
    collection: 'insights',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    draft,
    overrideAccess: draft,
  })
  return docs[0] ?? null
})

/** Phone numbers from Site settings, by role, as display text + tel: link. */
export function phoneFor(settings: SiteSetting, which: 'main' | 'business' | 'recruitment' | 'none' | null | undefined) {
  const value =
    which === 'business' ? settings.businessPhone : which === 'recruitment' ? settings.recruitmentPhone : which === 'main' ? settings.phone : null
  return value ? { label: value, href: `tel:${value.replace(/[^\d+]/g, '')}` } : null
}

export const whatsappHref = (settings: Pick<SiteSetting, 'whatsapp' | 'whatsappMessage'>, text?: string) => {
  const digits = (settings.whatsapp ?? '').replace(/\D/g, '').replace(/^0/, '')
  const number = digits.length === 10 ? `91${digits}` : digits
  const msg = text ?? settings.whatsappMessage ?? ''
  return `https://wa.me/${number}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`
}
