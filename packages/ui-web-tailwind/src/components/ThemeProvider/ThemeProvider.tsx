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
/**
 * Config mode: the app owns a `ThemeConfig` (from the theme API) and passes a
 * resolver; every config change re-resolves and re-applies the theme.
 * `fallback` is used when the resolver throws (e.g. a corrupt stored config).
 */
export type ConfigThemeMode<C> = {
	config: C;
	resolve: (config: C) => Tokens;
	fallback: Tokens;
};

export type ThemeProviderProps<C = unknown> = {
	children: ReactNode;
	defaultKey?: string;
} & (StaticThemeResolver | AsyncThemeResolver | ConfigThemeMode<C>);

function resolveConfigSafe<C>(mode: ConfigThemeMode<C>): Tokens {
	try {
		return mode.resolve(mode.config);
	} catch (err) {
		console.error('[Theme] config resolve failed:', err);
		return mode.fallback;
	}
}

/**
 * Web design-system ThemeProvider.
 *
 * Three modes:
 * - **Static:** pass `themes` map. All themes bundled at build time.
 * - **Async:** pass `resolver` function + `fallback`. Themes fetched on demand.
 * - **Config:** pass `config` + `resolve` + `fallback`. The app's theme config
 *   (from the theme API) re-resolves on every change: used by the config tester.
 *
 * FOUC prevention: reads localStorage synchronously, applies theme via
 * `useLayoutEffect` (before browser paint).
 *
 * Error boundary: malformed API responses caught by `safeParseTheme` /
 * `resolveConfigSafe`, falling back to the default theme.
 */
export function ThemeProvider<C = unknown>({
	children,
	defaultKey,
	...rest
}: ThemeProviderProps<C>) {
	// The three modes are mutually exclusive; narrow once here for readable consumers.
	const staticProps = 'themes' in rest ? (rest as StaticThemeResolver) : null;
	const configProps = !staticProps && 'config' in rest ? (rest as ConfigThemeMode<C>) : null;
	const asyncProps = !staticProps && !configProps ? (rest as AsyncThemeResolver) : null;

	// Config mode: resolve during render (pure function of the config props).
	// Static/async modes keep their theme in state.
	const configTheme = configProps ? resolveConfigSafe(configProps) : null;

	const availableKeys = useMemo(() => {
		if (configProps) return ['config'];
		if (staticProps) return Object.keys(staticProps.themes);
		return defaultKey ? [defaultKey] : [];
	}, [configProps, staticProps, defaultKey]);

	const [themeKey, setThemeKeyState] = useState<string>(
		() => defaultKey ?? getInitialThemeKey(availableKeys)
	);
	const [darkMode, setDarkMode] = useState<boolean>(getInitialDark);
	const [stateTheme, setStateTheme] = useState<Tokens>(() => {
		if (staticProps) {
			const fallback = Object.values(staticProps.themes)[0];
			if (!fallback) throw new Error('ThemeProvider: static themes map is empty');
			return staticProps.themes[themeKey] ?? fallback;
		}
		// Async and config modes both carry a fallback theme.
		const fallback = asyncProps?.fallback ?? configProps?.fallback;
		if (!fallback) throw new Error('ThemeProvider: missing theme fallback');
		return fallback;
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const theme = configTheme ?? stateTheme;

	useLayoutEffect(() => {
		applyTheme(theme);
	}, [theme]);

	useLayoutEffect(() => {
		document.documentElement.classList.toggle('dark', darkMode);
	}, [darkMode]);

	// Static mode: resolve theme from map
	useEffect(() => {
		if (!staticProps) return;
		const found = staticProps.themes[themeKey];
		if (found) {
			setStateTheme(found);
			setError(null);
		}
	}, [themeKey, staticProps]);

	// Async mode: fetch theme from resolver
	useEffect(() => {
		if (!asyncProps) return;
		const { resolver, fallback } = asyncProps;
		let cancelled = false;
		setLoading(true);

		resolver(themeKey)
			.then((data) => {
				if (cancelled) return;
				setStateTheme(safeParseTheme(data, fallback));
				setError(null);
			})
			.catch((err) => {
				if (cancelled) return;
				console.error('[Theme] Fetch failed:', err);
				setError(err instanceof Error ? err : new Error(String(err)));
				setStateTheme(fallback);
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [themeKey, asyncProps]);

	useEffect(() => {
		if (configProps || typeof window === 'undefined') return;
		localStorage.setItem(STORAGE_THEME, themeKey);
	}, [themeKey, configProps]);

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
