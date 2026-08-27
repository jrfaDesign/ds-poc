import { create } from '@stylexjs/stylex';
import {
	roles,
	spacing,
	components,
	shadows,
	feedbackContracts,
	surfaceContracts,
} from '@repo/ui-web-stylex/vars.stylex';

export const styles = create({
	wrapper: {
		position: 'relative',
	},
	dialog: {
		position: 'relative',
		backgroundColor: surfaceContracts.baseBg,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: surfaceContracts.baseBorder,
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
	},
	footer: {
		display: 'flex',
		justifyContent: 'flex-end',
		gap: spacing.sm,
		paddingTop: spacing.md,
		borderTopWidth: 1,
		borderTopStyle: 'solid',
		borderTopColor: surfaceContracts.baseBorder,
	},
});
