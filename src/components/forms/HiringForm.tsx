'use client'

import { Upload } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'

import { Consent, Field, Honeypot, inputProps, SourcePage, SubmitRow, Success, Turnstile, useInitialStatus, type Status } from './shared'

const MAX = 5 * 1024 * 1024
const TIMELINES = ['Immediately', 'Within 15 days', 'Within 30 days', 'Within 60 days', 'Within 90 days', 'Flexible']

export function HiringForm({ submitLabel, successMessage, industries }: { submitLabel: string; successMessage: string; industries: string[] }) {
  const initial = useInitialStatus()
  const [status, setStatus] = useState<Status>(initial)
  const [fileName, setFileName] = useState('')
  const [industry, setIndustry] = useState((useSearchParams().get('industry') ?? '').slice(0, 120))

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const file = fd.get('jobDescription')
    if (file instanceof File && file.size > MAX) {
      setStatus({ state: 'error', message: 'The file is larger than 5 MB.', fields: { jobDescription: 'Max 5 MB.' } })
      return
    }
    if (file instanceof File && file.size === 0) fd.delete('jobDescription')
    fd.set('consent', fd.get('consent') === 'on' ? 'true' : 'false')
    setStatus({ state: 'sending' })
    try {
      const res = await fetch('/api/forms/hiring', { method: 'POST', body: fd })
      const data = (await res.json().catch(() => ({}))) as { error?: string; fields?: Record<string, string> }
      if (res.ok) setStatus({ state: 'done' })
      else setStatus({ state: 'error', message: data.error ?? 'Something went wrong.', fields: data.fields })
    } catch {
      setStatus({ state: 'error', message: 'Network error. Please try again or contact us on WhatsApp.' })
    }
  }

  if (status.state === 'done') return <Success message={successMessage} />

  const text = (name: string, label: string, required = false, extra: Record<string, string> = {}) => (
    <Field name={name} label={label} required={required} error={status.fields?.[name]}>
      <input {...inputProps(name, status, required)} {...extra} />
    </Field>
  )

  return (
    <form method="post" action="/api/forms/hiring" encType="multipart/form-data" onSubmit={onSubmit} noValidate className="relative grid gap-5 rounded-2xl bg-white p-6 shadow-card ring-1 ring-plum-100 sm:grid-cols-2 sm:p-8">
      <Honeypot />
      <SourcePage />
      {text('companyName', 'Company name', true, { autoComplete: 'organization' })}
      {text('contactPerson', 'Contact person', true, { autoComplete: 'name' })}
      {text('designation', 'Designation', false, { autoComplete: 'organization-title' })}
      {text('email', 'Email address', true, { type: 'email', autoComplete: 'email' })}
      {text('phone', 'Mobile number', true, { type: 'tel', inputMode: 'tel', autoComplete: 'tel' })}
      <Field name="industry" label="Industry" error={status.fields?.industry}>
        <input {...inputProps('industry', status)} list="hiring-industries" value={industry} onChange={(e) => setIndustry(e.target.value)} />
        <datalist id="hiring-industries">
          {industries.map((i) => (
            <option key={i} value={i} />
          ))}
        </datalist>
      </Field>
      {text('position', 'Position / job title', true)}
      {text('vacancies', 'Number of vacancies', false, { type: 'number', min: '1', max: '10000', inputMode: 'numeric' })}
      {text('location', 'Job location')}
      {text('experience', 'Experience required', false, { placeholder: 'e.g. 3–5 years' })}
      <Field name="timeline" label="Expected hiring timeline" error={status.fields?.timeline}>
        <select {...inputProps('timeline', status)} defaultValue="">
          <option value="">Select a timeline</option>
          {TIMELINES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>
      <Field name="jobDescription" label="Upload job description (optional)" error={status.fields?.jobDescription}>
        <label className="field flex cursor-pointer items-center gap-2 text-muted">
          <Upload aria-hidden className="size-4 text-plum-700" />
          <span className="truncate">{fileName || 'PDF, DOC or DOCX (max 5 MB)'}</span>
          <input
            id="jobDescription"
            name="jobDescription"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
          />
        </label>
      </Field>
      <Field name="message" label="Anything else we should know?" error={status.fields?.message} className="sm:col-span-2">
        <textarea {...inputProps('message', status)} rows={4} maxLength={5000} />
      </Field>
      <div className="sm:col-span-2">
        <Consent status={status} />
      </div>
      <div className="sm:col-span-2">
        <Turnstile />
      </div>
      <div className="sm:col-span-2">
        <SubmitRow status={status} label={submitLabel} />
      </div>
    </form>
  )
}
