import { mergeTheme } from './mergeTheme';
import defaultTheme from './default';

const bcaTheme = mergeTheme(defaultTheme, {
	colors: {
		primary_accent_50: '#F1F8FE',
		primary_accent_100: '#E8F4FE',
		primary_accent_200: '#D2E8FB',
		primary_accent_300: '#A8D1F5',
		primary_accent_400: '#6CB0ED',
		primary_accent_500: '#278AE3',
		primary_accent_600: '#0074DE',
		primary_accent_700: '#00529E',
		primary_accent_800: '#003E76',
		primary_accent_900: '#002A51',
		primary_accent_950: '#002A51',

		primary_50: '#F1F2F3',
		primary_100: '#F1F2F3',
		primary_200: '#E4E6E8',
		primary_300: '#C9CCD2',
		primary_400: '#A5AAB5',
		primary_500: '#6D7588',
		primary_600: '#303D58',
		primary_700: '#1D2948',
		primary_800: '#091535',
		primary_900: '#040E2F',
		primary_950: '#040E2F',

		neutral_50: '#F1F2F3',
		neutral_100: '#F1F2F3',
		neutral_200: '#E4E6E8',
		neutral_300: '#C9CCD2',
		neutral_400: '#A5AAB5',
		neutral_500: '#808797',
		neutral_600: '#6D7588',
		neutral_700: '#47526B',
		neutral_800: '#303D58',
		neutral_900: '#1D2948',
		neutral_950: '#040E2F',
	},

	grid: {
		mobile: {
			columns: 4,
			gutter: 'sm', // 16px
			margin: 'sm', // 16px
			maxWidth: 'sm', // 480px
		},

		tablet: {
			columns: 6,
			gutter: 'md', // 32px
			margin: 'md', // 32px
			maxWidth: 'xl', // 768px
		},

		desktop: {
			columns: 8,
			gutter: 'md', // 32px
			margin: 'md', // 32px
			maxWidth: '3xl', // 1280px
		},

		wide: {
			columns: 10,
			gutter: 'md', // 32px
			margin: 'lg', // 48px
			maxWidth: '3xl', // 1440px
		},

		ultra: {
			columns: 10,
			gutter: 'md', // 32px
			margin: 'lg', // 48px
			maxWidth: '4xl', // 1440px
		},
	},

	typography: {
		fontFamilies: {
			body: '"Roboto", system-ui, -apple-system, sans-serif',
			heading: '"Roboto", system-ui, -apple-system, sans-serif',
			mono: '"SF Mono", "Cascadia Code", "JetBrains Mono", monospace',
		},
	},

	colorTokens: {
		text: {
			'text-brand-primary': { light: 'primary_accent_900', dark: 'neutral_50' },
			'text-brand-secondary': { light: 'primary_accent_700', dark: 'neutral_300' },
			'text-brand-secondary_hover': { light: 'primary_accent_800', dark: 'neutral_200' },
			'text-brand-tertiary': { light: 'primary_accent_600', dark: 'neutral_400' },
			'text-brand-tertiary_alt': { light: 'primary_accent_500', dark: 'neutral_50' },
			'text-secondary_on-brand': { light: 'primary_accent_200', dark: 'neutral_300' },
			'text-tertiary_on-brand': { light: 'primary_accent_200', dark: 'neutral_400' },
			'text-quaternary_on-brand': { light: 'primary_accent_300', dark: 'neutral_400' },
		},
		border: {
			'border-brand': { light: 'primary_accent_500', dark: 'primary_accent_400' },
			'border-brand_alt': { light: 'primary_accent_600', dark: 'neutral_700' },
		},
		fg: {
			'fg-brand-primary': { light: 'primary_accent_600', dark: 'primary_accent_500' },
			'fg-brand-primary_alt': { light: 'primary_accent_600', dark: 'neutral_300' },
			'fg-brand-secondary': { light: 'primary_accent_500', dark: 'primary_accent_500' },
			'fg-brand-secondary_alt': { light: 'primary_accent_500', dark: 'neutral_400' },
		},
		bg: {
			'bg-brand-primary': { light: 'primary_accent_50', dark: 'primary_accent_500' },
			'bg-brand-primary_alt': { light: 'primary_accent_50', dark: 'neutral_800' },
			'bg-brand-secondary': { light: 'primary_accent_100', dark: 'neutral_600' },
			'bg-brand-solid': { light: 'primary_accent_600', dark: 'primary_accent_600' },
			'bg-brand-solid_hover': { light: 'primary_accent_500', dark: 'primary_accent_600' },
			'bg-brand-section': { light: 'primary_accent_800', dark: 'neutral_800' },
			'bg-brand-section_subtle': { light: 'primary_accent_700', dark: 'neutral_950' },
		},
	},

	gradients: {
		primary_600_500_90: {
			type: 'linear',
			angle: 90,
			stops: [
				{ color: 'primary_accent_600', position: 0 },
				{ color: 'primary_accent_500', position: 100 },
			],
		},
		primary_700_600_45: {
			type: 'linear',
			angle: 45,
			stops: [
				{ color: 'primary_accent_700', position: 0 },
				{ color: 'primary_accent_600', position: 100 },
			],
		},
		primary_800_600_45: {
			type: 'linear',
			angle: 45,
			stops: [
				{ color: 'primary_accent_800', position: 0 },
				{ color: 'primary_accent_600', position: 100 },
			],
		},
		primary_800_600_90: {
			type: 'linear',
			angle: 90,
			stops: [
				{ color: 'primary_accent_800', position: 0 },
				{ color: 'primary_accent_600', position: 100 },
			],
		},
		primary_800_700_26_5: {
			type: 'linear',
			angle: 26.5,
			stops: [
				{ color: 'primary_accent_800', position: 0 },
				{ color: 'primary_accent_700', position: 100 },
			],
		},
		primary_900_600_45: {
			type: 'linear',
			angle: 45,
			stops: [
				{ color: 'primary_accent_900', position: 0 },
				{ color: 'primary_accent_600', position: 100 },
			],
		},
		primary_900_700_45: {
			type: 'linear',
			angle: 45,
			stops: [
				{ color: 'primary_accent_900', position: 0 },
				{ color: 'primary_accent_700', position: 100 },
			],
		},
	},

	contracts: {
		actions: {
			primary: {},

			secondary: {},

			tertiary: {
				bg: 'white',
				on: 'bg-brand-solid',
				border: 'border-brand',
				bgHover: 'bg-tertiary',
				onHover: 'white',
				bgActive: 'bg-tertiary',
				onActive: 'bg-brand-solid',
				bgFocus: 'white',
				onFocus: 'bg-brand-solid',
				borderFocus: 'border-brand',
				bgDisabled: 'bg-quaternary',
				onDisabled: 'text-quaternary',
				borderDisabled: 'bg-quaternary',
			},
		},

		selectionControl: {
			bgChecked: 'bg-brand-solid',
		},

		toggle: {
			trackBgChecked: 'bg-brand-solid',
		},

		components: {
			buttonBorderRadii: { type: 'radii', value: '4xl' },
			saleCardRadii: { type: 'radii', value: '3xl' },
			inputBorderRadii: { type: 'radii', value: 'xl' },
			headerBg: { light: 'primary_950', dark: 'primary_950' },
			headerAvatarBg: { dark: 'primary_accent_600', light: 'primary_accent_600' },
			footerBg: { light: 'primary_950', dark: 'primary_950' },
			footerBgSecondary: { light: 'primary_700', dark: 'primary_700' },
			appShellBg: { light: 'white', dark: 'neutral_900' },

			activeTabIndicator: { light: 'primary_accent_500', dark: 'primary_accent_500' },
		},
	},

	focusRing: {
		'focus-ring': { color: { light: 'primary_accent_500', dark: 'primary_accent_400' } },
		'focus-ring-shadow-xs': {
			color: { light: 'primary_accent_500', dark: 'primary_accent_400' },
			shadow: 'xs',
		},
		'focus-ring-shadow-sm': {
			color: { light: 'primary_accent_500', dark: 'primary_accent_400' },
			shadow: 'sm',
		},
	},
});

export default bcaTheme;
