/**
 * Usage:  npm run seed            (only when the site has no pages yet)
 *         SEED_RESET=1 npm run seed (recreate website content; users/submissions/media untouched)
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { seed } from '../src/seed'

const payload = await getPayload({ config })
await seed(payload, {
  reset: process.argv.includes('--reset') || process.env.SEED_RESET === '1',
  force: process.env.SEED_FORCE === '1',
})
process.exit(0)
