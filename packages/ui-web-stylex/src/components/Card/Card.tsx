import * as stylex from '@stylexjs/stylex';
import { styles } from './Card.styles';
import type { CardProps } from './Card.types';

export function Card({ variant = 'surface', children, ...props }: CardProps) {
	return (
		<div {...stylex.props(styles.base, styles[variant])} {...props}>
			{children}
		</div>
	);
}
