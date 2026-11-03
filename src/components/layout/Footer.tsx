import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

import { LinkedInIcon, WhatsAppIcon } from '@/components/ui/Icon'
import { whatsappHref, type SiteData } from '@/lib/data'

import { Logo } from './Logo'

export function Footer({ data }: { data: SiteData }) {
  const { footer, settings, services, insightsCount } = data
  const quick = (footer.quickLinks ?? []).filter((l) => !(l.href === '/insights' && insightsCount === 0))
  const tel = (settings.phone ?? '').replace(/[^\d+]/g, '')
  return (
    <footer className="bg-plum-950 text-white/80">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo name={settings.siteName} />
          <p className="mt-5 text-sm font-semibold text-gold-400">{settings.tagline}</p>
          <p className="mt-1 text-xs tracking-[0.2em] text-white/60 uppercase">{settings.pillarsLine}</p>
          {footer.about && <p className="mt-4 text-sm leading-relaxed">{footer.about}</p>}
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold tracking-wider text-white uppercase">Quick links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {quick.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold tracking-wider text-white uppercase">Our services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/services/${s.slug}`} className="hover:text-gold-400">
                  {s.shortTitle || s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold tracking-wider text-white uppercase">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2"><Phone aria-hidden className="mt-0.5 size-4 text-gold-400" /><a href={`tel:${tel}`} className="hover:text-gold-400">{settings.phone}</a></li>
            <li className="flex gap-2"><Mail aria-hidden className="mt-0.5 size-4 text-gold-400" /><a href={`mailto:${settings.email}`} className="break-all hover:text-gold-400">{settings.email}</a></li>
            {settings.hours && <li className="flex gap-2"><Clock aria-hidden className="mt-0.5 size-4 text-gold-400" />{settings.hours}</li>}
            {settings.location && <li className="flex gap-2"><MapPin aria-hidden className="mt-0.5 size-4 text-gold-400" />{settings.location}</li>}
          </ul>
          <div className="mt-5 flex gap-3">
            <a href={whatsappHref(settings)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-2.5 hover:bg-[#25D366]" aria-label="Chat on WhatsApp">
              <WhatsAppIcon className="size-5" />
            </a>
            {settings.linkedin && (
              <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-2.5 hover:bg-[#0A66C2]" aria-label="Pups Harbour on LinkedIn">
                <LinkedInIcon />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {settings.siteName}. All Rights Reserved.</p>
          {footer.closingLine && <p className="hidden text-gold-400/80 md:block">{footer.closingLine}</p>}
          <ul className="flex gap-4">
            {(footer.legalLinks ?? []).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export function WhatsAppFab({ data }: { data: SiteData }) {
  return (
    <a
      href={whatsappHref(data.settings)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Pups Harbour on WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-4 ring-white/60 transition hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  )
}
