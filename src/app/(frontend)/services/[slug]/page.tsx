import { ArrowLeft, Check, Star } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CTA } from '@/blocks/components/data'
import { EnquiryFormSection } from '@/blocks/components/forms'
import { IconTile } from '@/components/ui/Icon'
import { getService, getSiteData, payloadClient } from '@/lib/data'
import type { ServiceGroup } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }
export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const payload = await payloadClient()
    const { docs } = await payload.find({ collection: 'services', limit: 100, depth: 0, select: { slug: true } })
    return docs.map((d) => ({ slug: d.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = await getService((await params).slug)
  return s ? { title: s.title, description: s.summary, alternates: { canonical: `/services/${s.slug}` } } : {}
}

export default async function ServicePage({ params }: Props) {
  const [service, ctx] = await Promise.all([getService((await params).slug), getSiteData()])
  if (!service) notFound()
  const group = typeof service.group === 'object' ? (service.group as ServiceGroup) : null
  const siblings = ctx.services.filter((s) => s.id !== service.id && (typeof s.group === 'object' ? s.group?.id : s.group) === group?.id)

  return (
    <>
      <section className="relative overflow-hidden bg-plum-950 text-white">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,var(--color-plum-700),transparent_55%)]" />
        <div className="container-x relative py-16 sm:py-20">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white">
            <ArrowLeft aria-hidden className="size-4" /> All services
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {group && <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-gold-400 uppercase">{group.title}</span>}
            {service.flagship && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-ink">
                <Star aria-hidden className="size-3 fill-ink" /> Flagship service
              </span>
            )}
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight font-semibold sm:text-5xl">{service.title}</h1>
          <span aria-hidden className="mt-5 block h-1 w-16 rounded-full bg-gold-500" />
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/85">{service.summary}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl font-semibold text-plum-900">Our services include</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {(service.items ?? []).map((i) => (
                <li key={i.id ?? i.text} className="flex gap-3 rounded-xl bg-white p-4 shadow-card ring-1 ring-plum-100">
                  <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-500" />
                  <span>{i.text.replace(/\.$/, '')}</span>
                </li>
              ))}
            </ul>
            {service.focus && (
              <div className="mt-10 rounded-2xl border-l-4 border-gold-500 bg-plum-50 p-6">
                <p className="text-xs font-semibold tracking-widest text-plum-700 uppercase">Our focus</p>
                <p className="mt-2 font-display text-xl text-plum-900">{service.focus}</p>
              </div>
            )}
            {service.disclaimer && <p className="mt-6 text-sm text-muted italic">{service.disclaimer}</p>}
          </div>
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl bg-plum-900 p-6 text-white">
                <IconTile name={service.icon} dark />
                <p className="mt-4 font-display text-xl font-semibold">Need help with {service.shortTitle || service.title}?</p>
                <p className="mt-2 text-sm text-white/75">Tell us about your organisation and we will propose the right approach.</p>
                <a href="#enquiry" className="mt-5 inline-flex w-full justify-center rounded-lg bg-gold-500 px-5 py-3 text-sm font-semibold text-ink hover:bg-gold-400">
                  Discuss your requirement
                </a>
              </div>
              {!!siblings.length && (
                <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-plum-100">
                  <p className="text-xs font-semibold tracking-widest text-plum-700 uppercase">Related services</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {siblings.map((s) => (
                      <li key={s.id}>
                        <Link href={`/services/${s.slug}`} className="text-ink hover:text-plum-700">
                          {s.shortTitle || s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      <EnquiryFormSection
        ctx={ctx}
        block={{
          blockType: 'enquiryForm',
          eyebrow: 'Business enquiry',
          heading: 'Let’s discuss your requirements',
          intro: `Interested in ${service.title}? Share a few details and our team will get back to you within one business day.`,
          submitLabel: 'Send Business Enquiry',
          successMessage: 'Thank you. Our team will contact you within one business day.',
        }}
      />
      <CTA
        ctx={ctx}
        block={{
          blockType: 'cta',
          heading: 'Your Business Deserves the Right',
          highlight: 'Direction.',
          intro: 'Let’s connect, understand your challenges and build a roadmap for sustainable growth.',
          primaryCta: { label: 'Book a Consultation', href: '/contact#enquiry' },
          showWhatsApp: true,
        }}
      />
    </>
  )
}
