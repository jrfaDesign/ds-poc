import * as stylex from '@stylexjs/stylex';
import { roles, spacing, colors, gradients } from '@repo/ui-web-stylex/vars.stylex';

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
		backgroundColor: colors.neutral_500,
		backgroundImage: gradients.primary_900_600_45,
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: colors.neutral_500,
		gap: 12,
		boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
		marginBottom: spacing.lg,
	},
	controls: {
		display: 'flex',
		gap: 10,
	},
});
