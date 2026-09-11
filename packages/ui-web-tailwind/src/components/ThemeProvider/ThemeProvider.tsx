import { useState, useCallback, useLayoutEffect, useEffect, useMemo, type ReactNode } from 'react';
import type { Tokens } from '@repo/foundations';
import { applyTheme } from '../../adapters/tailwind/applyTheme';
import { WebThemeContext, type WebThemeContextValue } from './WebThemeContext';
import { safeParseTheme } from './safeParseTheme';

const STORAGE_THEME = 'ds-theme-key';
const STORAGE_DARK = 'ds-theme-dark';

function getInitialDark(): boolean {
	if (typeof window === 'undefined') return false;
	const saved = window.localStorage.getItem(STORAGE_DARK);
	if (saved != null) return saved === 'true';
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getInitialThemeKey(keys: string[]): string {
	if (typeof window === 'undefined') return keys[0] ?? 'default';
	const saved = window.localStorage.getItem(STORAGE_THEME);
	if (saved && keys.includes(saved)) return saved;
	return keys[0] ?? 'default';
}

export type StaticThemeResolver = { themes: Record<string, Tokens> };
export type AsyncThemeResolver = { resolver: (key: string) => Promise<Tokens>; fallback: Tokens };

export type ThemeProviderProps = {
	children: ReactNode;
	defaultKey?: string;
} & (StaticThemeResolver | AsyncThemeResolver);

function isStatic(props: StaticThemeResolver | AsyncThemeResolver): props is StaticThemeResolver {
	return 'themes' in props;
}

/**
 * Web design-system ThemeProvider.
 *
 * Two modes:
 * - **Static:** pass `themes` map. All themes bundled at build time.
 * - **Async:** pass `resolver` function + `fallback`. Themes fetched on demand.
 *
 * FOUC prevention: reads localStorage synchronously, applies theme via
 * `useLayoutEffect` (before browser paint).
 *
 * Error boundary: malformed API responses caught by `safeParseTheme`,
 * falling back to default theme.
 */
export function ThemeProvider({ children, defaultKey, ...rest }: ThemeProviderProps) {
	const staticMode = isStatic(rest);

	const availableKeys = useMemo(() => {
		if (staticMode) return Object.keys(rest.themes);
		return defaultKey ? [defaultKey] : [];
	}, [staticMode, rest, defaultKey]);

	const [themeKey, setThemeKeyState] = useState<string>(
		() => defaultKey ?? getInitialThemeKey(availableKeys)
	);
	const [darkMode, setDarkMode] = useState<boolean>(getInitialDark);
	const [theme, setTheme] = useState<Tokens>(() => {
		if (staticMode) {
			const fallback = Object.values(rest.themes)[0];
			if (!fallback) throw new Error('ThemeProvider: static themes map is empty');
			return rest.themes[themeKey] ?? fallback;
		}
		return rest.fallback;
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useLayoutEffect(() => {
		applyTheme(theme);
	}, [theme]);

	useLayoutEffect(() => {
		document.documentElement.classList.toggle('dark', darkMode);
	}, [darkMode]);

	// Static mode: resolve theme from map
	useEffect(() => {
		if (!staticMode) return;
		const found = rest.themes[themeKey];
		if (found) {
			setTheme(found);
			setError(null);
		}
	}, [themeKey, staticMode, rest]);

	// Async mode: fetch theme from resolver
	useEffect(() => {
		if (staticMode) return;
		let cancelled = false;
		setLoading(true);

		rest
			.resolver(themeKey)
			.then((data) => {
				if (cancelled) return;
				setTheme(safeParseTheme(data, rest.fallback));
				setError(null);
			})
			.catch((err) => {
				if (cancelled) return;
				console.error('[Theme] Fetch failed:', err);
				setError(err instanceof Error ? err : new Error(String(err)));
				setTheme(rest.fallback);
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [themeKey, staticMode, rest]);

	useEffect(() => {
		if (typeof window !== 'undefined') localStorage.setItem(STORAGE_THEME, themeKey);
	}, [themeKey]);

	useEffect(() => {
		if (typeof window !== 'undefined') localStorage.setItem(STORAGE_DARK, String(darkMode));
	}, [darkMode]);

	const setThemeKey = useCallback((key: string) => setThemeKeyState(key), []);
	const toggleDark = useCallback(() => setDarkMode((d) => !d), []);

	const value = useMemo<WebThemeContextValue>(
		() => ({ theme, themeKey, setThemeKey, darkMode, toggleDark, loading, error }),
		[theme, themeKey, setThemeKey, darkMode, toggleDark, loading, error]
	);

	return <WebThemeContext.Provider value={value}>{children}</WebThemeContext.Provider>;
}
