import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';

/**
 * Storybook runs our real stack: Vite 8 + Tailwind 4 (same plugins as the
 * sample app) plus an alias so React Native components render through
 * react-native-web inside the same instance.
 */
const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
	addons: ['@storybook/addon-docs'],
	framework: '@storybook/react-vite',
	// Auto-docgen follows imports into react-native's Flow source (unparseable);
	// docs pages build from the explicit argTypes declared in each story instead.
	typescript: {
		reactDocgen: false,
	},
	viteFinal: (viteConfig) => ({
		...viteConfig,
		plugins: [...(viteConfig.plugins ?? []), tailwindcss()],
		resolve: {
			...viteConfig.resolve,
			alias: {
				...viteConfig.resolve?.alias,
				'react-native': 'react-native-web',
			},
		},
	}),
};

export default config;
