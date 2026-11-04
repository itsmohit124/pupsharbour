/**
 * What every section type is, and where each of its fields shows up on the website.
 * Used by the "About this section" panel inside each section in the admin, the section-type
 * reference in Help, and the section picker thumbnails. Covered by tests/unit/sectionGuides.spec.ts.
 */
export type SectionGuide = {
  label: string
  purpose: string
  /** Pages where this section is used today (informational). */
  usedOn?: string
  /** field name → where it appears / what it changes */
  fields: Record<string, string>
  thumbnail: string
}

const COMMON: Record<string, string> = {
  eyebrow: 'Small uppercase label above the headline.',
  heading: 'The main headline of this section.',
  highlight: 'Words shown in gold italics right after the headline (optional).',
  intro: 'The paragraph directly under the headline.',
  settings: 'Section settings: Hidden removes the section from the website without deleting it; Anchor lets buttons link to it (e.g. /contact#enquiry); Background switches between white, soft tint and dark plum.',
  hidden: 'Tick to hide this section from the website. Untick to show it again. Nothing is deleted.',
  anchorId: 'Short id so buttons can jump to this section, e.g. "demo" makes /#demo work.',
  theme: 'Background colour of the section: white, soft tint or dark plum.',
  label: 'Button text.',
  href: 'Where the button goes: a page path like /contact, an #anchor or a full https:// link.',
  icon: 'Icon picked from the curated icon set (keeps every icon on-brand).',
  title: 'Card or item title.',
  description: 'Short text under the card title.',
  text: 'The text of this line.',
  items: 'The cards or lines in this section. Drag to reorder, use ⋯ to duplicate or remove.',
  bullets: 'Tick-marked bullet points.',
  paragraphs: 'Body paragraphs, in order.',
  primaryCta: 'The main (gold) button.',
  secondaryCta: 'The outline button next to it.',
  cta: 'Button shown at the end of the section.',
  submitLabel: 'Text on the submit button.',
  successMessage: 'Message the visitor sees after submitting.',
  note: 'Small italic note.',
  closing: 'Emphasised closing line in italics.',
}

const guide = (slug: string, label: string, purpose: string, fields: Record<string, string> = {}, usedOn?: string): [string, SectionGuide] => [
  slug,
  { label, purpose, usedOn, fields: { ...COMMON, ...fields }, thumbnail: `/admin-guide/sections/${slug}.png` },
]

