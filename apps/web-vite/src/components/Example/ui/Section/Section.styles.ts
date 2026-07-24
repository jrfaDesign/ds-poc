import { create } from '@stylexjs/stylex';
import { spacing } from '../../../../design-system/adapters/stylex/createStylexVars.stylex';

export const styles = create({
	section: {
		marginBottom: spacing.lg,
		display: 'flex',
		flexDirection: 'column',
		gap: spacing.md,
		width: '100%',
	},
});
