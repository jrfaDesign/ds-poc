import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import { useTheme, Typography, Box, Card, PageSection } from '@repo/ui-react-native';
import { themeTiers, stylePresetKeys, type ThemeTier, type StylePreset } from '@repo/foundations';
import { ThemedScreen } from '@/components/ThemedScreen';
import { ColorField } from '@/components/theme-config/ColorField';
import { ChipRow } from '@/components/theme-config/ChipRow';
import { useThemeSettings } from '@/contexts/ThemeSettingsContext';
import { FONT_OPTIONS } from '@/theme/themeConfig';

const tierNotes: Record<ThemeTier, string> = {
	basic: 'No overrides: default theme, logo only.',
	medium: 'Derived color ramps, shape preset, and fonts from the API response.',
	enterprise: 'Full custom theme: returns default for now (TODO).',
};

export default function SettingsScreen() {
	const { config, setConfig, resetConfig, darkMode, toggleDark } = useThemeSettings();
	const { theme } = useTheme();

	const active = theme.contracts.actions.primary.bg;

	const optionStyle = (isActive: boolean) => ({
		padding: theme.spacing.lg,
		borderRadius: theme.radii.md,
		backgroundColor: isActive ? active : theme.colors.transparent,
	});

	const toggleTrackStyle = {
		width: theme.spacing['5xl'],
		height: theme.spacing['3xl'],
		borderRadius: theme.radii.xl,
		justifyContent: 'center' as const,
		paddingHorizontal: theme.spacing.xxs,
	};

	const toggleKnobStyle = (isDark: boolean) => ({
		width: theme.spacing['2xl'],
		height: theme.spacing['2xl'],
		borderRadius: theme.radii.lg,
		backgroundColor: theme.colors.white,
		transform: [{ translateX: isDark ? theme.spacing['2xl'] : 0 }],
	});

	const textInputStyle = {
		borderWidth: 1,
		borderRadius: theme.radii.md,
		paddingHorizontal: theme.spacing.sm,
		paddingVertical: theme.spacing.xxs,
		fontSize: 14,
		borderColor: theme.colorTokens['border-secondary'],
	};

	return (
		<ThemedScreen>
			<PageSection padding="lg">
				<Box gap="xl">
					<Box gap="sm">
						<Typography variant="title" color="text-primary">
							Settings
						</Typography>
						<Typography variant="body" color="text-secondary">
							Build the theme config: the same response the theme API returns at startup.
						</Typography>
					</Box>

					{/* Theme type */}
					<Box gap="md">
						<Typography variant="headline" color="text-primary">
							Theme type
						</Typography>
						<Card variant="surface" style={{ gap: theme.spacing.md }}>
							{themeTiers.map((tier) => (
								<Pressable
									key={tier}
									onPress={() => setConfig({ tier })}
									style={optionStyle(config.tier === tier)}
								>
									<Typography
										variant="body"
										style={{
											color:
												config.tier === tier
													? theme.colorTokens['text-white']
													: theme.colorTokens['text-primary'],
										}}
									>
										{tier.charAt(0).toUpperCase() + tier.slice(1)}
									</Typography>
								</Pressable>
							))}
							<Typography variant="caption" color="text-tertiary">
								{tierNotes[config.tier]}
							</Typography>
						</Card>
					</Box>

					{/* Logo (all tiers) */}
					<Box gap="md">
						<Typography variant="headline" color="text-primary">
							Logo URL
						</Typography>
						<Card variant="surface">
							<TextInput
								value={config.logo ?? ''}
								onChangeText={(next) => setConfig({ logo: next || undefined })}
								placeholder="https://…"
								autoCapitalize="none"
								autoCorrect={false}
								style={textInputStyle}
							/>
						</Card>
					</Box>

					{/* Medium-only attributes */}
					{config.tier === 'medium' && (
						<>
							<Box gap="md">
								<Typography variant="headline" color="text-primary">
									Colors
								</Typography>
								<Card variant="surface" style={{ gap: theme.spacing.md }}>
									<ColorField
										label="Primary"
										value={config.colors?.primary600}
										onChange={(hex) =>
											setConfig({ colors: { ...config.colors, primary600: hex } })
										}
									/>
									<ColorField
										label="Secondary"
										value={config.colors?.secondary600}
										onChange={(hex) =>
											setConfig({ colors: { ...config.colors, secondary600: hex } })
										}
									/>
								</Card>
							</Box>

							<Box gap="md">
								<Typography variant="headline" color="text-primary">
									Style
								</Typography>
								<Card variant="surface">
									<ChipRow
										options={stylePresetKeys}
										value={config.style ?? 'soft'}
										onSelect={(style) => setConfig({ style: style as StylePreset })}
									/>
								</Card>
							</Box>

							<Box gap="md">
								<Typography variant="headline" color="text-primary">
									Fonts
								</Typography>
								<Card variant="surface" style={{ gap: theme.spacing.md }}>
									<Box gap="xxs">
										<Typography variant="caption" color="text-secondary">
											Body
										</Typography>
										<ChipRow
											options={FONT_OPTIONS}
											value={config.fonts?.body ?? 'Roboto'}
											onSelect={(body) => setConfig({ fonts: { ...config.fonts, body } })}
										/>
									</Box>
									<Box gap="xxs">
										<Typography variant="caption" color="text-secondary">
											Heading
										</Typography>
										<ChipRow
											options={FONT_OPTIONS}
											value={config.fonts?.heading ?? config.fonts?.body ?? 'Roboto'}
											onSelect={(heading) => setConfig({ fonts: { ...config.fonts, heading } })}
										/>
									</Box>
								</Card>
							</Box>
						</>
					)}

					{/* Reset */}
					<Box gap="md">
						<Pressable onPress={resetConfig} style={optionStyle(false)}>
							<Typography variant="body" color="text-primary">
								Reset config
							</Typography>
						</Pressable>
					</Box>

					{/* Dark Mode Toggle */}
					<Box gap="md">
						<Typography variant="headline" color="text-primary">
							Appearance
						</Typography>
						<Card variant="surface">
							<Pressable onPress={toggleDark} style={styles.toggleRow}>
								<Typography variant="body" color="text-primary">
									Dark Mode
								</Typography>
								<View
									style={[
										toggleTrackStyle,
										{
											backgroundColor: darkMode
												? theme.colorTokens['bg-brand-primary']
												: theme.colorTokens['bg-tertiary'],
										},
									]}
								>
									<View style={toggleKnobStyle(darkMode)} />
								</View>
							</Pressable>
						</Card>
					</Box>
				</Box>
			</PageSection>
		</ThemedScreen>
	);
}

const styles = StyleSheet.create({
	toggleRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});
