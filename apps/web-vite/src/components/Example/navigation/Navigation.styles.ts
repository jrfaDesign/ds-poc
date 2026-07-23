import { create } from '@stylexjs/stylex';
import {
	roles,
	spacing,
	radii,
	components,
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
	nav: {
		backgroundColor: roles.surface,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.border,
		borderRadius: components.cardBorderRadii,
		overflow: 'hidden',
	},
	navInner: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: spacing.md,
	},
	brand: {
		display: 'flex',
		alignItems: 'center',
		gap: spacing.sm,
	},
	brandIcon: {
		width: 28,
		height: 28,
		backgroundColor: roles.actionPrimaryBg,
		borderRadius: radii.sm,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 14,
		color: roles.actionPrimaryFg,
		fontWeight: 700,
	},
	brandName: {
		fontSize: 16,
		fontWeight: 700,
		color: roles.text,
	},
	links: {
		display: 'flex',
		gap: 0,
	},
	linkItem: {
		padding: `${spacing.sm} ${spacing.md}`,
		borderRadius: radii.md,
		fontSize: 14,
		fontWeight: 500,
		color: roles.textSecondary,
		textDecoration: 'none',
		cursor: 'pointer',
		transitionProperty: 'color, background-color',
		transitionDuration: '150ms',
		':hover': {
			color: roles.actionLinkFgHover,
			backgroundColor: roles.surfaceAlt,
		},
	},
	linkActive: {
		color: roles.actionLinkFg,
		fontWeight: 600,
		backgroundColor: roles.surfaceAlt,
	},
	actions: {
		display: 'flex',
		alignItems: 'center',
		gap: spacing.sm,
	},
	avatar: {
		width: 32,
		height: 32,
		borderRadius: '50%',
		backgroundColor: roles.actionSecondaryBg,
		color: roles.actionSecondaryFg,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 12,
		fontWeight: 600,
		cursor: 'pointer',
		':hover': {
			backgroundColor: roles.actionSecondaryBgHover,
		},
	},
	divider: {
		height: 1,
		backgroundColor: roles.divider,
		margin: 0,
	},
});
