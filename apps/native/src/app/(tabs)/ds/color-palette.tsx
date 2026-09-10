import { View, StyleSheet } from 'react-native';
import { useTheme, Typography, Box, Card, PageSection } from '@repo/ui-react-native';
import { ThemedScreen } from '@/components/ThemedScreen';

const FAMILIES = ['primary', 'secondary', 'neutral', 'error', 'info', 'success', 'warning'] as const;
const SCALES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;
const BASE_COLORS = ['white', 'black', 'transparent'] as const;

export default function ColorPaletteScreen() {
	const { theme } = useTheme();

	const cardStyle = { gap: theme.spacing.lg };
	const swatchStyle = { width: theme.spacing['4xl'], height: theme.spacing['4xl'], borderRadius: theme.radii.xs };
	const scaleLabelStyle = { width: theme.spacing['4xl'], textAlign: 'center' as const };

	return (
		<ThemedScreen>
			<PageSection padding="lg">
				<Box gap="xl">
					<Box gap="sm">
						<Typography role="h2" color="text-primary">
							Color Palette
						</Typography>
						<Typography role="p" color="text-secondary">
							Raw color tokens — the foundation palette shared by every theme.
						</Typography>
					</Box>

					<Card variant="surface" style={cardStyle}>
						{FAMILIES.map((family) => (
							<Box key={family} gap="xs">
								<Typography role="caption" color="text-secondary" style={styles.capitalize}>
									{family}
								</Typography>
								<Box flexDirection="row" gap="xxs" flexWrap="wrap">
									{SCALES.map((scale) => {
										const key = `${family}_${scale}`;
										return (
											<View
												key={key}
												style={[
													swatchStyle,
													{ backgroundColor: (theme.colors as Record<string, string>)[key] ?? theme.colorTokens['text-tertiary'] },
												]}
											/>
										);
									})}
								</Box>
							</Box>
						))}

						<Box gap="xs">
							<Typography role="caption" color="text-secondary">
								Base
							</Typography>
							<Box flexDirection="row" gap="xxs">
								{BASE_COLORS.map((c) => (
									<View
										key={c}
										style={[
											swatchStyle,
											styles.baseSwatch,
											{ backgroundColor: theme.colors[c] ?? theme.colorTokens['text-tertiary'], borderColor: theme.colorTokens['border-tertiary'] },
										]}
									/>
								))}
							</Box>
						</Box>

						<Box gap="xs">
							<Typography role="caption" color="text-tertiary">
								Scale
							</Typography>
							<Box flexDirection="row" gap="xxs" flexWrap="wrap">
								{SCALES.map((scale) => (
									<Typography key={scale} role="caption" color="text-tertiary" style={scaleLabelStyle}>
										{scale}
									</Typography>
								))}
							</Box>
						</Box>
					</Card>
				</Box>
			</PageSection>
		</ThemedScreen>
	);
}

const styles = StyleSheet.create({
	baseSwatch: {
		borderWidth: 1,
	},
	capitalize: {
		textTransform: 'capitalize',
	},
});
