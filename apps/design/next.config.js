/** @type {import('next').NextConfig} */
module.exports = {
	transpilePackages: ['@repo/ui'],
	// basePath: process.env.NODE_ENV === 'production' ? '/design' : '',
	output: 'export',
}
