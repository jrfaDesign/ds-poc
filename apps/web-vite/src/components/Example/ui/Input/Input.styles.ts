import { create } from '@stylexjs/stylex';
import {
	roles,
	spacing,
	components,
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
	field: {
		display: 'flex',
		flexDirection: 'column',
		gap: spacing.sm,
	},
});
