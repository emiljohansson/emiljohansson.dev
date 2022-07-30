// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['lib'])

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
    runtime: 'experimental-edge',
    serverComponents: true,
  },
})
