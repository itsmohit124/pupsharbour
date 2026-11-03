import type { Payload } from 'payload'

import { FOOTER, HEADER, PAGES, SITE_SETTINGS } from './pages'
import { GROUPS, INDUSTRIES, SERVICES } from './services'

const CONTENT = ['pages', 'services', 'service-groups', 'industries'] as const

/**
 * Loads the initial website content. Idempotent: refuses to run if pages exist, unless `reset` is
 * set, which deletes and recreates ONLY website content (never users, submissions or media).
 */
export async function seed(payload: Payload, { reset = false } = {}): Promise<'seeded' | 'skipped'> {
  const ctx = { system: true, skipAudit: true }
  const existing = await payload.count({ collection: 'pages', overrideAccess: true })
  if (existing.totalDocs > 0 && !reset) {
    payload.logger.info('[seed] Content already exists; skipping (run with SEED_RESET=1 to recreate website content).')
    return 'skipped'
  }
  if (reset) {
    for (const collection of CONTENT) {
      await payload.delete({ collection, where: { id: { exists: true } }, overrideAccess: true, context: ctx })
    }
  }

  const groupIds: Record<string, number> = {}
  for (const g of GROUPS) {
    const doc = await payload.create({ collection: 'service-groups', data: { ...g }, overrideAccess: true, context: ctx })
    groupIds[g.slug] = doc.id
  }
  for (const s of SERVICES) {
    await payload.create({
      collection: 'services',
      data: { ...s, group: groupIds[s.group], items: s.items.map((text) => ({ text })), _status: 'published' } as never,
      overrideAccess: true,
      context: ctx,
    })
  }
  for (const [i, ind] of INDUSTRIES.entries()) {
    await payload.create({ collection: 'industries', data: { ...ind, order: i + 1 } as never, overrideAccess: true, context: ctx })
  }
  for (const p of PAGES) {
    // Row labels in the admin ("Hero · Your Strategic HR & Workforce…") instead of "Untitled".
    const layout = p.layout.map((b) => ({ ...b, blockName: blockLabel(b) }))
    await payload.create({ collection: 'pages', data: { ...p, layout, _status: 'published' } as never, overrideAccess: true, context: ctx })
  }
  await payload.updateGlobal({ slug: 'site-settings', data: SITE_SETTINGS as never, overrideAccess: true, context: ctx })
  await payload.updateGlobal({ slug: 'header', data: HEADER as never, overrideAccess: true, context: ctx })
  await payload.updateGlobal({ slug: 'footer', data: FOOTER as never, overrideAccess: true, context: ctx })

  payload.logger.info(`[seed] Created ${PAGES.length} pages, ${SERVICES.length} services, ${GROUPS.length} groups, ${INDUSTRIES.length} industries.`)
  return 'seeded'
}

function blockLabel(b: Record<string, unknown>): string {
  const text = [b.heading, b.highlight].filter((x) => typeof x === 'string').join(' ') || (b.visionHeading as string) || ''
  return text.length > 60 ? `${text.slice(0, 57)}…` : text
}
