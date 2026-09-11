import { Pressable, View, StyleSheet } from 'react-native';
import { useTheme, Typography, Box, Card, PageSection } from '@repo/ui-react-native';
import { ThemedScreen } from '@/components/ThemedScreen';
import { useThemeSettings, type ThemeKey } from '@/contexts/ThemeSettingsContext';

const THEMES: { key: ThemeKey; label: string }[] = [
	{ key: 'default', label: 'Default' },
	{ key: 'cag', label: 'CAG' },
	{ key: 'caos', label: 'CAOS' },
	{ key: 'bca', label: 'BCA' },
	{ key: 'byd', label: 'BYD' },
	{ key: 'byd_premium', label: 'BYD Premium' },
];

export default function SettingsScreen() {
	const { themeKey, setTheme, darkMode, toggleDark } = useThemeSettings();
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

	return (
		<ThemedScreen>
			<PageSection padding="lg">
				<Box gap="xl">
					<Box gap="sm">
						<Typography role="h2" color="text-primary">
							Settings
						</Typography>
						<Typography role="p" color="text-secondary">
							Configure the design system theme and appearance.
						</Typography>
					</Box>

					{/* Theme Selector */}
					<Box gap="md">
						<Typography role="h3" color="text-primary">
							Theme
						</Typography>
						<Card variant="surface" style={{ gap: theme.spacing.md }}>
							{THEMES.map(({ key, label }) => (
								<Pressable
									key={key}
									onPress={() => setTheme(key)}
									style={optionStyle(themeKey === key)}
								>
									<Typography
										role="p"
										style={{
											color:
												themeKey === key
													? theme.colorTokens['text-white']
													: theme.colorTokens['text-primary'],
										}}
									>
										{label}
									</Typography>
								</Pressable>
							))}
						</Card>
					</Box>

					{/* Dark Mode Toggle */}
					<Box gap="md">
						<Typography role="h3" color="text-primary">
							Appearance
						</Typography>
						<Card variant="surface">
							<Pressable onPress={toggleDark} style={styles.toggleRow}>
								<Typography role="p" color="text-primary">
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
