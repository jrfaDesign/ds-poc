import type { Preview } from '@storybook/react';
import { useGlobals } from 'storybook/preview-api';
import { ThemeProvider } from '@repo/ui-web-tailwind';
import { defaultTheme, resolveThemeConfig } from '@repo/foundations';
import { DEFAULT_GLOBALS, buildThemeConfig, type ThemeGlobals } from './addons/theme/constants';
import { PreviewChrome } from './components/PreviewChrome';
import '../src/styles.css';

const preview: Preview = {
	initialGlobals: DEFAULT_GLOBALS,
	globalTypes: {
		themeTier: {
			name: 'Theme type',
			description: 'White-label tier driving the Theme panel',
		},
		themePrimary600: {
			name: 'Primary 600',
		},
		themeSecondary600: {
			name: 'Secondary 600',
		},
		themeStyle: {
			name: 'Shape preset',
		},
		themeBodyFont: {
			name: 'Body font',
		},
		themeHeadingFont: {
			name: 'Heading font',
		},
		darkMode: {
			name: 'Mode',
			description: 'Light / dark preview',
			toolbar: {
				items: ['light', 'dark'],
				dynamicTitle: true,
			},
		},
	},
	decorators: [
		// Storybook preview hooks (useGlobals, useArgs, …) only work inside the
		// decorator/story body: never in a child component. Children use plain
		// React hooks only (see components/PreviewChrome.tsx).
		(Story) => {
			const [globals] = useGlobals();
			const config = buildThemeConfig(globals as ThemeGlobals);
			const isDark = globals.darkMode === 'dark';

			return (
				<ThemeProvider config={config} resolve={resolveThemeConfig} fallback={defaultTheme}>
					<PreviewChrome isDark={isDark}>
						<Story />
					</PreviewChrome>
				</ThemeProvider>
			);
		},
	],
	parameters: {
		layout: 'padded',
		controls: { expanded: true },
	},
};

export default preview;
