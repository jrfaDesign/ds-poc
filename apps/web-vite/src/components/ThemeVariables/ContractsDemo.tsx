import * as stylex from '@stylexjs/stylex';
import { styles } from './ContractsDemo.styles';
import { Card, Grid, Typography } from '@repo/ui-web-stylex';
import { defaultTheme } from '@repo/themes';

const actionVariants = ['primary', 'secondary', 'ghost', 'link'] as const;
const feedbackIntents = ['error', 'success', 'warning', 'info'] as const;
const surfaceTypes = ['base', 'alt', 'raised', 'sunken', 'inverse', 'brand'] as const;

function ActionCard({ variant }: { variant: (typeof actionVariants)[number] }) {
	const preset = defaultTheme.contracts.actions[variant];
	const label = variant.charAt(0).toUpperCase() + variant.slice(1);

	return (
		<Card>
			<Typography>{variant}</Typography>
			<button {...stylex.props(styles.btnBase, styles[`btn${label}` as keyof typeof styles])}>
				{label}
			</button>
			<div {...stylex.props(styles.propRow)}>
				{Object.entries(preset).map(([prop]) => (
					<span key={prop} {...stylex.props(styles.propChip)}>
						<span
							{...stylex.props(styles.chipSwatch)}
							style={{ backgroundColor: `var(--action-${variant}-${prop})` }}
						/>
						<Typography key={prop} role="caption">
							{prop}
						</Typography>
					</span>
				))}
			</div>
		</Card>
	);
}

function FeedbackCard({ intent }: { intent: (typeof feedbackIntents)[number] }) {
	const preset = defaultTheme.contracts.feedback[intent];
	const label = intent.charAt(0).toUpperCase() + intent.slice(1);

	return (
		<Card>
			<span {...stylex.props(styles.cardTitle)}>{intent}</span>
			<div {...stylex.props(styles.fbBanner, styles[`fb${label}` as keyof typeof styles])}>
				{label}
			</div>
			<div {...stylex.props(styles.propRow)}>
				{Object.entries(preset).map(([prop]) => (
					<span key={prop} {...stylex.props(styles.propChip)}>
						<span
							{...stylex.props(styles.chipSwatch)}
							style={{ backgroundColor: `var(--feedback-${intent}-${prop})` }}
						/>
						{prop}
					</span>
				))}
			</div>
		</Card>
	);
}

function SurfaceCard({ type }: { type: (typeof surfaceTypes)[number] }) {
	const preset = defaultTheme.contracts.surfaces[type];
	const label = type.charAt(0).toUpperCase() + type.slice(1);

	return (
		<Card>
			<span {...stylex.props(styles.cardTitle)}>{type}</span>
			<div {...stylex.props(styles.surfaceBlock, styles[`surf${label}` as keyof typeof styles])}>
				{label}
			</div>
			<div {...stylex.props(styles.propRow)}>
				{Object.entries(preset).map(([prop]) => (
					<span key={prop} {...stylex.props(styles.propChip)}>
						<span
							{...stylex.props(styles.chipSwatch)}
							style={{ backgroundColor: `var(--surface-${type}-${prop})` }}
						/>
						{prop}
					</span>
				))}
			</div>
		</Card>
	);
}

function ContractsDemo() {
	return (
		<>
			{/* Action Contracts */}
			<Typography role="heading2">Contracts</Typography>
			<Card>
				<Typography role="heading3">Actions</Typography>
				<Grid gap="md">
					{actionVariants.map((v) => (
						<Grid.Item key={v} span={{ mobile: 2, tablet: 4, desktop: 3 }}>
							<ActionCard variant={v} />
						</Grid.Item>
					))}
				</Grid>
			</Card>

			{/* Feedback Contracts */}
			<Card>
				<Typography role="heading3">Feedback</Typography>
				<Grid gap="md">
					{feedbackIntents.map((i) => (
						<Grid.Item key={i} span={{ mobile: 2, tablet: 4, desktop: 3 }}>
							<FeedbackCard intent={i} />
						</Grid.Item>
					))}
				</Grid>
			</Card>

			{/* Surface Contracts */}
			<Card>
				<Typography role="heading3">Surfaces</Typography>
				<Grid gap="md">
					{surfaceTypes.map((t) => (
						<Grid.Item key={t} span={{ mobile: 2, tablet: 4, desktop: 3 }}>
							<SurfaceCard type={t} />
						</Grid.Item>
					))}
				</Grid>
			</Card>
		</>
	);
}

export default ContractsDemo;
