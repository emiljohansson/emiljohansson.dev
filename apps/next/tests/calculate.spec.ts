import { test, expect } from '@playwright/test'
import { chromium } from 'playwright'
import { playAudit } from 'playwright-lighthouse'
import { injectAxe, checkA11y } from 'axe-playwright'

test.describe('/calculate', () => {
  test('1+2', async ({ page }) => {
    // Go to http://localhost:3000/
    await page.goto('/')

    // Click text=calculate
    await Promise.all([
      page.waitForNavigation(/* { url: 'http://localhost:3000/calculate' } */),
      page.locator('text=calculate').click(),
    ])

    // Click input[name="q"]
    await page.locator('input[name="q"]').click()

    // Fill input[name="q"]
    await page.locator('input[name="q"]').fill('1+2')

    // Click button:has-text("Calculate")
    await Promise.all([
      page.waitForResponse(resp => {
        console.log('resp.url()', resp.url())
        console.log('resp.status()', resp.status())
        return resp.url().includes('/api/calculate') && resp.status() === 200
      }),
      page.locator('button:has-text("Calculate")').click(),
    ])

    // Click [data-test-id="sum"]
    const sum = page.locator('[data-test-id="sum"]')
    await expect(
      await sum.evaluate((node: HTMLElement) => node.innerText),
    ).toBe('3')
  })
})

test.describe('audit', () => {
  test('page', async ({ baseURL }) => {
    const port = 9002
    const browser = await chromium.launch({
      args: [`--remote-debugging-port=${port}`],
    })
    const page = await browser.newPage()
    await page.goto(`${baseURL}/calculate`)

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
    await page.goto(`${baseURL}/calculate`)
    await injectAxe(page)

    await checkA11y(page)

    await browser.close()
  })
})
