/**
 * First-user bootstrap from environment variables.
 *
 * Runs on every boot (from Payload `onInit`) but only ever acts when the users table is EMPTY:
 * it then creates one `super_admin` who must change the password at first login. Once any user
 * exists it never creates, overwrites or resets anyone, so leftover env vars are harmless
 * (we still log a reminder to remove them).
 *
 * The password is never logged or included in error messages.
 */
import type { Role } from '@/access/permissions'

export const MIN_BOOTSTRAP_PASSWORD_LENGTH = 14

export type BootstrapEnv = {
  BOOTSTRAP_ADMIN_EMAIL?: string
  BOOTSTRAP_ADMIN_PASSWORD?: string
  BOOTSTRAP_ADMIN_NAME?: string
}

export type BootstrapUser = {
  email: string
  password: string
  name: string
  role: Extract<Role, 'super_admin'>
  active: true
  mustChangePassword: true
}

export type BootstrapDeps = {
  env: BootstrapEnv
  countUsers: () => Promise<number>
  createUser: (user: BootstrapUser) => Promise<unknown>
  logger: { info: (msg: string) => void; warn: (msg: string) => void; error: (msg: string) => void }
}

export type BootstrapResult = 'created' | 'skipped:users-exist' | 'skipped:no-env'

export class BootstrapConfigError extends Error {
  constructor(message: string) {
    super(`[bootstrap] ${message}`)
    this.name = 'BootstrapConfigError'
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(env: BootstrapEnv): Omit<BootstrapUser, 'role' | 'active' | 'mustChangePassword'> {
  const email = env.BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase() ?? ''
  const password = env.BOOTSTRAP_ADMIN_PASSWORD ?? ''

  if (!email || !password) {
    throw new BootstrapConfigError(
      'BOOTSTRAP_ADMIN_EMAIL and BOOTSTRAP_ADMIN_PASSWORD must both be set (or both unset).',
    )
  }
  if (!EMAIL_RE.test(email)) {
    throw new BootstrapConfigError('BOOTSTRAP_ADMIN_EMAIL is not a valid email address.')
  }
  if (password.length < MIN_BOOTSTRAP_PASSWORD_LENGTH) {
    throw new BootstrapConfigError(
      `BOOTSTRAP_ADMIN_PASSWORD must be at least ${MIN_BOOTSTRAP_PASSWORD_LENGTH} characters.`,
    )
  }
  if (password.trim().toLowerCase() === email) {
    throw new BootstrapConfigError('BOOTSTRAP_ADMIN_PASSWORD must not equal the email.')
  }

  return { email, password, name: env.BOOTSTRAP_ADMIN_NAME?.trim() || 'Administrator' }
}

export async function bootstrapFirstAdmin(deps: BootstrapDeps): Promise<BootstrapResult> {
  const { env, logger } = deps
  const envPresent = Boolean(env.BOOTSTRAP_ADMIN_EMAIL || env.BOOTSTRAP_ADMIN_PASSWORD)

  if ((await deps.countUsers()) > 0) {
    if (envPresent) {
      logger.warn(
        '[bootstrap] Users already exist; bootstrap skipped. Remove BOOTSTRAP_ADMIN_* env vars now.',
      )
    }
    return 'skipped:users-exist'
  }

  if (!envPresent) {
    logger.warn(
      '[bootstrap] Bootstrap required: no users exist. Set BOOTSTRAP_ADMIN_EMAIL and ' +
        'BOOTSTRAP_ADMIN_PASSWORD, then restart. The admin panel stays locked until then.',
    )
    return 'skipped:no-env'
  }

  const creds = validate(env)
  await deps.createUser({ ...creds, role: 'super_admin', active: true, mustChangePassword: true })
  logger.info(
    `[bootstrap] Created super_admin ${creds.email}. They must change the password at first ` +
      'login. Remove BOOTSTRAP_ADMIN_* env vars now.',
  )
  return 'created'
}
