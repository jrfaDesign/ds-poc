import { create } from '@stylexjs/stylex';
import {
	roles,
	spacing,
	radii,
} from '../../../../design-system/adapters/stylex/createStylexVars.stylex';

export const styles = create({
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		gap: 4,
		padding: `2px ${spacing.sm}`,
		fontSize: 11,
		fontWeight: 600,
		fontFamily: 'system-ui, -apple-system, sans-serif',
		borderRadius: radii.sm,
		borderWidth: 1,
		borderStyle: 'solid',
	},
	brand: {
		backgroundColor: roles.surfaceBrand,
		color: roles.textBrand,
		borderColor: 'transparent',
	},
	alt: {
		backgroundColor: roles.surfaceAlt,
		color: roles.textSecondary,
		borderColor: 'transparent',
	},
	outline: {
		backgroundColor: 'transparent',
		color: roles.textSecondary,
		borderColor: roles.borderWeak,
	},
	error: {
		backgroundColor: roles.errorBg,
		color: roles.errorFg,
		borderColor: roles.errorBorder,
	},
	success: {
		backgroundColor: roles.successBg,
		color: roles.successFg,
		borderColor: roles.successBorder,
	},
	warning: {
		backgroundColor: roles.warningBg,
		color: roles.warningFg,
		borderColor: roles.warningBorder,
	},
	info: {
		backgroundColor: roles.infoBg,
		color: roles.infoFg,
		borderColor: roles.infoBorder,
	},
	dot: {
		width: 6,
		height: 6,
		borderRadius: '50%',
		display: 'inline-block',
		flexShrink: 0,
	},
});
