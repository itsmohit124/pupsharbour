import Link from 'next/link'
import type { Payload, TypedUser } from 'payload'

import { can, type Principal } from '@/access/permissions'

type Props = { payload: Payload; user?: TypedUser | null }

const ROLE_LABEL: Record<string, string> = {
  super_admin: 'Super admin',
  admin: 'Admin',
  editor: 'Editor',
  contributor: 'Contributor',
  recruiter: 'Recruiter',
}

/** Shown above the dashboard: greeting, what's new, quick actions, tour + help. */
export async function DashboardWelcome({ payload, user }: Props) {
  if (!user) return null
  const p = user as Principal & { name?: string; role?: string }
  const asUser = { user, overrideAccess: false as const }
  const countNew = async (collection: 'enquiries' | 'applications', type?: 'business' | 'hiring') =>
    payload
      .count({ collection, where: { and: [{ status: { equals: 'new' } }, ...(type ? [{ type: { equals: type } }] : [])] }, ...asUser })
      .then((r) => r.totalDocs)
      .catch(() => null)

  const [business, hiring, applications, home] = await Promise.all([
    can(p, 'enquiries.read') ? countNew('enquiries', 'business') : null,
    can(p, 'hiring.read') ? countNew('enquiries', 'hiring') : null,
    can(p, 'applications.read') ? countNew('applications') : null,
    can(p, 'content.draft')
      ? payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0, draft: true, ...asUser }).then((r) => r.docs[0]?.id).catch(() => undefined)
      : undefined,
  ])

  const actions = [
    home && { href: `/admin/collections/pages/${home}`, label: 'Edit the Home page' },
    can(p, 'content.draft') && { href: '/admin/collections/pages', label: 'All pages' },
    business !== null && { href: '/admin/collections/enquiries?where[type][equals]=business', label: 'Business enquiries', count: business },
    hiring !== null && { href: '/admin/collections/enquiries?where[type][equals]=hiring', label: 'Hiring requirements', count: hiring },
    applications !== null && { href: '/admin/collections/applications', label: 'Job applications', count: applications },
    can(p, 'content.draft') && { href: '/admin/collections/insights/create', label: 'Write an Insight' },
    can(p, 'globals.settings') && { href: '/admin/globals/site-settings', label: 'Phone & WhatsApp' },
  ].filter(Boolean) as { href: string; label: string; count?: number | null }[]

  return (
    <div
      data-tour="welcome"
      style={{ margin: '8px 0 28px', padding: 22, borderRadius: 14, color: '#fff', background: 'linear-gradient(120deg, #22062a, #4e1052 60%, #651a6b)' }}
    >
      <p style={{ margin: 0, fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: '#f4c04a', fontWeight: 700 }}>
        {ROLE_LABEL[p.role ?? ''] ?? 'Staff'} · Pups Harbour admin
      </p>
      <h2 style={{ margin: '6px 0 4px', color: '#fff' }}>Welcome{p.name ? `, ${p.name.split(' ')[0]}` : ''} 👋</h2>
      <p style={{ margin: 0, opacity: 0.85 }}>Manage the website, follow up on enquiries and keep everything up to date. Nothing goes live until you publish.</p>
      <div data-tour="quick-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 16 }}>
        {actions.map((a) => (
          <Link key={a.href} href={a.href} style={{ display: 'inline-flex', gap: 8, alignItems: 'center', padding: '8px 14px', borderRadius: 8, background: 'rgba(255,255,255,.12)', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
            {a.label}
            {!!a.count && <span style={{ background: '#f0a824', color: '#1e1626', borderRadius: 999, padding: '0 8px', fontSize: 12, fontWeight: 800 }}>{a.count} new</span>}
          </Link>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 14, fontSize: 14 }}>
        <Link href="/admin?tour=dashboard" style={{ color: '#f4c04a', fontWeight: 700 }}>🧭 Take the tour</Link>
        <Link href="/admin/help" style={{ color: '#f4c04a', fontWeight: 700 }}>📘 Help & guides</Link>
      </div>
    </div>
  )
}
