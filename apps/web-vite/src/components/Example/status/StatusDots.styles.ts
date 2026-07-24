import { create } from '@stylexjs/stylex';
import { roles, spacing } from '../../../design-system/adapters/stylex/createStylexVars.stylex';

export const styles = create({
	row: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: spacing.md,
		alignItems: 'center',
	},
	dot: {
		width: 12,
		height: 12,
		borderRadius: '50%',
		flexShrink: 0,
	},
	label: {
		display: 'flex',
		alignItems: 'center',
		gap: spacing.sm,
		fontSize: 13,
		color: roles.text,
	},
	active: {
		backgroundColor: roles.successFg,
	},
	error: {
		backgroundColor: roles.errorFg,
	},
	warning: {
		backgroundColor: roles.warningFg,
	},
	info: {
		backgroundColor: roles.infoFg,
	},
});
