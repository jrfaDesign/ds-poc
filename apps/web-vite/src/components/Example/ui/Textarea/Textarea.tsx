import * as stylex from '@stylexjs/stylex';
import { styles } from './Textarea.styles';
import { Typography } from '../Typography/Typography';
import type { TextareaProps } from './Textarea.types';

export function Textarea({ label, value, onChange, placeholder }: TextareaProps) {
	return (
		<div {...stylex.props(styles.field)}>
			{label && <Typography role="label">{label}</Typography>}
			<textarea
				{...stylex.props(styles.base, styles.textarea)}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</div>
	);
}
