import clsx from 'clsx'
import type { ReactNode } from 'react'

export type SectionSettings = { hidden?: boolean | null; anchorId?: string | null; theme?: 'light' | 'soft' | 'dark' | null } | null | undefined

const themes = {
  light: 'bg-white text-ink',
  soft: 'bg-plum-50 text-ink',
  dark: 'bg-plum-900 text-white bg-[radial-gradient(ellipse_at_top_right,var(--color-plum-700),transparent_60%)]',
}

export function Section({
  settings,
  children,
  className,
  defaultTheme = 'light',
}: {
  settings?: SectionSettings
  children: ReactNode
  className?: string
  defaultTheme?: keyof typeof themes
}) {
  const theme = settings?.theme ?? defaultTheme
  return (
    <section id={settings?.anchorId || undefined} data-theme={theme} className={clsx('py-16 sm:py-20', themes[theme], className)}>
      <div className="container-x">{children}</div>
    </section>
  )
}

export function isDark(settings?: SectionSettings, fallback: 'light' | 'soft' | 'dark' = 'light') {
  return (settings?.theme ?? fallback) === 'dark'
}
