import { create } from '@stylexjs/stylex';
import {
	spacing,
	radii,
	fontSize,
	fontFamily,
	components,
} from '../../adapters/stylex/createStylexVars.stylex';

export const styles = create({
	field: {
		display: 'flex',
		flexDirection: 'column',
		gap: spacing.xxs,
	},
	base: {
		fontFamily: fontFamily.body,
		borderRadius: components.inputBorderRadii,
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
	sm: {
		fontSize: fontSize.xs,
		padding: `${spacing.xxs} ${spacing.sm}`,
		minHeight: 28,
	},
	md: {
		fontSize: fontSize.sm,
		padding: `${spacing.xs} ${spacing.md}`,
		minHeight: 36,
	},
	lg: {
		fontSize: fontSize.md,
		padding: `${spacing.sm} ${spacing.lg}`,
		minHeight: 44,
	},
});
