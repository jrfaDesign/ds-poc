import * as stylex from '@stylexjs/stylex';
import { styles } from './Card.styles';
import type { CardProps } from './Card.types';

export function Card({ variant = 'surface', children }: CardProps) {
	return <div {...stylex.props(styles.base, styles[variant])}>{children}</div>;
}
