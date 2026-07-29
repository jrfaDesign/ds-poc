import { create } from '@stylexjs/stylex';
import {
	actionContracts,
	feedbackContracts,
	surfaceContracts,
	roles,
	spacing,
	radii,
} from '../../design-system/adapters/stylex/createStylexVars.stylex';

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
	h2: {
		fontSize: 18,
		fontWeight: 600,
		margin: '0 0 16px',
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
		marginBottom: spacing.sm,
		display: 'block',
		textTransform: 'uppercase',
		letterSpacing: '0.5px',
	},

	// -- Action previews -------------------------------------------------------
	btnBase: {
		padding: `${spacing.xs} ${spacing.md}`,
		fontSize: 12,
		fontWeight: 600,
		fontFamily: 'system-ui, -apple-system, sans-serif',
		borderWidth: 1,
		borderStyle: 'solid',
		cursor: 'pointer',
		borderRadius: radii.sm,
		lineHeight: 1.4,
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		transitionProperty: 'background-color, border-color, color',
		transitionDuration: '150ms',
		outline: 'none',
	},
	btnPrimary: {
		backgroundColor: actionContracts.primaryBg,
		color: actionContracts.primaryOn,
		borderColor: actionContracts.primaryBorder,
		':hover': {
			backgroundColor: actionContracts.primaryBgHover,
		},

		':focus-visible': {
			outline: '2px solid',
			outlineColor: actionContracts.primaryBorderFocus,
			outlineOffset: 2,
		},
	},
	btnSecondary: {
		backgroundColor: actionContracts.secondaryBg,
		color: actionContracts.secondaryOn,
		borderColor: actionContracts.secondaryBorder,
		':hover': {
			backgroundColor: actionContracts.secondaryBgHover,
		},

		':focus-visible': {
			outline: '2px solid',
			outlineColor: actionContracts.secondaryBorderFocus,
			outlineOffset: 2,
		},
	},
	btnGhost: {
		backgroundColor: actionContracts.ghostBg,
		color: actionContracts.ghostOn,
		borderColor: actionContracts.ghostBorder,
		':hover': {
			backgroundColor: actionContracts.ghostBgHover,
		},
		':focus-visible': {
			outline: '2px solid',
			outlineColor: actionContracts.ghostBorderFocus,
			outlineOffset: 2,
		},
	},
	btnLink: {
		backgroundColor: 'transparent',
		color: actionContracts.linkOn,
		borderColor: 'transparent',
		paddingLeft: 0,
		paddingRight: 0,
		':hover': {
			color: actionContracts.linkOnHover,
		},

		':focus-visible': {
			outline: '2px solid',
			outlineColor: actionContracts.linkOnFocus,
			outlineOffset: 2,
		},
	},

	// -- Swatch row ------------------------------------------------------------
	propRow: {
		display: 'flex',
		alignItems: 'center',
		gap: 4,
		marginTop: spacing.sm,
		flexWrap: 'wrap' as const,
	},
	propChip: {
		display: 'flex',
		alignItems: 'center',
		gap: 4,
		padding: '2px 6px',
		borderRadius: radii.xs,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.borderWeak,
		fontSize: 9,
		fontFamily: '"SF Mono", "Cascadia Code", "Fira Code", monospace',
		color: roles.textSecondary,
	},
	chipSwatch: {
		width: 10,
		height: 10,
		borderRadius: 2,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.borderWeak,
		flexShrink: 0,
	},

	// -- Feedback --------------------------------------------------------------
	fbBanner: {
		padding: spacing.sm,
		borderRadius: radii.md,
		borderWidth: 1,
		borderStyle: 'solid',
		marginBottom: spacing.sm,
		fontSize: 12,
		fontWeight: 600,
		textAlign: 'center' as const,
	},
	fbError: {
		backgroundColor: feedbackContracts.errorBg,
		color: feedbackContracts.errorOn,
		borderColor: feedbackContracts.errorBorder,
	},
	fbSuccess: {
		backgroundColor: feedbackContracts.successBg,
		color: feedbackContracts.successOn,
		borderColor: feedbackContracts.successBorder,
	},
	fbWarning: {
		backgroundColor: feedbackContracts.warningBg,
		color: feedbackContracts.warningOn,
		borderColor: feedbackContracts.warningBorder,
	},
	fbInfo: {
		backgroundColor: feedbackContracts.infoBg,
		color: feedbackContracts.infoOn,
		borderColor: feedbackContracts.infoBorder,
	},

	// -- Surfaces --------------------------------------------------------------
	surfaceBlock: {
		padding: spacing.lg,
		borderRadius: radii.md,
		borderWidth: 1,
		borderStyle: 'solid',
		fontSize: 13,
		fontWeight: 500,
		textAlign: 'center' as const,
		marginBottom: spacing.sm,
	},
	surfBase: {
		backgroundColor: surfaceContracts.baseBg,
		color: surfaceContracts.baseOn,
		borderColor: surfaceContracts.baseBorder,
	},
	surfAlt: {
		backgroundColor: surfaceContracts.altBg,
		color: surfaceContracts.altOn,
		borderColor: surfaceContracts.altBorder,
	},
	surfRaised: {
		backgroundColor: surfaceContracts.raisedBg,
		color: surfaceContracts.raisedOn,
		borderColor: surfaceContracts.raisedBorder,
	},
	surfSunken: {
		backgroundColor: surfaceContracts.sunkenBg,
		color: surfaceContracts.sunkenOn,
		borderColor: surfaceContracts.sunkenBorder,
	},
	surfInverse: {
		backgroundColor: surfaceContracts.inverseBg,
		color: surfaceContracts.inverseOn,
		borderColor: surfaceContracts.inverseBorder,
	},
	surfBrand: {
		backgroundColor: surfaceContracts.brandBg,
		color: surfaceContracts.brandOn,
		borderColor: surfaceContracts.brandBorder,
	},
});
