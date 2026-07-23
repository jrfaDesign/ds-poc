import { config as baseConfig } from '@repo/eslint-config/base';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import stylexPlugin from '@stylexjs/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
	...baseConfig,

	globalIgnores(['dist']),

	{
		files: ['**/*.{ts,tsx}'],
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'@stylexjs': stylexPlugin,
		},
		rules: {
			...reactHooks.configs.recommended.rules,

			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

			'@stylexjs/valid-styles': 'error',
			'@stylexjs/no-unused': 'error',
			'@stylexjs/valid-shorthands': 'warn',
			'@stylexjs/sort-keys': 'warn',
		},
	},
]);
