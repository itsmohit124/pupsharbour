import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * Pages are statically cached; after any content change we purge the whole site cache. The site is
 * small (a dozen routes), so a full-layout revalidation is cheap and avoids stale cross-page sections
 * (e.g. a service rename showing on Home, Services and the footer).
 * Outside a Next.js runtime (seed script, tests) revalidatePath throws; that is safe to ignore.
 */
async function purge() {
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
  } catch {
    /* not running inside Next.js */
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc, context }) => {
  if (context?.autosave) return doc // drafts only change the preview, never the live site
  await purge()
  return doc
}
export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await purge()
  return doc
}
export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc }) => {
  await purge()
  return doc
}
