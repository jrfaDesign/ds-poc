import { mergeTheme } from './mergeTheme';
import bcaTheme from './bca';

const bydPremiumTheme = mergeTheme(bcaTheme, {
	colors: {
		primary_50: '#FAFAFA',
		primary_100: '#F5F5F5',
		primary_200: '#E5E5E5',
		primary_300: '#D4D4D4',
		primary_400: '#A3A3A3',
		primary_500: '#737373',
		primary_600: '#525252',
		primary_700: '#383838',
		primary_800: '#2A2A2A',
		primary_900: '#1E1E1E',
		primary_950: '#141414',

		neutral_50: '#FAFAFA',
		neutral_100: '#F5F5F5',
		neutral_200: '#E5E5E5',
		neutral_300: '#D4D4D4',
		neutral_400: '#A3A3A3',
		neutral_500: '#737373',
		neutral_600: '#525252',
		neutral_700: '#383838',
		neutral_800: '#2A2A2A',
		neutral_900: '#1E1E1E',
		neutral_950: '#141414',

		primary_accent_50: '#F2F2F2',
		primary_accent_100: '#E0E0E0',
		primary_accent_200: '#BDBDBD',
		primary_accent_300: '#9E9E9E',
		primary_accent_400: '#757575',
		primary_accent_500: '#424242',
		primary_accent_600: '#1A1A1A',
		primary_accent_700: '#111111',
		primary_accent_800: '#0A0A0A',
		primary_accent_900: '#050505',
		primary_accent_950: '#000000',
	},

	colorTokens: {
		text: {
			'text-secondary_on-brand': { light: 'primary_accent_100', dark: 'primary_accent_100' },
			'text-tertiary_on-brand': { light: 'primary_accent_200', dark: 'primary_accent_200' },
			'text-quaternary_on-brand': { light: 'primary_accent_300', dark: 'primary_accent_300' },
			'text-brand-tertiary_alt': { light: 'primary_accent_400', dark: 'primary_accent_300' },
		},
	},

	contracts: {
		actions: {
			primary: {
				bg: 'bg-brand-solid',
				on: 'text-white',
				border: 'border-brand',
				bgHover: 'bg-brand-solid_hover',
				onHover: 'text-white',
				bgActive: 'bg-brand-solid_hover',
				onActive: 'text-white',
				bgFocus: 'bg-brand-solid',
				onFocus: 'text-white',
				borderFocus: 'border-brand',
				bgDisabled: 'bg-quaternary',
				onDisabled: 'text-quaternary',
				borderDisabled: 'border-primary',
			},
			tertiary: {
				bg: 'white',
				on: 'bg-brand-solid',
				border: 'border-brand',
				bgHover: 'bg-tertiary',
				onHover: 'bg-brand-solid',
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

		feedback: {
			error: {
				borderRadius: { type: 'radii', value: 'none' },
			},
			success: {
				borderRadius: { type: 'radii', value: 'none' },
			},
			warning: {
				borderRadius: { type: 'radii', value: 'none' },
			},
			info: {
				borderRadius: { type: 'radii', value: 'none' },
			},
		},

		inputField: {
			border: 'border-brand',
			bgHover: 'bg-error-solid',
			borderHover: 'border-brand',
			borderFocus: 'border-brand',
			borderDisabled: 'border-secondary',
		},

		selectionControl: {
			border: 'border-brand',
			borderHover: 'border-brand',
			borderChecked: 'border-brand',
			bgChecked: 'bg-brand-solid',
		},

		toggle: {
			trackBorder: 'border-brand',
			trackBgChecked: 'bg-brand-solid',
		},

		components: {
			buttonBorderRadii: { type: 'radii', value: 'none' },
			saleCardRadii: { type: 'radii', value: 'none' },
			inputBorderRadii: { type: 'radii', value: 'none' },
			cardBorderRadii: { type: 'radii' as const, value: 'none' },

			footerBg: { dark: 'primary_accent_600', light: 'primary_accent_600' },
			footerBgSecondary: { dark: 'primary_accent_600', light: 'primary_accent_600' },
			headerBg: { dark: 'primary_accent_600', light: 'primary_accent_600' },
			headerAvatarBg: { dark: 'primary_accent_500', light: 'primary_accent_500' },
			appShellBg: { light: 'white', dark: 'primary_800' },
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

export default bydPremiumTheme;
