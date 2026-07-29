import { create } from '@stylexjs/stylex';
import {
	actionContracts,
	spacing,
	components,
} from '../../../../design-system/adapters/stylex/createStylexVars.stylex';

export const styles = create({
	base: {
		padding: `${spacing.sm} ${spacing.lg}`,
		fontSize: 14,
		fontWeight: 600,
		fontFamily: 'system-ui, -apple-system, sans-serif',
		borderRadius: components.buttonBorderRadii,
		borderWidth: 1,
		borderStyle: 'solid',
		cursor: 'pointer',
		transitionProperty: 'background-color, border-color, color, opacity',
		transitionDuration: '150ms',
		lineHeight: 1.4,
	},
	primary: {
		backgroundColor: actionContracts.primaryBg,
		color: actionContracts.primaryOn,
		borderColor: actionContracts.primaryBorder,
		':hover': {
			backgroundColor: actionContracts.primaryBgHover,
		},
		':active': {
			backgroundColor: actionContracts.primaryBgActive,
		},
	},
	primaryDisabled: {
		backgroundColor: actionContracts.primaryBgDisabled,
		color: actionContracts.primaryOnDisabled,
		borderColor: actionContracts.primaryBorderDisabled,
		cursor: 'not-allowed',
		opacity: 0.8,
	},
	secondary: {
		backgroundColor: actionContracts.secondaryBg,
		color: actionContracts.secondaryOn,
		borderColor: actionContracts.secondaryBorder,
		':hover': {
			backgroundColor: actionContracts.secondaryBgHover,
		},
		':active': {
			backgroundColor: actionContracts.secondaryBgActive,
		},
	},
	secondaryDisabled: {
		backgroundColor: actionContracts.secondaryBgDisabled,
		color: actionContracts.secondaryOnDisabled,
		borderColor: actionContracts.secondaryBorderDisabled,
		cursor: 'not-allowed',
		opacity: 0.8,
	},
	ghost: {
		backgroundColor: actionContracts.ghostBg,
		color: actionContracts.ghostOn,
		borderColor: actionContracts.ghostBorder,
		':hover': {
			backgroundColor: actionContracts.ghostBgHover,
		},
		':active': {
			backgroundColor: actionContracts.ghostBgActive,
		},
	},
	ghostDisabled: {
		backgroundColor: actionContracts.ghostBgDisabled,
		color: actionContracts.ghostOnDisabled,
		borderColor: actionContracts.ghostBorderDisabled,
		cursor: 'not-allowed',
		opacity: 0.8,
	},
	link: {
		backgroundColor: 'transparent',
		color: actionContracts.linkOn,
		borderColor: 'transparent',
		paddingLeft: 0,
		paddingRight: 0,
		':hover': {
			color: actionContracts.linkOnHover,
		},
		':active': {
			color: actionContracts.linkOnActive,
		},
	},
	linkDisabled: {
		color: actionContracts.linkOnDisabled,
		cursor: 'not-allowed',
		opacity: 0.8,
	},
});
