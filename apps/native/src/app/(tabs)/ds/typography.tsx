import { useTheme, Typography, Box, Card, PageSection } from '@repo/ui-react-native';
import { ThemedScreen } from '@/components/ThemedScreen';

export default function TypographyScreen() {
	const { theme } = useTheme();
	const roles = ['h1', 'h2', 'h3', 'h4', 'p', 'caption', 'label', 'overline'] as const;

	const cardStyle = { gap: theme.spacing.md };

	return (
		<ThemedScreen>
			<PageSection padding="lg">
				<Box gap="xl">
					<Box gap="sm">
						<Typography role="h2" color="text-primary">
							Typography
						</Typography>
						<Typography role="p" color="text-secondary">
							Typography contracts — semantic compositions of font size, weight, line height, and
							color.
						</Typography>
					</Box>

					{roles.map((role) => {
						const typo = theme.contracts.typography[role];
						return (
							<Card key={role} variant="surface" style={cardStyle}>
								<Typography role="h4" color="text-brand-tertiary">
									{role}
								</Typography>
								<Typography
									role={role}
									style={{
										color: typo?.color,
										fontSize: typo?.fontSizePx,
										fontWeight: typo?.fontWeight as any,
									}}
								>
									The quick brown fox jumps over the lazy dog
								</Typography>
								<Box flexDirection="row" gap="md" flexWrap="wrap">
									<Typography role="caption" color="text-tertiary">
										Size: {typo?.fontSizePx}px
									</Typography>
									<Typography role="caption" color="text-tertiary">
										Weight: {typo?.fontWeight}
									</Typography>
									{typo?.fontFamily && (
										<Typography role="caption" color="text-tertiary">
											Family: {typo.fontFamily}
										</Typography>
									)}
								</Box>
							</Card>
						);
					})}
				</Box>
			</PageSection>
		</ThemedScreen>
	);
}
