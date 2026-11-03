import { getPayload } from 'payload'

import config from '../../src/payload.config.js'

export const testUser = {
  email: 'e2e-admin@pupsharbour.test',
  password: 'e2e-test-password-123',
  name: 'E2E Admin',
  role: 'super_admin' as const,
}

/** Seeds a super_admin for e2e admin tests (system context: bypasses the "no actor" rule). */
export async function seedTestUser(): Promise<void> {
  const payload = await getPayload({ config })
  await payload.delete({
    collection: 'users',
    where: { email: { equals: testUser.email } },
    context: { system: true },
  })
  await payload.create({ collection: 'users', data: testUser, context: { system: true } })
}

export async function cleanupTestUser(): Promise<void> {
  const payload = await getPayload({ config })
  await payload.delete({
    collection: 'users',
    where: { email: { equals: testUser.email } },
    context: { system: true },
  })
}
