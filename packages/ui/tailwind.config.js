// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharedConfig = require('config/tailwind.config.js')

module.exports = {
	content: ['./src/**/*.tsx'],
	// prefix ui lib classes to avoid conflicting with the app
	// prefix: 'ui-',
	presets: [sharedConfig],
}
