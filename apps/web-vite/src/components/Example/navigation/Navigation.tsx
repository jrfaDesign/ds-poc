import * as stylex from '@stylexjs/stylex';
import { styles } from './Navigation.styles';
import { Section, Typography } from '@repo/ui-web-stylex';

export function Navigation() {
	return (
		<Section title="Navigation Bar">
			<nav {...stylex.props(styles.nav)}>
				<div {...stylex.props(styles.navInner)}>
					<div {...stylex.props(styles.brand)}>
						<div {...stylex.props(styles.brandIcon)}>D</div>
						<Typography role="heading4">DesignSystem</Typography>
					</div>
					<div {...stylex.props(styles.links)}>
						<span {...stylex.props(styles.linkItem, styles.linkActive)}>Dashboard</span>
						<span {...stylex.props(styles.linkItem)}>Projects</span>
						<span {...stylex.props(styles.linkItem)}>Settings</span>
					</div>
					<div {...stylex.props(styles.actions)}>
						<div {...stylex.props(styles.avatar)}>JD</div>
					</div>
				</div>
				<div {...stylex.props(styles.divider)} />
				<div {...stylex.props(styles.navInner)}>
					<span {...stylex.props(styles.linkItem)} style={{ fontSize: 12, padding: '4px 8px' }}>
						Activity
					</span>
					<span {...stylex.props(styles.linkItem)} style={{ fontSize: 12, padding: '4px 8px' }}>
						Analytics
					</span>
					<span {...stylex.props(styles.linkItem)} style={{ fontSize: 12, padding: '4px 8px' }}>
						Reports
					</span>
				</div>
			</nav>
		</Section>
	);
}
