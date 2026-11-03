import { describe, expect, it, vi } from 'vitest'

import { BootstrapConfigError, bootstrapFirstAdmin } from '@/auth/bootstrap'

const GOOD = {
  BOOTSTRAP_ADMIN_EMAIL: 'Owner@PupsHarbour.com ',
  BOOTSTRAP_ADMIN_PASSWORD: 'correct-horse-battery-staple',
  BOOTSTRAP_ADMIN_NAME: 'Site Owner',
}

function deps(userCount: number) {
  const logs: string[] = []
  const log = (m: string) => logs.push(m)
  return {
    logs,
    countUsers: vi.fn(async () => userCount),
    createUser: vi.fn(async () => undefined),
    logger: { info: log, warn: log, error: log },
  }
}

describe('bootstrapFirstAdmin', () => {
  it('creates exactly one super_admin when the users table is empty and env is valid', async () => {
    const d = deps(0)
    const result = await bootstrapFirstAdmin({ env: GOOD, ...d })

    expect(result).toBe('created')
    expect(d.createUser).toHaveBeenCalledTimes(1)
    expect(d.createUser).toHaveBeenCalledWith({
      email: 'owner@pupsharbour.com',
      password: GOOD.BOOTSTRAP_ADMIN_PASSWORD,
      name: 'Site Owner',
      role: 'super_admin',
      active: true,
      mustChangePassword: true,
    })
  })

  it('does nothing when any user already exists, and reminds to remove the env vars', async () => {
    const d = deps(3)
    const result = await bootstrapFirstAdmin({ env: GOOD, ...d })

    expect(result).toBe('skipped:users-exist')
    expect(d.createUser).not.toHaveBeenCalled()
    expect(d.logs.join('\n')).toMatch(/remove BOOTSTRAP_ADMIN_/i)
  })

  it('does not validate env when users exist (old weak values cannot break startup)', async () => {
    const d = deps(1)
    const env = { BOOTSTRAP_ADMIN_EMAIL: 'x', BOOTSTRAP_ADMIN_PASSWORD: 'short' }
    await expect(bootstrapFirstAdmin({ env, ...d })).resolves.toBe('skipped:users-exist')
  })

  it('is silent when users exist and the env vars are already removed', async () => {
    const d = deps(1)
    await bootstrapFirstAdmin({ env: {}, ...d })
    expect(d.logs).toEqual([])
  })

  it('leaves the admin locked (and warns) when no users and no env', async () => {
    const d = deps(0)
    const result = await bootstrapFirstAdmin({ env: {}, ...d })

    expect(result).toBe('skipped:no-env')
    expect(d.createUser).not.toHaveBeenCalled()
    expect(d.logs.join('\n')).toMatch(/bootstrap required/i)
  })

  it.each([
    ['missing password', { BOOTSTRAP_ADMIN_EMAIL: GOOD.BOOTSTRAP_ADMIN_EMAIL }],
    ['missing email', { BOOTSTRAP_ADMIN_PASSWORD: GOOD.BOOTSTRAP_ADMIN_PASSWORD }],
    ['invalid email', { ...GOOD, BOOTSTRAP_ADMIN_EMAIL: 'not-an-email' }],
    ['password shorter than 14', { ...GOOD, BOOTSTRAP_ADMIN_PASSWORD: 'Sh0rt-pass!' }],
    [
      'password equal to email',
      { BOOTSTRAP_ADMIN_EMAIL: 'longemail@example.com', BOOTSTRAP_ADMIN_PASSWORD: 'longemail@example.com' },
    ],
  ])('fails startup on %s', async (_label, env) => {
    const d = deps(0)
    await expect(bootstrapFirstAdmin({ env, ...d })).rejects.toBeInstanceOf(BootstrapConfigError)
    expect(d.createUser).not.toHaveBeenCalled()
  })

  it('never writes the password to any log or error message', async () => {
    const secret = 'Sh0rt-secret!'
    const d = deps(0)
    const err = await bootstrapFirstAdmin({
      env: { ...GOOD, BOOTSTRAP_ADMIN_PASSWORD: secret },
      ...d,
    }).catch((e: Error) => e)

    expect(String((err as Error).message)).not.toContain(secret)
    expect(d.logs.join('\n')).not.toContain(secret)

    const ok = deps(0)
    await bootstrapFirstAdmin({ env: GOOD, ...ok })
    expect(ok.logs.join('\n')).not.toContain(GOOD.BOOTSTRAP_ADMIN_PASSWORD)
  })

  it('defaults the name when BOOTSTRAP_ADMIN_NAME is not set', async () => {
    const d = deps(0)
    const { BOOTSTRAP_ADMIN_NAME: _omit, ...env } = GOOD
    await bootstrapFirstAdmin({ env, ...d })
    expect(d.createUser).toHaveBeenCalledWith(expect.objectContaining({ name: 'Administrator' }))
  })
})
