import { create } from '@stylexjs/stylex';
import { roles, spacing } from '@repo/ui-web-stylex/vars.stylex';

export const styles = create({
	inner: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: spacing.md,
	},
	avatar: {
		width: 64,
		height: 64,
		borderRadius: '50%',
		backgroundColor: roles.surfaceBrand,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 24,
		fontWeight: 700,
		color: roles.textBrand,
	},
	stats: {
		display: 'flex',
		gap: spacing.lg,
		paddingTop: spacing.md,
		borderTopWidth: 1,
		borderTopStyle: 'solid',
		borderTopColor: roles.divider,
		width: '100%',
		justifyContent: 'center',
	},
	stat: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 2,
	},
});
