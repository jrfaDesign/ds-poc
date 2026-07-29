import { create } from '@stylexjs/stylex';
import {
	feedbackContracts,
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
		backgroundColor: feedbackContracts.errorBg,
		color: feedbackContracts.errorOn,
		borderColor: feedbackContracts.errorBorder,
	},
	success: {
		backgroundColor: feedbackContracts.successBg,
		color: feedbackContracts.successOn,
		borderColor: feedbackContracts.successBorder,
	},
	warning: {
		backgroundColor: feedbackContracts.warningBg,
		color: feedbackContracts.warningOn,
		borderColor: feedbackContracts.warningBorder,
	},
	info: {
		backgroundColor: feedbackContracts.infoBg,
		color: feedbackContracts.infoOn,
		borderColor: feedbackContracts.infoBorder,
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
		backgroundColor: feedbackContracts.errorOn,
		color: feedbackContracts.errorBg,
	},
	iconSuccess: {
		backgroundColor: feedbackContracts.successOn,
		color: feedbackContracts.successBg,
	},
	iconWarning: {
		backgroundColor: feedbackContracts.warningOn,
		color: feedbackContracts.warningBg,
	},
	iconInfo: {
		backgroundColor: feedbackContracts.infoOn,
		color: feedbackContracts.infoBg,
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
