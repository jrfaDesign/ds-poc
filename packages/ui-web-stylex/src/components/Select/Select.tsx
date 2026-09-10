import * as stylex from '@stylexjs/stylex';
import { styles } from './Select.styles';
import { Typography } from '../Typography/Typography';
import type { SelectProps, SelectItemProps } from './Select.types';

function ChevronIcon() {
	return (
		<svg
			{...stylex.props(styles.chevron)}
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
		>
			<path
				fillRule="evenodd"
				d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
				clipRule="evenodd"
			/>
		</svg>
	);
}

function SelectItem({ value, disabled, children }: SelectItemProps) {
	return (
		<option {...stylex.props(styles.option)} value={value} disabled={disabled}>
			{children}
		</option>
	);
}

function SelectRoot({
	label,
	value,
	defaultValue,
	onChange,
	id,
	children,
	size = 'md',
}: SelectProps) {
	return (
		<div {...stylex.props(styles.field)}>
			{label && <Typography role="label">{label}</Typography>}
			<div {...stylex.props(styles.wrapper)}>
				<select
					{...stylex.props(styles.base, styles[size])}
					value={value}
					defaultValue={defaultValue}
					onChange={onChange}
					id={id}
				>
					{children}
				</select>
				<ChevronIcon />
			</div>
		</div>
	);
}

export const Select = Object.assign(SelectRoot, { Item: SelectItem });
