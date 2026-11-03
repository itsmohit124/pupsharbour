import { expect, test } from '@playwright/test'

/** Smoke test against a running, seeded site (npm run seed && npm run dev). */
const PAGES: [string, RegExp][] = [
  ['/', /Solutions Partner/],
  ['/about', /Growth Partner/],
  ['/services', /Organisational Consulting Solutions/],
  ['/services/company-analysis-and-360-survey', /Company Analysis & 360° Survey/],
  ['/approach', /Methodology/],
  ['/industries', /diverse industries/],
  ['/insights', /growing businesses/],
  ['/careers', /Your Future/],
  ['/contact', /Together/],
  ['/privacy-policy', /Privacy Policy/],
]

for (const [path, h1] of PAGES) {
  test(`${path} renders its heading, header, footer and WhatsApp button`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    const res = await page.goto(path)
    expect(res?.status()).toBe(200)
    await expect(page.locator('h1').first()).toContainText(h1)
    await expect(page.getByRole('link', { name: /whatsapp/i }).first()).toBeVisible()
    await expect(page.locator('footer')).toContainText('Pups Harbour Consultancy')
    expect(errors).toEqual([])
  })
}

test('no horizontal scrolling on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 })
  for (const [path] of PAGES) {
    await page.goto(path)
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth), path).toBe(0)
  }
})

test('unknown pages return 404', async ({ page }) => {
  expect((await page.goto('/this-does-not-exist'))?.status()).toBe(404)
})

test('Payload first-user registration is closed', async ({ page }) => {
  expect((await page.goto('/admin/create-first-user'))?.status()).toBe(404)
})