export const SECTION_GUIDES: Record<string, SectionGuide> = Object.fromEntries([
  guide('hero', 'Hero', 'The large dark banner at the very top of the homepage: headline, intro, two buttons, the highlight icons and the lighthouse picture.', {
    body: 'Optional second, smaller paragraph under the intro.',
    waypoints: 'The glowing labels along the lighthouse light-path (up to 6).',
    highlights: 'The row of four icons under the buttons (e.g. Hire Smarter).',
    image: 'Optional photo. When empty, the lighthouse illustration is shown.',
  }, 'Home'),
  guide('pageHeader', 'Page header', 'The dark title band at the top of every inner page (About, Services, Careers…).', {
    breadcrumb: 'Small "Home / …" trail above the title.',
  }, 'Every inner page'),
  guide('stats', 'Stats bar', 'The row of headline numbers under the hero (e.g. 10,000+ Talent Placements). Only show figures you can stand behind.', {
    value: 'The big number or word, e.g. "200+".',
  }, 'Home'),
  guide('richContent', 'Text', 'A heading with paragraphs, optional bullet points and an italic closing line. Use it for stories, introductions and philosophies.', {
    layout: 'Centred, or heading on the left with text on the right.',
  }, 'Home, About, Services, Careers, legal pages'),
  guide('pillars', 'Pillars', 'Numbered cards for the four strategic pillars (Brand, Marketing, HR, Strategy), each with optional focus areas.', {}, 'Home'),
  guide('features', 'Feature grid', 'A grid of icon cards: Why Choose Us, Core Values, Advantages, Why Apply, Why Partner.', {
    columns: 'How many cards per row on large screens.',
    variant: 'Cards, or plain items with the heading on the left.',
  }, 'Home, About, Careers, For Employers'),
  guide('serviceEcosystem', 'Service ecosystem', 'The four service groups around the "End-to-End People Solutions" wheel. The groups and services come from Services → Service groups automatically.', {
    centerLabel: 'Text in the middle of the wheel.',
    showServices: 'Also list each group\'s services on its card.',
  }, 'Home, Services'),
  guide('servicesDetail', 'All services (detailed)', 'Every service grouped, with its bullet points and a link to its own page. Content comes from the Services collection; edit services there.', {}, 'Services'),
  guide('process', 'Process steps', 'Numbered steps joined by a line, e.g. Discover → Plan → Execute → Review, or the 6-step recruitment process.', {
    steps: 'The steps in order. Drag to reorder.',
    subtitle: 'Small line under the step title.',
    activities: 'Bullet list under a step (shown only if "Show activities" is ticked).',
    showActivities: 'Show each step\'s activity list.',
  }, 'Home, Approach, For Employers'),
  guide('packages', 'Engagement packages', 'Side-by-side package cards (Basic, Standard, Premium). The featured one is highlighted in plum and gold.', {
    tiers: 'The package cards.',
    name: 'Small uppercase package name, e.g. BASIC.',
    subtitle: 'Package headline, e.g. Discovery & Assessment.',
    includesPrevious: 'Line before the list, e.g. "Everything in Basic, plus:".',
    featured: 'Highlight this package.',
  }, 'Approach'),
  guide('list', 'Simple list', 'A list shown as ticks, chips or icon tiles: career areas, hiring sectors, who we serve.', {
    variant: 'Check list, chips or icon tiles.',
  }, 'Careers, Approach, For Employers'),
  guide('visionMission', 'Vision & mission', 'Two cards side by side: the vision statement (dark) and the mission bullet list (light).', {
    visionHeading: 'Title of the vision card.',
    vision: 'The vision statement.',
    missionHeading: 'Title of the mission card.',
    mission: 'Mission bullet points.',
  }, 'About'),
  guide('industries', 'Industries', 'Industry cards. The industries come from the Industries collection (add photos there).', {
    variant: 'Image strip (dark, compact) or detailed cards with descriptions.',
  }, 'Home, Industries'),
  guide('liveDemo', 'Live demo', 'Text and module list next to an illustrative HR dashboard (laptop mock-up).', {
    modules: 'The demo modules listed as buttons.',
  }, 'Home'),
  guide('testimonials', 'Testimonials', 'Client quotes. Add real quotes under Website → Testimonials; this section stays invisible while there are none.', {}, 'Home'),
  guide('insightsList', 'Latest insights', 'Cards for the newest published Insight articles.', {
    limit: 'How many articles to show.',
  }, 'Insights'),
  guide('cta', 'Call to action', 'The rounded banner that invites visitors to act: book a consultation, explore services, WhatsApp.', {
    showWhatsApp: 'Also show a "WhatsApp us" button (number from Site settings).',
  }, 'End of most pages'),
  guide('enquiryForm', 'Business enquiry form', 'The business enquiry form. Submissions arrive under Submissions → Business enquiries.', {}, 'Contact, service pages'),
  guide('hiringForm', 'Employer hiring-requirement form', 'The employer form for hiring requirements, with an optional job-description upload. Submissions arrive under Business enquiries with type "Hiring requirement".', {}, 'For Employers'),
  guide('applicationForm', 'Job-seeker (resume) form', 'The candidate form with resume upload. Applications arrive under Submissions → Job applications.', {}, 'Careers'),
  guide('contactInfo', 'Contact details', 'The contact card: phones, email, hours, location and website, with WhatsApp and email buttons. The details come from Website settings → Site settings.', {}, 'Contact'),
  guide('audienceSplit', 'Audience choice (Employer / Job seeker)', 'Two or three large cards that send each visitor down the right path, e.g. "I\'m an Employer" / "I\'m a Job Seeker".', {
    cards: 'The cards. The first card is highlighted in plum.',
    phone: 'Show one of the phone numbers from Site settings on the card.',
  }, 'Home, Contact'),
])

export function guideFor(slug: string): SectionGuide {
  const g = SECTION_GUIDES[slug]
  if (!g) throw new Error(`No section guide for "${slug}"`)
  return g
}
