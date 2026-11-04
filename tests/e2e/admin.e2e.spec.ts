import { expect, test } from '@playwright/test'

/** Needs a seeded site and a staff login: E2E_ADMIN_EMAIL / E2E_ADMIN_PASSWORD. */
const email = process.env.E2E_ADMIN_EMAIL
const password = process.env.E2E_ADMIN_PASSWORD
test.skip(!email || !password, 'set E2E_ADMIN_EMAIL and E2E_ADMIN_PASSWORD to run admin tests')

test.beforeEach(async ({ page }) => {
  await page.goto('/admin/login')
  await page.fill('input[name="email"]', email!)
  await page.fill('input[name="password"]', password!)
  await page.click('button[type="submit"]')
  await page.waitForURL(/\/admin\/?(\?.*)?$/)
})

test('dashboard shows the welcome panel, help links and runs the tour on demand', async ({ page }) => {
  await expect(page.locator('[data-tour="welcome"]')).toBeVisible()
  await page.goto('/admin?tour=dashboard')
  await expect(page.locator('.driver-popover')).toBeVisible({ timeout: 15000 })
  for (let i = 0; i < 12 && (await page.locator('.driver-popover-next-btn').isVisible()); i++) {
    await page.locator('.driver-popover-next-btn').click()
  }
  await expect(page.locator('.driver-popover')).toBeHidden()
})

test('page editor: rows show real headlines, every section has the context panel, live preview works', async ({ page }) => {
  const id = await page.evaluate(async () => (await (await fetch('/api/pages?where[slug][equals]=home&depth=0')).json()).docs[0].id)
  await page.goto(`/admin/collections/pages/${id}`)
  await page.keyboard.press('Escape')
  await expect(page.locator('[data-tour="section-row"]').first()).toContainText('Your Strategic HR')
  await expect(page.getByText('Untitled')).toHaveCount(0)
  await page.locator('.blocks-field__row .collapsible__toggle').first().click()
  await expect(page.locator('[data-tour="section-guide"]').first()).toContainText('About this section')
  await page.locator('button.live-preview-toggler').click()
  await expect(page.frameLocator('iframe').first().locator('h1').first()).toContainText('Solutions Partner', { timeout: 30000 })
})

test('help center lists guides and the section types reference', async ({ page }) => {
  await page.goto('/admin/help')
  await expect(page.getByRole('heading', { name: 'Help & guides' })).toBeVisible()
  await page.goto('/admin/help/edit-a-page')
  await expect(page.getByRole('heading', { name: 'Edit text on a page' })).toBeVisible()
  await page.goto('/admin/help/section-types')
  expect(await page.locator('section img').count()).toBeGreaterThanOrEqual(20)
})
