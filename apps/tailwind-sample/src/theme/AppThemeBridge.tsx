import type { ReactNode } from 'react';
import { defaultTheme, resolveThemeConfig } from '@repo/foundations';
import { ThemeProvider } from '@repo/ui-web-tailwind';
import { useThemeConfig } from './ThemeConfigContext';

/** Bridges the app's theme config into the design-system ThemeProvider (config mode). */
export function AppThemeBridge({ children }: { children: ReactNode }) {
	const { config } = useThemeConfig();
	return (
		<ThemeProvider config={config} resolve={resolveThemeConfig} fallback={defaultTheme}>
			{children}
		</ThemeProvider>
	);
}
