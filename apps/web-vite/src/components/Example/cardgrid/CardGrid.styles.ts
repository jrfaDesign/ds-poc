import { create } from '@stylexjs/stylex';
import { spacing } from '../../../design-system/adapters/stylex/createStylexVars.stylex';

export const styles = create({
	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
		gap: spacing.md,
	},
});
