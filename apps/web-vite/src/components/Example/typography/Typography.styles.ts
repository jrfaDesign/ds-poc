import { create } from '@stylexjs/stylex';
import { roles, spacing } from '../../../design-system/adapters/stylex/createStylexVars.stylex';

export const styles = create({
	panel: {
		display: 'flex',
		flexDirection: 'column',
		gap: spacing.lg,
	},
	controls: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: spacing.md,
		alignItems: 'flex-end',
	},
	field: {
		display: 'flex',
		flexDirection: 'column',
		gap: spacing['3xs'],
		minWidth: 160,
	},

	preview: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.borderWeak,
		borderRadius: 6,
		padding: spacing.lg,
		backgroundColor: roles.surface,
	},
	table: {
		width: '100%',
		borderCollapse: 'collapse' as const,
		fontFamily: '"SF Mono", "Cascadia Code", monospace',
		fontSize: 12,
	},
	th: {
		textAlign: 'left' as const,
		padding: '6px 12px',
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: roles.borderWeak,
		color: roles.textTertiary,
		fontWeight: 600,
		textTransform: 'uppercase',
		fontSize: 10,
		letterSpacing: '0.5px',
	},
	td: {
		padding: '6px 12px',
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: roles.borderWeak,
		color: roles.text,
		whiteSpace: 'nowrap' as const,
	},
	tdMuted: {
		color: roles.textSecondary,
	},
	tdValue: {
		fontWeight: 500,
	},
	colorSwatch: {
		display: 'inline-block',
		width: 10,
		height: 10,
		borderRadius: 2,
		marginRight: 6,
		verticalAlign: 'middle',
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.borderWeak,
	},
	previewLabel: {
		fontSize: 10,
		fontWeight: 600,
		fontFamily: '"SF Mono", "Cascadia Code", monospace',
		color: roles.textTertiary,
		letterSpacing: '0.5px',
		marginBottom: spacing.sm,
		textTransform: 'uppercase',
	},
});
