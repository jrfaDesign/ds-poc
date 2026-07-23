import * as stylex from '@stylexjs/stylex';
import { styles } from './StatusDots.styles';

export function StatusDots() {
	return (
		<div {...stylex.props(styles.section)}>
			<span {...stylex.props(styles.tag)}>
				{'roles.successFg / errorFg / warningFg / infoFg (used as pure color indicators)'}
			</span>
			<h3 {...stylex.props(styles.heading)}>Status Indicators</h3>
			<div {...stylex.props(styles.row)}>
				<span {...stylex.props(styles.label)}>
					<span {...stylex.props(styles.dot, styles.active)} />
					Online
				</span>
				<span {...stylex.props(styles.label)}>
					<span {...stylex.props(styles.dot, styles.error)} />
					Offline
				</span>
				<span {...stylex.props(styles.label)}>
					<span {...stylex.props(styles.dot, styles.warning)} />
					Away
				</span>
				<span {...stylex.props(styles.label)}>
					<span {...stylex.props(styles.dot, styles.info)} />
					Busy
				</span>
			</div>
		</div>
	);
}
