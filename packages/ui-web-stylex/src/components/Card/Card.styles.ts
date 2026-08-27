import { create } from '@stylexjs/stylex';
import {
	surfaceContracts,
	spacing,
	components,
} from '../../adapters/stylex/createStylexVars.stylex';

export const styles = create({
	base: {
		borderRadius: components.cardBorderRadii,
		borderWidth: 1,
		borderStyle: 'solid',
		padding: spacing.lg,
		display: 'flex',
		flexDirection: 'column',
		gap: spacing.sm,
		marginBottom: spacing.lg,
	},
	surface: {
		backgroundColor: surfaceContracts.baseBg,
		borderColor: surfaceContracts.baseBorder,
	},
	raised: {
		backgroundColor: surfaceContracts.raisedBg,
		borderColor: 'var(--ct-border-tertiary)',
	},
	alt: {
		backgroundColor: surfaceContracts.altBg,
		borderColor: surfaceContracts.altBorder,
	},
	brand: {
		backgroundColor: surfaceContracts.brandBg,
		borderColor: 'var(--ct-border-tertiary)',
	},
});
