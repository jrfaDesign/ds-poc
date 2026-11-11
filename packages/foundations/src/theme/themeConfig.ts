import { z } from 'zod';
import { deriveColorScale, StylePresetSchema, type Tokens } from '../tokens/index';
import defaultTheme from './defaultTheme';
import { mergeTheme, type DeepPartial } from './mergeTheme';

/** The one hex pattern for theme-config colors: shared by the schema and the config editors. */
export const hexColorRegex = /^#[0-9a-fA-F]{6}$/;

const hexSchema = z.string().regex(hexColorRegex, 'expected a #RRGGBB hex color');

/**
 * Theme configuration as returned by the theme API at app start.
 *
 * Designed to be forward-compatible: unknown fields pass through untouched
 * (`passthrough`), every field except `tier` is optional, and `version` gives
 * us a migration hook: the API can grow without breaking old clients.
 */
export const themeConfigSchema = z
	.object({
		version: z.number().int().positive().default(1),
		tier: z.enum(['basic', 'medium', 'enterprise']),
		/** Brand logo URL: used as the `src` of the logo image (not a design token). */
		logo: z.string().min(1).optional(),
		/** The user always picks the 600 step; the rest of the ramp is derived. */
		colors: z
			.object({
				primary600: hexSchema.optional(),
				secondary600: hexSchema.optional(),
			})
			.optional(),
		/** White-label shape preset (sharp / soft / rounded / full). */
		style: StylePresetSchema.optional(),
		/** Two font families: heading + body. When only `body` is given, `heading` follows it. */
		fonts: z
			.object({
				body: z.string().min(1).optional(),
				heading: z.string().min(1).optional(),
			})
			.optional(),
	})
	.passthrough();

export type ThemeConfig = z.infer<typeof themeConfigSchema>;
export type ThemeTier = ThemeConfig['tier'];

/** The tier list, derived from the schema (single source for the config editors). */
export const themeTiers = themeConfigSchema.shape.tier.options;

/** Preset 600-step colors offered by the theme config editors (custom hex input also allowed). */
export const themeColorPresets = [
	{ label: 'Blue', hex: '#0074de' },
	{ label: 'Purple', hex: '#7f56d9' },
	{ label: 'Rose', hex: '#be0f43' },
	{ label: 'Teal', hex: '#0d9488' },
	{ label: 'Emerald', hex: '#059669' },
	{ label: 'Orange', hex: '#ea580c' },
] as const;

/** Build `{ primary_50: …, primary_950: … }` style overrides from a picked 600 hex. */
function familyScale(family: 'primary' | 'secondary', base600: string): Record<string, string> {
	return Object.fromEntries(
		Object.entries(deriveColorScale(base600)).map(([step, hex]) => [`${family}_${step}`, hex])
	);
}

/** Bare family names get the default system fallbacks (stacks pass through). */
function toFontStack(family: string): string {
	return family.includes(',') ? family : `${family}, system-ui, -apple-system, sans-serif`;
}

/**
 * Resolve a theme config into a full validated theme.
 *
 * - `basic`: no overrides, the default theme as-is (logo-only brands)
 * - `medium`: derived color ramps, shape preset, font families, secondary accents
 * - `enterprise`: full custom theme; not implemented yet, returns the default
 */
export function resolveThemeConfig(config: ThemeConfig): Tokens {
	// TODO(enterprise): full custom themes: no brand uses this tier yet.
	if (config.tier !== 'medium') {
		return defaultTheme;
	}

	const overrides: DeepPartial<Tokens> = {};

	const colors: Record<string, string> = {};
	if (config.colors?.primary600) {
		Object.assign(colors, familyScale('primary', config.colors.primary600));
	}
	const secondary = config.colors?.secondary600;
	if (secondary) {
		Object.assign(colors, familyScale('secondary', secondary));
	}
	if (Object.keys(colors).length > 0) {
		overrides.colors = colors as Partial<Tokens['colors']>;
	}

	// The brand's secondary color drives accent surfaces/text/borders (default untouched).
	if (secondary) {
		overrides.colorTokens = {
			bg: { 'bg-brand-secondary': { light: 'secondary_100', dark: 'secondary_800' } },
			text: { 'text-brand-secondary': { light: 'secondary_600', dark: 'secondary_300' } },
			border: { 'border-brand_alt': { light: 'secondary_600', dark: 'secondary_400' } },
		};
	}

	if (config.style) {
		overrides.style = config.style;
	}

	const body = config.fonts?.body;
	const heading = config.fonts?.heading ?? config.fonts?.body;
	if (body || heading) {
		overrides.typography = {
			fontFamilies: {
				...(body ? { body: toFontStack(body) } : {}),
				...(heading ? { heading: toFontStack(heading) } : {}),
			},
		};
	}

	return mergeTheme(defaultTheme, overrides);
}
