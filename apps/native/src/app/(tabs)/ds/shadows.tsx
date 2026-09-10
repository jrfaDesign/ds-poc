import { View, type ViewStyle } from 'react-native';
import { useTheme, Typography, Box, PageSection } from '@repo/ui-react-native';
import type { ShadowToken } from '@repo/foundations';
import { ThemedScreen } from '@/components/ThemedScreen';

export default function ShadowsScreen() {
	const { theme } = useTheme();
	const shadowKeys = Object.keys(theme.shadows) as ShadowToken[];

	const shadowBoxStyle: ViewStyle = {
		width: theme.spacing['8xl'],
		height: theme.spacing['8xl'],
		borderRadius: theme.radii.xl,
	};
	const elevationLabelStyle = { fontSize: theme.typography.fontSize.xxs.fontSizePx };

	return (
		<ThemedScreen>
			<PageSection padding="lg">
				<Box gap="xl">
					<Box gap="sm">
						<Typography role="h2" color="text-primary">
							Shadows
						</Typography>
						<Typography role="p" color="text-secondary">
							Shadow tokens resolved to React Native elevation and shadow props.
						</Typography>
					</Box>

					<Box flexDirection="row" gap="md" flexWrap="wrap">
						{shadowKeys.map((key) => (
							<Box key={key} gap="xxs" alignItems="center">
								<View
									style={[
										shadowBoxStyle,
										{ backgroundColor: theme.colorTokens['bg-primary'] },
										theme.shadows[key],
									]}
								/>
								<Typography role="caption" color="text-tertiary">
									{key}
								</Typography>
								<Typography role="caption" color="text-tertiary" style={elevationLabelStyle}>
									elevation: {theme.shadows[key].elevation}
								</Typography>
							</Box>
						))}
					</Box>
				</Box>
			</PageSection>
		</ThemedScreen>
	);
}
