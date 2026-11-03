import { describe, expect, it } from 'vitest'

import { BLOCK_SLUGS } from '@/blocks/configs'
import { BLOCK_RENDERERS, visibleBlocks } from '@/blocks/registry'

describe('block registry', () => {
  it('has exactly one renderer for every section schema (and no orphans)', () => {
    expect(Object.keys(BLOCK_RENDERERS).sort()).toEqual([...BLOCK_SLUGS].sort())
  })

  it('skips sections marked hidden but keeps their order otherwise', () => {
    const layout = [
      { blockType: 'cta', id: 'a', heading: 'A', settings: { hidden: false } },
      { blockType: 'cta', id: 'b', heading: 'B', settings: { hidden: true } },
      { blockType: 'cta', id: 'c', heading: 'C' },
    ] as never
    expect(visibleBlocks(layout).map((b) => b.id)).toEqual(['a', 'c'])
  })

  it('handles empty layouts', () => {
    expect(visibleBlocks(null)).toEqual([])
    expect(visibleBlocks(undefined)).toEqual([])
  })
})
