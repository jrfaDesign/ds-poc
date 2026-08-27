import { create } from '@stylexjs/stylex';
import {
	feedbackContracts,
	surfaceContracts,
	spacing,
	radii,
} from '../../adapters/stylex/createStylexVars.stylex';

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
		backgroundColor: surfaceContracts.brandBg,
		color: surfaceContracts.brandOn,
		borderColor: 'transparent',
	},
	alt: {
		backgroundColor: surfaceContracts.altBg,
		color: 'var(--ct-text-secondary)',
		borderColor: 'transparent',
	},
	outline: {
		backgroundColor: 'transparent',
		color: 'var(--ct-text-secondary)',
		borderColor: 'var(--ct-border-tertiary)',
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
	dot: {
		width: 6,
		height: 6,
		borderRadius: '50%',
		display: 'inline-block',
		flexShrink: 0,
		color: 'currentColor',
	},
});
