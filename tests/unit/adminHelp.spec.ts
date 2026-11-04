import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { can, CAPABILITIES, ROLES, type Role } from '@/access/permissions'
import { GUIDES, guidesFor } from '@/admin/guides'
import { stepsFor, TOUR_TARGETS, TOURS } from '@/admin/tours'

const canAs = (role: Role) => (c: (typeof CAPABILITIES)[number]) => can({ role, active: true }, c)

describe('help center guides', () => {
  it('have unique slugs, titles, summaries and at least two steps', () => {
    expect(new Set(GUIDES.map((g) => g.slug)).size).toBe(GUIDES.length)
    for (const g of GUIDES) {
      expect(g.title, g.slug).toBeTruthy()
      expect(g.summary.length, g.slug).toBeGreaterThan(15)
      expect(g.steps.length, g.slug).toBeGreaterThanOrEqual(2)
      for (const s of g.steps) expect(s.body.length, `${g.slug}: ${s.title}`).toBeGreaterThan(20)
    }
  })

  it('only reference real capabilities', () => {
    for (const g of GUIDES) for (const c of g.requires ?? []) expect(CAPABILITIES).toContain(c)
  })

  it('every referenced screenshot exists', () => {
    for (const g of GUIDES)
      for (const s of g.steps) if (s.image) expect(fs.existsSync(path.join(process.cwd(), 'public', s.image)), s.image).toBe(true)
  })

  it('is role-aware: a contributor sees fewer guides than a super admin, and no staff/settings guides', () => {
    const sa = guidesFor(canAs('super_admin')).map((g) => g.slug)
    const contributor = guidesFor(canAs('contributor')).map((g) => g.slug)
    const recruiter = guidesFor(canAs('recruiter')).map((g) => g.slug)
    expect(sa).toHaveLength(GUIDES.length)
    expect(contributor.length).toBeLessThan(sa.length)
    expect(contributor).not.toContain('staff-and-roles')
    expect(contributor).not.toContain('site-settings')
    expect(recruiter).toEqual(expect.arrayContaining(['applications', 'enquiries', 'getting-started']))
    expect(recruiter).not.toContain('edit-a-page')
  })
})

describe('guided tours', () => {
  it('use only known targets', () => {
    const known = new Set(Object.values(TOUR_TARGETS))
    for (const tour of TOURS) for (const s of tour.steps) if (s.target) expect(known.has(s.target as never), s.title).toBe(true)
  })

  it('every step has a title and body; tours start with an untargeted intro', () => {
    for (const tour of TOURS) {
      expect(tour.steps[0].target).toBeUndefined()
      for (const s of tour.steps) expect(s.title && s.body.length > 15).toBeTruthy()
    }
  })

  it('drop steps the role cannot use', () => {
    const editor = TOURS.find((t) => t.id === 'editor')!
    expect(stepsFor(editor, canAs('contributor')).map((s) => s.title)).not.toContain('Publish')
    expect(stepsFor(editor, canAs('super_admin')).map((s) => s.title)).toContain('Versions')
    for (const role of ROLES) expect(stepsFor(TOURS[0], canAs(role)).length).toBeGreaterThan(2)
  })
})
