import { RichText } from '@payloadcms/richtext-lexical/react'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getInsight } from '@/lib/data'
import type { Media } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }
export const revalidate = 3600

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getInsight((await params).slug)
  return p ? { title: p.title, description: p.summary, alternates: { canonical: `/insights/${p.slug}` } } : {}
}

export default async function InsightPage({ params }: Props) {
  const post = await getInsight((await params).slug)
  if (!post) notFound()
  const cover = typeof post.cover === 'object' ? (post.cover as Media | null) : null
  return (
    <article>
      <header className="bg-plum-950 text-white">
        <div className="container-x max-w-4xl py-16">
          <Link href="/insights" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white">
            <ArrowLeft aria-hidden className="size-4" /> All insights
          </Link>
          <p className="mt-6 text-sm font-semibold text-gold-400">
            {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight font-semibold sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg text-white/80">{post.summary}</p>
        </div>
      </header>
      <div className="container-x max-w-3xl py-14">
        {cover?.url && <Image src={cover.url} alt={cover.alt ?? ''} width={cover.width ?? 1200} height={cover.height ?? 675} className="mb-10 w-full rounded-2xl" />}
        <div className="prose-ph space-y-4 text-lg leading-relaxed text-ink [&_a]:text-plum-800 [&_a]:underline [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-plum-900 [&_li]:ml-5 [&_ol]:list-decimal [&_ul]:list-disc">
          <RichText data={post.body} />
        </div>
        {post.sourceUrl && (
          <p className="mt-10 text-sm text-muted">
            Originally shared on{' '}
            <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-plum-800 underline">
              LinkedIn
            </a>
            .
          </p>
        )}
      </div>
    </article>
  )
}
