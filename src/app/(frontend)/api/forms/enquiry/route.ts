import config from '@payload-config'
import { getPayload } from 'payload'

import { guard, isHtmlFormPost, json, respond } from '@/lib/forms/guard'
import { enquirySchema, fieldErrors } from '@/lib/validation/forms'

export async function POST(req: Request) {
  const body = await readBody(req)
  if (!body) return json({ error: 'Invalid request.' }, 400)
  return respond(req, await handle(req, body), body.sourcePage, 'enquiry')
}

/** JSON from our fetch() call, or a regular form post when JavaScript is unavailable. */
async function readBody(req: Request): Promise<Record<string, unknown> | null> {
  if (!isHtmlFormPost(req)) {
    const b = await req.json().catch(() => null)
    return b && typeof b === 'object' ? (b as Record<string, unknown>) : null
  }
  const fd = await req.formData().catch(() => null)
  if (!fd) return null
  const out: Record<string, unknown> = Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === 'string'))
  out.services = fd.getAll('services').map(String)
  out.consent = fd.get('consent') === 'on' || fd.get('consent') === 'true'
  return out
}

async function handle(req: Request, body: Record<string, unknown>): Promise<Response> {
  const blocked = await guard(req, body)
  if (blocked) return blocked

  const parsed = enquirySchema.safeParse(body)
  if (!parsed.success) return json({ error: 'Please correct the highlighted fields.', fields: fieldErrors(parsed.error) }, 400)
  const { services: serviceSlugs, website: _hp, consent, ...data } = parsed.data

  const payload = await getPayload({ config })
  const services = serviceSlugs?.length
    ? (await payload.find({ collection: 'services', where: { slug: { in: serviceSlugs } }, limit: 20, depth: 0 })).docs.map((s) => s.id)
    : []

  await payload.create({
    collection: 'enquiries',
    data: { ...data, services, consent, type: 'business', status: 'new' },
    overrideAccess: true, // creation is closed to the API; this validated route is the only way in
  })
  return json({ ok: true })
}
