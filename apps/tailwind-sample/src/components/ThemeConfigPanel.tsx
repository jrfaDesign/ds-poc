import { Input, Select, Typography } from '@repo/ui-web-tailwind';
import { themeTiers, type ThemeTier } from '@repo/foundations';
import { stylePresetKeys } from '@repo/foundations';
import { useThemeConfig } from '../theme/ThemeConfigContext';
import { FONT_OPTIONS } from '../theme/themeConfig';
import { ColorField } from './theme-config/ColorField';
import { ChipRow } from './theme-config/ChipRow';

const tierNotes: Record<ThemeTier, string> = {
	basic: 'No overrides: default theme, logo only.',
	medium: 'Derived color ramps, shape preset, and fonts from the API response.',
	enterprise: 'Full custom theme: returns default for now (TODO).',
};

/**
 * Theme config tester: replaces the old theme picker. Pick the tier and edit
 * the API response attributes; changes resolve and apply live.
 */
export function ThemeConfigPanel() {
	const { config, setConfig, resetConfig } = useThemeConfig();

	return (
		<div className="flex flex-col gap-md">
			<div className="px-sm py-xxs">
				<Typography role="caption" color="text-secondary" className="mb-xxs block">
					Theme config
				</Typography>
				<Select
					selectedKey={config.tier}
					onChange={(key) => setConfig({ tier: key as ThemeTier })}
					id="theme-tier-select"
					size="sm"
				>
					{themeTiers.map((tier) => (
						<Select.Item key={tier} id={tier} label={tier.charAt(0).toUpperCase() + tier.slice(1)} />
					))}
				</Select>
			</div>

			<div className="px-sm py-xxs">
				<Typography role="caption" color="text-secondary" className="mb-xxs block">
					Logo URL
				</Typography>
				<Input
					size="sm"
					placeholder="https://… or /src/assets/…"
					value={config.logo ?? ''}
					onChange={(value) => setConfig({ logo: value || undefined })}
					id="theme-logo-input"
				/>
			</div>

			{config.tier === 'medium' && (
				<>
					<div className="px-sm py-xxs">
						<ColorField
							label="Primary"
							value={config.colors?.primary600 ?? ''}
							onChange={(hex) => setConfig({ colors: { ...config.colors, primary600: hex } })}
						/>
					</div>
					<div className="px-sm py-xxs">
						<ColorField
							label="Secondary"
							value={config.colors?.secondary600 ?? ''}
							onChange={(hex) => setConfig({ colors: { ...config.colors, secondary600: hex } })}
						/>
					</div>

					<div className="px-sm py-xxs flex flex-col gap-xxs">
						<Typography role="caption" color="text-secondary">
							Style
						</Typography>
						<ChipRow
							options={stylePresetKeys}
							value={config.style ?? 'soft'}
							onSelect={(style) => setConfig({ style: style as (typeof stylePresetKeys)[number] })}
						/>
					</div>

					<div className="px-sm py-xxs grid grid-cols-2 gap-xs">
						<div className="flex flex-col gap-xxs">
							<Typography role="caption" color="text-secondary">
								Body font
							</Typography>
							<Select
								selectedKey={config.fonts?.body ?? 'Roboto'}
								onChange={(key) => setConfig({ fonts: { ...config.fonts, body: key as string } })}
								id="theme-body-font"
								size="sm"
							>
								{FONT_OPTIONS.map((font) => (
									<Select.Item key={font} id={font} label={font} />
								))}
							</Select>
						</div>
						<div className="flex flex-col gap-xxs">
							<Typography role="caption" color="text-secondary">
								Heading font
							</Typography>
							<Select
								selectedKey={config.fonts?.heading ?? config.fonts?.body ?? 'Roboto'}
								onChange={(key) => setConfig({ fonts: { ...config.fonts, heading: key as string } })}
								id="theme-heading-font"
								size="sm"
							>
								{FONT_OPTIONS.map((font) => (
									<Select.Item key={font} id={font} label={font} />
								))}
							</Select>
						</div>
					</div>
				</>
			)}

			<div className="px-sm py-xxs flex items-center justify-between gap-sm">
				<Typography role="caption" color="text-tertiary" className="flex-1">
					{tierNotes[config.tier]}
				</Typography>
			</div>

			<div className="border-t border-surface-base-border px-sm py-xxs">
				<button
					type="button"
					onClick={resetConfig}
					className="text-sm text-action-link-on hover:text-action-link-on-hover cursor-pointer"
				>
					Reset config
				</button>
			</div>
		</div>
	);
}
