import { create } from '@stylexjs/stylex';
import { spacing, radii, shadows, surfaceContracts } from '@repo/ui-web-stylex/vars.stylex';

export const styles = create({
	page: {
		padding: spacing.lg,
		maxWidth: 960,
		margin: '0 auto',
		fontFamily: 'system-ui, -apple-system, sans-serif',
		overflowX: 'hidden' as const,
	},
	header: {
		marginBottom: spacing.lg,
		paddingBottom: spacing.md,
	},
	h1: {
		fontSize: 28,
		fontWeight: 700,
		margin: 0,
	},
	p: {
		fontSize: 14,
		margin: '4px 0 0',
	},
	h2: {
		fontSize: 18,
		fontWeight: 600,
		margin: '0 0 16px',
	},
	h3: {
		fontSize: 14,
		fontWeight: 600,
		margin: '0 0 12px',
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
	},
	swatchLabel: {
		fontSize: 10,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
	},

	// -- Roles -----------------------------------------------------------------
	card: {
		padding: spacing.md,
		borderRadius: radii.md,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: surfaceContracts.baseBorder,
	},
	cardTitle: {
		fontSize: 12,
		fontWeight: 600,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
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
		boxShadow: shadows.md,
	},
	roleLabel: {
		fontSize: 9,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
		textAlign: 'center',
		wordBreak: 'break-all',
	},
	arrow: {
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
	},
	spacingTrack: {
		flex: 1,
		height: 12,
		borderRadius: radii.sm,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: surfaceContracts.baseBorder,
		overflow: 'hidden',
	},
	spacingFill: {
		height: '100%',
		borderRadius: radii.sm,
		minWidth: 4,
		transition: 'width 0.2s',
	},
	spacingVal: {
		minWidth: 36,
		fontSize: 12,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
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
		borderWidth: 2,
		borderStyle: 'solid',
		borderColor: surfaceContracts.baseBorder,
	},
	radiiLabel: {
		fontSize: 13,
		fontWeight: 600,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
	},
	radiiVal: {
		fontSize: 11,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
	},

	// -- Component tokens ------------------------------------------------------
	compBody: {
		display: 'flex',
		alignItems: 'center',
		gap: spacing.sm,
		fontSize: 12,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
		flexWrap: 'wrap',
	},
	compSwatch: {
		width: 20,
		height: 20,
		borderRadius: radii.sm,
		borderWidth: 1,
		borderStyle: 'solid',
		flexShrink: 0,
		borderColor: surfaceContracts.baseBorder,
	},

	// -- Shadows ---------------------------------------------------------------
	shadowLabel: {
		fontSize: 13,
		fontWeight: 600,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
		color: surfaceContracts.baseOn,
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
		borderColor: surfaceContracts.baseBorder,
	},
	gradientLabel: {
		fontSize: 13,
		fontWeight: 600,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
		color: surfaceContracts.baseOn,
	},
	// -- Layout ----------------------------------------------------------------
	tokenTable: {
		borderRadius: radii.md,
		borderWidth: 1,
		borderStyle: 'solid',
		marginTop: spacing.sm,
		overflow: 'hidden',
		borderColor: surfaceContracts.baseBorder,
	},
	colDemo: {
		fontSize: 12,
		fontWeight: 600,
		fontFamily: '"SF Mono", "Cascadia Code", monospace',
		textAlign: 'center',
		padding: '8px 0',
		borderRadius: radii.sm,
	},
});
