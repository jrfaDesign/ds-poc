import { create } from '@stylexjs/stylex';

import {
	roles,
	spacing,
	components,
} from '../../design-system/adapters/stylex/createStylexVars.stylex';

export const styles = create({
	page: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: roles.surfaceAlt,
	},

	container: {
		width: 420,
		padding: spacing.lg,
		borderRadius: components.cardBorderRadii,
		backgroundColor: roles.surfaceAlt,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.border,
		display: 'flex',
		flexDirection: 'column',
		gap: spacing.lg,
	},

	header: {
		display: 'flex',
		flexDirection: 'column',
		gap: spacing.sm,
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: roles.divider,
		paddingBottom: spacing.md,
	},

	title: {
		fontSize: 24,
		fontWeight: 600,
		color: roles.text,
	},

	subtitle: {
		fontSize: 14,
		color: roles.textSecondary,
	},

	fieldGroup: {
		display: 'flex',
		flexDirection: 'column',
		gap: spacing.sm,
	},

	label: {
		fontSize: 14,
		fontWeight: 500,
		color: roles.text,
	},

	input: {
		padding: spacing.md,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.border,
		borderRadius: components.buttonBorderRadii,
		backgroundColor: roles.surfaceAlt,
		color: roles.text,

		':focus': {
			borderColor: roles.actionPrimaryBorder,
			boxShadow: `0 0 0 3px ${roles.actionPrimaryBg}`,
		},

		'::placeholder': {
			color: roles.textSecondary,
			opacity: 1,
		},
	},

	button: {
		marginTop: spacing.md,
		padding: spacing.md,
		borderRadius: components.buttonBorderRadii,
		backgroundColor: roles.actionPrimaryBg,
		color: roles.actionPrimaryFg,
		fontSize: 16,
		fontWeight: 600,
		textAlign: 'center',
		cursor: 'pointer',
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.actionPrimaryBorder,
		transitionProperty: 'background-color, border-color',
		transitionDuration: '150ms',

		':hover': {
			backgroundColor: roles.actionPrimaryBgHover,
			borderColor: roles.actionPrimaryBorder,
		},

		':active': {
			backgroundColor: roles.actionPrimaryBgActive,
		},

		':disabled': {
			backgroundColor: roles.actionPrimaryDisabledBg,
			color: roles.actionPrimaryDisabledFg,
			borderColor: roles.actionPrimaryDisabledBorder,
			cursor: 'not-allowed',
			opacity: 0.7,
		},
	},

	errorBox: {
		padding: spacing.md,
		borderRadius: components.cardBorderRadii,
		backgroundColor: roles.errorBg,
		color: roles.errorFg,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.errorBorder,
	},

	successBox: {
		padding: spacing.md,
		borderRadius: components.cardBorderRadii,
		backgroundColor: roles.successBg,
		color: roles.successFg,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.successBorder,
	},
});
