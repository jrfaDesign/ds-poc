import { create } from '@stylexjs/stylex';
import { roles, spacing, components } from '@repo/ui-web-stylex/vars.stylex';

export const styles = create({
	form: {
		backgroundColor: roles.surface,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: roles.border,
		borderRadius: components.cardBorderRadii,
		padding: spacing.lg,
		display: 'flex',
		flexDirection: 'column',
		gap: spacing.md,
		width: '100%',
	},
});
