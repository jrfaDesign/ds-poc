import * as stylex from '@stylexjs/stylex';
import { styles } from './Section.styles';
import { Typography } from '../Typography/Typography';
import type { SectionProps } from './Section.types';

export function Section({ title, children }: SectionProps) {
	return (
		<div {...stylex.props(styles.section)}>
			<Typography role="overline">{title}</Typography>
			{children}
		</div>
	);
}
