import type { MetadataRoute } from 'next'

import { payloadClient } from '@/lib/data'

const SITE = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await payloadClient()
  const published = { _status: { equals: 'published' } } as const
  const [pages, services, insights] = await Promise.all([
    payload.find({ collection: 'pages', where: published, limit: 200, depth: 0, select: { slug: true, updatedAt: true } }),
    payload.find({ collection: 'services', where: published, limit: 200, depth: 0, select: { slug: true, updatedAt: true } }),
    payload.find({ collection: 'insights', where: published, limit: 500, depth: 0, select: { slug: true, updatedAt: true } }),
  ])
  return [
    ...pages.docs.map((p) => ({ url: `${SITE}${p.slug === 'home' ? '' : `/${p.slug}`}`, lastModified: p.updatedAt, priority: p.slug === 'home' ? 1 : 0.8 })),
    ...services.docs.map((s) => ({ url: `${SITE}/services/${s.slug}`, lastModified: s.updatedAt, priority: 0.7 })),
    ...insights.docs.map((i) => ({ url: `${SITE}/insights/${i.slug}`, lastModified: i.updatedAt, priority: 0.5 })),
  ]
}
