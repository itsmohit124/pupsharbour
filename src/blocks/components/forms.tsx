import { Suspense } from 'react'

import { ApplicationForm } from '@/components/forms/ApplicationForm'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { SectionHeading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { whatsappHref, type SiteData } from '@/lib/data'
import type { ApplicationFormBlock, EnquiryFormBlock } from '@/payload-types'

export function EnquiryFormSection({ block, ctx }: { block: EnquiryFormBlock; ctx: SiteData }) {
  return (
    <Section
      settings={{ ...block.settings, anchorId: block.settings?.anchorId || 'enquiry' }}
      defaultTheme="soft"
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <SectionHeading
          eyebrow={block.eyebrow}
          heading={block.heading}
          highlight={block.highlight}
          intro={block.intro}
          className="lg:col-span-4"
        />
        <div className="lg:col-span-8">
          <Suspense>
            <EnquiryForm
              services={ctx.services.map((s) => ({ slug: s.slug, title: s.title }))}
              industries={ctx.industries.map((i) => i.title)}
              submitLabel={block.submitLabel || 'Send Business Enquiry'}
              successMessage={block.successMessage || 'Thank you. We will be in touch shortly.'}
              whatsapp={whatsappHref(ctx.settings)}
            />
          </Suspense>
        </div>
      </div>
    </Section>
  )
}

export function ApplicationFormSection({ block }: { block: ApplicationFormBlock }) {
  return (
    <Section settings={{ ...block.settings, anchorId: block.settings?.anchorId || 'apply' }}>
      <div className="grid gap-10 lg:grid-cols-12">
        <SectionHeading
          eyebrow={block.eyebrow}
          heading={block.heading}
          highlight={block.highlight}
          intro={block.intro}
          className="lg:col-span-4"
        />
        <div className="lg:col-span-8">
          <Suspense>
            <ApplicationForm
              submitLabel={block.submitLabel || 'Submit Your Resume'}
              successMessage={block.successMessage || 'Thank you for applying.'}
              note={block.note}
            />
          </Suspense>
        </div>
      </div>
    </Section>
  )
}
