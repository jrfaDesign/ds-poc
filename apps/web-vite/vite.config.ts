import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { unplugin as stylex } from '@stylexjs/unplugin';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		stylex.vite({
			// StyleX configuration options
			useCSSLayers: true,
			dev: process.env.NODE_ENV === 'development',
			runtimeInjection: false,
			// ...
			lightningcssOptions: {
				// Options for lightningcss which postprocesses the generated CSS
			},
		}),
		react(),
	],
	server: {
		open: true,
	},
});
