import { View } from 'react-native';
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
	const { theme, rawTokens } = useTheme();
	const feedbackCardStyle = { gap: theme.spacing.xs, minWidth: theme.spacing['5xl'] };

	return (
		<ThemedScreen>
			<PageSection padding="lg">
				<Box gap="xl">
					{/* Actions */}
					<Box gap="md">
						<Typography variant="title" color="text-primary">
							Actions
						</Typography>
						<Typography variant="body" color="text-secondary">
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
						<Typography variant="title" color="text-primary">
							Feedback
						</Typography>
						<Typography variant="body" color="text-secondary">
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
						<Typography variant="title" color="text-primary">
							Surfaces
						</Typography>
						<Box flexDirection="row" gap="sm" flexWrap="wrap">
							{(['base', 'alt', 'raised', 'brand'] as const).map((surface) => {
								const s = theme.contracts.surfaces[surface];
								return (
									<Card key={surface} variant="surface" style={{ ...feedbackCardStyle, backgroundColor: s?.bg }}>
										<Typography variant="caption" style={{ color: s?.on }}>
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
										<Typography variant="caption" style={{ color: s?.on }}>
											{surface}
										</Typography>
									</View>
								);
							})}
						</Box>
					</Box>

					{/* Input Field */}
					<Box gap="md">
						<Typography variant="title" color="text-primary">
							Input Field
						</Typography>
						<Typography variant="body" color="text-secondary">
							Inputs compose semantic color tokens directly; the status prop controls border
							color for validation states (default, error, success).
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
						<Typography variant="title" color="text-primary">
							Selection Controls
						</Typography>
						<Typography variant="body" color="text-secondary">
							Checkboxes and radio buttons map their states directly to semantic color
							tokens.
						</Typography>
						<Box gap="md">
							<Box gap="sm">
								<Typography variant="label" color="text-primary">
									Checkboxes
								</Typography>
								<Checkbox defaultChecked label="Checked" />
								<Checkbox label="Unchecked" />
								<Checkbox disabled label="Disabled" />
							</Box>
							<Box gap="sm">
								<Typography variant="label" color="text-primary">
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
						<Typography variant="title" color="text-primary">
							Toggle
						</Typography>
						<Typography variant="body" color="text-secondary">
							Toggle switches map track/thumb states directly to semantic color tokens.
						</Typography>
						<Box gap="sm">
							<Toggle defaultChecked label="On" />
							<Toggle label="Off" />
							<Toggle disabled label="Disabled" />
						</Box>
					</Box>

					{/* Shape preset + chrome tokens */}
					<Box gap="md">
						<Typography variant="title" color="text-primary">
							Shape & Chrome
						</Typography>
						<Typography variant="body" color="text-secondary">
							The shape preset (theme.style) resolves border radius per element bucket, and
							chrome surfaces read their background from color tokens.
						</Typography>
						<Box gap="sm">
							<Typography variant="label" color="text-primary">
								Shape · {rawTokens.style}
							</Typography>
							<Box flexDirection="row" gap="sm" flexWrap="wrap">
								{(['button', 'input', 'card'] as const).map((bucket) => (
									<Card key={bucket} variant="surface" style={{ padding: theme.spacing.md, minWidth: 120 }}>
										<Typography variant="caption" color="text-tertiary">
											{bucket}
										</Typography>
										<Typography variant="body" color="text-primary">
											{theme.shape[bucket]}px
										</Typography>
									</Card>
								))}
							</Box>
						</Box>
						<Box gap="sm">
							<Typography variant="label" color="text-primary">
								Chrome backgrounds
							</Typography>
							<Box flexDirection="row" gap="sm" flexWrap="wrap">
								{(
									[
										'bg-header',
										'bg-header-avatar',
										'bg-footer',
										'bg-footer_secondary',
										'bg-app-shell',
										'bg-sales-card',
										'bg-tab-indicator',
									] as const
								).map((key) => (
									<View
										key={key}
										style={{
											backgroundColor: theme.colorTokens[key],
											padding: theme.spacing.md,
											minWidth: 120,
											borderRadius: theme.radii.sm,
										}}
									>
										<Typography variant="caption" style={{ color: 'white' }}>
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

