import { View, StyleSheet } from 'react-native';
import { useTheme, Typography, Box, Card, PageSection } from '@repo/ui-react-native';
import type { ColorTokenCategory } from '@repo/foundations';
import { ThemedScreen } from '@/components/ThemedScreen';

const CATEGORY_LABELS: Record<ColorTokenCategory, string> = {
	text: 'Text',
	border: 'Border',
	fg: 'Foreground',
	bg: 'Background',
	utility: 'Utility',
};

export default function ColorTokensScreen() {
	const { theme, rawTokens } = useTheme();

	const cardStyle = { gap: theme.spacing.md };
	const swatchStyle = { height: theme.spacing['4xl'], borderRadius: theme.radii.xs, borderWidth: 1 };
	const tokenBoxStyle = { width: theme.spacing['8xl'] };
	const tokenLabelStyle = { fontSize: theme.typography.fontSize.xxs.fontSizePx };

	return (
		<ThemedScreen>
			<PageSection padding="lg">
				<Box gap="xl">
					<Box gap="sm">
						<Typography role="h2" color="text-primary">
							Color Tokens
						</Typography>
						<Typography role="p" color="text-secondary">
							Semantic tokens resolve to a light/dark pair — they flip automatically
							when you toggle dark mode.
						</Typography>
					</Box>

					{(Object.keys(rawTokens.colorTokens) as ColorTokenCategory[]).map((category) => {
						const tokens = rawTokens.colorTokens[category];
						const tokenNames = Object.keys(tokens);
						return (
							<Card key={category} variant="surface" style={cardStyle}>
								<Typography role="overline" color="text-secondary">
									{CATEGORY_LABELS[category]}
								</Typography>
								<Box flexDirection="row" gap="sm" flexWrap="wrap">
									{tokenNames.map((name) => (
										<Box key={name} gap="xxs" style={tokenBoxStyle}>
											<View
												style={[
													swatchStyle,
													{ width: '100%', backgroundColor: (theme.colorTokens as Record<string, string>)[name] ?? theme.colorTokens['text-tertiary'], borderColor: theme.colorTokens['border-tertiary'] },
												]}
											/>
											<Typography role="caption" color="text-tertiary" style={tokenLabelStyle}>
												{name}
											</Typography>
										</Box>
									))}
								</Box>
							</Card>
						);
					})}
				</Box>
			</PageSection>
		</ThemedScreen>
	);
}
