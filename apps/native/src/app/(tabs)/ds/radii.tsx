import { View, StyleSheet } from 'react-native';
import { useTheme, Typography, Box, Card, PageSection } from '@repo/ui-react-native';
import { ThemedScreen } from '@/components/ThemedScreen';

export default function RadiiScreen() {
	const { theme } = useTheme();
	const radiiKeys = Object.keys(theme.radii);

	const cardStyle = { gap: theme.spacing.lg };
	const radiusBoxStyle = { width: theme.spacing['6xl'], height: theme.spacing['6xl'] };
	const radiusLabelStyle = { fontSize: theme.typography.fontSize.xxs.fontSizePx };

	return (
		<ThemedScreen>
			<PageSection padding="lg">
				<Box gap="xl">
					<Box gap="sm">
						<Typography role="h2" color="text-primary">
							Radii
						</Typography>
						<Typography role="p" color="text-secondary">
							Border radius tokens from none (0) to full (9999px).
						</Typography>
					</Box>

					<Card variant="surface" style={cardStyle}>
						<Box flexDirection="row" gap="md" flexWrap="wrap">
							{radiiKeys.map((key) => {
								const value = (theme.radii as Record<string, number>)[key] ?? 0;
								return (
									<Box key={key} gap="xxs" alignItems="center">
										<View
											style={[
												radiusBoxStyle,
												{ backgroundColor: theme.colorTokens['bg-brand-primary'] ?? theme.colorTokens['text-tertiary'], borderRadius: value },
											]}
										/>
										<Typography role="caption" color="text-tertiary">
											{key}
										</Typography>
										<Typography role="caption" color="text-tertiary" style={radiusLabelStyle}>
											{value}px
										</Typography>
									</Box>
								);
							})}
						</Box>
					</Card>
				</Box>
			</PageSection>
		</ThemedScreen>
	);
}
