/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require("config/tailwind.config.js")

baseConfig.content = ["./src/**/*.{html,js,svelte,ts}"]

module.exports = {
	...baseConfig,
}
