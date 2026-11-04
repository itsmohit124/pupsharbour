import clsx from 'clsx'
import { ArrowRight, Check, Clock, Globe, Mail, MapPin, Phone, Quote, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { DashboardMock } from '@/components/illustrations/DashboardMock'
import { Button, CmsButton } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/Heading'
import { Icon, IconTile, WhatsAppIcon } from '@/components/ui/Icon'
import { isDark, Section } from '@/components/ui/Section'
import { getInsights, phoneFor, whatsappHref, type SiteData } from '@/lib/data'
import type {
  AudienceSplitBlock,
  ContactInfoBlock,
  CtaBlock,
  IndustriesBlock,
  InsightsListBlock,
  LiveDemoBlock,
  Media,
  ServiceEcosystemBlock,
  ServicesDetailBlock,
  TestimonialsBlock,
} from '@/payload-types'

/** Four groups around the "End-to-End People Solutions" wheel (reference A). */
export function ServiceEcosystem({ block, ctx }: { block: ServiceEcosystemBlock; ctx: SiteData }) {
  const dark = isDark(block.settings)
  const groups = ctx.groups.slice(0, 4)
  const card = (g: (typeof groups)[number]) => (
    <Link
      key={g.id}
      href={`/services#${g.slug}`}
      className={clsx(
        'group flex gap-4 rounded-2xl p-5 transition hover:-translate-y-0.5',
        dark ? 'bg-white/5 ring-1 ring-white/10 hover:bg-white/10' : 'bg-white shadow-card ring-1 ring-plum-100 hover:ring-plum-200',
      )}
    >
      <IconTile name={g.icon} dark={dark} />
      <div className="min-w-0">
        <h3 className={clsx('font-semibold', dark ? 'text-white' : 'text-plum-900')}>{g.title}</h3>
        <p className={clsx('mt-1 text-sm', dark ? 'text-white/75' : 'text-muted')}>{g.summary}</p>
        {block.showServices && (
          <ul className={clsx('mt-3 space-y-1 text-sm', dark ? 'text-white/85' : 'text-ink')}>
            {g.items.map((s) => (
              <li key={s.id} className="flex items-center gap-1.5">
                <Check aria-hidden className="size-3.5 shrink-0 text-gold-500" />
                <span className="truncate">{s.shortTitle || s.title}</span>
                {s.flagship && <Star aria-label="Flagship" className="size-3.5 shrink-0 fill-gold-500 text-gold-500" />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  )
  return (
    <Section settings={block.settings}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <SectionHeading eyebrow={block.eyebrow} heading={block.heading} highlight={block.highlight} intro={block.intro} dark={dark} className="lg:col-span-3" />
        <div className="relative grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-9 lg:gap-x-40">
          {groups.map(card)}
          <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 hidden size-48 -translate-x-1/2 -translate-y-1/2 lg:block">
            <div
              className="size-full rounded-full"
              style={{ background: 'conic-gradient(var(--color-plum-800) 0 24%, transparent 24% 26%, var(--color-plum-700) 26% 49%, transparent 49% 51%, var(--color-plum-800) 51% 74%, transparent 74% 76%, var(--color-plum-700) 76% 99%, transparent 99%)' }}
            />
            <div className="absolute inset-9 flex flex-col items-center justify-center rounded-full bg-white text-center shadow-card">
              <Icon name="team" className="size-7 text-gold-500" />
              <p className="mt-1 px-2 text-xs leading-tight font-bold text-plum-900">{block.centerLabel}</p>
            </div>
          </div>
        </div>
      </div>
      {block.cta?.label && (
        <div className="mt-10 text-center">
          <CmsButton link={block.cta} variant={dark ? 'gold' : 'plum'} arrow />
        </div>
      )}
    </Section>
  )
}

/** Every service, grouped, with its full "services include" list. Flagship first and highlighted. */
export function ServicesDetail({ block, ctx }: { block: ServicesDetailBlock; ctx: SiteData }) {
  return (
    <Section settings={block.settings}>
      <SectionHeading eyebrow={block.eyebrow} heading={block.heading} highlight={block.highlight} intro={block.intro} align="center" />
      <nav aria-label="Service groups" className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2">
        {ctx.groups.map((g) => (
          <a key={g.id} href={`#${g.slug}`} className="rounded-full bg-plum-100 px-4 py-2 text-sm font-medium text-plum-900 hover:bg-plum-200">
            {g.title}
          </a>
        ))}
      </nav>
      <div className="mt-12 space-y-16">
        {ctx.groups.map((g) => (
          <div key={g.id} id={g.slug}>
            <div className="flex items-center gap-4">
              <IconTile name={g.icon} />
              <div>
                <h2 className="font-display text-2xl font-semibold text-plum-900 sm:text-3xl">{g.title}</h2>
                <p className="text-muted">{g.summary}</p>
              </div>
            </div>
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {[...g.items].sort((a, b) => Number(!!b.flagship) - Number(!!a.flagship)).map((s) => (
                <li
                  key={s.id}
                  className={clsx(
                    'flex flex-col rounded-2xl p-6',
                    s.flagship ? 'bg-plum-900 text-white shadow-2xl ring-2 ring-gold-500 md:col-span-2' : 'bg-white shadow-card ring-1 ring-plum-100',
                  )}
                >
                  <div className="flex items-start gap-4">
                    <IconTile name={s.icon} dark={!!s.flagship} />
                    <div>
                      {s.flagship && (
                        <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-gold-500 px-2.5 py-0.5 text-xs font-bold text-ink">
                          <Star aria-hidden className="size-3 fill-ink" /> Flagship service
                        </span>
                      )}
                      <h3 className={clsx('text-lg font-semibold', s.flagship ? 'text-white' : 'text-plum-900')}>{s.title}</h3>
                      <p className={clsx('mt-1 text-sm leading-relaxed', s.flagship ? 'text-white/80' : 'text-muted')}>{s.summary}</p>
                    </div>
                  </div>
                  <ul className={clsx('mt-5 grid gap-2 text-sm', s.flagship ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2')}>
                    {(s.items ?? []).slice(0, s.flagship ? 8 : 6).map((i) => (
                      <li key={i.id ?? i.text} className="flex gap-2">
                        <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-500" />
                        {i.text.replace(/\.$/, '')}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${s.slug}`}
                    className={clsx('mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold', s.flagship ? 'text-gold-400 hover:text-gold-100' : 'text-plum-800 hover:text-plum-600')}
                  >
                    View details <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function Industries({ block, ctx }: { block: IndustriesBlock; ctx: SiteData }) {
  const detailed = block.variant === 'detailed'
  if (detailed) {
    return (
      <Section settings={block.settings}>
        <SectionHeading eyebrow={block.eyebrow} heading={block.heading} highlight={block.highlight} intro={block.intro} align="center" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ctx.industries.map((i) => {
            const img = typeof i.image === 'object' ? (i.image as Media | null) : null
            return (
              <li key={i.id} id={i.slug} className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-plum-100">
                <IndustryVisual title={i.title} icon={i.icon} image={img} />
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-plum-900">{i.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{i.summary}</p>
                  <Link href={`/contact?industry=${encodeURIComponent(i.title)}#enquiry`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-plum-800 hover:text-plum-600">
                    Discuss your requirements <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="mt-10 text-center">
          <CmsButton link={block.cta} arrow />
        </div>
      </Section>
    )
  }
  return (
    <Section settings={block.settings} defaultTheme="dark">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-3">
          <SectionHeading eyebrow={block.eyebrow} heading={block.heading} highlight={block.highlight} intro={block.intro} dark />
          <CmsButton link={block.cta} variant="outlineLight" arrow className="mt-8" />
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-6">
          {ctx.industries.map((i) => {
            const img = typeof i.image === 'object' ? (i.image as Media | null) : null
            return (
              <li key={i.id}>
                <Link href={`/industries#${i.slug}`} className="group block overflow-hidden rounded-xl ring-1 ring-white/15 transition hover:ring-gold-400">
                  <IndustryVisual title={i.title} icon={i.icon} image={img} tall />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}

function IndustryVisual({ title, icon, image, tall = false }: { title: string; icon?: string | null; image: Media | null; tall?: boolean }) {
  return (
    <div className={clsx('relative flex items-end overflow-hidden bg-gradient-to-br from-plum-700 via-plum-800 to-plum-950', tall ? 'aspect-[3/4]' : 'aspect-[16/9]')}>
      {image?.url ? (
        <Image src={image.url} alt={image.alt ?? ''} fill sizes="(min-width: 1024px) 16vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
      ) : (
        <>
          <Icon name={icon} className="absolute -top-4 -right-4 size-32 text-white/10" />
          <svg aria-hidden className="absolute inset-0 size-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id={`grid-${title.length}`} width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M10 0H0V10" fill="none" stroke="#f4c04a" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill={`url(#grid-${title.length})`} />
          </svg>
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-plum-950/90 via-plum-950/20 to-transparent" />
      <div className="relative flex w-full flex-col items-center gap-2 p-3 pb-4 text-center">
        <Icon name={icon} className="size-7 text-white" />
        <span className="text-sm font-semibold text-white">{title}</span>
      </div>
    </div>
  )
}

export function LiveDemo({ block }: { block: LiveDemoBlock }) {
  const dark = isDark(block.settings)
  return (
    <Section settings={block.settings}>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow={block.eyebrow} heading={block.heading} highlight={block.highlight} intro={block.intro} dark={dark} />
          {!!block.modules?.length && (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {block.modules.map((m, i) => (
                <li
                  key={m.id ?? m.label}
                  className={clsx(
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium',
                    i === 0 ? 'bg-plum-800 text-white' : dark ? 'bg-white/5 text-white ring-1 ring-white/10' : 'bg-white text-ink shadow-card ring-1 ring-plum-100',
                  )}
                >
                  <Icon name={m.icon} className={clsx('size-5', i === 0 ? 'text-gold-400' : 'text-plum-700')} />
                  {m.label}
                </li>
              ))}
            </ul>
          )}
          <CmsButton link={block.cta} arrow className="mt-8" />
        </div>
        <DashboardMock />
      </div>
    </Section>
  )
}

export function Testimonials({ block, ctx }: { block: TestimonialsBlock; ctx: SiteData }) {
  if (!ctx.testimonials.length) return null
  const dark = isDark(block.settings)
  return (
    <Section settings={block.settings}>
      <SectionHeading eyebrow={block.eyebrow} heading={block.heading} highlight={block.highlight} intro={block.intro} dark={dark} align="center" />
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ctx.testimonials.map((t) => {
          const photo = typeof t.photo === 'object' ? (t.photo as Media | null) : null
          return (
            <li key={t.id} className={clsx('flex flex-col rounded-2xl p-7', dark ? 'bg-white/5 ring-1 ring-white/10' : 'bg-white shadow-card ring-1 ring-plum-100')}>
              <Quote aria-hidden className="size-8 text-gold-500" />
              {t.outcome && <p className={clsx('mt-4 font-display text-xl font-semibold', dark ? 'text-gold-400' : 'text-plum-900')}>{t.outcome}</p>}
              <blockquote className={clsx('mt-3 leading-relaxed', dark ? 'text-white/85' : 'text-muted')}>“{t.quote}”</blockquote>
              <div className="mt-auto flex items-center gap-3 pt-6">
                {photo?.url && <Image src={photo.url} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />}
                <div>
                  <p className={clsx('font-semibold', dark ? 'text-white' : 'text-plum-900')}>{t.name}</p>
                  <p className="text-sm text-muted">{[t.designation, t.company].filter(Boolean).join(', ')}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

export async function InsightsList({ block }: { block: InsightsListBlock }) {
  const posts = await getInsights(block.limit ?? 3)
  if (!posts.length) {
    return (
      <Section settings={block.settings}>
        <SectionHeading eyebrow={block.eyebrow} heading={block.heading} highlight={block.highlight} intro={block.intro} align="center" />
        <p className="mt-10 text-center text-muted">New articles are on their way. Follow us on LinkedIn for the latest updates.</p>
      </Section>
    )
  }
  return (
    <Section settings={block.settings}>
      <SectionHeading eyebrow={block.eyebrow} heading={block.heading} highlight={block.highlight} intro={block.intro} align="center" />
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => {
          const cover = typeof p.cover === 'object' ? (p.cover as Media | null) : null
          return (
            <li key={p.id}>
              <Link href={`/insights/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-plum-100 transition hover:-translate-y-1">
                <div className="relative aspect-[16/9] bg-gradient-to-br from-plum-800 to-plum-950">
                  {cover?.url ? (
                    <Image src={cover.url} alt={cover.alt ?? ''} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                  ) : (
                    <Icon name="document" className="absolute right-6 bottom-6 size-14 text-white/20" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold tracking-wider text-gold-600 uppercase">
                    {new Date(p.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-plum-900 group-hover:text-plum-700">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-plum-800">
                    Read more <ArrowRight aria-hidden className="size-4" />
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

export function CTA({ block, ctx }: { block: CtaBlock; ctx: SiteData }) {
  const dark = isDark(block.settings, 'dark')
  return (
    <Section settings={block.settings} defaultTheme="dark">
      <div className={clsx('relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12', dark ? 'bg-white/5 ring-1 ring-white/10' : 'bg-plum-900 text-white')}>
        <svg aria-hidden viewBox="0 0 200 200" className="absolute -bottom-10 -left-10 size-56 text-gold-500/10">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="16" />
        </svg>
        <SectionHeading eyebrow={block.eyebrow} heading={block.heading} highlight={block.highlight} intro={block.intro} dark align="center" className="relative" />
        <div className="relative mt-8 flex flex-wrap justify-center gap-4">
          <CmsButton link={block.primaryCta} arrow className="px-6 py-3.5 text-base" />
          <CmsButton link={block.secondaryCta} variant="outlineLight" className="px-6 py-3.5 text-base" />
          {block.showWhatsApp && (
            <Button href={whatsappHref(ctx.settings)} variant="outlineLight" icon={<WhatsAppIcon className="size-5" />} className="px-6 py-3.5 text-base">
              WhatsApp us
            </Button>
          )}
        </div>
      </div>
    </Section>
  )
}

export function ContactInfo({ block, ctx }: { block: ContactInfoBlock; ctx: SiteData }) {
  const s = ctx.settings
  const tel = (s.phone ?? '').replace(/[^\d+]/g, '')
  const rows = [
    { icon: Phone, label: 'Phone / WhatsApp', value: s.phone, href: `tel:${tel}` },
    { icon: Phone, label: 'Business enquiries', value: phoneFor(s, 'business')?.label, href: phoneFor(s, 'business')?.href },
    { icon: Phone, label: 'Recruitment', value: phoneFor(s, 'recruitment')?.label, href: phoneFor(s, 'recruitment')?.href },
    { icon: Mail, label: 'Email', value: s.email, href: `mailto:${s.email}` },
    { icon: Clock, label: 'Working hours', value: s.hours },
    { icon: MapPin, label: 'Location', value: s.location },
    { icon: Globe, label: 'Website', value: s.website, href: s.website ? `https://${s.website.replace(/^https?:\/\//, '')}` : undefined },
  ].filter((r) => r.value)
  return (
    <Section settings={block.settings} defaultTheme="soft">
      <div className="grid gap-10 lg:grid-cols-12">
        <SectionHeading eyebrow={block.eyebrow} heading={block.heading} highlight={block.highlight} intro={block.intro} className="lg:col-span-5" />
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-plum-100 sm:p-8">
            <p className="font-display text-xl font-semibold text-plum-900">{s.siteName}</p>
            <p className="text-sm text-gold-600">{s.tagline}</p>
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              {rows.map((r) => (
                <div key={r.label} className="flex gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-plum-100 text-plum-800">
                    <r.icon aria-hidden className="size-5" />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold tracking-wider text-muted uppercase">{r.label}</dt>
                    <dd className="mt-0.5 font-medium break-words text-ink">{r.href ? <a href={r.href} className="hover:text-plum-700">{r.value}</a> : r.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={whatsappHref(s)} variant="plum" icon={<WhatsAppIcon className="size-5" />}>
                Chat on WhatsApp
              </Button>
              <Button href={`mailto:${s.email}`} variant="outline" icon={<Mail aria-hidden className="size-4" />}>
                Email us
              </Button>
            </div>
          </div>
          {block.closing && <p className="mt-6 font-display text-lg font-semibold text-plum-900 italic">{block.closing}</p>}
        </div>
      </div>
    </Section>
  )
}

/** Two (or three) audience cards: "I'm an Employer" / "I'm a Job Seeker", with an optional phone line. */
export function AudienceSplit({ block, ctx }: { block: AudienceSplitBlock; ctx: SiteData }) {
  const dark = isDark(block.settings)
  const cards = block.cards ?? []
  return (
    <Section settings={block.settings}>
      <SectionHeading eyebrow={block.eyebrow} heading={block.heading} highlight={block.highlight} intro={block.intro} dark={dark} align="center" />
      <ul className={clsx('mt-10 grid gap-6', cards.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2')}>
        {cards.map((c, i) => {
          const phone = phoneFor(ctx.settings, c.phone)
          const featured = i === 0
          return (
            <li
              key={c.id ?? c.title}
              className={clsx(
                'flex flex-col rounded-3xl p-8',
                featured ? 'bg-plum-900 text-white shadow-2xl' : dark ? 'bg-white/5 ring-1 ring-white/10' : 'bg-white shadow-card ring-1 ring-plum-100',
              )}
            >
              <IconTile name={c.icon} dark={featured || dark} />
              {c.eyebrow && <p className={clsx('mt-5 text-xs font-semibold tracking-[0.18em] uppercase', featured ? 'text-gold-400' : 'text-plum-700')}>{c.eyebrow}</p>}
              <h3 className={clsx('mt-2 font-display text-2xl font-semibold', featured ? 'text-white' : 'text-plum-900')}>{c.title}</h3>
              {c.text && <p className={clsx('mt-3 leading-relaxed', featured ? 'text-white/80' : 'text-muted')}>{c.text}</p>}
              {!!c.bullets?.length && (
                <ul className="mt-4 space-y-2 text-sm">
                  {c.bullets.map((b) => (
                    <li key={b.id ?? b.text} className="flex gap-2">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-500" />
                      {b.text}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
                <CmsButton link={c.cta} variant={featured ? 'gold' : 'plum'} arrow />
                {phone && (
                  <a href={phone.href} className={clsx('inline-flex items-center gap-2 text-sm font-semibold', featured ? 'text-white hover:text-gold-400' : 'text-plum-800 hover:text-plum-600')}>
                    <Phone aria-hidden className="size-4" /> {phone.label}
                  </a>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
