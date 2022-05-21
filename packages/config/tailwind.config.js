// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

// dark #222128
// darker #16151a

// dark #1e1d2b
// less dark #252736

// level 1 #202228
// level 2 #242832
// level 3 #2a2e36

module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../shared/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          faded: '#de6449',
          DEFAULT: '#e94f37',
          tart: '#fe4a49',
        },
        // yellow: {
        //   DEFAULT: '#fed766',
        // },
        black: {
          rich: '#1e1d2b',
        },
        blue: '#e9f1f7',
        'blue-star-command': '#2274a5',
        eggshell: '#e7dfc6',
        gray: {
          light: '#f4f4f8',
          300: '#e6e6ea',
          dark: '#383838',
        },
      },
      fontFamily: {
        'museo-moderno': ['MuseoModerno', 'cursive'],
      },
      fontSize: {
        '3/6': '50%',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('size', '&:size')
      addVariant('direction', '&:direction')
      addVariant('data-disabled', '&[data-disabled]')
    }),
  ],
}
