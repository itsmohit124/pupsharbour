/**
 * Form schemas shared by the browser (instant feedback) and the API routes (the real check).
 * Never trust the client: the route handlers always re-validate with these.
 */
import { z } from 'zod'

import { normalizeIndianMobile } from '@/lib/phone'

const text = (max: number) => z.string().trim().max(max)
const required = (max: number, label: string) => text(max).min(1, `${label} is required.`)
const optional = (max: number) => text(max).optional().or(z.literal('').transform(() => undefined))

const phone = z
  .string()
  .trim()
  .transform((v, ctx) => {
    const n = normalizeIndianMobile(v)
    if (!n) {
      ctx.addIssue({ code: 'custom', message: 'Enter a valid 10-digit Indian mobile number.' })
      return z.NEVER
    }
    return n
  })

const consent = z.literal(true, { error: 'Please accept so we can contact you.' })
/** Hidden field real users never see; bots fill it. */
const honeypot = z.string().max(0, 'Invalid submission.').optional()

export const enquirySchema = z.object({
  companyName: required(150, 'Company name'),
  contactPerson: required(120, 'Contact person'),
  designation: optional(120),
  email: z.string().trim().toLowerCase().email('Enter a valid email address.').max(200),
  phone,
  industry: optional(120),
  organisationSize: optional(60),
  services: z.array(z.string().trim().max(120)).max(15).optional(),
  message: required(5000, 'Brief description of requirement'),
  consent,
  website: honeypot,
  sourcePage: optional(300),
})
export type EnquiryInput = z.infer<typeof enquirySchema>

export const applicationSchema = z.object({
  fullName: required(120, 'Full name'),
  phone,
  email: z.string().trim().toLowerCase().email('Enter a valid email address.').max(200),
  currentLocation: optional(120),
  qualification: optional(150),
  totalExperience: optional(60),
  currentDesignation: optional(120),
  preferredLocation: optional(120),
  expectedCtc: optional(60),
  currentCtc: optional(60),
  noticePeriod: optional(60),
  consent,
  website: honeypot,
  sourcePage: optional(300),
})
export type ApplicationInput = z.infer<typeof applicationSchema>

/** Flatten zod issues to { field: message } for the form UI. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form')
    out[key] ??= issue.message
  }
  return out
}
