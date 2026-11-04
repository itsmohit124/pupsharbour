import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { runBootstrap } from './auth/runBootstrap'
import { AuditLogs } from './collections/AuditLogs'
import { Industries } from './collections/Industries'
import { Insights } from './collections/Insights'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { ServiceGroups } from './collections/ServiceGroups'
import { Services } from './collections/Services'
import { Applications, Enquiries, JobDescriptions, Resumes } from './collections/submissions'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { Footer, Header, SiteSettings } from './globals'

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
    meta: {
      titleSuffix: ' · Pups Harbour Admin',
      icons: [{ rel: 'icon', type: 'image/png', url: '/brand/favicon-32.png' }],
    },
    importMap: { baseDir: path.resolve(dirname) },
    // Side-by-side preview while editing. Relative URL keeps it same-origin with the admin, and it
    // goes through /api/preview which only enables draft mode for signed-in staff.
    livePreview: {
      collections: ['pages', 'services', 'insights'],
      url: ({ data, collectionConfig }) => {
        const slug = (data?.slug as string) || ''
        const path =
          collectionConfig?.slug === 'services' ? `/services/${slug}`
          : collectionConfig?.slug === 'insights' ? `/insights/${slug}`
          : slug === 'home' ? '/' : `/${slug}`
        return `/api/preview?path=${encodeURIComponent(path)}`
      },
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
    components: {
      beforeDashboard: ['/components/admin/DashboardWelcome#DashboardWelcome'],
      afterNavLinks: ['/components/admin/NavHelpLinks#NavHelpLinks'],
      views: {
        help: { Component: '/components/admin/HelpView#HelpView', path: '/help', exact: false },
      },
      graphics: {
        Logo: '/components/admin/Brand#AdminLogo',
        Icon: '/components/admin/Brand#AdminIcon',
      },
    },
  },
  collections: [
    Pages, Services, ServiceGroups, Industries, Insights, Testimonials, Media,
    Enquiries, JobDescriptions, Applications, Resumes,
    Users, AuditLogs,
  ],
  globals: [SiteSettings, Header, Footer],
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
    // Schema changes always go through versioned migrations (src/migrations, `npm run migrate`).
    // Only the test suite auto-pushes, onto throwaway databases.
    push: process.env.PAYLOAD_DB_PUSH === 'true',
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  onInit: async (payload) => {
    await runBootstrap(payload)
  },
  plugins: [],
})
