/** Document uploads (resumes, job descriptions): check real file content (magic bytes), not just the name or browser-sent type. */
export const MAX_DOCUMENT_BYTES = 5 * 1024 * 1024

type Sniff = { ok: true; mimetype: string; ext: 'pdf' | 'doc' | 'docx' } | { ok: false; reason: string }

const startsWith = (b: Uint8Array, sig: number[]) => sig.every((v, i) => b[i] === v)

export function sniffDocument(bytes: Uint8Array, filename: string): Sniff {
  if (!bytes.length) return { ok: false, reason: 'The file is empty.' }
  if (bytes.length > MAX_DOCUMENT_BYTES) return { ok: false, reason: 'The file is larger than 5 MB.' }
  const ext = filename.toLowerCase().split('.').pop()

  let detected: Exclude<Sniff, { ok: false }> | null = null
  if (startsWith(bytes, [0x25, 0x50, 0x44, 0x46])) detected = { ok: true, mimetype: 'application/pdf', ext: 'pdf' }
  else if (startsWith(bytes, [0x50, 0x4b, 0x03, 0x04]))
    detected = { ok: true, mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', ext: 'docx' }
  else if (startsWith(bytes, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]))
    detected = { ok: true, mimetype: 'application/msword', ext: 'doc' }

  if (!detected) return { ok: false, reason: 'Please upload a PDF, DOC or DOCX file.' }
  if (ext !== detected.ext) return { ok: false, reason: 'The file extension does not match its content.' }
  return detected
}
