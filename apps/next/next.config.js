module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    externalDir: true,
    transpilePackages: ['lib'],
  },
}
