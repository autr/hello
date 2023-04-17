module.exports = {
	parserOptions: {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	env: {
		es6: true,
		node: true,
		// browser: true
	},
	plugins: ['svelte3'],
	extends: "eslint:recommended",
	overrides: [{
		files: ['*.svelte'],
		processor: 'svelte3/svelte3'
	}],
	rules: {
		// Show only the most serious errors
		"no-console": 0,
		// "no-undef": 0,
		// "no-useless-escape": 0,
		"no-unused-vars": 0,
		"semi": 0,
		"no-empty": 0,
		"unused-export-let": 0,
		"no-undef": 0,
		"no-warn": 0,
		"strict": ["error", "global"]


	}
}