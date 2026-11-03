'use client'

import clsx from 'clsx'
import { ChevronDown, Menu, Star, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string; items: { label: string; href: string; flagship: boolean }[] }[]
}

const isActive = (path: string, href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`))

export function NavLinks({ items }: { items: NavItem[] }) {
  const path = usePathname()
  return (
    <ul className="flex items-center gap-0.5 xl:gap-1">
      {items.map((item) => (
        <li key={item.href} className="group relative">
          <Link
            href={item.href}
            aria-current={isActive(path, item.href) ? 'page' : undefined}
            className={clsx(
              'inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-sm font-medium whitespace-nowrap transition-colors xl:px-3',
              isActive(path, item.href) ? 'text-white' : 'text-white/75 hover:text-white',
            )}
          >
            {item.label}
            {item.children && <ChevronDown aria-hidden className="size-4 transition group-hover:rotate-180" />}
          </Link>
          {isActive(path, item.href) && <span aria-hidden className="absolute inset-x-3 -bottom-[1.4rem] h-0.5 rounded bg-gold-500" />}
          {item.children && (
            <div className="invisible absolute top-full left-1/2 w-[46rem] -translate-x-1/2 pt-5 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-6 rounded-2xl bg-white p-6 shadow-card ring-1 ring-plum-100">
                {item.children.map((g) => (
                  <div key={g.href}>
                    <Link href={g.href} className="text-xs font-semibold tracking-wider text-plum-700 uppercase hover:text-plum-900">
                      {g.label}
                    </Link>
                    <ul className="mt-2 space-y-1">
                      {g.items.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href} className="flex items-center gap-1.5 rounded px-1 py-1 text-sm text-ink hover:bg-plum-50 hover:text-plum-900">
                            {s.label}
                            {s.flagship && <Star aria-label="Flagship service" className="size-3.5 fill-gold-500 text-gold-500" />}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

type Cta = { label?: string | null; href?: string | null } | null

export function MobileMenu({ items, primary, secondary }: { items: NavItem[]; primary: Cta; secondary: Cta }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="rounded-md p-2 text-white hover:bg-white/10"
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-20 bottom-0 overflow-y-auto bg-plum-950 px-4 pt-4 pb-10">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={close} className="block rounded-lg px-3 py-3 text-base font-medium text-white hover:bg-white/10">
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-2 ml-3 border-l border-white/15 pl-3">
                    {item.children.flatMap((g) => g.items).map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} onClick={close} className="block px-2 py-1.5 text-sm text-white/75 hover:text-white">
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            {secondary?.href && (
              <Link href={secondary.href} onClick={close} className="rounded-lg border border-gold-400/70 px-5 py-3 text-center font-semibold text-white">
                {secondary.label}
              </Link>
            )}
            {primary?.href && (
              <Link href={primary.href} onClick={close} className="rounded-lg bg-gold-500 px-5 py-3 text-center font-semibold text-ink">
                {primary.label}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
