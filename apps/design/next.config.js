/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		externalDir: true,
	},
	basePath: process.env.NODE_ENV === 'production' ? '/design' : '',
}

module.exports = nextConfig
