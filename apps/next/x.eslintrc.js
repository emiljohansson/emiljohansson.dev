module.exports = {
	...require("config/eslint-preset.js"),
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: "./tsconfig.json",
	},
	ignorePatterns: [".eslintrc.js"],
}
