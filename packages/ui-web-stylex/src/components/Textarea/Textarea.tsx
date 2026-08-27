import * as stylex from '@stylexjs/stylex';
import { styles } from './Textarea.styles';
import { Typography } from '../Typography/Typography';
import type { TextareaProps } from './Textarea.types';

export function Textarea({ label, placeholder, rows = 3, value, onChange }: TextareaProps) {
	return (
		<div {...stylex.props(styles.field)}>
			{label && <Typography role="label">{label}</Typography>}
			<textarea
				{...stylex.props(styles.base)}
				placeholder={placeholder}
				rows={rows}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}
