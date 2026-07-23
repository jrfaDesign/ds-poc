import { create } from '@stylexjs/stylex';
import { roles, spacing } from '../../design-system/adapters/stylex/createStylexVars.stylex';

export const styles = create({
	page: {
		maxWidth: 960,
		margin: '0 auto',
		padding: spacing.lg,
		fontFamily: 'system-ui, -apple-system, sans-serif',
		color: roles.text,
	},
	header: {
		marginBottom: spacing.lg,
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
	grid: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gap: spacing.lg,
	},
	full: {
		gridColumn: '1 / -1',
	},
});
