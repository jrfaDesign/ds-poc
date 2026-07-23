import { create } from '@stylexjs/stylex';
import {
	roles,
	spacing,
	components,
	shadows,
} from '../../../design-system/adapters/stylex/createStylexVars.stylex';

export const styles = create({
	section: {
		marginBottom: spacing.lg,
	},
	tag: {
		fontSize: 10,
		fontFamily: '"SF Mono", "Cascadia Code", monospace',
		color: roles.textSecondary,
		marginBottom: spacing.sm,
	},
	heading: {
		fontSize: 13,
		fontWeight: 600,
		textTransform: 'uppercase',
		letterSpacing: '0.5px',
		color: roles.textSecondary,
		marginBottom: spacing.sm,
	},
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
	modalTitle: {
		fontSize: 17,
		fontWeight: 700,
		color: roles.text,
		margin: 0,
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
	body: {
		fontSize: 13,
		color: roles.textSecondary,
		margin: 0,
		lineHeight: 1.6,
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
	btn: {
		padding: `${spacing.sm} ${spacing.lg}`,
		fontSize: 13,
		fontWeight: 600,
		fontFamily: 'system-ui, -apple-system, sans-serif',
		borderRadius: components.buttonBorderRadii,
		borderWidth: 1,
		borderStyle: 'solid',
		cursor: 'pointer',
		transitionProperty: 'background-color, color',
		transitionDuration: '150ms',
		lineHeight: 1.4,
	},
	btnPrimary: {
		backgroundColor: roles.actionPrimaryBg,
		color: roles.actionPrimaryFg,
		borderColor: roles.actionPrimaryBorder,
		':hover': {
			backgroundColor: roles.actionPrimaryBgHover,
		},
	},
	btnGhost: {
		backgroundColor: roles.actionGhostBg,
		color: roles.actionGhostFg,
		borderColor: roles.actionGhostBorder,
		':hover': {
			backgroundColor: roles.actionGhostBgHover,
		},
	},
});
