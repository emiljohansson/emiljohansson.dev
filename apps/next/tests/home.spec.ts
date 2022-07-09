import { test, expect } from '@playwright/test'
import { chromium } from 'playwright'
import { playAudit } from 'playwright-lighthouse'
import { injectAxe, checkA11y } from 'axe-playwright'

test.describe('home', () => {
  test('test', async ({ page }) => {
    // Go to http://localhost:3000/
    await page.goto('/')

    // Click [data-test-id="toggle-dark-mode"]
    await page.locator('[data-test-id="toggle-dark-mode"]').click()

    // Click [data-test-id="toggle-dark-mode"]
    await page.locator('[data-test-id="toggle-dark-mode"]').click()

    // Click text=Random String
    await Promise.all([
      page.waitForNavigation(/* { url: 'http://localhost:3000/random-string' } */),
      page.locator('[data-test=random-string]').click(),
    ])

    // Click button:has-text("Refresh")
    await page.locator('button:has-text("Refresh")').click()

    // Click button:has-text("Copy")
    await page.locator('button:has-text("Copy")').click()

    // Click a path
    await page.locator('a path').click()
    await expect(page).toHaveURL('/')
  })
})

test.describe('audit', () => {
  test('root page', async ({ baseURL }) => {
    const port = 9001
    const browser = await chromium.launch({
      args: [`--remote-debugging-port=${port}`],
    })
    const page = await browser.newPage()
    await page.goto(baseURL)

    await playAudit({
      page,
      thresholds: {
        performance: 95,
        accessibility: 100,
        'best-practices': 100,
        seo: 100,
      },
      port,
    })

    await browser.close()
  })
})

test.describe('accessibility', () => {
  test('root page', async ({ baseURL }) => {
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto(baseURL)
    await injectAxe(page)

    await checkA11y(page)

    await browser.close()
  })
})
