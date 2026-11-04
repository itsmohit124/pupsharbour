'use client'

import Link from 'next/link'

import { TourLauncher } from './TourLauncher'

/** Bottom of the admin menu: Help & guides + Take the tour (+ mounts the tour engine). */
export function NavHelpLinks() {
  const style: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontWeight: 600, color: 'var(--theme-text)' }
  return (
    <div data-tour="help-link" style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--theme-elevation-150)' }}>
      <Link href="/admin/help" style={style}>
        <span aria-hidden>📘</span> Help & guides
      </Link>
      <Link href="/admin?tour=dashboard" style={style}>
        <span aria-hidden>🧭</span> Take the tour
      </Link>
      <TourLauncher />
    </div>
  )
}
