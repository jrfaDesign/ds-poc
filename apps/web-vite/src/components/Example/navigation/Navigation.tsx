import * as stylex from '@stylexjs/stylex';
import { styles } from './Navigation.styles';
import { Card, Section, Typography } from '@repo/ui-web-stylex';

export function Navigation() {
	return (
		<Section title="Navigation Bar">
			<>
				<div {...stylex.props(styles.navInner)}>
					<div {...stylex.props(styles.brand)}>
						<Typography role="h4">D</Typography>
						<Typography role="h4">DesignSystem</Typography>
					</div>
					<div {...stylex.props(styles.links)}>
						<Typography role="caption" color="text-brand-secondary" weight="bold">
							Dashboard
						</Typography>
						<Typography role="caption">Projects</Typography>
						<Typography role="caption">Settings</Typography>
					</div>
					<div {...stylex.props(styles.actions)}>
						<div {...stylex.props(styles.avatar)}>JD</div>
					</div>
				</div>
				<div {...stylex.props(styles.divider)} />
				<div {...stylex.props(styles.navInner)}>
					<Typography role="caption">Activity</Typography>
					<Typography role="caption">Analytics</Typography>
					<Typography role="caption">Reports</Typography>
				</div>
			</>
		</Section>
	);
}
