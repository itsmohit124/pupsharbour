/**
 * Admin help center content (/admin/help). Structured so the help view can filter by role and
 * tests can check every guide is complete. Keep the wording plain: these are for office staff.
 */
import type { Capability } from '@/access/permissions'

export type GuideStep = { title: string; body: string; image?: string }
export type Guide = {
  slug: string
  title: string
  summary: string
  /** Shown if the user has ANY of these capabilities. Omit = everyone. */
  requires?: Capability[]
  steps: GuideStep[]
  tips?: string[]
}

const img = (name: string) => `/admin-guide/steps/${name}.png`

export const GUIDES: Guide[] = [
  {
    slug: 'getting-started',
    title: 'Getting started',
    summary: 'Sign in, find your way around the dashboard and take the guided tour.',
    steps: [
      { title: 'Sign in', body: 'Go to pupsharbour.com/admin and sign in with your email and password. After 5 wrong attempts the account locks for 15 minutes.' },
      { title: 'The dashboard', body: 'The dashboard groups everything you can manage: Website (pages and content), Submissions (enquiries, hiring requirements, applications), Website settings (contact details, menu, footer) and System (staff, audit log). You only see what your role allows.', image: img('dashboard') },
      { title: 'The menu on the left', body: 'Use the ☰ button (top left) to open the menu from any screen. "Help & guides" and "Take the tour" are at the bottom of the menu.' },
      { title: 'Take the tour', body: 'The guided tour highlights each part of the screen and explains it. It starts automatically the first time, and you can replay it any time from the menu.' },
    ],
    tips: ['Your session ends after 2 hours of inactivity; just sign in again.', 'Nothing you do in the admin is public until you press Publish.'],
  },
  {
    slug: 'edit-a-page',
    title: 'Edit text on a page',
    summary: 'Change any heading, paragraph, button or card on the website.',
    requires: ['content.draft'],
    steps: [
      { title: 'Open the page', body: 'Website → Pages, then click the page (e.g. Home). Each page is a stack of sections, shown in the order they appear on the website.', image: img('page-editor') },
      { title: 'Find the section', body: 'Each row shows the section type in gold, its headline, how many items it has, and a red "Hidden on website" badge if it is hidden. Click a row to open it.', image: img('section-row') },
      { title: 'Read "About this section"', body: 'The panel at the top of every section shows a picture of how it looks on the website and what it is for. Click "Show where each field appears" to see exactly what each box changes.', image: img('section-guide') },
      { title: 'Change the text', body: 'Edit the fields. Lists (cards, bullets, steps) can be reordered by dragging the ⋮⋮ handle, and each item has a ⋯ menu to duplicate or remove it.' },
      { title: 'Check it and publish', body: 'Click "Live Preview" (the screen icon at the top) to see the page update as you type, on mobile, tablet or desktop. When it looks right, press "Publish changes".' },
    ],
    tips: ['Headline + "Highlight" = the highlight words appear in gold italics at the end of the headline.', 'Use "Save Draft" to keep work without publishing it.'],
  },
  {
    slug: 'manage-sections',
    title: 'Add, reorder, hide or delete sections',
    summary: 'Build a page from ready-made sections that always match the brand.',
    requires: ['content.draft'],
    steps: [
      { title: 'Add a section', body: 'At the bottom of the section list click "Add Layout". Pick a section type; each one shows a picture of how it looks. It is added at the end; drag it to the right place.' },
      { title: 'Reorder', body: 'Drag a section by its ⋮⋮ handle on the left of the row. The website shows sections in exactly this order.' },
      { title: 'Hide without deleting', body: 'Open the section, scroll to "Section settings" and tick "Hidden". The section disappears from the website but stays in the admin so you can bring it back any time.' },
      { title: 'Duplicate or remove', body: 'Use the ⋯ menu on the right of a section row to duplicate it, or remove it. Removed sections can be recovered from Versions by an admin.' },
      { title: 'Section types reference', body: 'See "Section types" in this help center (/admin/help/section-types) for a picture and explanation of every section type.' },
    ],
    tips: ['You cannot break the design: every section has fixed styling, and you only change its content.'],
  },
  {
    slug: 'drafts-and-publishing',
    title: 'Drafts, Live Preview & Publish',
    summary: 'Work safely: nothing goes live until you publish.',
    requires: ['content.draft'],
    steps: [
      { title: 'Autosave & drafts', body: 'Pages save a draft automatically while you type. The website does not change until you publish.' },
      { title: 'Live Preview', body: 'Click the Live Preview icon at the top of the editor to see the page side by side. Switch between Mobile, Tablet and Desktop.' },
      { title: 'Preview button', body: 'The ↗ button opens the draft in a new tab with a yellow "Preview mode" banner. Only signed-in staff can see drafts.' },
      { title: 'Publish', body: 'Press "Publish changes". The website updates within seconds. Contributors can save drafts but an editor or admin must publish.' },
    ],
  },
  {
    slug: 'versions',
    title: 'Restore an old version',
    summary: 'Undo mistakes by going back to any earlier saved version.',
    requires: ['content.delete'],
    steps: [
      { title: 'Open Versions', body: 'In the page editor, click "Versions" at the top. Every save and publish is listed with date and time.' },
      { title: 'Compare', body: 'Click a version to see exactly what changed compared with the current one.' },
      { title: 'Restore', body: 'Click "Restore this version", then publish. Only admins can restore versions.' },
    ],
  },
  {
    slug: 'services',
    title: 'Services & service groups',
    summary: 'Edit the 13 services, their bullet points, groups and the flagship service.',
    requires: ['content.draft'],
    steps: [
      { title: 'Open a service', body: 'Website → Services. Each service has a title, short title (used in menus and the footer), summary, "Our services include" bullets, focus line and optional disclaimer.' },
      { title: 'Group and order', body: 'Choose its group (e.g. Compliance & Risk Management) and an order number. Lower numbers appear first.' },
      { title: 'Flagship', body: 'Tick "Flagship" to highlight a service (currently Company Analysis & 360° Survey). It gets a gold badge and is shown first in its group.' },
      { title: 'Everywhere at once', body: 'Changes appear automatically on the Services page, the service detail page, the Services menu, the home ecosystem and the footer.' },
    ],
  },
  {
    slug: 'industries',
    title: 'Industries',
    summary: 'Edit the industry cards and add photos.',
    requires: ['content.publish'],
    steps: [
      { title: 'Edit', body: 'Website → Industries. Change the title, icon, summary and order.' },
      { title: 'Add a photo', body: 'Upload a photo in "Image" to replace the illustrated card. Use a landscape photo, at least 1200px wide, and fill in the alt text.' },
    ],
  },
  {
    slug: 'insights',
    title: 'Write an Insight article',
    summary: 'Publish HR and compliance updates. The Insights menu item appears once one is published.',
    requires: ['content.draft'],
    steps: [
      { title: 'Create', body: 'Website → Insights → Create new. Add a title, category, publish date and a short summary (shown on cards and in Google).' },
      { title: 'Write', body: 'Write the article in "Body" (headings, bold, lists, links). Add a cover image if you have one.' },
      { title: 'Publish', body: 'Preview it, then publish. The Insights page and menu item update automatically.' },
    ],
    tips: ['Double-check legal figures (wages, PF/ESIC limits) against official notifications before publishing.'],
  },
  {
    slug: 'testimonials',
    title: 'Testimonials',
    summary: 'Add real client quotes. The section stays hidden until there is at least one.',
    requires: ['content.publish'],
    steps: [
      { title: 'Add', body: 'Website → Testimonials → Create new. Add the quote, the person\'s name, designation, company and an optional measurable outcome.' },
      { title: 'Permission', body: 'Only publish quotes and results the client has approved.' },
    ],
  },
  {
    slug: 'media',
    title: 'Images & alt text',
    summary: 'Upload photos for the hero, industries, testimonials and articles.',
    requires: ['media.upload'],
    steps: [
      { title: 'Upload', body: 'Website → Media → Create new, or upload directly from any image field. PNG, JPG, WebP or AVIF.' },
      { title: 'Alt text', body: 'Always describe the image ("HR team reviewing candidate profiles"). It is required for accessibility and helps Google.' },
      { title: 'Sizes', body: 'Smaller versions are created automatically, so upload the original high-quality photo.' },
    ],
  },
  {
    slug: 'site-settings',
    title: 'Site settings, phone & WhatsApp',
    summary: 'Change contact numbers, email, hours, location and the WhatsApp message.',
    requires: ['globals.settings'],
    steps: [
      { title: 'Open', body: 'Website settings → Site settings.' },
      { title: 'Phones', body: 'Main phone, WhatsApp number, Business enquiries phone and Recruitment phone. They update everywhere: contact page, footer, contact cards and every WhatsApp button.' },
      { title: 'WhatsApp message', body: 'The pre-filled message a visitor sends when they tap a WhatsApp button.' },
    ],
  },
  {
    slug: 'menu-and-footer',
    title: 'Header menu & footer',
    summary: 'Change menu items, header buttons and footer links.',
    requires: ['globals.layout'],
    steps: [
      { title: 'Menu', body: 'Website settings → Header. Add, reorder or remove menu items. Set "Services (automatic)" to show the services dropdown, or "Hide while no Insights are published" for Insights.' },
      { title: 'Buttons', body: 'The outline button (Request a Demo) and gold button (Contact Us) on the right of the header.' },
      { title: 'Footer', body: 'Website settings → Footer: about text, quick links, legal links and the closing line. The services column fills itself from Services.' },
    ],
  },
  {
    slug: 'enquiries',
    title: 'Business enquiries & hiring requirements',
    summary: 'Follow up on enquiries from the Contact page and hiring requirements from For Employers.',
    requires: ['enquiries.read', 'hiring.read'],
    steps: [
      { title: 'Open the list', body: 'Submissions → Business enquiries. Use the Type column/filter to separate "Business enquiry" from "Hiring requirement". New submissions also send an email alert.', image: img('enquiries') },
      { title: 'Open one', body: 'You can read everything the visitor sent. Their details are read-only so the record stays accurate.' },
      { title: 'Track progress', body: 'Set Status (New → Contacted → Qualified → Won/Lost) and add internal Notes in the sidebar. Notes are never shown publicly.' },
      { title: 'Job description', body: 'Hiring requirements may include a job-description file. Click it to download (signed-in staff only).' },
    ],
    tips: ['Recruiters see hiring requirements only; business enquiries are visible to admins.'],
  },
  {
    slug: 'applications',
    title: 'Job applications & resumes',
    summary: 'Review candidates from the Careers page.',
    requires: ['applications.read'],
    steps: [
      { title: 'Open', body: 'Submissions → Job applications. Newest first.' },
      { title: 'Resume', body: 'Click the resume to download it. Resumes are private: only staff with access to applications can open them.' },
      { title: 'Track', body: 'Set Status (New → Shortlisted → Interviewed → Placed/Rejected) and add internal Notes.' },
    ],
    tips: ['Candidate data is personal data. Do not forward resumes outside the team without the candidate\'s consent.'],
  },
  {
    slug: 'staff-and-roles',
    title: 'Staff users & roles',
    summary: 'Invite colleagues and choose what each person can do.',
    requires: ['users.manage'],
    steps: [
      { title: 'Roles', body: 'Super admin (everything), Admin (everything except managing super admins), Editor (edit + publish content), Contributor (drafts only), Recruiter (job applications + hiring requirements only).' },
      { title: 'Add a person', body: 'System → Staff users → Create new. Enter name, email and role, then they can set their password via "Forgot password" on the sign-in screen.' },
      { title: 'Deactivate', body: 'Untick "Active" to block sign-in immediately without deleting the account.' },
      { title: 'Audit log', body: 'System → Audit log shows who signed in and who changed, published or deleted what, and when.' },
    ],
    tips: ['Nobody can change their own role, and the last super admin can never be removed.'],
  },
  {
    slug: 'account-security',
    title: 'Your account & security',
    summary: 'Change your password and keep the admin safe.',
    steps: [
      { title: 'Change password', body: 'Click your avatar (top right) → Account → Change password. Use at least 12 characters; a short sentence works well.' },
      { title: 'Lockout', body: 'After 5 wrong passwords the account locks for 15 minutes. An admin can unlock it sooner.' },
      { title: 'Shared computers', body: 'Always log out (avatar → Log out) when you finish on a shared computer.' },
    ],
  },
  {
    slug: 'faq',
    title: 'FAQ & troubleshooting',
    summary: 'Quick answers to common questions.',
    steps: [
      { title: 'I published but the website did not change', body: 'Refresh the website page. If you still see the old text, check you pressed "Publish changes" (not only "Save Draft").' },
      { title: 'A section disappeared', body: 'Open the page and look for a red "Hidden on website" badge on the section row. Untick Hidden in its Section settings.' },
      { title: 'I deleted something by mistake', body: 'Ask an admin to open the page → Versions and restore the previous version.' },
      { title: 'I cannot see a menu item', body: 'Your role does not include it. Ask an admin if you need access.' },
      { title: 'Something else?', body: 'Contact your site administrator.' },
    ],
  },
]

export function guidesFor(canDo: (c: Capability) => boolean): Guide[] {
  return GUIDES.filter((g) => !g.requires || g.requires.some(canDo))
}
