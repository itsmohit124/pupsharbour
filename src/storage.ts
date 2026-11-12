import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import type { Plugin } from 'payload'

/**
 * File storage is chosen by environment, so the same code runs on a VPS and on serverless hosts:
 *  - S3_BUCKET (+ credentials) set  -> files live in S3 / Cloudflare R2 (Netlify, Vercel).
 *  - S3_BUCKET unset                -> files live on local disk under ./data (VPS, local dev).
 *
 * Private collections (resumes, job descriptions) stay behind Payload's access-checked file route in
 * both modes: the bucket must be PRIVATE and `disablePayloadAccessControl` is never enabled.
 */
export const useCloudStorage = Boolean(process.env.S3_BUCKET)

/** Local `staticDir` for a collection, or undefined when cloud storage handles the files. */
export function localDir(dirname: string, ...segments: string[]): string | undefined {
  return useCloudStorage ? undefined : path.resolve(dirname, ...segments)
}

export function storagePlugins(): Plugin[] {
  if (!useCloudStorage) return []
  return [
    s3Storage({
      collections: {
        media: { prefix: 'media' },
        resumes: { prefix: 'resumes' },
        'job-descriptions': { prefix: 'job-descriptions' },
      },
      bucket: process.env.S3_BUCKET as string,
      config: {
        region: process.env.S3_REGION || 'auto',
        endpoint: process.env.S3_ENDPOINT || undefined, // R2: https://<account>.r2.cloudflarestorage.com
        forcePathStyle: Boolean(process.env.S3_ENDPOINT),
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
        },
      },
    }),
  ]
}
