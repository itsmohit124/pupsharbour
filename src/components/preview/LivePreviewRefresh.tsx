'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

/** Mounted only in draft (preview) mode: re-renders the page whenever the editor autosaves. */
export function LivePreviewRefresh() {
  const router = useRouter()
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={typeof window === 'undefined' ? '' : window.location.origin} />
}
