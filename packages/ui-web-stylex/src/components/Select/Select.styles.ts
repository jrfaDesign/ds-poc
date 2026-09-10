import { create } from '@stylexjs/stylex';
import { spacing, radii, components } from '../../adapters/stylex/createStylexVars.stylex';
import { fontFamily } from '../../adapters/stylex/createStylexVars.stylex';
import { fontSize, fontWeight } from '../../adapters/stylex/createStylexVars.stylex';

export const styles = create({
	field: {
		display: 'flex',
		flexDirection: 'column',
		gap: spacing.xxs,
	},
	wrapper: {
		position: 'relative',
	},
	chevron: {
		position: 'absolute',
		right: 12,
		top: '50%',
		transform: 'translateY(-50%)',
		width: 16,
		height: 16,
		pointerEvents: 'none',
		color: 'var(--ct-text-secondary)',
	},
	base: {
		appearance: 'none',
		paddingRight: 32,
		fontWeight: fontWeight.regular,
		fontFamily: fontFamily.body,
		borderRadius: components.inputBorderRadii,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'var(--ct-border-primary)',
		backgroundColor: 'var(--ct-bg-primary)',
		color: 'var(--ct-text-primary)',
		outline: 'none',
		cursor: 'pointer',
		width: '100%',
		transitionProperty: 'border-color, box-shadow',
		transitionDuration: '150ms',
		':hover': {
			borderColor: 'var(--ct-border-brand)',
		},
		':focus': {
			borderColor: 'var(--ct-border-brand)',
			boxShadow: 'var(--focusring-focus-ring)',
		},
	},
	sm: {
		fontSize: fontSize.xs,
		padding: `${spacing.xxs} ${spacing.sm}`,
		paddingRight: 32,
		minHeight: 28,
	},
	md: {
		fontSize: fontSize.sm,
		padding: `${spacing.xs} ${spacing.md}`,
		paddingRight: 32,
		minHeight: 36,
	},
	lg: {
		fontSize: fontSize.md,
		padding: `${spacing.sm} ${spacing.lg}`,
		paddingRight: 32,
		minHeight: 44,
	},
	option: {
		padding: `${spacing.xs} ${spacing.sm}`,
		fontSize: fontSize.sm,
		fontFamily: fontFamily.body,
	},
});
