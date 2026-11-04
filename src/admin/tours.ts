/**
 * Guided tours (driver.js). Targets are our own `data-tour` hooks or stable Payload admin
 * selectors; if a target is missing on screen, the step shows as a centred popover instead.
 */
import type { Capability } from '@/access/permissions'

export type TourStep = { target?: string; title: string; body: string; requires?: Capability[] }
export type Tour = { id: 'dashboard' | 'editor'; label: string; steps: TourStep[] }

/** Every selector a tour may use. Tests check tours only use these. */
export const TOUR_TARGETS = {
  welcome: '[data-tour="welcome"]',
  quickActions: '[data-tour="quick-actions"]',
  navToggle: '.nav-toggler',
  pagesCard: '#card-pages',
  submissions: '#card-enquiries',
  settings: '#card-site-settings',
  helpLink: '[data-tour="help-link"]',
  sectionsField: '.field-type.blocks-field',
  sectionRow: '[data-tour="section-row"]',
  sectionGuide: '[data-tour="section-guide"]',
  addSection: 'button.blocks-field__drawer-toggler',
  livePreview: 'button.live-preview-toggler',
  publish: '#action-save',
  versions: 'a[href*="/versions"]',
} as const

export type TourTarget = keyof typeof TOUR_TARGETS
const t = (target: TourTarget) => TOUR_TARGETS[target]

export const TOURS: Tour[] = [
  {
    id: 'dashboard',
    label: 'Admin overview',
    steps: [
      { title: 'Welcome to the Pups Harbour admin', body: 'This short tour shows where everything is. You can stop at any time and replay it from the menu.' },
      { target: t('welcome'), title: 'Your dashboard', body: 'Quick actions and anything new (enquiries, hiring requirements, applications) appear here.' },
      { target: t('quickActions'), title: 'Quick actions', body: 'Jump straight to the most common tasks, like editing the home page or reviewing new enquiries.' },
      { target: t('pagesCard'), title: 'Website pages', body: 'Every page of the website. Open one to edit its sections: text, buttons, cards and images.', requires: ['content.draft'] },
      { target: t('submissions'), title: 'Submissions', body: 'Business enquiries and hiring requirements from the website forms. Set a status and add notes as you follow up.', requires: ['enquiries.read', 'hiring.read'] },
      { target: t('settings'), title: 'Website settings', body: 'Phone numbers, WhatsApp, email, the menu and the footer, all in one place.', requires: ['globals.settings', 'globals.layout'] },
      { target: t('helpLink'), title: 'Help is always here', body: 'Step-by-step guides for every task, filtered to what your role can do. Open the menu (☰) to find "Help & guides" and "Take the tour".' },
    ],
  },
  {
    id: 'editor',
    label: 'Editing a page',
    steps: [
      { title: 'Editing a page', body: 'A page is a stack of sections, in the same order as on the website. Let’s look at how to change them.' },
      { target: t('sectionsField'), title: 'The sections', body: 'Each row is one section of the page. Drag the ⋮⋮ handle to reorder; use the ⋯ menu to duplicate or remove.' },
      { target: t('sectionRow'), title: 'Section row', body: 'Shows the section type (gold), its headline, how many items it has, and a red "Hidden on website" badge when hidden. Click to open it.' },
      { target: t('sectionGuide'), title: 'About this section', body: 'Every section starts with a picture of how it looks on the website and a list of where each field appears. Open a section to see it.' },
      { target: t('addSection'), title: 'Add a section', body: 'Add a new section from the picker. Each type shows a preview image. It is added at the end; drag it into place.' },
      { target: t('livePreview'), title: 'Live Preview', body: 'See your changes side by side as you type, on mobile, tablet or desktop.' },
      { title: 'Autosave & drafts', body: 'Pages save a draft automatically while you type. Drafts never change the website until you press Publish.' },
      { target: t('publish'), title: 'Publish', body: 'Makes your changes live on the website within seconds. Contributors need an editor or admin to publish.', requires: ['content.publish'] },
      { target: t('versions'), title: 'Versions', body: 'Every saved version is kept. Admins can compare and restore an earlier one if something goes wrong.', requires: ['content.delete'] },
    ],
  },
]

export function stepsFor(tour: Tour, canDo: (c: Capability) => boolean): TourStep[] {
  return tour.steps.filter((s) => !s.requires || s.requires.some(canDo))
}
