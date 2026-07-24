import { create } from '@stylexjs/stylex';
import {
	roles,
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
		backgroundColor: components.buttonBg,
		color: roles.actionPrimaryFg,
		borderColor: roles.actionPrimaryBorder,
		':hover': {
			backgroundColor: roles.actionPrimaryBgHover,
		},
		':active': {
			backgroundColor: roles.actionPrimaryBgActive,
		},
	},
	primaryDisabled: {
		backgroundColor: roles.actionPrimaryDisabledBg,
		color: roles.actionPrimaryDisabledFg,
		borderColor: roles.actionPrimaryDisabledBorder,
		cursor: 'not-allowed',
		opacity: 0.8,
	},
	secondary: {
		backgroundColor: roles.actionSecondaryBg,
		color: roles.actionSecondaryFg,
		borderColor: roles.actionSecondaryBorder,
		':hover': {
			backgroundColor: roles.actionSecondaryBgHover,
		},
		':active': {
			backgroundColor: roles.actionSecondaryBgActive,
		},
	},
	secondaryDisabled: {
		backgroundColor: roles.actionSecondaryDisabledBg,
		color: roles.actionSecondaryDisabledFg,
		borderColor: roles.actionSecondaryDisabledBorder,
		cursor: 'not-allowed',
		opacity: 0.8,
	},
	ghost: {
		backgroundColor: roles.actionGhostBg,
		color: roles.actionGhostFg,
		borderColor: roles.actionGhostBorder,
		':hover': {
			backgroundColor: roles.actionGhostBgHover,
		},
		':active': {
			backgroundColor: roles.actionGhostBgActive,
		},
	},
	ghostDisabled: {
		backgroundColor: roles.actionPrimaryDisabledBg,
		color: roles.actionPrimaryDisabledFg,
		borderColor: roles.actionPrimaryDisabledBorder,
		cursor: 'not-allowed',
		opacity: 0.8,
	},
	link: {
		backgroundColor: 'transparent',
		color: roles.actionLinkFg,
		borderColor: 'transparent',
		paddingLeft: 0,
		paddingRight: 0,
		':hover': {
			color: roles.actionLinkFgHover,
		},
		':active': {
			color: roles.actionLinkFgActive,
		},
	},
	linkDisabled: {
		color: roles.actionPrimaryDisabledFg,
		cursor: 'not-allowed',
		opacity: 0.8,
	},
});
