import { create } from '@stylexjs/stylex';
import { spacing } from '@repo/ui-web-stylex/vars.stylex';

export const styles = create({
	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
		gap: spacing.md,
	},
});
