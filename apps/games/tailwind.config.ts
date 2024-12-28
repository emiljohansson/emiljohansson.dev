import type { Config } from 'tailwindcss'
import sharedConfig from '@repo/tailwind-config'

const config = {
	content: ['./src/**/*.tsx'],
	presets: [sharedConfig],
	safelist: ['bg-yellow-400', 'bg-gray-400', 'bg-green-400'],
} satisfies Config

export default config
