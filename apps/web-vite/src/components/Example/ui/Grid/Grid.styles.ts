import { create } from '@stylexjs/stylex';

export const styles = create({
	grid: {
		display: 'grid',
		width: '100%',
		marginInline: 'auto',
		boxSizing: 'border-box' as const,
		overflow: 'hidden' as const,
		minWidth: 0,
	},
});
