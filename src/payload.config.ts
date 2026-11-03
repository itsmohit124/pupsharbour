import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { runBootstrap } from './auth/runBootstrap'
import { AuditLogs } from './collections/AuditLogs'
import { Media } from './collections/Media'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
// Extra trusted origins (comma-separated), e.g. localhost while the public URL is a tunnel.
const allowedOrigins = [
  serverURL,
  ...(process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
]

if (process.env.NODE_ENV === 'production' && (process.env.PAYLOAD_SECRET ?? '').length < 32) {
  throw new Error('PAYLOAD_SECRET must be set to a random string of at least 32 characters.')
}

export default buildConfig({
  serverURL,
  // Only our own origin may make credentialed requests to the API.
  cors: allowedOrigins,
  csrf: allowedOrigins,
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' · Pups Harbour Admin' },
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Media, Users, AuditLogs],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  graphQL: { disable: true }, // REST + Local API only: smaller attack surface
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./data/payload.db',
      authToken: process.env.DATABASE_AUTH_TOKEN || undefined, // Turso
    },
    transactionOptions: {}, // SQLite transactions are off by default; audit writes rely on them
    // Schema changes in production go through migrations, never auto-push.
    push: process.env.NODE_ENV !== 'production',
  }),
  sharp,
  onInit: async (payload) => {
    await runBootstrap(payload)
  },
  plugins: [],
})
