import { create } from '@stylexjs/stylex';
import {
	roles,
	spacing,
	components,
} from '../../../../design-system/adapters/stylex/createStylexVars.stylex';

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
		backgroundColor: roles.surface,
		borderColor: roles.border,
	},
	raised: {
		backgroundColor: roles.surfaceRaised,
		borderColor: roles.borderWeak,
	},
	alt: {
		backgroundColor: roles.surfaceAlt,
		borderColor: roles.border,
	},
	brand: {
		backgroundColor: roles.surfaceBrand,
		borderColor: roles.borderWeak,
	},
});
