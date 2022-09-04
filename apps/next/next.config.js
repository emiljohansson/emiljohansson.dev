// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['lib'])

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
    // runtime: 'nodejs',
    // serverComponents: true,
  },
  // rewrites: async () => [
  //   {
  //     source: '/design/index.html',
  //     destination: './pages/api/static/design/index.html',
  //   },
  // ],
})
