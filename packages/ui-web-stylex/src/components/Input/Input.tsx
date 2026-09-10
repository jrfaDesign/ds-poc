import * as stylex from '@stylexjs/stylex';
import { styles } from './Input.styles';
import { Typography } from '../Typography/Typography';
import type { InputProps } from './Input.types';

export function Input({
	label,
	placeholder,
	type = 'text',
	size = 'md',
	value,
	onChange,
	disabled,
	id,
}: InputProps) {
	return (
		<div {...stylex.props(styles.field)}>
			{label && <Typography role="label">{label}</Typography>}
			<input
				{...stylex.props(styles.base, styles[size])}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				disabled={disabled}
				id={id}
			/>
		</div>
	);
}
