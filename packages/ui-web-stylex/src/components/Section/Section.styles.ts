import { create } from '@stylexjs/stylex';
import { spacing } from '../../adapters/stylex/createStylexVars.stylex';

export const styles = create({
	section: {
		display: 'flex',
		flexDirection: 'column',
		gap: spacing.sm,
		padding: spacing.md,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'var(--ct-border-secondary)',
		borderRadius: 8,
	},
});
