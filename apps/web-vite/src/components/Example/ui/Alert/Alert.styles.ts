import { create } from '@stylexjs/stylex';
import {
	roles,
	spacing,
	components,
} from '../../../../design-system/adapters/stylex/createStylexVars.stylex';

export const styles = create({
	base: {
		display: 'flex',
		alignItems: 'flex-start',
		gap: spacing.sm,
		padding: spacing.md,
		borderRadius: components.cardBorderRadii,
		borderWidth: 1,
		borderStyle: 'solid',
		marginBottom: spacing.sm,
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
	icon: {
		flexShrink: 0,
		width: 18,
		height: 18,
		borderRadius: '50%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 11,
		fontWeight: 700,
		lineHeight: 1,
		marginTop: 1,
	},
	iconError: {
		backgroundColor: roles.errorFg,
		color: roles.errorBg,
	},
	iconSuccess: {
		backgroundColor: roles.successFg,
		color: roles.successBg,
	},
	iconWarning: {
		backgroundColor: roles.warningFg,
		color: roles.warningBg,
	},
	iconInfo: {
		backgroundColor: roles.infoFg,
		color: roles.infoBg,
	},
	body: {
		flex: 1,
		minWidth: 0,
	},
	title: {
		fontSize: 14,
		fontWeight: 600,
		color: 'inherit',
		margin: 0,
	},
	message: {
		fontSize: 13,
		color: 'inherit',
		opacity: 0.85,
		margin: '2px 0 0',
	},
});
