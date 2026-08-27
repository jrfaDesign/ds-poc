import { create } from '@stylexjs/stylex';
import {
	surfaceContracts,
	roles,
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
	},
	surface: {
		backgroundColor: surfaceContracts.baseBg,
		borderColor: surfaceContracts.baseBorder,
	},
	raised: {
		backgroundColor: surfaceContracts.raisedBg,
		borderColor: roles.borderWeak,
	},
	alt: {
		backgroundColor: surfaceContracts.altBg,
		borderColor: surfaceContracts.altBorder,
	},
	brand: {
		backgroundColor: surfaceContracts.brandBg,
		borderColor: roles.borderWeak,
	},
});
