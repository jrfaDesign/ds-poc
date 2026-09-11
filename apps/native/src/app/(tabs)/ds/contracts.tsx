import { View, StyleSheet } from 'react-native';
import {
	useTheme,
	Typography,
	Box,
	Card,
	PageSection,
	Button,
	Alert,
	Input,
	Checkbox,
	Radio,
	Toggle,
} from '@repo/ui-react-native';
import { ThemedScreen } from '@/components/ThemedScreen';

export default function ContractsScreen() {
	const { theme } = useTheme();
	const feedbackCardStyle = { gap: theme.spacing.xs, minWidth: theme.spacing['5xl'] };

	return (
		<ThemedScreen>
			<PageSection padding="lg">
				<Box gap="xl">
					{/* Actions */}
					<Box gap="md">
						<Typography role="h2" color="text-primary">
							Actions
						</Typography>
						<Typography role="p" color="text-secondary">
							Button variant presets with bg, on, border, hover, active, and disabled states.
						</Typography>
						<Box flexDirection="row" gap="sm" flexWrap="wrap">
							<Button variant="primary">Primary</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="ghost">Ghost</Button>
							<Button variant="link">Link</Button>
							<Button variant="primary" disabled>Disabled</Button>
						</Box>
					</Box>

					{/* Feedback */}
					<Box gap="md">
						<Typography role="h2" color="text-primary">
							Feedback
						</Typography>
						<Typography role="p" color="text-secondary">
							Alerts use feedback contracts. Each intent maps to bg, on, border,
							borderWidth, and borderRadius from the theme.
						</Typography>
						<Box gap="sm">
							{(['error', 'success', 'warning', 'info'] as const).map((intent) => (
								<Alert key={intent} intent={intent} title={intent.charAt(0).toUpperCase() + intent.slice(1)}>
									This is a {intent} alert using feedback contracts.
								</Alert>
							))}
						</Box>
					</Box>

					{/* Surfaces */}
					<Box gap="md">
						<Typography role="h2" color="text-primary">
							Surfaces
						</Typography>
						<Box flexDirection="row" gap="sm" flexWrap="wrap">
							{(['base', 'alt', 'raised', 'brand'] as const).map((surface) => {
								const s = theme.contracts.surfaces[surface];
								return (
									<Card key={surface} variant="surface" style={{ ...feedbackCardStyle, backgroundColor: s?.bg }}>
										<Typography role="caption" style={{ color: s?.on }}>
											{surface}
										</Typography>
									</Card>
								);
							})}
						</Box>
						<Box flexDirection="row" gap="sm" flexWrap="wrap">
							{(['sunken', 'inverse'] as const).map((surface) => {
								const s = theme.contracts.surfaces[surface];
								const surfaceStyle = {
									backgroundColor: s?.bg,
									borderWidth: 1,
									borderColor: s?.border,
									borderRadius: theme.radii.lg,
									padding: theme.spacing.md,
									minWidth: theme.spacing['5xl'],
								};
								return (
									<View key={surface} style={surfaceStyle}>
										<Typography role="caption" style={{ color: s?.on }}>
											{surface}
										</Typography>
									</View>
								);
							})}
						</Box>
					</Box>

					{/* Input Field */}
					<Box gap="md">
						<Typography role="h2" color="text-primary">
							Input Field
						</Typography>
						<Typography role="p" color="text-secondary">
							Inputs use the inputField contract. The status prop controls border color
							for validation states (default, error, success).
						</Typography>
						<Box gap="md">
							<Input label="Default" placeholder="Enter text..." />
							<Input label="Error" placeholder="Invalid input" status="error" />
							<Input label="Success" placeholder="Valid input" status="success" />
							<Input label="Disabled" placeholder="Cannot edit" disabled />
						</Box>
						<Box flexDirection="row" flexWrap="wrap" gap="md">
							<Box style={{ flex: 1, minWidth: 120 }}>
								<Input label="Small" size="sm" placeholder="Small" />
							</Box>
							<Box style={{ flex: 1, minWidth: 160 }}>
								<Input label="Medium" size="md" placeholder="Medium" />
							</Box>
							<Box style={{ flex: 1, minWidth: 200 }}>
								<Input label="Large" size="lg" placeholder="Large" />
							</Box>
						</Box>
					</Box>

					{/* Selection Controls */}
					<Box gap="md">
						<Typography role="h2" color="text-primary">
							Selection Controls
						</Typography>
						<Typography role="p" color="text-secondary">
							Checkboxes and radio buttons use the selectionControl contract.
						</Typography>
						<Box gap="md">
							<Box gap="sm">
								<Typography role="label" color="text-primary">
									Checkboxes
								</Typography>
								<Checkbox defaultChecked label="Checked" />
								<Checkbox label="Unchecked" />
								<Checkbox disabled label="Disabled" />
							</Box>
							<Box gap="sm">
								<Typography role="label" color="text-primary">
									Radio Buttons
								</Typography>
								<Radio defaultChecked label="Selected" />
								<Radio label="Unselected" />
								<Radio disabled label="Disabled" />
							</Box>
						</Box>
					</Box>

					{/* Toggle */}
					<Box gap="md">
						<Typography role="h2" color="text-primary">
							Toggle
						</Typography>
						<Typography role="p" color="text-secondary">
							Toggle switches use the toggle contract with track and thumb tokens.
						</Typography>
						<Box gap="sm">
							<Toggle defaultChecked label="On" />
							<Toggle label="Off" />
							<Toggle disabled label="Disabled" />
						</Box>
					</Box>

					{/* Typography Contracts */}
					<Box gap="md">
						<Typography role="h2" color="text-primary">
							Typography Contracts
						</Typography>
						{(['h1', 'h2', 'h3', 'h4', 'p', 'caption', 'label', 'overline'] as const).map((role) => {
							const typo = theme.contracts.typography[role];
							return (
								<Box key={role} gap="xxs">
									<Typography role="caption" color="text-tertiary">
										{role}
									</Typography>
									<Typography
										role={role}
										style={{ color: typo?.color, fontSize: typo?.fontSizePx, fontWeight: typo?.fontWeight as any }}
									>
										The quick brown fox
									</Typography>
								</Box>
							);
						})}
					</Box>

					{/* Components */}
					<Box gap="md">
						<Typography role="h2" color="text-primary">
							Components
						</Typography>
						<Typography role="p" color="text-secondary">
							Structural tokens for border radii and mode-aware background colors.
						</Typography>
						<Box gap="sm">
							<Typography role="label" color="text-primary">
								Border Radii
							</Typography>
							<Box flexDirection="row" gap="sm" flexWrap="wrap">
								{(['buttonBorderRadii', 'cardBorderRadii', 'saleCardRadii', 'inputBorderRadii'] as const).map((key) => (
									<Card key={key} variant="surface" style={{ padding: theme.spacing.md, minWidth: 120 }}>
										<Typography role="caption" color="text-tertiary">
											{key}
										</Typography>
										<Typography role="p" color="text-primary">
											{theme.contracts.components[key]}px
										</Typography>
									</Card>
								))}
							</Box>
						</Box>
						<Box gap="sm">
							<Typography role="label" color="text-primary">
								Background Colors
							</Typography>
							<Box flexDirection="row" gap="sm" flexWrap="wrap">
								{(['headerBg', 'headerAvatarBg', 'footerBg', 'footerBgSecondary', 'salesCardBg', 'appShellBg'] as const).map((key) => (
									<View
										key={key}
										style={{
											backgroundColor: theme.contracts.components[key],
											padding: theme.spacing.md,
											minWidth: 120,
											borderRadius: theme.radii.sm,
										}}
									>
										<Typography role="caption" style={{ color: 'white' }}>
											{key}
										</Typography>
									</View>
								))}
							</Box>
						</Box>
					</Box>
				</Box>
			</PageSection>
		</ThemedScreen>
	);
}

const styles = StyleSheet.create({
	content: {
		gap: 24,
	},
});
