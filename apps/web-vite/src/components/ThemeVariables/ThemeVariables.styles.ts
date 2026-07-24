import { create } from '@stylexjs/stylex';
import { roles, spacing, radii } from '../../design-system/adapters/stylex/createStylexVars.stylex';

export const styles = create({
	page: {
		padding: spacing.lg,
		maxWidth: 960,
		margin: '0 auto',
		fontFamily: 'system-ui, -apple-system, sans-serif',
		color: roles.text,
		overflowX: 'hidden' as const,
	},
	header: {
		marginBottom: spacing.lg,
		paddingBottom: spacing.md,
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: roles.divider,
	},
	h1: {
		fontSize: 28,
		fontWeight: 700,
		margin: 0,
		color: roles.text,
	},
	p: {
		fontSize: 14,
		color: roles.textSecondary,
		margin: '4px 0 0',
	},
	section: {
		marginBottom: spacing.lg,
		padding: spacing.lg,
		backgroundColor: roles.surface,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.border,
		borderRadius: radii.lg,
		overflow: 'hidden' as const,
	},
	h2: {
		fontSize: 18,
		fontWeight: 600,
		margin: '0 0 16px',
		color: roles.text,
	},
	h3: {
		fontSize: 14,
		fontWeight: 600,
		margin: '0 0 12px',
		color: roles.textSecondary,
		textTransform: 'uppercase',
		letterSpacing: '0.5px',
	},

	// -- Colors ----------------------------------------------------------------
	familyRow: {
		display: 'flex',
		alignItems: 'center',
		gap: spacing.sm,
		marginBottom: spacing.sm,
	},
	familyLabel: {
		minWidth: 80,
		fontSize: 11,
		fontWeight: 600,
		textTransform: 'uppercase',
		letterSpacing: '0.5px',
		color: roles.textSecondary,
		flexShrink: 0,
	},
	swatchGroup: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: 2,
		flex: 1,
	},
	swatch: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 2,
		flex: 1,
	},
	swatchColor: {
		width: '100%',
		height: 52,
		// borderRadius: radii.sm,
		borderWidth: 0,
		borderStyle: 'solid',
		borderColor: roles.border,
	},
	swatchLabel: {
		fontSize: 10,
		color: roles.textSecondary,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
	},

	// -- Roles -----------------------------------------------------------------
	card: {
		padding: spacing.md,
		backgroundColor: roles.surfaceAlt,
		borderRadius: radii.md,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.border,
	},
	cardTitle: {
		fontSize: 12,
		fontWeight: 600,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
		color: roles.text,
		marginBottom: spacing.lg,
		display: 'block',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	rolePair: {
		display: 'flex',
		alignItems: 'center',
		gap: spacing.sm,
	},
	roleSide: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 2,
		flex: 1,
	},
	roleColor: {
		width: '100%',
		height: 70,
		borderRadius: radii.sm,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.border,
	},
	roleLabel: {
		fontSize: 9,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
		color: roles.textSecondary,
		textAlign: 'center',
		wordBreak: 'break-all',
	},
	arrow: {
		color: roles.textSecondary,
		fontSize: 14,
		flexShrink: 0,
	},

	// -- Spacing ---------------------------------------------------------------
	spacingCol: {
		flex: 1,
	},
	spacingRow: {
		display: 'flex',
		alignItems: 'center',
		gap: spacing.md,
		marginBottom: spacing.sm,
	},
	spacingLabel: {
		minWidth: 48,
		fontSize: 13,
		fontWeight: 600,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
		color: roles.text,
	},
	spacingTrack: {
		flex: 1,
		height: 12,
		backgroundColor: roles.surfaceAlt,
		borderRadius: radii.sm,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.border,
		overflow: 'hidden',
	},
	spacingFill: {
		height: '100%',
		backgroundColor: roles.actionPrimaryBg,
		borderRadius: radii.sm,
		minWidth: 4,
		transition: 'width 0.2s',
	},
	spacingVal: {
		minWidth: 36,
		fontSize: 12,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
		color: roles.textSecondary,
		textAlign: 'right' as const,
	},

	// -- Radii -----------------------------------------------------------------
	radiiGrid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(4, 1fr)',
		gap: spacing.md,
	},
	radiiCell: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: spacing.sm,
	},
	radiiBox: {
		width: 56,
		height: 56,
		backgroundColor: roles.actionPrimaryBg,
		borderWidth: 2,
		borderStyle: 'solid',
		borderColor: roles.actionPrimaryBorder,
	},
	radiiLabel: {
		fontSize: 13,
		fontWeight: 600,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
		color: roles.text,
	},
	radiiVal: {
		fontSize: 11,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
		color: roles.textSecondary,
	},

	// -- Component tokens ------------------------------------------------------
	compBody: {
		display: 'flex',
		alignItems: 'center',
		gap: spacing.sm,
		fontSize: 12,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
		color: roles.textSecondary,
		flexWrap: 'wrap',
	},
	compSwatch: {
		width: 20,
		height: 20,
		borderRadius: radii.sm,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.border,
		flexShrink: 0,
	},

	// -- Shadows ---------------------------------------------------------------
	shadowLabel: {
		fontSize: 13,
		fontWeight: 600,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
		color: roles.text,
	},
	// -- Gradients -------------------------------------------------------------
	gradientCard: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: spacing.sm,
	},
	gradientBox: {
		width: '100%',
		height: 80,
		borderRadius: radii.md,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.border,
	},
	gradientLabel: {
		fontSize: 13,
		fontWeight: 600,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
		color: roles.text,
	},
	// -- Layout ----------------------------------------------------------------
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
});
