import { defineConfig } from 'cypress'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse')

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents (on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        prepareAudit(launchOptions)
      })

      on('task', {
        lighthouse: lighthouse(),
      })
    },
  },
})
