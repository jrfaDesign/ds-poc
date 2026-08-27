import { create } from '@stylexjs/stylex';
import { spacing, radii } from '../../adapters/stylex/createStylexVars.stylex';

export const styles = create({
	field: {
		display: 'flex',
		flexDirection: 'column',
		gap: spacing['2xs'],
	},
	base: {
		padding: `${spacing.sm} ${spacing.md}`,
		fontSize: 14,
		fontFamily: 'system-ui, -apple-system, sans-serif',
		borderRadius: radii.sm,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'var(--ct-border-primary)',
		backgroundColor: 'var(--ct-bg-primary)',
		color: 'var(--ct-text-primary)',
		outline: 'none',
		transitionProperty: 'border-color, box-shadow',
		transitionDuration: '150ms',
		':focus': {
			borderColor: 'var(--ct-border-brand)',
			boxShadow: 'var(--focusring-focus-ring)',
		},
		'::placeholder': {
			color: 'var(--ct-text-placeholder)',
		},
	},
});
