import clsx from 'clsx'
import { Check } from 'lucide-react'

import { CmsButton } from '@/components/ui/Button'
import { CardBg } from '@/components/ui/CardBg'
import { SectionHeading } from '@/components/ui/Heading'
import { Icon, IconTile } from '@/components/ui/Icon'
import { isDark, Section } from '@/components/ui/Section'
import { mediaOf } from '@/lib/media'
import type {
  FeaturesBlock,
  ListBlock,
  PackagesBlock,
  PillarsBlock,
  ProcessBlock,
  RichContentBlock,
  VisionMissionBlock,
} from '@/payload-types'

export function RichContent({ block }: { block: RichContentBlock }) {
  const dark = isDark(block.settings)
  const split = block.layout === 'split'
  return (
    <Section settings={block.settings}>
      <div className={clsx(split ? 'grid gap-10 lg:grid-cols-12' : 'mx-auto max-w-3xl text-center')}>
        <SectionHeading
          eyebrow={block.eyebrow}
          heading={block.heading}
          highlight={block.highlight}
          intro={block.intro}
          dark={dark}
          align={split ? 'left' : 'center'}
          className={split ? 'lg:col-span-5' : ''}
        />
        <div className={clsx(split ? 'lg:col-span-7' : 'mt-8')}>
          <div className={clsx('space-y-4 text-base leading-relaxed sm:text-lg', dark ? 'text-white/85' : 'text-muted')}>
            {(block.paragraphs ?? []).map((p) => (
              <p key={p.id ?? p.text}>{p.text}</p>
            ))}
          </div>
          {!!block.bullets?.length && (
            <ul className={clsx('mt-6 grid gap-3 text-left', split ? '' : 'sm:grid-cols-2')}>
              {block.bullets.map((b) => (
                <li key={b.id ?? b.text} className="flex gap-3">
                  <Check aria-hidden className="mt-1 size-5 shrink-0 text-gold-500" />
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
          )}
          {block.closing && (
            <p className={clsx('mt-8 font-display text-xl font-semibold italic', dark ? 'text-gold-400' : 'text-plum-800')}>{block.closing}</p>
          )}
        </div>
      </div>
    </Section>
  )
}

export function Pillars({ block }: { block: PillarsBlock }) {
  const darkSection = isDark(block.settings)
  const dark = darkSection
  return (
    <Section settings={block.settings}>
      <SectionHeading
        eyebrow={block.eyebrow}
        heading={block.heading}
        highlight={block.highlight}
        tagline={block.tagline}
        intro={block.intro}
        dark={dark}
        align="center"
      />
      <ol className="mt-12 grid gap-6 md:grid-cols-2">
        {(block.items ?? []).map((p, i) => {
          const img = mediaOf(p.image)
          const dark = darkSection || !!img // white text over a background photo
          return (
            <li
              key={p.id ?? p.title}
              className={clsx(
                'relative flex flex-col overflow-hidden rounded-2xl p-6 transition hover:-translate-y-1 sm:p-8',
                img ? 'bg-plum-900 shadow-card' : dark ? 'bg-white/5 ring-1 ring-white/10' : 'bg-white shadow-card ring-1 ring-plum-100',
              )}
            >
              <CardBg image={img} sizes="(min-width: 768px) 50vw, 100vw" />
              <span className={clsx('absolute top-5 right-6 font-display text-4xl font-bold', dark ? 'text-white/10' : 'text-plum-100')}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="relative flex flex-1 flex-col">
                <IconTile name={p.icon} dark={dark} />
                <h3 className={clsx('mt-5 text-xl font-semibold', dark ? 'text-white' : 'text-plum-900')}>{p.title}</h3>
                {p.tagline && (
                  <p className={clsx('mt-1 text-sm font-semibold', dark ? 'text-gold-400' : 'text-gold-600')}>{p.tagline}</p>
                )}
                {p.description && <p className={clsx('mt-3 text-sm leading-relaxed', dark ? 'text-white/75' : 'text-muted')}>{p.description}</p>}
                {p.bulletsIntro && (
                  <p className={clsx('mt-4 text-sm font-semibold', dark ? 'text-white' : 'text-plum-900')}>{p.bulletsIntro}</p>
                )}
                {!!p.bullets?.length && (
                  <ul className={clsx('space-y-1.5 text-sm', p.bulletsIntro ? 'mt-2' : 'mt-4')}>
                    {p.bullets.map((b) => (
                      <li key={b.id ?? b.text} className={clsx('flex gap-2', dark ? 'text-white/85' : 'text-ink')}>
                        <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-500" />
                        {b.text}
                      </li>
                    ))}
                  </ul>
                )}
                {p.closing && (
                  <div className="mt-auto pt-6">
                    <p
                      className={clsx(
                        'border-t pt-4 font-display text-base font-semibold italic',
                        dark ? 'border-white/10 text-gold-400' : 'border-plum-100 text-plum-800',
                      )}
                    >
                      {p.closing}
                    </p>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}

const cols = { '2': 'sm:grid-cols-2', '3': 'sm:grid-cols-2 lg:grid-cols-3', '4': 'sm:grid-cols-2 lg:grid-cols-4' }

export function Features({ block }: { block: FeaturesBlock }) {
  const dark = isDark(block.settings)
  const aside = block.variant === 'aside'
  const grid = (
    <ul className={clsx('grid gap-6', cols[(block.columns ?? '3') as keyof typeof cols], aside ? '' : 'mt-12')}>
      {(block.items ?? []).map((f) => {
        const img = mediaOf(f.image)
        const onDark = dark || !!img // white text over a background photo
        return (
          <li
            key={f.id ?? f.title}
            className={clsx(
              'relative flex gap-4 overflow-hidden',
              img
                ? 'rounded-2xl bg-plum-900 p-6 shadow-card'
                : aside
                  ? ''
                  : clsx('rounded-2xl p-6', dark ? 'bg-white/5 ring-1 ring-white/10' : 'bg-white shadow-card ring-1 ring-plum-100'),
            )}
          >
            <CardBg image={img} />
            <IconTile name={f.icon} dark={onDark} className="relative" />
            <div className="relative">
              <h3 className={clsx('font-semibold', onDark ? 'text-white' : 'text-plum-900')}>{f.title}</h3>
              {f.description && <p className={clsx('mt-1 text-sm leading-relaxed', onDark ? 'text-white/80' : 'text-muted')}>{f.description}</p>}
            </div>
          </li>
        )
      })}
    </ul>
  )
  return (
    <Section settings={block.settings}>
      {aside ? (
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading eyebrow={block.eyebrow} heading={block.heading} highlight={block.highlight} intro={block.intro} dark={dark} className="lg:col-span-4 lg:border-r lg:border-gold-500/40 lg:pr-8" />
          <div className="lg:col-span-8">{grid}</div>
        </div>
      ) : (
        <>
          <SectionHeading eyebrow={block.eyebrow} heading={block.heading} highlight={block.highlight} intro={block.intro} dark={dark} align="center" />
          {grid}
        </>
      )}
    </Section>
  )
}

export function Process({ block }: { block: ProcessBlock }) {
  const darkSection = isDark(block.settings)
  const dark = darkSection
  const steps = block.steps ?? []
  // 3 per row for 3/6/9 steps, otherwise 4; the connector line never runs past the end of a row.
  const perRow = steps.length % 3 === 0 ? 3 : 4
  return (
    <Section settings={block.settings}>
      <SectionHeading eyebrow={block.eyebrow} heading={block.heading} highlight={block.highlight} intro={block.intro} dark={dark} align="center" />
      <ol className={clsx('mt-12 grid gap-6', perRow === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3')}>
        {steps.map((s, i) => {
          const img = mediaOf(s.image)
          const dark = darkSection || !!img // white text over a background photo
          return (
            <li key={s.id ?? s.title} className="relative">
              {i < steps.length - 1 && (i + 1) % perRow !== 0 && (
                <span aria-hidden className={clsx('absolute top-7 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-5rem)] lg:block', darkSection ? 'bg-gold-400/50' : 'bg-plum-200')} />
              )}
              <div className={clsx('relative flex flex-col items-center overflow-hidden text-center', img && 'rounded-2xl bg-plum-900 p-6 shadow-card')}>
                <CardBg image={img} />
                <span className={clsx('relative flex size-14 items-center justify-center rounded-full ring-4', dark ? 'bg-plum-800 text-gold-400 ring-white/10' : 'bg-plum-100 text-plum-800 ring-white')}>
                  <Icon name={s.icon} />
                </span>
                <p className={clsx('relative mt-4 text-xs font-semibold tracking-widest', dark ? 'text-gold-400' : 'text-gold-600')}>{String(i + 1).padStart(2, '0')}</p>
                <h3 className={clsx('relative mt-1 text-lg font-semibold', dark ? 'text-white' : 'text-plum-900')}>{s.title}</h3>
                {s.subtitle && <p className={clsx('relative text-sm font-medium', dark ? 'text-white/80' : 'text-plum-700')}>{s.subtitle}</p>}
                {s.description && <p className={clsx('relative mt-2 text-sm leading-relaxed', dark ? 'text-white/80' : 'text-muted')}>{s.description}</p>}
              </div>
              {block.showActivities && !!s.activities?.length && (
                <ul className={clsx('mt-5 space-y-2 rounded-xl p-4 text-sm', darkSection ? 'bg-white/5' : 'bg-plum-50')}>
                  {s.activities.map((a) => (
                    <li key={a.id ?? a.text} className="flex gap-2">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-500" />
                      {a.text}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ol>
      {block.cta?.label && (
        <div className="mt-10 text-center">
          <CmsButton link={block.cta} variant={dark ? 'gold' : 'plum'} arrow />
        </div>
      )}
    </Section>
  )
}

export function Packages({ block }: { block: PackagesBlock }) {
  const dark = isDark(block.settings)
  return (
    <Section settings={block.settings}>
      <SectionHeading eyebrow={block.eyebrow} heading={block.heading} highlight={block.highlight} intro={block.intro} dark={dark} align="center" />
      <ul className="mt-12 grid gap-6 lg:grid-cols-3">
        {(block.tiers ?? []).map((t) => (
          <li
            key={t.id ?? t.name}
            className={clsx(
              'relative flex flex-col rounded-2xl p-7',
              t.featured ? 'bg-plum-900 text-white shadow-2xl ring-2 ring-gold-500 lg:-translate-y-3' : 'bg-white shadow-card ring-1 ring-plum-100',
            )}
          >
            {t.featured && (
              <span className="absolute -top-3 left-7 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-ink">Most chosen</span>
            )}
            <h3 className={clsx('text-xs font-bold tracking-[0.2em] uppercase', t.featured ? 'text-gold-400' : 'text-plum-700')}>{t.name}</h3>
            {t.subtitle && <p className={clsx('mt-2 font-display text-2xl font-semibold', t.featured ? 'text-white' : 'text-plum-900')}>{t.subtitle}</p>}
            {t.description && <p className={clsx('mt-3 text-sm leading-relaxed', t.featured ? 'text-white/80' : 'text-muted')}>{t.description}</p>}
            {t.includesPrevious && <p className={clsx('mt-5 text-sm font-semibold', t.featured ? 'text-gold-400' : 'text-plum-800')}>{t.includesPrevious}</p>}
            <ul className="mt-4 space-y-2.5 text-sm">
              {(t.items ?? []).map((i) => (
                <li key={i.id ?? i.text} className="flex gap-2.5">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-500" />
                  {i.text}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {block.note && <p className={clsx('mx-auto mt-8 max-w-2xl text-center text-sm italic', dark ? 'text-white/70' : 'text-muted')}>{block.note}</p>}
      <div className="mt-8 text-center">
        <CmsButton link={block.cta} arrow />
      </div>
    </Section>
  )
}

export function List({ block }: { block: ListBlock }) {
  const dark = isDark(block.settings)
  const items = block.items ?? []
  return (
    <Section settings={block.settings}>
      <SectionHeading eyebrow={block.eyebrow} heading={block.heading} highlight={block.highlight} intro={block.intro} dark={dark} align="center" />
      {block.variant === 'chips' ? (
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {items.map((i) => (
            <li key={i.id ?? i.text} className={clsx('inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium', dark ? 'bg-white/10 text-white' : 'bg-plum-100 text-plum-900')}>
              <Icon name={i.icon} className="size-4 text-gold-600" />
              {i.text}
            </li>
          ))}
        </ul>
      ) : block.variant === 'tiles' ? (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => {
            const img = mediaOf(i.image)
            return (
              <li
                key={i.id ?? i.text}
                className={clsx(
                  'relative flex items-center gap-4 overflow-hidden rounded-xl p-4',
                  img ? 'bg-plum-900 text-white shadow-card' : dark ? 'bg-white/5 ring-1 ring-white/10' : 'bg-white shadow-card ring-1 ring-plum-100',
                )}
              >
                <CardBg image={img} />
                <IconTile name={i.icon ?? 'badge'} dark={dark || !!img} className="relative" />
                <span className="relative font-medium">{i.text}</span>
              </li>
            )
          })}
        </ul>
      ) : (
        <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
          {items.map((i) => (
            <li key={i.id ?? i.text} className="flex gap-3">
              <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-500" />
              {i.text}
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}

export function VisionMission({ block }: { block: VisionMissionBlock }) {
  return (
    <Section settings={block.settings} defaultTheme="soft">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-plum-900 p-8 text-white shadow-card sm:p-10">
          <IconTile name="eye" dark />
          <h2 className="mt-5 font-display text-3xl font-semibold">{block.visionHeading}</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/85">{block.vision}</p>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-card ring-1 ring-plum-100 sm:p-10">
          <IconTile name="flag" />
          <h2 className="mt-5 font-display text-3xl font-semibold text-plum-900">{block.missionHeading}</h2>
          <ul className="mt-4 space-y-3">
            {(block.mission ?? []).map((m) => (
              <li key={m.id ?? m.text} className="flex gap-3 text-muted">
                <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-500" />
                {m.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
