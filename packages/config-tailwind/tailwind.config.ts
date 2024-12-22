import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import defaultTheme from 'tailwindcss/defaultTheme'

// We want each package to be responsible for its own content.
const config: Omit<Config, 'content'> = {
	darkMode: 'class',
	content: [
		'./src/**/*.{ts,tsx,js,jsx}',
		'./app/**/*.{ts,tsx,js,jsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				dots: 'conic-gradient(at 92% 8%, rgb(200, 200, 200) 90deg, transparent 0deg, transparent 225deg, transparent 0deg)',
			},
			boxShadow: {
				'thin-border': '0 0 0 .5px var(--tw-shadow-color)',
			},
			colors: {
				primary: {
					dark: '#c62e1d',
					DEFAULT: '#e94f37',
				},
				secondary: '#c084fc',
				accent: '#67e8f9',
				neutral: '#191D24',
				'base-100': '#ffffff',
				info: '#38bdf8',
				success: '#4ade80',
				warning: '#FBBD23',
				error: '#ef4444',
				// yellow: {
				//   DEFAULT: '#fed766',
				// },
				black: {
					DEFAULT: '#000000',
					// rich: '#1e1d2b',
					rich: '#0d1117',
					900: '#161b22',
					800: '#454353',
					700: '#6f6d7f',
					600: '#9d9bad',
					500: '#cdcbde',
				},
				blue: '#e9f1f7',
				'blue-star-command': '#2274a5',
				eggshell: '#e7dfc6',
				gray: {
					900: '#111',
					600: '#666',
					500: '#888',
					400: '#a1a1a1',
					300: '#e6e6ea',
					dark: '#383838',
					light: '#f4f4f8',
				},
			},
			fontFamily: {
				sans: [...defaultTheme.fontFamily.sans],
			},
			fontSize: {
				'3/6': '50%',
			},
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						'--tw-prose-body': theme('colors.black'),
						'--tw-prose-invert-body': theme('colors.white'),
					},
				},
			}),
			gridTemplateColumns: {
				'2-auto': 'repeat(2, minmax(0, auto))',
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('size', '&:size')
			addVariant('direction', '&:direction')
			addVariant('data-disabled', '&[data-disabled]')
			addVariant('state-active', '&[data-state="active"]')
		}),
		require('@tailwindcss/typography'),
	],
}
export default config
