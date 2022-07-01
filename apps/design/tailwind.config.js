/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('config/tailwind.config.js')

baseConfig.plugins.push(require('@tailwindcss/typography'))

module.exports = {
  ...baseConfig,
}
