import type { Media } from '@/payload-types'

/**
 * Payload returns media URLs as absolute links on the server URL (https://pupsharbour.com/api/media/file/…),
 * but next/image only allows the site-relative /api/media/file/** path (next.config.ts localPatterns).
 * Strip the origin of our own file route so uploaded images render on every host (localhost, the
 * netlify.app address, the custom domain). Anything else is returned unchanged.
 */
export function mediaPath(url: string): string {
  try {
    const u = new URL(url, 'http://local')
    return u.pathname.startsWith('/api/media/file/') ? `${u.pathname}${u.search}` : url
  } catch {
    return url
  }
}

/** The populated media doc from an upload field with a site-relative url, or null (unset, or only an id). */
export function mediaOf(value: unknown): Media | null {
  if (!value || typeof value !== 'object' || !('url' in value) || !(value as Media).url) return null
  const media = value as Media
  return { ...media, url: mediaPath(media.url as string) }
}
