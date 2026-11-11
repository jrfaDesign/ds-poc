import { themeConfigSchema, type ThemeConfig, type ThemeTier } from '@repo/foundations';
import defaultLogo from '../assets/brandLogos/default.svg';
import bydLogo from '../assets/brandLogos/byd.svg';

const STORAGE_KEY = 'ds-theme-config';

/** Fonts available in index.html: offered by the config tester. */
export const FONT_OPTIONS = ['Roboto', 'Inter', 'Rubik', 'Orbitron'] as const;

/**
 * Mock of the theme API response. The real deployment replaces
 * `fetchThemeConfig` with a network call: the shape stays the same.
 */
export const MOCK_THEME_CONFIGS: Record<ThemeTier, ThemeConfig> = {
	basic: { version: 1, tier: 'basic', logo: defaultLogo },
	medium: {
		version: 1,
		tier: 'medium',
		logo: bydLogo,
		colors: { primary600: '#7F56D9', secondary600: '#0D9488' },
		style: 'rounded',
		fonts: { body: 'Rubik', heading: 'Orbitron' },
	},
	// TODO(enterprise): full custom theme, returns default until that exists.
	enterprise: { version: 1, tier: 'enterprise', logo: defaultLogo },
};

/** Fetch the theme config for a tier (mocked with simulated latency). */
export async function fetchThemeConfig(tier: ThemeTier = 'basic'): Promise<ThemeConfig> {
	await new Promise((resolve) => setTimeout(resolve, 150));
	return themeConfigSchema.parse(MOCK_THEME_CONFIGS[tier]);
}

/** Synchronously load the persisted config (FOUC-safe: call before first paint). */
export function loadConfigSync(): ThemeConfig | null {
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		return raw ? themeConfigSchema.parse(JSON.parse(raw)) : null;
	} catch {
		return null;
	}
}

export function saveConfig(config: ThemeConfig): void {
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}
