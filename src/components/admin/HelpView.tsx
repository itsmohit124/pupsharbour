import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { AdminViewServerProps } from 'payload'

import { can, type Capability, type Principal } from '@/access/permissions'
import { guidesFor } from '@/admin/guides'
import { SECTION_GUIDES } from '@/admin/sectionGuides'

const box: React.CSSProperties = { border: '1px solid var(--theme-elevation-150)', borderRadius: 10, background: 'var(--theme-elevation-50)' }

/** /admin/help (index) and /admin/help/<guide>: step-by-step guides filtered to the user's role. */
export function HelpView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const user = initPageResult.req.user
  if (!user) redirect('/admin/login?redirect=%2Fadmin%2Fhelp')
  const canDo = (c: Capability) => can(user as Principal, c)
  const guides = guidesFor(canDo)
  const segments = (params?.segments as string[] | undefined) ?? []
  const slug = segments[1]
  const guide = slug ? guides.find((g) => g.slug === slug) : undefined
  const showSections = slug === 'section-types' && canDo('content.draft')

  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={user}
      visibleEntities={initPageResult.visibleEntities}
    >
      <Gutter>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '24px 0 64px' }}>
          <p style={{ margin: 0 }}>
            <Link href="/admin/help">Help & guides</Link>
            {(guide || showSections) && <> / {guide?.title ?? 'Section types'}</>}
          </p>

          {!slug && (
            <>
              <h1 style={{ margin: '10px 0 6px' }}>Help & guides</h1>
              <p style={{ color: 'var(--theme-elevation-600)', marginTop: 0 }}>
                Step-by-step instructions for everything you can do in the admin. Prefer a walkthrough?{' '}
                <Link href="/admin?tour=dashboard">Take the tour</Link> or open a page and{' '}
                <Link href="/admin/collections/pages?tour=editor">take the editing tour</Link>.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14, marginTop: 24 }}>
                {canDo('content.draft') && (
                  <Link href="/admin/help/section-types" style={{ ...box, padding: 18, textDecoration: 'none', color: 'inherit' }}>
                    <strong>Section types</strong>
                    <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--theme-elevation-600)' }}>A picture and explanation of every section you can add to a page.</p>
                  </Link>
                )}
                {guides.map((g, i) => (
                  <Link key={g.slug} href={`/admin/help/${g.slug}`} data-tour={i === 0 ? 'help-first' : undefined} style={{ ...box, padding: 18, textDecoration: 'none', color: 'inherit' }}>
                    <strong>{g.title}</strong>
                    <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--theme-elevation-600)' }}>{g.summary}</p>
                  </Link>
                ))}
              </div>
            </>
          )}

          {guide && (
            <article>
              <h1 style={{ margin: '10px 0 6px' }}>{guide.title}</h1>
              <p style={{ color: 'var(--theme-elevation-600)', marginTop: 0 }}>{guide.summary}</p>
              <ol style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'grid', gap: 16 }}>
                {guide.steps.map((s, i) => (
                  <li key={s.title} style={{ ...box, padding: 18, display: 'grid', gridTemplateColumns: '40px 1fr', gap: 14 }}>
                    <span style={{ width: 32, height: 32, borderRadius: 999, background: '#3c0c48', color: '#f4c04a', display: 'grid', placeItems: 'center', fontWeight: 700 }}>{i + 1}</span>
                    <div>
                      <h2 style={{ margin: 0, fontSize: 18 }}>{s.title}</h2>
                      <p style={{ margin: '6px 0 0', lineHeight: 1.6 }}>{s.body}</p>
                      {s.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={s.image} alt={`Screenshot: ${s.title}`} style={{ marginTop: 12, width: '100%', maxWidth: 760, borderRadius: 8, border: '1px solid var(--theme-elevation-150)' }} />
                      )}
                    </div>
                  </li>
                ))}
              </ol>
              {!!guide.tips?.length && (
                <div style={{ ...box, padding: 18, marginTop: 20, borderLeft: '4px solid #f0a824' }}>
                  <strong>Tips</strong>
                  <ul style={{ margin: '8px 0 0' }}>{guide.tips.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
              )}
            </article>
          )}

          {showSections && (
            <>
              <h1 style={{ margin: '10px 0 6px' }}>Section types</h1>
              <p style={{ color: 'var(--theme-elevation-600)', marginTop: 0 }}>Every page is built from these sections. Each keeps the brand design; you only change its content.</p>
              <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
                {Object.entries(SECTION_GUIDES).map(([key, g]) => (
                  <section key={key} style={{ ...box, padding: 16, display: 'grid', gridTemplateColumns: 'minmax(180px, 300px) 1fr', gap: 18 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g.thumbnail} alt={`${g.label} section`} style={{ width: '100%', borderRadius: 6, border: '1px solid var(--theme-elevation-150)' }} />
                    <div>
                      <h2 style={{ margin: 0, fontSize: 18 }}>{g.label}</h2>
                      <p style={{ margin: '6px 0' }}>{g.purpose}</p>
                      {g.usedOn && <p style={{ margin: 0, fontSize: 13, color: 'var(--theme-elevation-500)' }}>Used on: {g.usedOn}</p>}
                    </div>
                  </section>
                ))}
              </div>
            </>
          )}

          {slug && !guide && !showSections && <p style={{ marginTop: 20 }}>That guide was not found or is not available for your role.</p>}
        </div>
      </Gutter>
    </DefaultTemplate>
  )
}
