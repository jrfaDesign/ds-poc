import { createContext, useContext, type ReactNode } from 'react';
import type { Tokens } from '@repo/foundations';

export type WebThemeContextValue = {
	/** The currently active raw Tokens object. */
	theme: Tokens;
	/** The current theme key (e.g. 'default', 'cag'). */
	themeKey: string;
	/** Switch the active theme by key. */
	setThemeKey: (key: string) => void;
	/** Whether dark mode is active. */
	darkMode: boolean;
	/** Toggle dark mode. */
	toggleDark: () => void;
	/** Whether a remote theme is currently being fetched. */
	loading: boolean;
	/** The last fetch error, if any. */
	error: Error | null;
};

export const WebThemeContext = createContext<WebThemeContextValue | null>(null);

/**
 * Access the current theme context. Must be used inside a `<ThemeProvider>`.
 */
export function useTheme(): WebThemeContextValue {
	const ctx = useContext(WebThemeContext);
	if (!ctx) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return ctx;
}
