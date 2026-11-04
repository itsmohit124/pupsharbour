/**
 * Regenerates the admin preview images from the real, running, seeded site:
 *   public/admin-guide/sections/<block>.png  (section picker + "About this section" + Help)
 *   public/admin-guide/steps/<name>.png      (Help center step screenshots)
 *
 * Usage: npm run dev (seeded) then
 *   ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/capture-admin-images.mjs [baseUrl]
 */
import fs from 'node:fs'
import path from 'node:path'

import { chromium } from '@playwright/test'
import sharp from 'sharp'

const BASE = process.argv[2] || 'http://localhost:3000'
const OUT = path.resolve('public/admin-guide')
const SECTIONS = path.join(OUT, 'sections')
const STEPS = path.join(OUT, 'steps')
fs.mkdirSync(SECTIONS, { recursive: true })
fs.mkdirSync(STEPS, { recursive: true })

const PAGES = ['/', '/about', '/services', '/approach', '/employers', '/industries', '/insights', '/careers', '/contact']
const ALL = [
  'hero', 'pageHeader', 'stats', 'richContent', 'pillars', 'features', 'serviceEcosystem', 'servicesDetail', 'process',
  'packages', 'list', 'visionMission', 'industries', 'liveDemo', 'testimonials', 'insightsList', 'cta', 'enquiryForm',
  'hiringForm', 'applicationForm', 'contactInfo', 'audienceSplit',
]

/** Resize to `width` and crop to at most `maxHeight` (tall sections are shown from the top). */
async function save(buffer, file, width = 800, maxHeight = 640) {
  const resized = await sharp(buffer).resize({ width, withoutEnlargement: true }).toBuffer({ resolveWithObject: true })
  const height = Math.min(resized.info.height, maxHeight)
  await sharp(resized.data).extract({ left: 0, top: 0, width: resized.info.width, height }).png({ compressionLevel: 9 }).toFile(file)
}

async function placeholder(slug, label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="360"><rect width="800" height="360" fill="#faf6fb"/>
    <rect x="40" y="40" width="720" height="280" rx="20" fill="#fff" stroke="#e4d3ea"/>
    <text x="400" y="170" font-family="Georgia" font-size="34" fill="#3c0c48" text-anchor="middle">${label}</text>
    <text x="400" y="215" font-family="Arial" font-size="18" fill="#5d5366" text-anchor="middle">Appears automatically once content is added</text></svg>`
  await sharp(Buffer.from(svg)).png().toFile(path.join(SECTIONS, `${slug}.png`))
}

/** Close an auto-started guided tour so it does not cover the screenshot. */
async function dismissTour(page) {
  await page.keyboard.press('Escape')
  await page.addStyleTag({ content: '.driver-popover,.driver-overlay{display:none!important}' })
}

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 })
const page = await ctx.newPage()

// 1) one screenshot per section type, from the first page that uses it
const done = new Set()
for (const p of PAGES) {
  await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 180000 })
  await page.addStyleTag({ content: 'a[aria-label*="WhatsApp"].fixed{display:none!important} nextjs-portal{display:none!important}' })
  for (const el of await page.$$('[data-block]')) {
    const slug = await el.getAttribute('data-block')
    if (done.has(slug) || !(await el.boundingBox())?.height) continue
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(150)
    await save(await el.screenshot(), path.join(SECTIONS, `${slug}.png`))
    done.add(slug)
    console.log('section', slug, 'from', p)
  }
}
const labels = { testimonials: 'Testimonials', insightsList: 'Latest insights' }
for (const slug of ALL.filter((s) => !done.has(s))) {
  await placeholder(slug, labels[slug] ?? slug)
  console.log('section', slug, '(placeholder)')
}

// 2) admin screenshots for the help guides
const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD
if (email && password) {
  await page.goto(BASE + '/admin/login', { waitUntil: 'networkidle' })
  await page.fill('input[name="email"]', email)
  await page.fill('input[name="password"]', password)
  await page.click('button[type="submit"]')
  await page.waitForURL(/\/admin\/?(\?.*)?$/, { timeout: 120000 })
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(1500)
  await dismissTour(page)
  await save(await page.screenshot(), path.join(STEPS, 'dashboard.png'), 1000, 760)

  const home = await page.evaluate(async () => (await (await fetch('/api/pages?where[slug][equals]=home&depth=0')).json()).docs[0].id)
  await page.goto(`${BASE}/admin/collections/pages/${home}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  await dismissTour(page)
  await save(await page.screenshot(), path.join(STEPS, 'page-editor.png'), 1000, 760)

  const row = page.locator('[data-tour="section-row"]').nth(2)
  await save(await row.screenshot(), path.join(STEPS, 'section-row.png'), 900, 120)
  // The row label sits under Payload's collapsible toggle button; click the toggle.
  await row.locator('xpath=ancestor::*[contains(@class,"blocks-field__row")][1]').locator('.collapsible__toggle').first().click()
  const guide = page.locator('[data-tour="section-guide"]').first()
  await guide.waitFor({ timeout: 20000 })
  await guide.getByRole('button').first().click()
  await page.waitForTimeout(300)
  await save(await guide.screenshot(), path.join(STEPS, 'section-guide.png'), 900, 700)

  await page.goto(`${BASE}/admin/collections/enquiries`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  await dismissTour(page)
  await save(await page.screenshot(), path.join(STEPS, 'enquiries.png'), 1000, 600)
  console.log('admin steps captured')
} else {
  console.log('ADMIN_EMAIL/ADMIN_PASSWORD not set: skipped admin step screenshots')
}
await browser.close()
