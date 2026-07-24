import { create } from '@stylexjs/stylex';
import { roles, spacing, radii } from '../../design-system/adapters/stylex/createStylexVars.stylex';

export const styles = create({
	page: {
		maxWidth: 960,
		margin: '0 auto',
		padding: spacing.lg,
		fontFamily: 'system-ui, -apple-system, sans-serif',
		color: roles.text,
		overflowX: 'hidden' as const,
	},
	header: {
		marginBottom: spacing.lg,
	},
	layoutSection: {
		padding: spacing.lg,
		backgroundColor: roles.surface,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.border,
		borderRadius: radii.lg,
	},
	tokenTable: {
		backgroundColor: roles.surfaceAlt,
		borderRadius: radii.md,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.border,
		marginTop: spacing.sm,
		overflow: 'hidden',
	},
	colDemo: {
		backgroundColor: roles.actionPrimaryBg,
		color: roles.white,
		fontSize: 12,
		fontWeight: 600,
		fontFamily: '"SF Mono", "Cascadia Code", monospace',
		textAlign: 'center',
		padding: '8px 0',
		borderRadius: radii.sm,
	},
	colDemoAlt: {
		backgroundColor: roles.actionSecondaryBg,
		color: roles.actionSecondaryFg,
	},
});
