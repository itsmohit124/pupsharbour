import 'server-only'

import { createRateLimiter } from '@/lib/rateLimit'

const limiter = createRateLimiter({ max: 5, windowMs: 10 * 60 * 1000 }) // 5 submissions / 10 min / IP

export function allowedOrigins(): string[] {
  return [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000', ...(process.env.ALLOWED_ORIGINS ?? '').split(',')]
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean)
}

export function clientIpFrom(headers: Headers): string {
  return (
    headers.get('x-nf-client-connection-ip') ??
    headers.get('cf-connecting-ip') ??
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headers.get('x-real-ip') ??
    'unknown'
  )
}

export const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

/** A plain HTML form post (JavaScript disabled or not yet loaded) rather than our fetch() call. */
export const isHtmlFormPost = (req: Request) =>
  !(req.headers.get('content-type') ?? '').includes('application/json') && (req.headers.get('accept') ?? '').includes('text/html')

/**
 * For no-JS submissions: answer the API result with a redirect back to the form page, carrying only
 * a status flag (never the submitted data). Same-origin paths only.
 */
export function respond(req: Request, res: Response, sourcePage: unknown, anchor: string): Response {
  if (!isHtmlFormPost(req)) return res
  const safe = (p: unknown) => typeof p === 'string' && /^\/(?!\/)[\w\-/]*$/.test(p)
  let path = safe(sourcePage) ? (sourcePage as string) : '/'
  if (!safe(sourcePage)) {
    try {
      const ref = new URL(req.headers.get('referer') ?? '')
      if (allowedOrigins().includes(ref.origin) && safe(ref.pathname)) path = ref.pathname
    } catch {
      /* no or invalid referer */
    }
  }
  const base = allowedOrigins()[0]
  return Response.redirect(`${base}${path}?form=${res.ok ? 'sent' : 'error'}#${anchor}`, 303)
}

/** Same-origin check (CSRF), rate limit and optional Turnstile. Returns a Response to short-circuit. */
export async function guard(req: Request, form: FormData | Record<string, unknown>): Promise<Response | null> {
  const origin = req.headers.get('origin')?.replace(/\/$/, '')
  if (!origin || !allowedOrigins().includes(origin)) return json({ error: 'Invalid origin.' }, 403)

  if (!limiter(clientIpFrom(req.headers))) {
    return json({ error: 'Too many submissions. Please try again in a few minutes, or contact us on WhatsApp.' }, 429)
  }

  const secret = process.env.TURNSTILE_SECRET_KEY
  if (secret) {
    const token = form instanceof FormData ? form.get('cf-turnstile-response') : form['cf-turnstile-response']
    if (typeof token !== 'string' || !token) return json({ error: 'Please complete the verification.' }, 400)
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token, remoteip: clientIpFrom(req.headers) }),
    }).then((r) => r.json() as Promise<{ success: boolean }>).catch(() => ({ success: false }))
    if (!res.success) return json({ error: 'Verification failed. Please try again.' }, 400)
  }
  return null
}
