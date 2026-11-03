import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'

import { config, proxy } from '@/proxy'

const req = (path: string, method = 'GET') => new NextRequest(new URL(path, 'http://localhost:3000'), { method })

describe('proxy: first-user registration is permanently closed', () => {
  it.each([
    ['/admin/create-first-user', 'GET'],
    ['/admin/create-first-user/', 'GET'],
    ['/api/users/first-register', 'POST'],
  ])('%s (%s) → 404', (path, method) => {
    expect(proxy(req(path, method)).status).toBe(404)
  })

  it.each(['/admin', '/admin/login', '/api/users/login', '/'])('%s passes through', (path) => {
    expect(proxy(req(path)).headers.get('x-middleware-next')).toBe('1')
  })

  it('the matcher covers both blocked routes', () => {
    expect(config.matcher).toEqual(
      expect.arrayContaining(['/admin/create-first-user/:path*', '/api/users/first-register/:path*']),
    )
  })
})
