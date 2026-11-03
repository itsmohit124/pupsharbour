import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/blocks/registry'
import { getPage, getSiteData, payloadClient } from '@/lib/data'
import type { Media } from '@/payload-types'

type Props = { params: Promise<{ slug?: string[] }> }

const toSlug = (parts?: string[]) => (parts?.length ? parts.join('/') : 'home')

export const revalidate = 3600 // safety net; content changes purge the cache immediately

export async function generateStaticParams() {
  try {
    const payload = await payloadClient()
    const { docs } = await payload.find({ collection: 'pages', limit: 100, depth: 0, select: { slug: true } })
    return docs.map((d) => ({ slug: d.slug === 'home' ? [] : [d.slug] }))
  } catch {
    return [] // e.g. build without a reachable database: pages render on first request instead
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPage(toSlug((await params).slug))
  if (!page) return {}
  const image = typeof page.meta?.image === 'object' ? (page.meta.image as Media | null) : null
  return {
    title: page.slug === 'home' ? { absolute: page.meta?.title || page.title } : page.meta?.title || page.title,
    description: page.meta?.description || undefined,
    alternates: { canonical: page.slug === 'home' ? '/' : `/${page.slug}` },
    openGraph: image?.url ? { images: [image.url] } : undefined,
  }
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params
  if (slug && slug.length > 1) notFound()
  const [page, ctx] = await Promise.all([getPage(toSlug(slug)), getSiteData()])
  if (!page) notFound()
  return <RenderBlocks layout={page.layout} ctx={ctx} />
}
