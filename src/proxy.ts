import { NextResponse, type NextRequest } from 'next/server'

/**
 * Payload exposes a "create first user" screen + endpoint while the users table is empty.
 * We bootstrap the first super_admin from env instead, so both are closed permanently. This stops
 * anyone from claiming the first account on a fresh deploy. (Caddy blocks the same paths on the VPS.)
 */
export const BLOCKED_PATHS = [/^\/admin\/create-first-user\/?$/, /^\/api\/users\/first-register\/?$/]

export function proxy(request: NextRequest) {
  if (BLOCKED_PATHS.some((re) => re.test(request.nextUrl.pathname))) {
    return new NextResponse('Not Found', { status: 404 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/create-first-user/:path*', '/api/users/first-register/:path*'],
}
