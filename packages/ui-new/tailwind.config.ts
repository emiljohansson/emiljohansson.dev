import type { Config } from 'tailwindcss'
import sharedConfig from '@repo/tailwind-config'

console.log('sharedConfig:', sharedConfig)

const config: Pick<Config, 'prefix' | 'presets' | 'content'> = {
	content: ['./src/**/*.tsx'],
	prefix: 'ui-',
	presets: [sharedConfig],
}

export default config
