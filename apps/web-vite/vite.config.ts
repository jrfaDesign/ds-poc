import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { unplugin as stylex } from '@stylexjs/unplugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');

export default defineConfig({
	plugins: [
		stylex.vite({
			useCSSLayers: true,
			dev: process.env.NODE_ENV === 'development',
			runtimeInjection: false,
			aliases: {
				'@repo/ui-web-stylex/vars': [
					'/ROOT/packages/ui-web-stylex/src/adapters/stylex/createStylexVars.stylex.ts',
				],
			},
			unstable_moduleResolution: {
				type: 'commonJS',
				rootDir,
			},
			lightningcssOptions: {},
		}),
		react(),
	],
	server: {
		open: true,
	},
});
