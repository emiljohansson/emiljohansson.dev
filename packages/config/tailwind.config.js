const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          faded: '#de6449',
          DEFAULT: '#e94f37',
          tart: '#fe4a49',
        },
        yellow: '#fed766',
        black: {
          rich: '#131B23',
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
      fontSize: {
        '3/6': '50%',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('size', '&:size')
      addVariant('direction', '&:direction')
    }),
  ],
}
