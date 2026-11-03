import { describe, expect, it } from 'vitest'

import { normalizeIndianMobile } from '@/lib/phone'

describe('normalizeIndianMobile', () => {
  it.each([
    ['7488835182', '+917488835182'],
    ['+91 74888 35182', '+917488835182'],
    ['91-7488835182', '+917488835182'],
    ['07488835182', '+917488835182'],
    [' (+91) 6206454663 ', '+916206454663'],
  ])('%s → %s', (input, expected) => {
    expect(normalizeIndianMobile(input)).toBe(expected)
  })

  it.each(['', '12345', '5488835182', '74888351829', '+1 415 555 0100', 'abcdefghij'])(
    'rejects %j',
    (input) => {
      expect(normalizeIndianMobile(input)).toBeNull()
    },
  )
})
