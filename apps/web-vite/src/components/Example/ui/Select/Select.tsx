import * as stylex from '@stylexjs/stylex';
import { styles } from './Select.styles';
import { Typography } from '../Typography/Typography';
import type { SelectProps } from './Select.types';

export function Select({ label, value, defaultValue, onChange, id, children }: SelectProps) {
	return (
		<div {...stylex.props(styles.field)}>
			{label && <Typography role="label">{label}</Typography>}
			<div {...stylex.props(styles.wrapper)}>
				<select
					{...stylex.props(styles.base, styles.select)}
					value={value}
					defaultValue={defaultValue}
					onChange={onChange}
					id={id}
				>
					{children}
				</select>
			</div>
		</div>
	);
}
