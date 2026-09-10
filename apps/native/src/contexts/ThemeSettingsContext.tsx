import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	defaultTheme,
	cagTheme,
	caosTheme,
	bcaTheme,
	bydTheme,
	bydPremiumTheme,
} from '@repo/themes';
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

type ThemeSettingsContextValue = {
	themeKey: ThemeKey;
	theme: Tokens;
	setTheme: (key: ThemeKey) => void;
	darkMode: boolean;
	toggleDark: () => void;
};

const ThemeSettingsContext = createContext<ThemeSettingsContextValue | null>(null);

export function ThemeSettingsProvider({ children }: { children: ReactNode }) {
	const [themeKey, setThemeKey] = useState<ThemeKey>('default');
	const [darkMode, setDarkMode] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const [savedTheme, savedDark] = await Promise.all([
					AsyncStorage.getItem(STORAGE_THEME),
					AsyncStorage.getItem(STORAGE_DARK),
				]);
				if (savedTheme && savedTheme in themes) {
					setThemeKey(savedTheme as ThemeKey);
				}
				if (savedDark != null) {
					setDarkMode(savedDark === 'true');
				}
			} finally {
				setLoaded(true);
			}
		})();
	}, []);

	useEffect(() => {
		if (loaded) {
			AsyncStorage.setItem(STORAGE_THEME, themeKey);
		}
	}, [themeKey, loaded]);

	useEffect(() => {
		if (loaded) {
			AsyncStorage.setItem(STORAGE_DARK, String(darkMode));
		}
	}, [darkMode, loaded]);

	const setTheme = useCallback((key: ThemeKey) => setThemeKey(key), []);
	const toggleDark = useCallback(() => setDarkMode((d) => !d), []);

	return (
		<ThemeSettingsContext.Provider
			value={{
				themeKey,
				theme: themes[themeKey],
				setTheme,
				darkMode,
				toggleDark,
			}}
		>
			{children}
		</ThemeSettingsContext.Provider>
	);
}

export function useThemeSettings() {
	const ctx = useContext(ThemeSettingsContext);
	if (!ctx) {
		throw new Error('useThemeSettings must be used within a ThemeSettingsProvider');
	}
	return ctx;
}
