import { randomUUID } from 'crypto'

import config from '@payload-config'
import { getPayload } from 'payload'

import { sniffDocument } from '@/lib/fileType'
import { guard, json, respond } from '@/lib/forms/guard'
import { fieldErrors, hiringSchema } from '@/lib/validation/forms'

/** Employer hiring requirement (For Employers page). Stored as an enquiry of type "hiring". */
export async function POST(req: Request) {
  if (Number(req.headers.get('content-length') ?? 0) > 6 * 1024 * 1024) {
    return json({ error: 'The upload is too large (max 5 MB).' }, 413)
  }
  const form = await req.formData().catch(() => null)
  if (!form) return json({ error: 'Invalid request.' }, 400)
  return respond(req, await handle(req, form), form.get('sourcePage'), 'hiring')
}

async function handle(req: Request, form: FormData): Promise<Response> {
  const blocked = await guard(req, form)
  if (blocked) return blocked

  const fields = Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === 'string'))
  const parsed = hiringSchema.safeParse({ ...fields, consent: fields.consent === 'true' || fields.consent === 'on' })
  if (!parsed.success) return json({ error: 'Please correct the highlighted fields.', fields: fieldErrors(parsed.error) }, 400)

  const payload = await getPayload({ config })
  let jobDescription: number | undefined
  const file = form.get('jobDescription')
  if (file instanceof File && file.size > 0) {
    const bytes = new Uint8Array(await file.arrayBuffer())
    const sniff = sniffDocument(bytes, file.name)
    if (!sniff.ok) return json({ error: sniff.reason, fields: { jobDescription: sniff.reason } }, 400)
    try {
      const doc = await payload.create({
        collection: 'job-descriptions',
        data: {},
        file: { data: Buffer.from(bytes), mimetype: sniff.mimetype, name: `${randomUUID()}.${sniff.ext}`, size: bytes.length },
        overrideAccess: true,
      })
      jobDescription = doc.id
    } catch {
      const reason = 'We could not read this file. Please upload a valid PDF, DOC or DOCX.'
      return json({ error: reason, fields: { jobDescription: reason } }, 400)
    }
  }

  const { website: _hp, ...data } = parsed.data
  await payload.create({
    collection: 'enquiries',
    data: { ...data, type: 'hiring', jobDescription, status: 'new' },
    overrideAccess: true,
  })
  return json({ ok: true })
}
