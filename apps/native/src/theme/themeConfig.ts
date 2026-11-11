import AsyncStorage from '@react-native-async-storage/async-storage';
import { themeConfigSchema, type ThemeConfig, type ThemeTier } from '@repo/foundations';

const STORAGE_KEY = 'ds-theme-config';

/** Fonts offered by the config tester (must be loaded by the app to render). */
export const FONT_OPTIONS = ['Roboto', 'Inter', 'Rubik', 'Orbitron'] as const;

/**
 * Mock of the theme API response. The real deployment replaces
 * `fetchThemeConfig` with a network call: the shape stays the same.
 * No logo URLs by default: paste one in the settings editor to test.
 */
export const MOCK_THEME_CONFIGS: Record<ThemeTier, ThemeConfig> = {
	basic: { version: 1, tier: 'basic' },
	medium: {
		version: 1,
		tier: 'medium',
		colors: { primary600: '#7F56D9', secondary600: '#0D9488' },
		style: 'rounded',
		fonts: { body: 'Rubik', heading: 'Orbitron' },
	},
	// TODO(enterprise): full custom theme, returns default until that exists.
	enterprise: { version: 1, tier: 'enterprise' },
};

/** Fetch the theme config for a tier (mocked with simulated latency). */
export async function fetchThemeConfig(tier: ThemeTier = 'basic'): Promise<ThemeConfig> {
	await new Promise((resolve) => setTimeout(resolve, 150));
	return themeConfigSchema.parse(MOCK_THEME_CONFIGS[tier]);
}

export async function loadStoredConfig(): Promise<ThemeConfig | null> {
	try {
		const raw = await AsyncStorage.getItem(STORAGE_KEY);
		return raw ? themeConfigSchema.parse(JSON.parse(raw)) : null;
	} catch {
		return null;
	}
}

export async function saveConfig(config: ThemeConfig): Promise<void> {
	await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}
