import fs from 'node:fs'
import path from 'node:path'

import type { Field } from 'payload'
import { describe, expect, it } from 'vitest'

import { guideFor, SECTION_GUIDES } from '@/admin/sectionGuides'
import { ALL_BLOCKS, BLOCK_SLUGS } from '@/blocks/configs'

/** Named fields of a block, flattening layout-only rows/collapsibles; ui fields have no data. */
function namedFields(fields: Field[]): string[] {
  return fields.flatMap((f) => {
    if ('name' in f && f.name) return f.type === 'ui' ? [] : [f.name]
    if ('fields' in f && Array.isArray(f.fields)) return namedFields(f.fields as Field[])
    return []
  })
}

describe('section guides (admin context panel)', () => {
  it('exist for every section type and nothing else', () => {
    expect(Object.keys(SECTION_GUIDES).sort()).toEqual([...BLOCK_SLUGS].sort())
  })

  for (const block of ALL_BLOCKS) {
    it(`${block.slug}: explains its purpose and every field editors can change`, () => {
      const g = guideFor(block.slug)
      expect(g.label.length).toBeGreaterThan(2)
      expect(g.purpose.length).toBeGreaterThan(20)
      for (const name of namedFields(block.fields)) {
        expect(g.fields[name], `${block.slug}.${name} has no "where it appears" note`).toBeTruthy()
      }
    })

    it(`${block.slug}: has a preview image on disk`, () => {
      const file = path.join(process.cwd(), 'public', g(block.slug).thumbnail)
      expect(fs.existsSync(file), file).toBe(true)
    })
  }

  it('starts every block with the context panel (ui field) and uses the rich row label', () => {
    for (const block of ALL_BLOCKS) {
      expect(block.fields[0]).toMatchObject({ name: 'sectionGuide', type: 'ui' })
      expect(block.admin?.components?.Label).toBeTruthy()
      expect(block.admin?.images?.thumbnail).toBeTruthy()
    }
  })
})

const g = (slug: string) => guideFor(slug)
