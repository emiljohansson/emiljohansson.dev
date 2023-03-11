module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	settings: {
		next: {
			rootDir: ['apps/*/', 'packages/*/'],
		},
	},
	extends: [
		'standard',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'@typescript-eslint/no-unused-vars': 'error',
		// 	"react/react-in-jsx-scope": "off",
		// 	"import/no-anonymous-default-export": "off",
		// 	"comma-dangle": ["error", "always-multiline"],
		// 	"no-unused-vars": "off",
		// 	"@typescript-eslint/no-unused-vars": ["error"],
		// 	"@typescript-eslint/no-explicit-any": "error",
		// 	"func-call-spacing": "off",
		// 	"@typescript-eslint/func-call-spacing": "error",
		// 	"jsx-quotes": ["error", "prefer-double"],
	},
}
