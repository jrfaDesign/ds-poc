import * as stylex from '@stylexjs/stylex';
import { styles } from './Badge.styles';
import type { BadgeProps } from './Badge.types';

export function Badge({ variant = 'brand', dot = false, children }: BadgeProps) {
	return (
		<span {...stylex.props(styles.base, styles[variant])}>
			{dot && <span {...stylex.props(styles.dot)} />}
			{children}
		</span>
	);
}
