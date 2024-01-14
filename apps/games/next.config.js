const million = require('million/compiler')
/** @type {import('next').NextConfig} */
module.exports = million.next(
	{
		transpilePackages: ['ui'],
	},
	{ auto: { rsc: true } },
)
