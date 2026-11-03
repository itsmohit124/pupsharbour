import config from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import { can, type Principal } from '@/access/permissions'

/** Enables draft preview only for signed-in staff who may draft content. */
export async function GET(req: Request) {
  const url = new URL(req.url)
  const path = url.searchParams.get('path') ?? '/'
  if (!path.startsWith('/') || path.startsWith('//')) return new Response('Invalid path', { status: 400 })

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: req.headers })
  if (!can(user as Principal, 'content.draft')) return new Response('Forbidden', { status: 403 })

  ;(await draftMode()).enable()
  redirect(path)
}
