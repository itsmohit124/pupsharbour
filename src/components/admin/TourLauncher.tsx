'use client'

import 'driver.js/dist/driver.css'

import { useAuth, usePreferences } from '@payloadcms/ui'
import { driver } from 'driver.js'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { can, type Capability, type Principal } from '@/access/permissions'
import { stepsFor, TOURS, type Tour } from '@/admin/tours'

const PREF_KEY = 'ph-onboarding-tours'
const EDITOR_PATH = /^\/admin\/collections\/pages\/[^/]+\/?$/

/**
 * Runs the guided tours. Auto-starts each tour once per user (remembered in Payload preferences),
 * and on demand via ?tour=dashboard|editor (menu link, help center).
 */
export function TourLauncher() {
  const { user } = useAuth()
  const { getPreference, setPreference } = usePreferences()
  const pathname = usePathname()
  const search = useSearchParams()
  const router = useRouter()
  const running = useRef(false)

  useEffect(() => {
    if (!user || running.current) return
    const requested = search.get('tour') as Tour['id'] | null
    const onDashboard = pathname === '/admin' || pathname === '/admin/'
    const onEditor = EDITOR_PATH.test(pathname)

    // "?tour=editor" from the help center lands on the Pages list: open the Home page first.
    if (requested === 'editor' && !onEditor) {
      fetch('/api/pages?where[slug][equals]=home&depth=0&limit=1', { credentials: 'include' })
        .then((r) => r.json())
        .then((d) => d?.docs?.[0]?.id && router.push(`/admin/collections/pages/${d.docs[0].id}?tour=editor`))
        .catch(() => undefined)
      return
    }

    const which: Tour['id'] | null = requested ?? (onDashboard ? 'dashboard' : onEditor ? 'editor' : null)
    if (!which) return
    let cancelled = false

    ;(async () => {
      const done = ((await getPreference<Record<string, boolean>>(PREF_KEY)) ?? {}) as Record<string, boolean>
      if (!requested && done[which]) return
      // Give the admin UI a moment to render the elements the tour points at.
      await new Promise((r) => setTimeout(r, 900))
      if (cancelled) return
      const tour = TOURS.find((t) => t.id === which)!
      const canDo = (c: Capability) => can(user as Principal, c)
      const steps = stepsFor(tour, canDo).map((s) => {
        const el = s.target ? (document.querySelector(s.target) as Element | null) : null
        return { element: el ?? undefined, popover: { title: s.title, description: s.body } }
      })
      running.current = true
      const d = driver({
        showProgress: true,
        allowClose: true,
        overlayOpacity: 0.55,
        stagePadding: 6,
        popoverClass: 'ph-tour',
        nextBtnText: 'Next →',
        prevBtnText: '← Back',
        doneBtnText: 'Finish',
        steps,
        onDestroyed: () => {
          running.current = false
          void setPreference(PREF_KEY, { ...done, [which]: true })
          if (requested) router.replace(pathname)
        },
      })
      d.drive()
    })()

    return () => {
      cancelled = true
    }
  }, [user, pathname, search, getPreference, setPreference, router])

  return null
}
