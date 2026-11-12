/**
 * One-off content update: copies the industries from Website → Industries into the "Industry cards"
 * list of every Industries section that has no cards yet, so the cards can be edited right on the
 * page. The website looks the same before and after. Safe to re-run: sections that already have
 * cards are left alone. Every other section, page and setting is untouched.
 * Usage: npx payload run ./scripts/copy-industries-to-blocks.ts
 */
import config from '@payload-config'
import { getPayload } from 'payload'

const payload = await getPayload({ config })

const { docs: industries } = await payload.find({ collection: 'industries', sort: 'order', limit: 50, depth: 0 })
const cards = industries.map((i) => ({
  icon: i.icon,
  title: i.title,
  text: i.summary,
  image: typeof i.image === 'object' && i.image ? i.image.id : (i.image ?? null),
}))
if (!cards.length) throw new Error('No industries found to copy')

const { docs: pages } = await payload.find({ collection: 'pages', depth: 0, limit: 100, pagination: false })
let updated = 0
for (const page of pages) {
  let changed = false
  const layout = (page.layout ?? []).map((b) => {
    if (b.blockType !== 'industries' || b.cards?.length) return b
    changed = true
    return { ...b, cards }
  })
  if (!changed) continue
  await payload.update({ collection: 'pages', id: page.id, data: { layout, _status: 'published' }, context: { system: true } })
  payload.logger.info(`Copied ${cards.length} industry cards into "${page.title}"`)
  updated++
}
payload.logger.info(updated ? `Done: ${updated} page(s) updated` : 'Nothing to do: every Industries section already has cards')
process.exit(0)
