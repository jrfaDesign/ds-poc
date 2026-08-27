import {
	TokensSchema,
	themeMandatoryFamilies,
	type ThemeMandatoryFamily,
	type Tokens,
} from '@repo/foundations';
import defaultTheme from './default';
import { mergeTheme, type DeepPartial } from './mergeTheme';

const mandatoryFamilies: readonly ThemeMandatoryFamily[] = themeMandatoryFamilies;

/**
 * Create a validated theme from a partial configuration.
 *
 * `themeConfig` MUST include the mandatory color families
 * (`neutral`, `primary`, `secondary`). Optional families
 * (`error`, `success`, `warning`, `info`, `primary_accent`, `secondary_accent`)
 * fall back to the default theme's values when omitted.
 *
 * Internally delegates to `mergeTheme(defaultTheme, themeConfig)` after
 * validating that every mandatory family is represented in `themeConfig.colors`.
 */
export function createTheme(themeConfig: DeepPartial<Tokens>): Tokens {
	const colors = (themeConfig.colors ?? {}) as Record<string, unknown>;

	const missing = mandatoryFamilies.filter(
		(family) => !Object.keys(colors).some((key) => key.startsWith(`${family}_`))
	);

	if (missing.length > 0) {
		throw new Error(
			`[createTheme] Missing mandatory color families: ${missing.join(
				', '
			)}. Each theme must define at least one scale step for 'neutral', 'primary', and 'secondary'.`
		);
	}

	return mergeTheme(defaultTheme, themeConfig);
}

export { type DeepPartial } from './mergeTheme';
export { type ColorToken } from '@repo/foundations';
export { TokensSchema };
