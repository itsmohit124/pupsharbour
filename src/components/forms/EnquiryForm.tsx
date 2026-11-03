'use client'

import { useSearchParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'

import { Consent, Field, Honeypot, inputProps, SourcePage, SubmitRow, Success, Turnstile, useInitialStatus, type Status } from './shared'

const SIZES = ['1–10', '11–50', '51–200', '201–500', '501–1000', '1000+']

export function EnquiryForm({
  services,
  industries,
  submitLabel,
  successMessage,
  whatsapp,
}: {
  services: { slug: string; title: string }[]
  industries: string[]
  submitLabel: string
  successMessage: string
  whatsapp: string
}) {
  const initial = useInitialStatus()
  const [status, setStatus] = useState<Status>(initial)
  const [industry, setIndustry] = useState((useSearchParams().get('industry') ?? '').slice(0, 120))

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const body = {
      ...Object.fromEntries([...fd.entries()].filter(([k]) => k !== 'services' && k !== 'consent')),
      services: fd.getAll('services').map(String),
      consent: fd.get('consent') === 'on',
      sourcePage: window.location.pathname,
    }
    setStatus({ state: 'sending' })
    try {
      const res = await fetch('/api/forms/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string; fields?: Record<string, string> }
      if (res.ok) setStatus({ state: 'done' })
      else setStatus({ state: 'error', message: data.error ?? 'Something went wrong.', fields: data.fields })
    } catch {
      setStatus({ state: 'error', message: 'Network error. Please try again or contact us on WhatsApp.' })
    }
  }

  if (status.state === 'done') {
    return (
      <Success
        message={successMessage}
        extra={
          <p className="mt-3 text-sm text-muted">
            Need a faster response?{' '}
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-plum-800 underline">
              Message us on WhatsApp
            </a>
            .
          </p>
        }
      />
    )
  }

  return (
    <form method="post" action="/api/forms/enquiry" onSubmit={onSubmit} noValidate className="relative grid gap-5 rounded-2xl bg-white p-6 shadow-card ring-1 ring-plum-100 sm:grid-cols-2 sm:p-8">
      <Honeypot />
      <SourcePage />
      <Field name="companyName" label="Company name" required error={status.fields?.companyName}>
        <input {...inputProps('companyName', status, true)} autoComplete="organization" />
      </Field>
      <Field name="contactPerson" label="Contact person" required error={status.fields?.contactPerson}>
        <input {...inputProps('contactPerson', status, true)} autoComplete="name" />
      </Field>
      <Field name="designation" label="Designation" error={status.fields?.designation}>
        <input {...inputProps('designation', status)} autoComplete="organization-title" />
      </Field>
      <Field name="email" label="Business email" required error={status.fields?.email}>
        <input {...inputProps('email', status, true)} type="email" autoComplete="email" />
      </Field>
      <Field name="phone" label="Contact number" required error={status.fields?.phone}>
        <input {...inputProps('phone', status, true)} type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" />
      </Field>
      <Field name="industry" label="Industry" error={status.fields?.industry}>
        <input {...inputProps('industry', status)} list="industry-options" value={industry} onChange={(e) => setIndustry(e.target.value)} />
        <datalist id="industry-options">
          {industries.map((i) => (
            <option key={i} value={i} />
          ))}
        </datalist>
      </Field>
      <Field name="organisationSize" label="Organisation size" error={status.fields?.organisationSize} className="sm:col-span-2">
        <select {...inputProps('organisationSize', status)} defaultValue="">
          <option value="">Select number of employees</option>
          {SIZES.map((s) => (
            <option key={s} value={s}>
              {s} employees
            </option>
          ))}
        </select>
      </Field>
      <fieldset className="sm:col-span-2">
        <legend className="label">Services required</legend>
        <div className="grid gap-2 rounded-lg border border-plum-200 p-3 sm:grid-cols-2">
          {services.map((s) => (
            <label key={s.slug} className="flex items-start gap-2 text-sm">
              <input type="checkbox" name="services" value={s.slug} className="mt-0.5 size-4 accent-plum-800" />
              {s.title}
            </label>
          ))}
        </div>
      </fieldset>
      <Field name="message" label="Brief description of requirement" required error={status.fields?.message} className="sm:col-span-2">
        <textarea {...inputProps('message', status, true)} rows={5} maxLength={5000} />
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
