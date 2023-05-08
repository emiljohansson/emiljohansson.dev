/** @type {import('next').NextConfig} */
module.exports = {
	transpilePackages: ['ui'],
	basePath: process.env.NODE_ENV === 'production' ? '/design' : '',
	output: 'export',
}
