import * as stylex from '@stylexjs/stylex';
import { styles } from './StatusDots.styles';
import { Section, Typography } from '@repo/ui-web-stylex';

export function StatusDots() {
	return (
		<Section title="Status Indicators">
			<div {...stylex.props(styles.row)}>
				<span {...stylex.props(styles.label)}>
					<span {...stylex.props(styles.dot, styles.active)} />
					<Typography role="bodySm">Online</Typography>
				</span>
				<span {...stylex.props(styles.label)}>
					<span {...stylex.props(styles.dot, styles.error)} />
					<Typography role="bodySm">Offline</Typography>
				</span>
				<span {...stylex.props(styles.label)}>
					<span {...stylex.props(styles.dot, styles.warning)} />
					<Typography role="bodySm">Away</Typography>
				</span>
				<span {...stylex.props(styles.label)}>
					<span {...stylex.props(styles.dot, styles.info)} />
					<Typography role="bodySm">Busy</Typography>
				</span>
			</div>
		</Section>
	);
}
