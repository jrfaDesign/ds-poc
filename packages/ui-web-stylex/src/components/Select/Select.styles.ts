import { create } from '@stylexjs/stylex';
import { roles, spacing, radii } from '../../adapters/stylex/createStylexVars.stylex';

export const styles = create({
	field: {
		display: 'flex',
		flexDirection: 'column',
		gap: spacing['2xs'],
	},
	wrapper: {
		position: 'relative',
	},
	base: {
		appearance: 'none',
		padding: `${spacing.sm} ${spacing.md}`,
		paddingRight: 32,
		fontSize: 14,
		fontFamily: 'system-ui, -apple-system, sans-serif',
		borderRadius: radii.sm,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.border,
		backgroundColor: roles.surface,
		color: roles.text,
		outline: 'none',
		cursor: 'pointer',
		width: '100%',
		transitionProperty: 'border-color, box-shadow',
		transitionDuration: '150ms',
		':focus': {
			borderColor: roles.focusRing,
			boxShadow: `0 0 0 2px ${roles.focusRing}`,
		},
	},
	select: {},
});
