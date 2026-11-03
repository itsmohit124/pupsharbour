import { CirclePlay } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import type { SiteData } from '@/lib/data'

import { Logo } from './Logo'
import { MobileMenu, NavLinks, type NavItem } from './Nav'

export function Header({ data }: { data: SiteData }) {
  const { header, settings, groups, insightsCount } = data
  const items: NavItem[] = (header.nav ?? [])
    .filter((n) => !(n.hideWhenEmpty === 'insights' && insightsCount === 0))
    .map((n) => ({
      label: n.label,
      href: n.href,
      children:
        n.dropdown === 'services'
          ? groups.map((g) => ({
              label: g.title,
              href: `/services#${g.slug}`,
              items: g.items.map((s) => ({ label: s.shortTitle || s.title, href: `/services/${s.slug}`, flagship: !!s.flagship })),
            }))
          : undefined,
    }))
  const primary = header.primaryCta?.label && header.primaryCta.href ? header.primaryCta : null
  const secondary = header.secondaryCta?.label && header.secondaryCta.href ? header.secondaryCta : null

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-plum-950/95 backdrop-blur supports-[backdrop-filter]:bg-plum-950/80">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-plum-900">
        Skip to content
      </a>
      <div className="container-x flex h-20 items-center justify-between gap-3">
        <Logo name={settings.siteName} strapline={settings.strapline} />
        <nav aria-label="Main" className="hidden xl:block">
          <NavLinks items={items} />
        </nav>
        <div className="hidden items-center gap-3 xl:flex">
          {secondary && (
            <Button href={secondary.href!} variant="outlineLight" icon={<CirclePlay aria-hidden className="size-4" />} className="px-4 py-2.5">
              {secondary.label}
            </Button>
          )}
          {primary && (
            <Button href={primary.href!} arrow className="px-4 py-2.5">
              {primary.label}
            </Button>
          )}
        </div>
        <MobileMenu items={items} primary={primary} secondary={secondary} />
      </div>
    </header>
  )
}
