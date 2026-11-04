'use client'

import { useRowLabel } from '@payloadcms/ui'

import { guideFor } from '@/admin/sectionGuides'

type Data = {
  heading?: string | null
  highlight?: string | null
  intro?: string | null
  visionHeading?: string | null
  settings?: { hidden?: boolean | null; theme?: string | null } | null
  [key: string]: unknown
}

const LISTS = ['items', 'steps', 'tiers', 'cards', 'waypoints', 'highlights', 'paragraphs', 'bullets', 'modules', 'mission']

/** Collapsed section row: "03 · Text · Build Your Business… · 5 paragraphs · Hidden". */
export function SectionRowLabel({ blockSlug }: { blockSlug: string }) {
  const { data, rowNumber } = useRowLabel<Data>()
  const guide = guideFor(blockSlug)
  const firstItems = (Array.isArray(data?.items) ? (data.items as Record<string, unknown>[]) : [])
    .map((i) => [i.value, i.title ?? i.text].filter(Boolean).join(' '))
    .filter(Boolean)
  const title = [data?.heading ?? data?.visionHeading, data?.highlight].filter(Boolean).join(' ') || firstItems.slice(0, 3).join(' · ')
  const counts = LISTS.map((k) => [k, Array.isArray(data?.[k]) ? (data[k] as unknown[]).length : 0] as const).filter(([, n]) => n > 0)
  const hidden = !!data?.settings?.hidden
  const theme = data?.settings?.theme

  return (
    <span data-tour="section-row" style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flexWrap: 'wrap', opacity: hidden ? 0.6 : 1 }}>
      <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--theme-elevation-500)', fontSize: 12 }}>{String((rowNumber ?? 0) + 1).padStart(2, '0')}</span>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#d98f0b', whiteSpace: 'nowrap' }}>{guide.label}</span>
      <span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 420 }}>
        {title || <em style={{ color: 'var(--theme-elevation-500)', fontWeight: 400 }}>No headline</em>}
      </span>
      {counts.slice(0, 2).map(([k, n]) => (
        <span key={k} style={chip}>{`${n} ${k}`}</span>
      ))}
      {theme === 'dark' && <span style={{ ...chip, background: '#3c0c48', color: '#fff' }}>dark</span>}
      {hidden && <span style={{ ...chip, background: '#fde8e8', color: '#9b1c1c', fontWeight: 700 }}>Hidden on website</span>}
    </span>
  )
}

const chip: React.CSSProperties = {
  fontSize: 11,
  padding: '1px 8px',
  borderRadius: 999,
  background: 'var(--theme-elevation-100)',
  color: 'var(--theme-elevation-800)',
  whiteSpace: 'nowrap',
}
