// eslint-disable-next-line @typescript-eslint/no-var-requires
// const withTM = require('next-transpile-modules')(['lib'])

// module.exports = withTM({
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    externalDir: true,
    // runtime: 'nodejs',
    // serverComponents: true,
  },
}
