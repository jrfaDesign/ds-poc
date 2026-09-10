import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { Tokens } from '@repo/foundations';
import { applyTheme, type ResolvedTheme } from './applyTheme';

export type ThemeContextValue = {
	theme: ResolvedTheme;
	isDark: boolean;
	rawTokens: Tokens;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export type AppProviderProps = {
	theme: Tokens;
	isDark: boolean;
	children: ReactNode;
};

/**
 * Provides the resolved design-system theme to all descendant components.
 *
 * Wraps your app root with the raw `Tokens` object and an `isDark` boolean.
 * All components using `useTheme()` will receive the resolved token values
 * for the current mode.
 */
export function AppProvider({ theme, isDark, children }: AppProviderProps) {
	const resolved = useMemo(() => applyTheme(theme, isDark), [theme, isDark]);

	const value = useMemo<ThemeContextValue>(
		() => ({ theme: resolved, isDark, rawTokens: theme }),
		[resolved, isDark, theme]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
