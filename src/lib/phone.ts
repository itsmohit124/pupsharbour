/**
 * Normalise an Indian mobile number to E.164 (+91XXXXXXXXXX), or return null if it isn't one.
 * Accepts spaces, dashes, brackets, a leading 0, 91 or +91. Mobile numbers start with 6–9.
 * Reused by the staff profile and (later) the enquiry/application forms and WhatsApp links.
 */
export function normalizeIndianMobile(input: string): string | null {
  let digits = input.replace(/[\s\-()]/g, '')
  if (digits.startsWith('+')) digits = digits.slice(1)
  if (!/^\d+$/.test(digits)) return null
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  return /^[6-9]\d{9}$/.test(digits) ? `+91${digits}` : null
}
