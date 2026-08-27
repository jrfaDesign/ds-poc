import * as stylex from '@stylexjs/stylex';
import { styles } from './Alert.styles';
import type { AlertProps, AlertType } from './Alert.types';

const icons: Record<AlertType, string> = {
	error: '!',
	success: '\u2713',
	warning: '\u26A0',
	info: 'i',
};

function capitalize(s: string): string {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

export function Alert({ type = 'info', title, message }: AlertProps) {
	return (
		<div {...stylex.props(styles.base, styles[type])}>
			<div {...stylex.props(styles.icon, styles[`icon${capitalize(type)}` as keyof typeof styles])}>
				{icons[type]}
			</div>
			<div {...stylex.props(styles.body)}>
				<p {...stylex.props(styles.title)}>{title}</p>
				<p {...stylex.props(styles.message)}>{message}</p>
			</div>
		</div>
	);
}
