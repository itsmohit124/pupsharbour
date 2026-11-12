/**
 * One-off content update: replaces ONLY the Pillars section on the Home page with the copy in
 * src/seed/pages.ts. Every other section, page and setting is left untouched.
 * Usage: npx payload run ./scripts/update-home-pillars.ts
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { PAGES } from '../src/seed/pages'

const payload = await getPayload({ config })
const seedBlock = PAGES.find((p) => p.slug === 'home')?.layout.find((b) => b.blockType === 'pillars')
const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, depth: 0, limit: 1 })
const home = docs[0]
if (!seedBlock || !home) throw new Error('Home page or seed pillars block not found')

const layout = (home.layout ?? []).map((b) => {
  if (b.blockType !== 'pillars') return b
  const { settings } = b // keep the section's current visibility / anchor / background
  // Fields absent from the seed are cleared explicitly, otherwise Payload keeps the old values.
  return { eyebrow: null, highlight: null, tagline: null, intro: null, ...seedBlock, settings, id: b.id } as typeof b
})
if (!layout.some((b) => b.blockType === 'pillars')) throw new Error('Home page has no Pillars section')

await payload.update({ collection: 'pages', id: home.id, data: { layout, _status: 'published' }, context: { system: true } })
payload.logger.info('Home page pillars updated')
process.exit(0)
