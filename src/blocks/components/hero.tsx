import { CirclePlay } from 'lucide-react'
import Image from 'next/image'

import { LighthouseScene } from '@/components/illustrations/LighthouseScene'
import { CmsButton } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { mediaOf } from '@/lib/media'
import type { HeroBlock, PageHeaderBlock, StatsBlock } from '@/payload-types'

export function Hero({ block }: { block: HeroBlock }) {
  const image = mediaOf(block.image)
  return (
    <section
      id={block.settings?.anchorId || undefined}
      className="relative overflow-hidden bg-plum-950 text-white"
    >
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,var(--color-plum-700),transparent_55%),radial-gradient(ellipse_at_90%_80%,var(--color-plum-800),transparent_50%)]" />
      <div className="container-x relative grid items-center gap-10 pt-12 pb-10 lg:grid-cols-2 lg:pt-16 lg:pb-14">
        <div>
          {block.eyebrow && <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-gold-400 uppercase">{block.eyebrow}</p>}
          <h1 className="font-display text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl xl:text-6xl">
            {block.heading}
            {block.highlight && (
              <>
                {' '}
                <em className="text-gold-400 italic">{block.highlight}</em>
              </>
            )}
          </h1>
          {block.intro && <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{block.intro}</p>}
          {block.body && <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">{block.body}</p>}
          <div className="mt-8 flex flex-wrap gap-4">
            <CmsButton link={block.primaryCta} arrow className="px-6 py-3.5 text-base" />
            <CmsButton
              link={block.secondaryCta}
              variant="outlineLight"
              icon={<CirclePlay aria-hidden className="size-5" />}
              className="px-6 py-3.5 text-base"
            />
          </div>
          {!!block.highlights?.length && (
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-white/15">
              {block.highlights.map((h) => (
                <li key={h.id ?? h.title} className="flex flex-col items-center gap-2 text-center text-sm font-medium text-white/90">
                  <Icon name={h.icon} className="size-8 text-gold-400" />
                  {h.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative">
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt ?? ''}
              width={image.width ?? 1200}
              height={image.height ?? 900}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl"
            />
          ) : (
            <div className="overflow-hidden rounded-3xl ring-1 ring-white/10">
              <LighthouseScene waypoints={(block.waypoints ?? []).map((w) => ({ label: w.label, icon: w.icon }))} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function PageHeader({ block }: { block: PageHeaderBlock }) {
  return (
    <section id={block.settings?.anchorId || undefined} className="relative overflow-hidden bg-plum-950 text-white">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,var(--color-plum-700),transparent_55%)]" />
      <svg aria-hidden viewBox="0 0 400 200" className="absolute -right-10 -bottom-6 h-48 opacity-20 sm:h-64">
        <path d="M250 200 L262 40 L290 40 L302 200Z" fill="#faf6fb" />
        <rect x="258" y="20" width="36" height="22" fill="#f4c04a" />
        <path d="M276 30 L20 0 L20 70Z" fill="#f4c04a" opacity="0.5" />
      </svg>
      <div className="container-x relative py-16 sm:py-20">
        {block.breadcrumb && <p className="mb-3 text-sm text-white/60">Home / {block.breadcrumb}</p>}
        {block.eyebrow && <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-gold-400 uppercase">{block.eyebrow}</p>}
        <h1 className="max-w-4xl font-display text-4xl leading-tight font-semibold sm:text-5xl">
          {block.heading}
          {block.highlight && (
            <>
              {' '}
              <em className="text-gold-400 italic">{block.highlight}</em>
            </>
          )}
        </h1>
        <span aria-hidden className="mt-5 block h-1 w-16 rounded-full bg-gold-500" />
        {block.intro && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/80">{block.intro}</p>}
      </div>
    </section>
  )
}

export function Stats({ block }: { block: StatsBlock }) {
  return (
    <section id={block.settings?.anchorId || undefined} className="relative z-10 bg-white">
      <div className="container-x">
        <ul className="-mt-px grid grid-cols-2 gap-y-6 border-b border-plum-100 py-8 lg:grid-cols-4 lg:divide-x lg:divide-plum-100">
          {(block.items ?? []).map((s) => (
            <li key={s.id ?? s.label} className="flex items-center justify-center gap-3 px-4">
              <Icon name={s.icon} className="size-9 shrink-0 text-plum-800" />
              <div>
                <p className="font-display text-2xl font-bold text-plum-900 sm:text-3xl">{s.value}</p>
                <p className="text-sm text-muted">{s.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
