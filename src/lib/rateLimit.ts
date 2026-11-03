/**
 * Fixed-window, in-memory rate limiter. Good for a single app instance (the VPS) and as a
 * best-effort guard on serverless. Cloudflare Turnstile is the second layer.
 */
export function createRateLimiter({ max, windowMs, now = Date.now }: { max: number; windowMs: number; now?: () => number }) {
  const hits = new Map<string, { count: number; resetAt: number }>()
  return function allow(key: string): boolean {
    const t = now()
    const entry = hits.get(key)
    if (!entry || t > entry.resetAt) {
      hits.set(key, { count: 1, resetAt: t + windowMs })
      if (hits.size > 10_000) for (const [k, v] of hits) if (t > v.resetAt) hits.delete(k)
      return true
    }
    entry.count += 1
    return entry.count <= max
  }
}
