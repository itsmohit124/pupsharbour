import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import dotenv from 'dotenv'

// Every test file gets its own throwaway SQLite database (set BEFORE .env is loaded; dotenv
// never overrides existing vars). Bootstrap vars are cleared so tests control them explicitly.
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pupsharbour-test-'))
process.env.DATABASE_URL = `file:${path.join(dir, 'test.db')}`
process.env.DATABASE_AUTH_TOKEN = ''
process.env.PAYLOAD_SECRET ||= 'test-secret-that-is-long-enough-0123456789'
for (const k of ['BOOTSTRAP_ADMIN_EMAIL', 'BOOTSTRAP_ADMIN_PASSWORD', 'BOOTSTRAP_ADMIN_NAME']) {
  process.env[k] = ''
}

dotenv.config()
