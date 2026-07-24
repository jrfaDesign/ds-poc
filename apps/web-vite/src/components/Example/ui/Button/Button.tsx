import * as stylex from '@stylexjs/stylex';
import { styles } from './Button.styles';
import type { ButtonProps } from './Button.types';

export function Button({ variant = 'primary', disabled = false, children, onClick }: ButtonProps) {
	const disabledKey = `${variant}Disabled` as keyof typeof styles;

	return (
		<button
			{...stylex.props(styles.base, styles[variant], disabled && styles[disabledKey])}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
