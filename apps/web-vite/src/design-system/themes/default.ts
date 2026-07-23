import { TokensSchema, type Tokens } from '../foundations';

const defaultThemeTokens: Tokens = {
	spacing: {
		none: 0,
		xs: 2,
		sm: 4,
		md: 8,
		lg: 16,
		xl: 32,
		'2xl': 64,
	},
	radii: {
		none: 0,
		xs: 1,
		sm: 2,
		md: 4,
		lg: 8,
		xl: 16,
		full: 9999,
	},

	colors: {
		white: '#FFFFFF',
		black: '#000000',
		transparent: 'transparent',

		primary_100: '#E0F2FE',
		primary_200: '#BAE6FD',
		primary_300: '#7DD3FC',
		primary_400: '#38BDF8',
		primary_500: '#0EA5E9',
		primary_600: '#0284C7',
		primary_700: '#0369A1',
		primary_800: '#075985',
		primary_900: '#0C4A6E',

		secondary_100: '#f7c1b2',
		secondary_200: '#f49b8a',
		secondary_300: '#f07562',
		secondary_400: '#ed4f3a',
		secondary_500: '#e92a12',
		secondary_600: '#b21f0e',
		secondary_700: '#7a150a',
		secondary_800: '#430b05',
		secondary_900: '#1a0201',

		neutral_100: '#F3F4F6',
		neutral_200: '#E5E7EB',
		neutral_300: '#D1D5DB',
		neutral_400: '#9CA3AF',
		neutral_500: '#6B7280',
		neutral_600: '#4B5563',
		neutral_700: '#374151',
		neutral_800: '#1F2937',
		neutral_900: '#111827',

		error_100: '#F9F0EE',
		error_200: '#F9E1DC',
		error_300: '#FBBDB0',
		error_400: '#FA8B75',
		error_500: '#E9553C',
		error_600: '#D63D27',
		error_700: '#992A1A',
		error_800: '#6E2418',
		error_900: '#4A1C14',

		info_100: '#E8F4FE',
		info_200: '#D2E8FB',
		info_300: '#A8D1F5',
		info_400: '#6CB0ED',
		info_500: '#278AE3',
		info_600: '#0074DE',
		info_700: '#00529E',
		info_800: '#003E76',
		info_900: '#002A51',

		success_100: '#E5F7E6',
		success_200: '#C4F1C5',
		success_300: '#72E37E',
		success_400: '#00C445',
		success_500: '#069C35',
		success_600: '#1A8732',
		success_700: '#245D2A',
		success_800: '#214423',
		success_900: '#1B2F1B',

		warning_100: '#FEF0DB',
		warning_200: '#FFE1B4',
		warning_300: '#FFC163',
		warning_400: '#EE9609',
		warning_500: '#BE7704',
		warning_600: '#A3670F',
		warning_700: '#704A18',
		warning_800: '#513817',
		warning_900: '#372714',
	},
	//  typography: {
	//
	//  },

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
			offsetY: 0.5,
			blurRadius: 1,
			spreadRadius: 0,
			color: { light: 'black', dark: 'white' },
			opacity: 0.02,
		},
		sm: {
			offsetX: 0,
			offsetY: 2,
			blurRadius: 4,
			spreadRadius: 0,
			color: { light: 'black', dark: 'white' },
			opacity: 0.08,
		},
		md: {
			offsetX: 0,
			offsetY: 5,
			blurRadius: 10,
			spreadRadius: -1,
			color: { light: 'black', dark: 'white' },
			opacity: 0.12,
		},
		lg: {
			offsetX: 0,
			offsetY: 10,
			blurRadius: 15,
			spreadRadius: -3,
			color: { light: 'black', dark: 'white' },
			opacity: 0.1,
		},
		xl: {
			offsetX: 0,
			offsetY: 20,
			blurRadius: 25,
			spreadRadius: -5,
			color: { light: 'black', dark: 'white' },
			opacity: 0.1,
		},
	},

	gradients: {
		none: null,
		primary: {
			type: 'linear',
			angle: 135,
			stops: [
				{ color: 'primary_500', position: 0 },
				{ color: 'primary_700', position: 100 },
			],
		},
		secondary: {
			type: 'linear',
			angle: 135,
			stops: [
				{ color: 'secondary_400', position: 0 },
				{ color: 'secondary_600', position: 100 },
			],
		},
		neutral: {
			type: 'linear',
			angle: 135,
			stops: [
				{ color: 'neutral_100', position: 0 },
				{ color: 'neutral_500', position: 100 },
			],
		},
		brand: {
			type: 'linear',
			angle: 135,
			stops: [
				{ color: 'primary_500', position: 0 },
				{ color: 'secondary_500', position: 100 },
			],
		},
	},

	roles: {
		// ABSOLUTE
		white: { light: 'white', dark: 'black' },
		black: { light: 'black', dark: 'white' },

		// BRAND
		primary: { light: 'primary_500', dark: 'primary_300' },
		secondary: { light: 'secondary_500', dark: 'secondary_300' },

		// SURFACE
		surface: { light: 'white', dark: 'neutral_900' },
		surfaceAlt: { light: 'neutral_100', dark: 'neutral_800' },
		surfaceRaised: { light: 'neutral_100', dark: 'neutral_700' },
		surfaceSunken: { light: 'neutral_200', dark: 'neutral_800' },
		surfaceInverse: { light: 'neutral_900', dark: 'neutral_100' },
		surfaceBrand: { light: 'primary_100', dark: 'primary_800' },

		// TEXT
		text: { light: 'neutral_900', dark: 'neutral_100' },
		textSecondary: { light: 'neutral_500', dark: 'neutral_400' },
		textTertiary: { light: 'neutral_400', dark: 'neutral_500' },
		textPlaceholder: { light: 'neutral_400', dark: 'neutral_600' },
		textInverse: { light: 'white', dark: 'black' },
		textBrand: { light: 'primary_600', dark: 'primary_300' },

		// STRUCTURE
		border: { light: 'neutral_300', dark: 'neutral_700' },
		borderStrong: { light: 'neutral_400', dark: 'neutral_600' },
		borderWeak: { light: 'neutral_200', dark: 'neutral_800' },
		borderInverse: { light: 'neutral_900', dark: 'neutral_100' },
		divider: { light: 'neutral_200', dark: 'neutral_800' },
		focusRing: { light: 'primary_500', dark: 'primary_400' },

		// ACTION — PRIMARY CTA
		actionPrimaryBg: { light: 'primary_500', dark: 'primary_600' },
		actionPrimaryBgHover: { light: 'primary_600', dark: 'primary_400' },
		actionPrimaryBgActive: { light: 'primary_700', dark: 'primary_500' },

		actionPrimaryFg: { light: 'white', dark: 'white' },
		actionPrimaryBorder: { light: 'primary_700', dark: 'primary_500' },

		actionPrimaryDisabledBg: { light: 'neutral_200', dark: 'neutral_700' },
		actionPrimaryDisabledFg: { light: 'neutral_500', dark: 'neutral_400' },
		actionPrimaryDisabledBorder: { light: 'neutral_300', dark: 'neutral_600' },

		// ACTION — SECONDARY CTA
		actionSecondaryBg: { light: 'neutral_100', dark: 'neutral_800' },
		actionSecondaryBgHover: { light: 'neutral_200', dark: 'neutral_700' },
		actionSecondaryBgActive: { light: 'neutral_300', dark: 'neutral_600' },

		actionSecondaryFg: { light: 'neutral_900', dark: 'neutral_100' },
		actionSecondaryBorder: { light: 'neutral_400', dark: 'neutral_600' },

		actionSecondaryDisabledBg: { light: 'neutral_100', dark: 'neutral_800' },
		actionSecondaryDisabledFg: { light: 'neutral_400', dark: 'neutral_600' },
		actionSecondaryDisabledBorder: { light: 'neutral_200', dark: 'neutral_700' },

		// ACTION — GHOST CTA
		actionGhostBg: { light: 'transparent', dark: 'transparent' },
		actionGhostBgHover: { light: 'neutral_100', dark: 'neutral_800' },
		actionGhostBgActive: { light: 'neutral_200', dark: 'neutral_700' },

		actionGhostFg: { light: 'neutral_900', dark: 'neutral_100' },
		actionGhostBorder: { light: 'neutral_300', dark: 'neutral_700' },

		// ACTION — LINK
		actionLinkFg: { light: 'primary_600', dark: 'primary_300' },
		actionLinkFgHover: { light: 'primary_700', dark: 'primary_200' },
		actionLinkFgActive: { light: 'primary_800', dark: 'primary_100' },

		// FEEDBACK — ERROR
		errorBg: { light: 'error_100', dark: 'error_800' },
		errorFg: { light: 'error_700', dark: 'error_200' },
		errorBorder: { light: 'error_300', dark: 'error_600' },

		errorBgInverse: { light: 'error_800', dark: 'error_100' },
		errorFgInverse: { light: 'error_200', dark: 'error_700' },

		// FEEDBACK — SUCCESS
		successBg: { light: 'success_100', dark: 'success_800' },
		successFg: { light: 'success_700', dark: 'success_200' },
		successBorder: { light: 'success_300', dark: 'success_600' },

		successBgInverse: { light: 'success_800', dark: 'success_100' },
		successFgInverse: { light: 'success_200', dark: 'success_700' },

		// FEEDBACK — WARNING
		warningBg: { light: 'warning_100', dark: 'warning_800' },
		warningFg: { light: 'warning_700', dark: 'warning_200' },
		warningBorder: { light: 'warning_300', dark: 'warning_600' },

		warningBgInverse: { light: 'warning_800', dark: 'warning_100' },
		warningFgInverse: { light: 'warning_200', dark: 'warning_700' },

		// FEEDBACK — INFO
		infoBg: { light: 'info_100', dark: 'info_800' },
		infoFg: { light: 'info_700', dark: 'info_200' },
		infoBorder: { light: 'info_300', dark: 'info_600' },

		infoBgInverse: { light: 'info_800', dark: 'info_100' },
		infoFgInverse: { light: 'info_200', dark: 'info_700' },
	},

	components: {
		buttonBg: { type: 'roles', value: 'actionGhostBg' },
		buttonBorderRadii: { type: 'radii', value: 'md' },

		cardBorderRadii: { type: 'radii', value: 'lg' },
	},
};

const defaultTheme = TokensSchema.parse(defaultThemeTokens);

export default defaultTheme;
