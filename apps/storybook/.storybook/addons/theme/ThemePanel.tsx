// The manager bundler compiles JSX with the classic runtime (React.createElement),
// so React must be in scope here, unlike the preview, which uses the automatic runtime.
import React from 'react';
import { useGlobals } from 'storybook/manager-api';
import { useTheme } from 'storybook/theming';
import {
	DEFAULT_GLOBALS,
	FONT_OPTIONS,
	STYLE_OPTIONS,
	THEME_TIERS,
	type ThemeGlobals,
} from './constants';
import { createPanelStyles, optionRule } from './styles';
import { ColorField } from './fields/ColorField';
import { ChipRow } from './fields/ChipRow';

const TIER_NOTES: Record<ThemeGlobals['themeTier'], string> = {
	basic: 'No overrides: the default theme as-is (logo-only brands).',
	medium: 'Derived color ramps, shape preset, and fonts from the config.',
	enterprise: 'Full custom theme: resolves to the default for now (TODO).',
};

/**
 * Manager panel that edits the theme globals (tier, colors, style, fonts).
 * The preview decorator turns those globals into a ThemeConfig and resolves
 * the live theme: the same flow the sample apps use with the theme API.
 */
export function ThemePanel({ active }: { active?: boolean }) {
	const [globals, updateGlobals] = useGlobals();
	// Storybook's chrome theme (light/dark): where all panel colors come from.
	const sbTheme = useTheme();

	if (!active) return null;

	const s = createPanelStyles(sbTheme);
	const t = globals as ThemeGlobals;
	const update = (patch: Partial<ThemeGlobals>) => updateGlobals(patch);

	return (
		<div style={s.root}>
			<style>{optionRule(sbTheme)}</style>
			<div style={s.row}>
				<label style={s.label} htmlFor="theme-tier">
					Theme type
				</label>
				<select
					id="theme-tier"
					className="theme-config-select"
					value={t.themeTier}
					onChange={(event) =>
						update({ themeTier: event.target.value as ThemeGlobals['themeTier'] })
					}
					style={s.select}
				>
					{THEME_TIERS.map((tier) => (
						<option key={tier} value={tier}>
							{tier.charAt(0).toUpperCase() + tier.slice(1)}
						</option>
					))}
				</select>
				<p style={s.note}>{TIER_NOTES[t.themeTier]}</p>
			</div>

			{t.themeTier === 'medium' && (
				<>
					<div style={s.row}>
						<ColorField
							label="Primary (600)"
							value={t.themePrimary600}
							onChange={(hex) => update({ themePrimary600: hex })}
						/>
						<ColorField
							label="Secondary (600)"
							value={t.themeSecondary600}
							onChange={(hex) => update({ themeSecondary600: hex })}
						/>
					</div>
					<div style={s.row}>
						<span style={s.label}>Style</span>
						<ChipRow
							options={STYLE_OPTIONS}
							value={t.themeStyle}
							onSelect={(style) => update({ themeStyle: style as ThemeGlobals['themeStyle'] })}
						/>
					</div>
					<div style={s.row}>
						<span style={s.label}>Body font</span>
						<ChipRow
							options={FONT_OPTIONS}
							value={t.themeBodyFont}
							onSelect={(font) => update({ themeBodyFont: font as ThemeGlobals['themeBodyFont'] })}
						/>
						<span style={s.label}>Heading font</span>
						<ChipRow
							options={FONT_OPTIONS}
							value={t.themeHeadingFont}
							onSelect={(font) =>
								update({ themeHeadingFont: font as ThemeGlobals['themeHeadingFont'] })
							}
						/>
					</div>
				</>
			)}

			<div style={s.rowLast}>
				<button type="button" style={s.reset} onClick={() => updateGlobals(DEFAULT_GLOBALS)}>
					Reset theme config
				</button>
			</div>
		</div>
	);
}
