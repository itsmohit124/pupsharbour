'use client'

import clsx from 'clsx'
import { CheckCircle2, Loader2 } from 'lucide-react'
import Script from 'next/script'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import type { ReactNode } from 'react'

export type Status = { state: 'idle' | 'sending' | 'done' | 'error'; message?: string; fields?: Record<string, string> }

export function Field({
  name,
  label,
  required,
  error,
  children,
  className,
}: {
  name: string
  label: string
  required?: boolean
  error?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="label">
        {label} {required && <span className="text-plum-700" aria-hidden>*</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

export const inputProps = (name: string, status: Status, required = false) => ({
  id: name,
  name,
  required,
  'aria-invalid': status.fields?.[name] ? true : undefined,
  'aria-describedby': status.fields?.[name] ? `${name}-error` : undefined,
  className: clsx('field', status.fields?.[name] && 'border-red-500'),
})

/** Lets a no-JavaScript submission be redirected back to the page it came from. */
export function SourcePage() {
  return <input type="hidden" name="sourcePage" value={usePathname()} readOnly />
}

/** Status after a no-JavaScript submission was redirected back (?form=sent|error). */
export function useInitialStatus(): Status {
  const form = useSearchParams().get('form')
  if (form === 'sent') return { state: 'done' }
  if (form === 'error') return { state: 'error', message: 'Please check the form and try again.' }
  return { state: 'idle' }
}

/** Off-screen field bots fill in; real users never see or reach it. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  )
}

export function Consent({ status }: { status: Status }) {
  return (
    <div>
      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="consent" required className="mt-0.5 size-4 rounded border-plum-200 text-plum-800 accent-plum-800" />
        <span>
          I agree that Pups Harbour Consultancy may store these details and contact me about this request, as described in
          the <Link href="/privacy-policy" className="font-medium text-plum-800 underline">Privacy Policy</Link>.
        </span>
      </label>
      {status.fields?.consent && <p className="mt-1.5 text-sm text-red-700">{status.fields.consent}</p>}
    </div>
  )
}

export function Turnstile() {
  const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  if (!key) return null
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <div className="cf-turnstile" data-sitekey={key} data-theme="light" />
    </>
  )
}

export function SubmitRow({ status, label }: { status: Status; label: string }) {
  return (
    <div className="flex flex-col gap-3">
      {status.state === 'error' && status.message && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {status.message}
        </p>
      )}
      <button
        type="submit"
        disabled={status.state === 'sending'}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-6 py-3.5 font-semibold text-ink shadow-glow transition hover:bg-gold-400 disabled:opacity-60"
      >
        {status.state === 'sending' && <Loader2 aria-hidden className="size-5 animate-spin" />}
        {status.state === 'sending' ? 'Sending…' : label}
      </button>
    </div>
  )
}

export function Success({ message, extra }: { message: string; extra?: ReactNode }) {
  return (
    <div role="status" className="rounded-2xl bg-white p-8 text-center shadow-card ring-1 ring-plum-100">
      <CheckCircle2 aria-hidden className="mx-auto size-12 text-green-600" />
      <p className="mt-4 text-lg font-semibold text-plum-900">{message}</p>
      {extra}
    </div>
  )
}
