import { randomUUID } from 'crypto'

import config from '@payload-config'
import { getPayload } from 'payload'

import { sniffDocument } from '@/lib/fileType'
import { guard, json, respond } from '@/lib/forms/guard'
import { applicationSchema, fieldErrors } from '@/lib/validation/forms'

export async function POST(req: Request) {
  if (Number(req.headers.get('content-length') ?? 0) > 6 * 1024 * 1024) {
    return json({ error: 'The upload is too large (max 5 MB).' }, 413)
  }
  const form = await req.formData().catch(() => null)
  if (!form) return json({ error: 'Invalid request.' }, 400)
  return respond(req, await handle(req, form), form.get('sourcePage'), 'apply')
}

async function handle(req: Request, form: FormData): Promise<Response> {
  const blocked = await guard(req, form)
  if (blocked) return blocked

  const fields = Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === 'string'))
  const parsed = applicationSchema.safeParse({ ...fields, consent: fields.consent === 'true' || fields.consent === 'on' })
  if (!parsed.success) return json({ error: 'Please correct the highlighted fields.', fields: fieldErrors(parsed.error) }, 400)

  const file = form.get('resume')
  if (!(file instanceof File) || file.size === 0) {
    return json({ error: 'Please attach your resume.', fields: { resume: 'Please attach your resume (PDF, DOC or DOCX, max 5 MB).' } }, 400)
  }
  const bytes = new Uint8Array(await file.arrayBuffer())
  const sniff = sniffDocument(bytes, file.name)
  if (!sniff.ok) return json({ error: sniff.reason, fields: { resume: sniff.reason } }, 400)

  const payload = await getPayload({ config })
  const { website: _hp, ...data } = parsed.data
  let resume
  try {
    resume = await payload.create({
      collection: 'resumes',
      data: {},
      // Never trust the uploaded name: store under a random one with the verified extension.
      file: { data: Buffer.from(bytes), mimetype: sniff.mimetype, name: `${randomUUID()}.${sniff.ext}`, size: bytes.length },
      overrideAccess: true,
    })
  } catch {
    // Payload's own checks (e.g. PDF structure) rejected the file.
    const reason = 'We could not read this file. Please upload a valid PDF, DOC or DOCX.'
    return json({ error: reason, fields: { resume: reason } }, 400)
  }
  await payload.create({
    collection: 'applications',
    data: { ...data, resume: resume.id, status: 'new' },
    overrideAccess: true,
  })
  return json({ ok: true })
}
