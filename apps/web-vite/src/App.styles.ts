import * as stylex from '@stylexjs/stylex';
import { roles, spacing } from '@repo/ui-web-stylex/vars.stylex';

export const AppStyles = stylex.create({
	toolbar: {
		overflowX: 'hidden',
		position: 'sticky',
		top: 0,
		zIndex: 10,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		padding: 20,
		backgroundColor: roles.surface,
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: roles.divider,
		gap: 12,
		boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
		marginBottom: spacing.lg,
	},
	controls: {
		display: 'flex',
		gap: 10,
	},
});
