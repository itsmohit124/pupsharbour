import clsx from 'clsx'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'gold' | 'outline' | 'outlineLight' | 'plum' | 'ghost'

const styles: Record<Variant, string> = {
  gold: 'bg-gold-500 text-ink hover:bg-gold-400 shadow-glow',
  plum: 'bg-plum-900 text-white hover:bg-plum-800',
  outline: 'border border-plum-900/25 text-plum-900 hover:border-plum-900 hover:bg-plum-50',
  outlineLight: 'border border-gold-400/70 text-white hover:bg-white/10',
  ghost: 'text-plum-900 hover:text-plum-700 px-0',
}

export function Button({
  href,
  children,
  variant = 'gold',
  arrow = false,
  icon,
  className,
}: {
  href: string
  children: ReactNode
  variant?: Variant
  arrow?: boolean
  icon?: ReactNode
  className?: string
}) {
  const cls = clsx(
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors',
    styles[variant],
    className,
  )
  const inner = (
    <>
      {icon}
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4" />}
    </>
  )
  const external = /^(https?:|mailto:|tel:)/.test(href)
  return external ? (
    <a href={href} className={cls} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  )
}

/** Renders a CMS link group only when both label and href are set. */
export function CmsButton({
  link,
  ...rest
}: { link?: { label?: string | null; href?: string | null } | null } & Omit<Parameters<typeof Button>[0], 'href' | 'children'>) {
  if (!link?.label || !link.href) return null
  return (
    <Button href={link.href} {...rest}>
      {link.label}
    </Button>
  )
}
