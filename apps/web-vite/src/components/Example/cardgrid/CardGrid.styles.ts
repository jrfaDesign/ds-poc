import { create } from '@stylexjs/stylex';
import {
	roles,
	spacing,
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
	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
		gap: spacing.md,
	},
	card: {
		padding: spacing.lg,
		borderRadius: components.cardBorderRadii,
		borderWidth: 1,
		borderStyle: 'solid',
		display: 'flex',
		flexDirection: 'column',
		gap: spacing.sm,
	},
	surface: {
		backgroundColor: roles.surface,
		borderColor: roles.border,
	},
	raised: {
		backgroundColor: roles.surfaceRaised,
		borderColor: roles.borderWeak,
	},
	brand: {
		backgroundColor: roles.surfaceBrand,
		borderColor: roles.borderWeak,
	},
	alt: {
		backgroundColor: roles.surfaceAlt,
		borderColor: roles.border,
	},
	cardTitle: {
		fontSize: 15,
		fontWeight: 700,
		color: roles.text,
		margin: 0,
	},
	cardTitleBrand: {
		color: roles.textBrand,
	},
	cardDesc: {
		fontSize: 12,
		color: roles.textSecondary,
		margin: 0,
		lineHeight: 1.5,
	},
	cardMeta: {
		fontSize: 11,
		color: roles.textTertiary,
		margin: 0,
		marginTop: 'auto',
	},
});
