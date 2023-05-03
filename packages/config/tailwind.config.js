/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

// dark #222128
// darker #16151a

// dark #1e1d2b
// less dark #252736

// level 1 #202228
// level 2 #242832
// level 3 #2a2e36

/*
background shares:
#1e1d2b
#454353
#6f6d7f
#9d9bad
#cdcbde
*/

module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{ts,tsx,js,jsx}',
		'./app/**/*.{ts,tsx,js,jsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
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
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
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
