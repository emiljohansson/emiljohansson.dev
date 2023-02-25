module.exports = {
	plugins: ['cypress'],
	env: {
		'cypress/globals': true,
	},
	extends: ['plugin:cypress/recommended'],
	rules: {
		'@typescript-eslint/no-namespace': 'off',
	},
}
