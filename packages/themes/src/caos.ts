import { mergeTheme } from './mergeTheme';
import defaultTheme from './default';

const caosTheme = mergeTheme(defaultTheme, {
	typography: {
		fontFamily: '"Bitcount Grid Double", monospace',
	},
	colors: {
		primary_100: '#cdf101',
		primary_200: '#b0e000',
		primary_300: '#8cd000',
		primary_400: '#6abf00',
		primary_500: '#4da600',
		primary_600: '#3a7d00',
		primary_700: '#2b5c00',
		primary_800: '#1e3f00',
		primary_900: '#0f2100',
		secondary_100: '#f0f1cd',
		secondary_200: '#e0e0b0',
		secondary_300: '#d0d08c',
		secondary_400: '#c0c06a',
		secondary_500: '#a6a64d',
		secondary_600: '#7d7d3a',
		secondary_700: '#5c5c2b',
		secondary_800: '#3f3f1e',
		secondary_900: '#21210f',
	},
	shadows: {
		none: {
			offsetX: 0,
			offsetY: 0,
			blurRadius: 0,
			spreadRadius: 0,
			color: { light: 'transparent', dark: 'transparent' },
			opacity: 0,
		},

		xs: {
			offsetX: 0,
			offsetY: 1,
			blurRadius: 1.5,
			spreadRadius: 0.5,
			color: { light: 'black', dark: 'white' },
			opacity: 0.12,
		},

		sm: {
			offsetX: 0,
			offsetY: 2,
			blurRadius: 3,
			spreadRadius: 1,
			color: { light: 'black', dark: 'white' },
			opacity: 0.18,
		},

		md: {
			offsetX: 0,
			offsetY: 4,
			blurRadius: 6,
			spreadRadius: 1.5,
			color: { light: 'black', dark: 'white' },
			opacity: 0.22,
		},

		lg: {
			offsetX: 0,
			offsetY: 6,
			blurRadius: 10,
			spreadRadius: 2,
			color: { light: 'black', dark: 'white' },
			opacity: 0.26,
		},

		xl: {
			offsetX: 0,
			offsetY: 10,
			blurRadius: 14,
			spreadRadius: 3,
			color: { light: 'black', dark: 'white' },
			opacity: 0.3,
		},
	},
	gradients: {
		secondary: {
			type: 'linear',
			angle: 135,
			stops: [
				{ color: 'secondary_100', position: 0 },
				{ color: 'secondary_300', position: 30 },
				{ color: 'primary_300', position: 60 },
				{ color: 'secondary_600', position: 100 },
			],
		},
	},

	components: {
		buttonBg: { type: 'roles', value: 'secondary' },
		buttonBorderRadii: { type: 'radii', value: '2xl' },
		cardBorderRadii: { type: 'radii', value: 'none' },
	},

	contracts: {
		actions: {
			primary: {
				bg: 'actionSecondaryBg',
				on: 'actionSecondaryFg',
				border: 'actionSecondaryBorder',
				bgHover: 'actionSecondaryBgHover',
				onHover: 'actionSecondaryFg',
				bgActive: 'actionSecondaryBgActive',
				onActive: 'actionSecondaryFg',
				bgFocus: 'actionSecondaryBgFocus',
				onFocus: 'actionSecondaryFg',
				borderFocus: 'actionSecondaryBorderFocus',
				bgDisabled: 'actionSecondaryDisabledBg',
				onDisabled: 'actionSecondaryDisabledFg',
				borderDisabled: 'actionSecondaryDisabledBorder',
			},
			secondary: {
				bg: 'actionPrimaryBg',
				on: 'actionPrimaryFg',
				border: 'actionPrimaryBorder',
				bgHover: 'actionPrimaryBgHover',
				onHover: 'actionPrimaryFg',
				bgActive: 'actionPrimaryBgActive',
				onActive: 'actionPrimaryFg',
				bgFocus: 'actionPrimaryBgFocus',
				onFocus: 'actionPrimaryFg',
				borderFocus: 'actionPrimaryBorderFocus',
				bgDisabled: 'actionPrimaryDisabledBg',
				onDisabled: 'actionPrimaryDisabledFg',
				borderDisabled: 'actionPrimaryDisabledBorder',
			},
			ghost: defaultTheme.contracts.actions.ghost,
			link: defaultTheme.contracts.actions.link,
		},
		feedback: {
			error: defaultTheme.contracts.feedback.warning,
			success: defaultTheme.contracts.feedback.success,
			warning: defaultTheme.contracts.feedback.error,
			info: defaultTheme.contracts.feedback.info,
		},
		surfaces: {
			base: defaultTheme.contracts.surfaces.alt,
			alt: defaultTheme.contracts.surfaces.base,
			raised: defaultTheme.contracts.surfaces.raised,
			sunken: defaultTheme.contracts.surfaces.sunken,
			inverse: defaultTheme.contracts.surfaces.inverse,
			brand: defaultTheme.contracts.surfaces.brand,
		},
	},
});

export default caosTheme;
