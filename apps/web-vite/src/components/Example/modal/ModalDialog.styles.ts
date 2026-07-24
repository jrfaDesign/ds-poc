import { create } from '@stylexjs/stylex';
import {
	roles,
	spacing,
	components,
	shadows,
} from '../../../design-system/adapters/stylex/createStylexVars.stylex';

export const styles = create({
	wrapper: {
		position: 'relative',
	},
	dialog: {
		position: 'relative',
		backgroundColor: roles.surfaceRaised,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.border,
		borderRadius: components.cardBorderRadii,
		padding: spacing.lg,
		maxWidth: 380,
		width: '100%',
		margin: `${spacing.lg} auto`,
		display: 'flex',
		flexDirection: 'column',
		gap: spacing.md,
		boxShadow: shadows.lg,
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	closeBtn: {
		width: 28,
		height: 28,
		borderRadius: '50%',
		backgroundColor: roles.actionGhostBg,
		color: roles.textSecondary,
		borderWidth: 0,
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 16,
		':hover': {
			backgroundColor: roles.actionGhostBgHover,
			color: roles.text,
		},
	},
	footer: {
		display: 'flex',
		justifyContent: 'flex-end',
		gap: spacing.sm,
		paddingTop: spacing.md,
		borderTopWidth: 1,
		borderTopStyle: 'solid',
		borderTopColor: roles.divider,
	},
});
