/**
 * The one place that maps a section type (block slug) to its renderer.
 * `satisfies Record<Page['layout'][number]['blockType'], …>` makes TypeScript fail the build if a
 * block schema exists without a renderer (or vice versa); tests/unit/blockRegistry.spec.ts checks
 * the same at runtime.
 */
import type { ReactNode } from 'react'

import type { SiteData } from '@/lib/data'
import type { Page } from '@/payload-types'

import { Features, List, Packages, Pillars, Process, RichContent, VisionMission } from './components/content'
import {
  ContactInfo, CTA, Industries, InsightsList, LiveDemo, ServiceEcosystem, ServicesDetail, Testimonials,
} from './components/data'
import { ApplicationFormSection, EnquiryFormSection } from './components/forms'
import { Hero, PageHeader, Stats } from './components/hero'

export type LayoutBlock = NonNullable<Page['layout']>[number]
type BlockType = LayoutBlock['blockType']
type Renderer = (props: { block: never; ctx: SiteData }) => ReactNode | Promise<ReactNode>

export const BLOCK_RENDERERS = {
  hero: Hero,
  pageHeader: PageHeader,
  stats: Stats,
  richContent: RichContent,
  pillars: Pillars,
  features: Features,
  serviceEcosystem: ServiceEcosystem,
  servicesDetail: ServicesDetail,
  process: Process,
  packages: Packages,
  list: List,
  visionMission: VisionMission,
  industries: Industries,
  liveDemo: LiveDemo,
  testimonials: Testimonials,
  insightsList: InsightsList,
  cta: CTA,
  enquiryForm: EnquiryFormSection,
  applicationForm: ApplicationFormSection,
  contactInfo: ContactInfo,
} satisfies Record<BlockType, Renderer>

/** Sections editors marked hidden are skipped (kept in the CMS, never rendered). */
export function visibleBlocks(layout: Page['layout']): LayoutBlock[] {
  return (layout ?? []).filter((b) => !(b.settings as { hidden?: boolean | null } | undefined)?.hidden)
}

export function RenderBlocks({ layout, ctx }: { layout: Page['layout']; ctx: SiteData }) {
  return (
    <>
      {visibleBlocks(layout).map((block, i) => {
        const Cmp = BLOCK_RENDERERS[block.blockType] as Renderer | undefined
        return Cmp ? <Cmp key={block.id ?? i} block={block as never} ctx={ctx} /> : null
      })}
    </>
  )
}
