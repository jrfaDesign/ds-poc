import { mergeTheme } from './mergeTheme';
import defaultTheme from './default';

const caosTheme = mergeTheme(defaultTheme, {
	spacing: {
		'3xs': 2,
		'2xs': 4,
		xs: 6,
		sm: 12,
		md: 20,
		lg: 32,
		xl: 48,
		'2xl': 80,
		'3xl': 120,
		'4xl': 160,
	},
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
});

export default caosTheme;
