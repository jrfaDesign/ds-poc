import {
	stylePresetKeys,
	themeTiers,
	type StylePreset,
	type ThemeConfig,
	type ThemeTier,
} from '@repo/foundations';

/**
 * Single source of truth for the theme globals shared by the preview
 * (decorator) and the manager (Theme panel). Both bundles import this file.
 */

export const ADDON_ID = 'theme-config';
export const PANEL_ID = `${ADDON_ID}/panel`;
export const TOOL_ID = `${ADDON_ID}/tool`;
export const PANEL_TITLE = 'Theme';

/** Fonts offered by the config panel (must be linked in preview-head.html). */
export const FONT_OPTIONS = ['Roboto', 'Inter', 'Rubik', 'Orbitron'] as const;

export type ThemeGlobals = {
	themeTier: ThemeTier;
	themePrimary600: string;
	themeSecondary600: string;
	themeStyle: StylePreset;
	themeBodyFont: (typeof FONT_OPTIONS)[number];
	themeHeadingFont: (typeof FONT_OPTIONS)[number];
	darkMode: 'light' | 'dark';
};

/**
 * Default globals. `basic` shows the default theme as-is; the color/font
 * values are the pre-filled medium-tier picks (same as the sample apps).
 */
export const DEFAULT_GLOBALS: ThemeGlobals = {
	themeTier: 'basic',
	themePrimary600: '#7F56D9',
	themeSecondary600: '#0D9488',
	themeStyle: 'rounded',
	themeBodyFont: 'Rubik',
	themeHeadingFont: 'Orbitron',
	darkMode: 'light',
};

export const THEME_TIERS = themeTiers;
export const STYLE_OPTIONS = stylePresetKeys;

/** Build the ThemeConfig the preview decorator resolves into a theme. */
export function buildThemeConfig(globals: ThemeGlobals): ThemeConfig {
	if (globals.themeTier !== 'medium') {
		return { version: 1, tier: globals.themeTier };
	}
	return {
		version: 1,
		tier: 'medium',
		colors: { primary600: globals.themePrimary600, secondary600: globals.themeSecondary600 },
		style: globals.themeStyle,
		fonts: { body: globals.themeBodyFont, heading: globals.themeHeadingFont },
	};
}
