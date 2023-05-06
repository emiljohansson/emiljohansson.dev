/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	transpilePackages: ['ui'],
	experimental: {
		appDir: true,
	},
}
