import { test } from '@playwright/test'
import { chromium } from 'playwright'
import { playAudit } from 'playwright-lighthouse'
import { injectAxe, checkA11y } from 'axe-playwright'

test.describe('audit', () => {
  test('page', async ({ baseURL }) => {
    const port = 9002
    const browser = await chromium.launch({
      args: [`--remote-debugging-port=${port}`],
    })
    const page = await browser.newPage()
    await page.goto(`${baseURL}/progress-bar`)

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
  test('page', async ({ baseURL }) => {
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto(`${baseURL}/progress-bar`)
    await injectAxe(page)

    await checkA11y(page)

    await browser.close()
  })
})
