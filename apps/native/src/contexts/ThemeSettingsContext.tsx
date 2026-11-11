import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	themeConfigSchema,
	resolveThemeConfig,
	type ThemeConfig,
} from '@repo/foundations';
import type { Tokens } from '@repo/core';
import {
	MOCK_THEME_CONFIGS,
	fetchThemeConfig,
	loadStoredConfig,
	saveConfig as persistConfig,
} from '@/theme/themeConfig';

const STORAGE_DARK = 'ds-theme-dark';

type ThemeSettingsContextValue = {
	/** The theme config (would come from the theme API). */
	config: ThemeConfig;
	/** Shallow-merge a patch into the config, validate, persist, and re-resolve. */
	setConfig: (patch: Partial<ThemeConfig>) => void;
	/** Back to the basic mock config (logo-only). */
	resetConfig: () => void;
	/** Resolved theme for the current config. */
	theme: Tokens;
	darkMode: boolean;
	toggleDark: () => void;
};

const ThemeSettingsContext = createContext<ThemeSettingsContextValue | null>(null);

export function ThemeSettingsProvider({ children }: { children: ReactNode }) {
	const [config, setConfigState] = useState<ThemeConfig>(() =>
		themeConfigSchema.parse(MOCK_THEME_CONFIGS.basic)
	);
	const [darkMode, setDarkMode] = useState(false);
	const [loaded, setLoaded] = useState(false);

	// Load the persisted config (or the mock API response) once at startup.
	useEffect(() => {
		(async () => {
			try {
				const stored = await loadStoredConfig();
				const initial = stored ?? (await fetchThemeConfig('basic'));
				setConfigState(initial);
				const savedDark = await AsyncStorage.getItem(STORAGE_DARK);
				if (savedDark != null) {
					setDarkMode(savedDark === 'true');
				}
			} finally {
				setLoaded(true);
			}
		})();
	}, []);

	useEffect(() => {
		if (loaded) void persistConfig(config);
	}, [config, loaded]);

	useEffect(() => {
		if (loaded) void AsyncStorage.setItem(STORAGE_DARK, String(darkMode));
	}, [darkMode, loaded]);

	const setConfig = useCallback((patch: Partial<ThemeConfig>) => {
		setConfigState((prev) => themeConfigSchema.parse({ ...prev, ...patch }));
	}, []);

	const resetConfig = useCallback(() => {
		setConfigState(themeConfigSchema.parse(MOCK_THEME_CONFIGS.basic));
	}, []);

	const theme = useMemo(() => resolveThemeConfig(config), [config]);
	const toggleDark = useCallback(() => setDarkMode((d) => !d), []);

	const value = useMemo<ThemeSettingsContextValue>(
		() => ({ config, setConfig, resetConfig, theme, darkMode, toggleDark }),
		[config, setConfig, resetConfig, theme, darkMode, toggleDark]
	);

	return <ThemeSettingsContext.Provider value={value}>{children}</ThemeSettingsContext.Provider>;
}

export function useThemeSettings() {
	const ctx = useContext(ThemeSettingsContext);
	if (!ctx) {
		throw new Error('useThemeSettings must be used within a ThemeSettingsProvider');
	}
	return ctx;
}
