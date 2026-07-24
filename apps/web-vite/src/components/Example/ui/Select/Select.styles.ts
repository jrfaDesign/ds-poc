import { create } from '@stylexjs/stylex';
import {
	components,
	roles,
	spacing,
} from '../../../../design-system/adapters/stylex/createStylexVars.stylex';

const inputBase = {
	padding: spacing.md,
	fontSize: 14,
	fontFamily: 'system-ui, -apple-system, sans-serif',
	color: roles.text,
	backgroundColor: roles.surfaceSunken,
	borderWidth: 1,
	borderStyle: 'solid',
	borderColor: roles.border,
	borderRadius: components.buttonBorderRadii,
	outline: 'none',
	transitionProperty: 'border-color, box-shadow',
	transitionDuration: '150ms',
	'::placeholder': {
		color: roles.textPlaceholder,
		opacity: 1,
	},
	':focus': {
		borderColor: roles.focusRing,
		boxShadow: `0 0 0 3px ${roles.focusRing}`,
	},
} as const;

export const styles = create({
	base: inputBase,
	select: {
		appearance: 'none',
		paddingRight: 36,
		width: '100%',
		backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 12 12'%3E%3Cpath stroke='%23777' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M3 5l3 3 3-3'/%3E%3C/svg%3E")`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'right 12px center',
		backgroundSize: '12px',
		cursor: 'pointer',
		':hover': {
			borderColor: roles.textSecondary,
		},
	},
	wrapper: {
		position: 'relative',
	},
	field: {
		display: 'flex',
		flexDirection: 'column',
		gap: spacing.sm,
	},
});
