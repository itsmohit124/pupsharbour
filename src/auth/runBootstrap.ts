import type { Payload } from 'payload'

import { bootstrapFirstAdmin, type BootstrapEnv } from './bootstrap'

/** Wires the pure bootstrap logic to Payload. Called from `onInit`; a config error aborts startup. */
export async function runBootstrap(payload: Payload, env: BootstrapEnv = process.env as BootstrapEnv) {
  return bootstrapFirstAdmin({
    env,
    countUsers: async () => (await payload.count({ collection: 'users', overrideAccess: true })).totalDocs,
    createUser: (data) =>
      payload.create({ collection: 'users', data, overrideAccess: true, context: { system: true } }),
    logger: {
      info: (m) => payload.logger.info(m),
      warn: (m) => payload.logger.warn(m),
      error: (m) => payload.logger.error(m),
    },
  })
}
