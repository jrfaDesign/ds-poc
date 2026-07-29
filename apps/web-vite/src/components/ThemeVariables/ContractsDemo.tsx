import * as stylex from '@stylexjs/stylex';
import { styles } from './ContractsDemo.styles';
import { Grid } from '../Example/ui/Grid/Grid';
import defaultTheme from '../../design-system/themes/default';

const actionVariants = ['primary', 'secondary', 'ghost', 'link'] as const;
const feedbackIntents = ['error', 'success', 'warning', 'info'] as const;
const surfaceTypes = ['base', 'alt', 'raised', 'sunken', 'inverse', 'brand'] as const;

function ActionCard({ variant }: { variant: (typeof actionVariants)[number] }) {
	const preset = defaultTheme.contracts.actions[variant];
	const label = variant.charAt(0).toUpperCase() + variant.slice(1);

	return (
		<div {...stylex.props(styles.card)}>
			<span {...stylex.props(styles.cardTitle)}>{variant}</span>
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
						{prop}
					</span>
				))}
			</div>
		</div>
	);
}

function FeedbackCard({ intent }: { intent: (typeof feedbackIntents)[number] }) {
	const preset = defaultTheme.contracts.feedback[intent];
	const label = intent.charAt(0).toUpperCase() + intent.slice(1);

	return (
		<div {...stylex.props(styles.card)}>
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
		</div>
	);
}

function SurfaceCard({ type }: { type: (typeof surfaceTypes)[number] }) {
	const preset = defaultTheme.contracts.surfaces[type];
	const label = type.charAt(0).toUpperCase() + type.slice(1);

	return (
		<div {...stylex.props(styles.card)}>
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
		</div>
	);
}

function ContractsDemo() {
	return (
		<>
			{/* Action Contracts */}
			<h1>Contracts</h1>
			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.h2)}>Actions</h2>
				<Grid gap="md">
					{actionVariants.map((v) => (
						<Grid.Item key={v} span={{ mobile: 2, tablet: 4, desktop: 3 }}>
							<ActionCard variant={v} />
						</Grid.Item>
					))}
				</Grid>
			</section>

			{/* Feedback Contracts */}
			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.h2)}>Feedback</h2>
				<Grid gap="md">
					{feedbackIntents.map((i) => (
						<Grid.Item key={i} span={{ mobile: 2, tablet: 4, desktop: 3 }}>
							<FeedbackCard intent={i} />
						</Grid.Item>
					))}
				</Grid>
			</section>

			{/* Surface Contracts */}
			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.h2)}>Surfaces</h2>
				<Grid gap="md">
					{surfaceTypes.map((t) => (
						<Grid.Item key={t} span={{ mobile: 2, tablet: 4, desktop: 3 }}>
							<SurfaceCard type={t} />
						</Grid.Item>
					))}
				</Grid>
			</section>
		</>
	);
}

export default ContractsDemo;
