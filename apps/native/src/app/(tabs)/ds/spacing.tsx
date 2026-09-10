import { View, StyleSheet } from 'react-native';
import { useTheme, Typography, Box, Card, PageSection } from '@repo/ui-react-native';
import { ThemedScreen } from '@/components/ThemedScreen';

export default function SpacingScreen() {
	const { theme } = useTheme();
	const spacingKeys = Object.keys(theme.spacing);

	const cardStyle = { gap: theme.spacing.md };
	const spacingLabelStyle = { width: theme.spacing['6xl'], textAlign: 'right' as const };
	const barStyle = { height: theme.spacing.xl, borderRadius: theme.radii.xxs };

	return (
		<ThemedScreen>
			<PageSection padding="lg">
				<Box gap="xl">
					<Box gap="sm">
						<Typography role="h2" color="text-primary">
							Spacing
						</Typography>
						<Typography role="p" color="text-secondary">
							Consistent spacing scale from none (0) to 11xl (160px).
						</Typography>
					</Box>

					<Card variant="surface" style={cardStyle}>
						{spacingKeys.map((key) => {
							const value = (theme.spacing as Record<string, number>)[key] ?? 0;
							return (
								<Box key={key} flexDirection="row" alignItems="center" gap="md">
									<Typography role="caption" color="text-tertiary" style={spacingLabelStyle}>
										{key}
									</Typography>
									<View
										style={[
											barStyle,
											{
												width: Math.min(value, theme.spacing['10xl']),
												backgroundColor:
													theme.colorTokens['bg-brand-solid'] ?? theme.colorTokens['text-tertiary'],
											},
										]}
									/>
									<Typography role="caption" color="text-tertiary">
										{value}px
									</Typography>
								</Box>
							);
						})}
					</Card>
				</Box>
			</PageSection>
		</ThemedScreen>
	);
}
