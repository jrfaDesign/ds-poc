import { useTheme, Typography, Box, Card, PageSection } from '@repo/ui-react-native';
import { ThemedScreen } from '@/components/ThemedScreen';

const VARIANTS = ['display', 'title', 'headline', 'body', 'label', 'caption'] as const;

const variantSize = {
	display: '5xl',
	title: '3xl',
	headline: 'xl',
	body: 'md',
	label: 'sm',
	caption: 'xs',
} as const;

export default function TypographyScreen() {
	const { theme } = useTheme();

	const cardStyle = { gap: theme.spacing.md };

	return (
		<ThemedScreen>
			<PageSection padding="lg">
				<Box gap="xl">
					<Box gap="sm">
						<Typography variant="title" color="text-primary">
							Typography
						</Typography>
						<Typography variant="body" color="text-secondary">
							Mobile type variants: display, title, headline, body, label, caption. Each maps
							to a size/weight/family pair inside the RN library (the web h1/h2 hierarchy is
							web-only).
						</Typography>
					</Box>

					{VARIANTS.map((variant) => {
						const size = theme.typography.fontSize[variantSize[variant]];
						return (
							<Card key={variant} variant="surface" style={cardStyle}>
								<Typography variant="label" color="text-brand-tertiary">
									{variant}
								</Typography>
								<Typography variant={variant}>
									The quick brown fox jumps over the lazy dog
								</Typography>
								<Box flexDirection="row" gap="md" flexWrap="wrap">
									<Typography variant="caption" color="text-tertiary">
										Size: {size.fontSizePx}px
									</Typography>
									<Typography variant="caption" color="text-tertiary">
										Line height: {size.lineHeightPx}px
									</Typography>
								</Box>
							</Card>
						);
					})}
				</Box>
			</PageSection>
		</ThemedScreen>
	);
}
