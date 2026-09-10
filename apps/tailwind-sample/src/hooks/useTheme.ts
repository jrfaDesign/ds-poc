import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
	defaultTheme,
	cagTheme,
	caosTheme,
	bcaTheme,
	bydTheme,
	bydPremiumTheme,
} from '@repo/themes';
import { applyTheme } from '@repo/ui-web-tailwind';
import type { Tokens } from '@repo/foundations';

export type ThemeKey = 'default' | 'cag' | 'caos' | 'bca' | 'byd' | 'byd_premium';

const themes: Record<ThemeKey, Tokens> = {
	default: defaultTheme,
	cag: cagTheme,
	caos: caosTheme,
	bca: bcaTheme,
	byd: bydTheme,
	byd_premium: bydPremiumTheme,
};

const STORAGE_THEME = 'ds-theme-key';
const STORAGE_DARK = 'ds-theme-dark';

function getInitialTheme(): ThemeKey {
	if (typeof window === 'undefined') return 'default';
	const saved = window.localStorage.getItem(STORAGE_THEME) as ThemeKey | null;
	if (saved && saved in themes) return saved;
	return 'default';
}

function getInitialDark(): boolean {
	if (typeof window === 'undefined') return false;
	const saved = window.localStorage.getItem(STORAGE_DARK);
	if (saved != null) return saved === 'true';
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function useTheme() {
	const [themeKey, setThemeKeyState] = useState<ThemeKey>(getInitialTheme);
	const [darkMode, setDarkMode] = useState<boolean>(getInitialDark);

	useLayoutEffect(() => {
		applyTheme(themes[themeKey]);
	}, [themeKey]);

	useLayoutEffect(() => {
		document.documentElement.classList.toggle('dark', darkMode);
	}, [darkMode]);

	useEffect(() => {
		window.localStorage.setItem(STORAGE_THEME, themeKey);
	}, [themeKey]);

	useEffect(() => {
		window.localStorage.setItem(STORAGE_DARK, String(darkMode));
	}, [darkMode]);

	const setTheme = useCallback((key: ThemeKey) => setThemeKeyState(key), []);
	const toggleDark = useCallback(() => setDarkMode((d) => !d), []);

	return { themeKey, theme: themes[themeKey], setTheme, darkMode, toggleDark };
}
