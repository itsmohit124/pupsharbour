'use client'

import { Upload } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { Consent, Field, Honeypot, inputProps, SourcePage, SubmitRow, Success, Turnstile, useInitialStatus, type Status } from './shared'

const MAX = 5 * 1024 * 1024

export function ApplicationForm({ submitLabel, successMessage, note }: { submitLabel: string; successMessage: string; note?: string | null }) {
  const initial = useInitialStatus()
  const [status, setStatus] = useState<Status>(initial)
  const [fileName, setFileName] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const file = fd.get('resume')
    if (file instanceof File && file.size > MAX) {
      setStatus({ state: 'error', message: 'The file is larger than 5 MB.', fields: { resume: 'Max 5 MB.' } })
      return
    }
    fd.set('consent', fd.get('consent') === 'on' ? 'true' : 'false')
    fd.set('sourcePage', window.location.pathname)
    setStatus({ state: 'sending' })
    try {
      const res = await fetch('/api/forms/application', { method: 'POST', body: fd })
      const data = (await res.json().catch(() => ({}))) as { error?: string; fields?: Record<string, string> }
      if (res.ok) setStatus({ state: 'done' })
      else setStatus({ state: 'error', message: data.error ?? 'Something went wrong.', fields: data.fields })
    } catch {
      setStatus({ state: 'error', message: 'Network error. Please try again.' })
    }
  }

  if (status.state === 'done') return <Success message={successMessage} />

  const text = (name: string, label: string, required = false, extra: Record<string, string> = {}) => (
    <Field name={name} label={label} required={required} error={status.fields?.[name]}>
      <input {...inputProps(name, status, required)} {...extra} />
    </Field>
  )

  return (
    <form method="post" action="/api/forms/application" encType="multipart/form-data" onSubmit={onSubmit} noValidate className="relative grid gap-5 rounded-2xl bg-white p-6 shadow-card ring-1 ring-plum-100 sm:grid-cols-2 sm:p-8">
      <Honeypot />
      <SourcePage />
      {text('fullName', 'Full name', true, { autoComplete: 'name' })}
      {text('phone', 'Contact number', true, { type: 'tel', inputMode: 'tel', autoComplete: 'tel' })}
      {text('email', 'Email address', true, { type: 'email', autoComplete: 'email' })}
      {text('currentLocation', 'Current location', false, { autoComplete: 'address-level2' })}
      {text('qualification', 'Highest qualification')}
      {text('totalExperience', 'Total work experience', false, { placeholder: 'e.g. 4 years' })}
      {text('currentDesignation', 'Current designation')}
      {text('preferredLocation', 'Preferred job location')}
      {text('expectedCtc', 'Expected CTC', false, { placeholder: 'e.g. 6 LPA' })}
      {text('currentCtc', 'Current / last drawn CTC')}
      {text('noticePeriod', 'Notice period', false, { placeholder: 'e.g. 30 days' })}
      <Field name="resume" label="Upload resume" required error={status.fields?.resume}>
        <label className="field flex cursor-pointer items-center gap-2 text-muted">
          <Upload aria-hidden className="size-4 text-plum-700" />
          <span className="truncate">{fileName || 'PDF, DOC or DOCX (max 5 MB)'}</span>
          <input
            id="resume"
            name="resume"
            type="file"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
          />
        </label>
      </Field>
      <div className="sm:col-span-2">
        <Consent status={status} />
      </div>
      <div className="sm:col-span-2">
        <Turnstile />
      </div>
      <div className="sm:col-span-2">
        <SubmitRow status={status} label={submitLabel} />
        {note && <p className="mt-3 text-center text-xs text-muted italic">{note}</p>}
      </div>
    </form>
  )
}
