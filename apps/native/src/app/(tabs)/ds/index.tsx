import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme, Typography, Box, Card } from '@repo/ui-react-native';
import { ThemedScreen } from '@/components/ThemedScreen';

const SECTIONS = [
	{
		key: 'color-palette',
		title: 'Color Palette',
		subtitle: 'Raw hex values organized by family and scale',
		previewColors: ['primary_500', 'secondary_500', 'error_500', 'success_500'],
	},
	{
		key: 'color-tokens',
		title: 'Color Tokens',
		subtitle: 'Semantic light/dark pairs that flip with mode',
		previewColors: ['bg-primary', 'text-primary', 'border-primary', 'fg-primary'],
	},
	{
		key: 'contracts',
		title: 'Contracts',
		subtitle: 'Action, feedback, surface, and typography presets',
		previewColors: ['action-primary-bg', 'feedback-error-bg', 'surface-brand-bg'],
	},
	{
		key: 'spacing',
		title: 'Spacing',
		subtitle: 'Consistent spacing scale from none to 11xl',
		previewColors: [],
	},
	{
		key: 'radii',
		title: 'Radii',
		subtitle: 'Border radius tokens from none to full',
		previewColors: [],
	},
	{
		key: 'typography',
		title: 'Typography',
		subtitle: 'Type scale presets and font families',
		previewColors: [],
	},
	{
		key: 'shadows',
		title: 'Shadows',
		subtitle: 'Elevation and shadow definitions',
		previewColors: [],
	},
] as const;

export default function DSHome() {
	const router = useRouter();
	const { theme } = useTheme();

	const themedStyles = StyleSheet.create({
		contentStyle: {
			gap: theme.spacing['4xl'],
			paddingHorizontal: theme.spacing.xl,
			paddingBottom: theme.spacing.xl,
		},

		cardStyle: { marginBottom: theme.spacing.none, paddingVertical: theme.spacing['3xl'] },

		swatchStyle: {
			width: theme.spacing['3xl'],
			height: theme.spacing['3xl'],
			borderRadius: theme.radii.xs,
		},
	});

	return (
		<ThemedScreen contentContainerStyle={themedStyles.contentStyle}>
			{SECTIONS.map((section) => (
				<Pressable key={section.key} onPress={() => router.push(`/(tabs)/ds/${section.key}`)}>
					<Card variant="raised" style={themedStyles.cardStyle}>
						<Box flexDirection="row" alignItems="center" justifyContent="space-between">
							<Box flex={1} gap="xs">
								<Typography role="h4" color="text-primary">
									{section.title}
								</Typography>
								<Typography role="caption" color="text-secondary">
									{section.subtitle}
								</Typography>
							</Box>
							{section.previewColors.length > 0 && (
								<Box flexDirection="row" gap="xxs">
									{section.previewColors.map((colorKey) => {
										const colorTokens = theme.colorTokens as Record<string, string>;
										const colors = theme.colors as Record<string, string>;
										const previewColor =
											colorTokens[colorKey] ??
											colors[colorKey] ??
											theme.colorTokens['text-tertiary'];
										return (
											<View
												key={colorKey}
												style={[themedStyles.swatchStyle, { backgroundColor: previewColor }]}
											/>
										);
									})}
								</Box>
							)}
						</Box>
					</Card>
				</Pressable>
			))}
		</ThemedScreen>
	);
}
