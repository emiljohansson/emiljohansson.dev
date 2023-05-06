/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('config/tailwind.config.js')

module.exports = {
	presets: [baseConfig],
	safelist: ['bg-yellow-400', 'bg-gray-400', 'text-5xl', 'mb-10', 'font-bold'],
}
