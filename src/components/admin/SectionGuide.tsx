'use client'

import { useFormFields } from '@payloadcms/ui'
import { useState } from 'react'

import { guideFor } from '@/admin/sectionGuides'

/**
 * "About this section" panel at the top of every section in the page editor: a real screenshot of
 * this section type, what it is for, and where each field appears on the website.
 */
export function SectionGuide({ blockSlug, fieldNames = [] }: { blockSlug: string; fieldNames?: string[] }) {
  const guide = guideFor(blockSlug)
  const [open, setOpen] = useState(false)
  const slug = useFormFields(([fields]) => fields.slug?.value as string | undefined)
  const pagePath = slug ? (slug === 'home' ? '/' : `/${slug}`) : null

  return (
    <div
      data-tour="section-guide"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(140px, 220px) 1fr',
        gap: 16,
        padding: 14,
        marginBottom: 18,
        borderRadius: 10,
        border: '1px solid var(--theme-elevation-150)',
        background: 'var(--theme-elevation-50)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={guide.thumbnail}
        alt={`How the ${guide.label} section looks on the website`}
        style={{ width: '100%', borderRadius: 6, border: '1px solid var(--theme-elevation-150)', objectFit: 'cover', objectPosition: 'top', maxHeight: 150 }}
      />
      <div style={{ minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#d98f0b' }}>
          About this section · {guide.label}
        </p>
        <p style={{ margin: '6px 0 0', lineHeight: 1.5 }}>{guide.purpose}</p>
        {guide.usedOn && <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--theme-elevation-500)' }}>Used on: {guide.usedOn}</p>}
        <div style={{ display: 'flex', gap: 14, marginTop: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={() => setOpen((o) => !o)} style={linkBtn} aria-expanded={open}>
            {open ? 'Hide' : 'Show'} where each field appears
          </button>
          {pagePath && (
            <a href={pagePath} target="_blank" rel="noopener noreferrer" style={linkBtn}>
              View this page on the website ↗
            </a>
          )}
          <a href="/admin/help/section-types" target="_blank" rel="noopener noreferrer" style={linkBtn}>
            All section types
          </a>
        </div>
        {open && (
          <dl style={{ margin: '10px 0 0', display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '4px 14px', fontSize: 13 }}>
            {Object.entries(guide.fields)
              .filter(([k]) => fieldNames.length === 0 || fieldNames.includes(k))
              .filter(([k]) => !['hidden', 'anchorId', 'theme', 'label', 'href', 'text', 'title', 'description', 'icon'].includes(k))
              .map(([k, v]) => (
                <div key={k} style={{ display: 'contents' }}>
                  <dt style={{ fontWeight: 600, textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1').toLowerCase()}</dt>
                  <dd style={{ margin: 0, color: 'var(--theme-elevation-700)' }}>{v}</dd>
                </div>
              ))}
          </dl>
        )}
      </div>
    </div>
  )
}

const linkBtn: React.CSSProperties = {
  background: 'none',
  border: 0,
  padding: 0,
  color: 'var(--theme-success-500, #651a6b)',
  fontWeight: 600,
  fontSize: 13,
  cursor: 'pointer',
  textDecoration: 'underline',
}
