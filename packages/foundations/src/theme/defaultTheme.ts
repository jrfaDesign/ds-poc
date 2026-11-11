import { TokensSchema, type Tokens } from '../tokens/index';

const defaultThemeTokens: Tokens = {
	// Shape preset: soft = 6px everywhere (SHAPE_PRESETS.soft → radii.sm)
	style: 'soft',
	spacing: {
		none: 0,
		xxs: 2,
		xs: 4,
		sm: 6,
		md: 8,
		lg: 12,
		xl: 16,
		'2xl': 20,
		'3xl': 24,
		'4xl': 32,
		'5xl': 40,
		'6xl': 48,
		'7xl': 64,
		'8xl': 80,
		'9xl': 92,
		'10xl': 128,
		'11xl': 160,
		'12xl': 212,
	},
	radii: {
		none: 0,
		xxs: 4,
		xs: 4,
		sm: 6,
		md: 8,
		lg: 12,
		xl: 12,
		'2xl': 12,
		'3xl': 20,
		'4xl': 20,
		'5xl': 20,
		'6xl': 20,
		'7xl': 20,
		full: 9999,
	},
	widths: {
		xxs: 320,
		xs: 384,
		sm: 480,
		md: 560,
		lg: 640,
		xl: 768,
		'2xl': 1024,
		'3xl': 1280,
		'4xl': 1440,
		'5xl': 1600,
		'6xl': 1920,
	},
	layout: {
		none: 0,
		sm: 16,
		md: 32,
		lg: 48,
		xl: 64,
	},

	colors: {
		white: '#FFFFFF',
		black: '#000000',
		transparent: 'transparent',

		// primary = UntitledUI brand ramp (source of truth): default brand color is #7F56D9 (brand-600)
		primary_50: '#F9F5FF',
		primary_100: '#F4EBFF',
		primary_200: '#E9D7FE',
		primary_300: '#D6BBFB',
		primary_400: '#B692F6',
		primary_500: '#9E77ED',
		primary_600: '#7F56D9',
		primary_700: '#6941C6',
		primary_800: '#53389E',
		primary_900: '#42307D',
		primary_950: '#2C1C5F',

		// secondary = Super Charge DS orange steps (required family; unused by default semantics)
		secondary_50: '#FFF7ED',
		secondary_100: '#FFEDD5',
		secondary_200: '#FED7AA',
		secondary_300: '#FDBA74',
		secondary_400: '#FB923C',
		secondary_500: '#F97316',
		secondary_600: '#EA580C',
		secondary_700: '#C2410C',
		secondary_800: '#9A3412',
		secondary_900: '#7C2D12',
		secondary_950: '#431407',

		// neutral = Super Charge DS slate ramp (background-alt / surface / accent / text-tertiary)
		neutral_50: '#F8FAFC',
		neutral_100: '#F1F5F9',
		neutral_200: '#E2E8F0',
		neutral_300: '#CBD5E1',
		neutral_400: '#94A3B8',
		neutral_500: '#64748B',
		neutral_600: '#475569',
		neutral_700: '#334155',
		neutral_800: '#1E293B',
		neutral_900: '#0F172A',
		neutral_950: '#020617',

		// error = Super Charge DS danger ramp (red)
		error_50: '#FEF2F2',
		error_100: '#FEE2E2',
		error_200: '#FECACA',
		error_300: '#FCA5A5',
		error_400: '#F87171',
		error_500: '#EF4444',
		error_600: '#DC2626',
		error_700: '#B91C1C',
		error_800: '#991B1B',
		error_900: '#7F1D1D',
		error_950: '#450A0A',

		// info = Super Charge DS blue accent steps
		info_50: '#E8F4FE',
		info_100: '#E0F2FE',
		info_200: '#D2E8FB',
		info_300: '#A8D1F5',
		info_400: '#6CB0ED',
		info_500: '#278AE3',
		info_600: '#0074DE',
		info_700: '#00529E',
		info_800: '#003E76',
		info_900: '#002B52',
		info_950: '#001F3C',

		// success = Super Charge DS success ramp (green)
		success_50: '#F0FDF4',
		success_100: '#DCFCE7',
		success_200: '#BBF7D0',
		success_300: '#86EFAC',
		success_400: '#4ADE80',
		success_500: '#22C55E',
		success_600: '#16A34A',
		success_700: '#15803D',
		success_800: '#166534',
		success_900: '#14532D',
		success_950: '#052E16',

		// warning = Super Charge DS warning ramp (yellow)
		warning_50: '#FEFCE8',
		warning_100: '#FEF9C3',
		warning_200: '#FEF08A',
		warning_300: '#FDE047',
		warning_400: '#FACC15',
		warning_500: '#EAB308',
		warning_600: '#CA8A04',
		warning_700: '#A16207',
		warning_800: '#854D0E',
		warning_900: '#713F12',
		warning_950: '#422006',
	},
	typography: {
		fontFamilies: {
			body: '"Roboto", system-ui, -apple-system, sans-serif',
			heading: '"Roboto", system-ui, -apple-system, sans-serif',
			mono: '"SF Mono", "Cascadia Code", "JetBrains Mono", monospace',
		},
		// Sizes and line heights from Super Charge DS §4 (Roboto; line height is a property of the
		// size step; letter spacing -0.02em on >=36px, normal below).
		fontSize: {
			xxs: { fontSizePx: 12, fontSizeRem: 0.75, lineHeightPx: 18, lineHeightRem: 1.125 },
			xs: { fontSizePx: 14, fontSizeRem: 0.875, lineHeightPx: 20, lineHeightRem: 1.25 },
			sm: { fontSizePx: 16, fontSizeRem: 1, lineHeightPx: 24, lineHeightRem: 1.5 },
			md: { fontSizePx: 18, fontSizeRem: 1.125, lineHeightPx: 28, lineHeightRem: 1.75 },
			lg: { fontSizePx: 20, fontSizeRem: 1.25, lineHeightPx: 30, lineHeightRem: 1.875 },
			xl: { fontSizePx: 24, fontSizeRem: 1.5, lineHeightPx: 32, lineHeightRem: 2 },
			'2xl': { fontSizePx: 30, fontSizeRem: 1.875, lineHeightPx: 38, lineHeightRem: 2.375 },
			'3xl': {
				fontSizePx: 36,
				fontSizeRem: 2.25,
				lineHeightPx: 44,
				lineHeightRem: 2.75,
				letterSpacing: -0.02,
			},
			'4xl': {
				fontSizePx: 48,
				fontSizeRem: 3,
				lineHeightPx: 60,
				lineHeightRem: 3.75,
				letterSpacing: -0.02,
			},
			'5xl': {
				fontSizePx: 60,
				fontSizeRem: 3.75,
				lineHeightPx: 72,
				lineHeightRem: 4.5,
				letterSpacing: -0.02,
			},
			'6xl': {
				fontSizePx: 72,
				fontSizeRem: 4.5,
				lineHeightPx: 90,
				lineHeightRem: 5.625,
				letterSpacing: -0.02,
			},
		},
		fontWeight: {
			thin: 100,
			light: 300,
			regular: 400,
			medium: 500,
			semibold: 600,
			bold: 700,
			black: 900,
		},
		lineHeight: {
			none: 1,
			tight: 1.25,
			normal: 1.5,
			relaxed: 1.75,
			loose: 2,
		},
		letterSpacing: {
			tighter: -0.05,
			tight: -0.02,
			normal: 0,
			wide: 0.025,
			wider: 0.05,
			widest: 0.1,
		},
	},

	colorTokens: {
		text: {
			'text-primary': { light: 'black', dark: 'neutral_50' },
			'text-primary_on-brand': { light: 'white', dark: 'neutral_50' },
			'text-secondary': { light: 'neutral_700', dark: 'neutral_300' },
			'text-secondary_hover': { light: 'neutral_800', dark: 'neutral_200' },
			'text-secondary_on-brand': { light: 'primary_200', dark: 'neutral_300' },
			'text-tertiary': { light: 'neutral_500', dark: 'neutral_400' },
			'text-tertiary_hover': { light: 'neutral_700', dark: 'neutral_300' },
			'text-tertiary_on-brand': { light: 'primary_200', dark: 'neutral_400' },
			'text-quaternary': { light: 'neutral_400', dark: 'neutral_400' },
			'text-quaternary_on-brand': { light: 'primary_300', dark: 'neutral_400' },
			'text-white': { light: 'white', dark: 'white' },
			'text-placeholder': { light: 'neutral_500', dark: 'neutral_400' },
			'text-brand-primary': { light: 'primary_900', dark: 'neutral_50' },
			'text-brand-secondary': { light: 'primary_700', dark: 'neutral_300' },
			'text-brand-secondary_hover': { light: 'primary_800', dark: 'neutral_200' },
			'text-brand-tertiary': { light: 'primary_600', dark: 'neutral_400' },
			'text-brand-tertiary_alt': { light: 'primary_500', dark: 'neutral_50' },
			'text-error-primary': { light: 'error_600', dark: 'error_400' },
			'text-warning-primary': { light: 'warning_600', dark: 'warning_400' },
			'text-success-primary': { light: 'success_600', dark: 'success_400' },
			'text-info-primary': { light: 'info_600', dark: 'info_400' },
		},
		border: {
			'border-primary': { light: 'neutral_400', dark: 'neutral_700' },
			'border-secondary': { light: 'neutral_200', dark: 'neutral_800' },
			'border-secondary_alt': {
				light: { base: 'black', alpha: 0.1 },
				dark: 'neutral_800',
			},
			'border-tertiary': { light: 'neutral_100', dark: 'neutral_800' },
			'border-quaternary': { light: 'neutral_500', dark: 'neutral_400' },
			// brand border: matches UUI border-brand (brand-500 light / brand-400 dark)
			'border-brand': { light: 'primary_500', dark: 'primary_400' },
			'border-brand_alt': { light: 'primary_600', dark: 'neutral_700' },
			'border-error': { light: 'error_500', dark: 'error_400' },
			'border-error_subtle': { light: 'error_300', dark: 'error_500' },
		},
		fg: {
			'fg-primary': { light: 'neutral_900', dark: 'white' },
			'fg-secondary': { light: 'neutral_700', dark: 'neutral_300' },
			'fg-secondary_hover': { light: 'neutral_800', dark: 'neutral_200' },
			'fg-tertiary': { light: 'neutral_600', dark: 'neutral_400' },
			'fg-tertiary_hover': { light: 'neutral_700', dark: 'neutral_300' },
			'fg-quaternary': { light: 'neutral_400', dark: 'neutral_500' },
			'fg-quaternary_hover': { light: 'neutral_500', dark: 'neutral_400' },
			'fg-white': { light: 'white', dark: 'white' },
			'fg-brand-primary': { light: 'primary_600', dark: 'primary_500' },
			'fg-brand-primary_alt': { light: 'primary_600', dark: 'neutral_300' },
			'fg-brand-secondary': { light: 'primary_500', dark: 'primary_500' },
			'fg-brand-secondary_alt': { light: 'primary_500', dark: 'neutral_400' },
			'fg-error-primary': { light: 'error_600', dark: 'error_500' },
			'fg-error-secondary': { light: 'error_500', dark: 'error_400' },
			'fg-warning-primary': { light: 'warning_600', dark: 'warning_500' },
			'fg-warning-secondary': { light: 'warning_500', dark: 'warning_400' },
			'fg-success-primary': { light: 'success_600', dark: 'success_500' },
			'fg-success-secondary': { light: 'success_500', dark: 'success_400' },
			'fg-info-primary': { light: 'info_600', dark: 'info_500' },
			'fg-info-secondary': { light: 'info_500', dark: 'info_400' },
		},
		bg: {
			'bg-primary': { light: 'white', dark: 'neutral_950' },
			'bg-primary_alt': { light: 'white', dark: 'neutral_900' },
			'bg-primary_hover': { light: 'neutral_50', dark: 'neutral_900' },
			'bg-primary-solid': { light: 'neutral_900', dark: 'neutral_800' },
			'bg-secondary': { light: 'neutral_50', dark: 'neutral_900' },
			'bg-secondary_alt': { light: 'neutral_50', dark: 'neutral_950' },
			'bg-secondary_hover': { light: 'neutral_100', dark: 'neutral_800' },
			'bg-secondary-solid': { light: 'neutral_600', dark: 'neutral_600' },
			'bg-tertiary': { light: 'neutral_100', dark: 'neutral_800' },
			'bg-quaternary': { light: 'neutral_200', dark: 'neutral_700' },
			'bg-overlay': { light: 'neutral_950', dark: 'neutral_800' },
			'bg-brand-primary': { light: 'primary_50', dark: 'primary_500' },
			'bg-brand-primary_alt': { light: 'primary_50', dark: 'neutral_800' },
			'bg-brand-secondary': { light: 'primary_100', dark: 'neutral_600' },
			'bg-brand-solid': { light: 'primary_600', dark: 'primary_600' },
			'bg-brand-solid_hover': { light: 'primary_700', dark: 'primary_500' },
			'bg-brand-section': { light: 'primary_800', dark: 'neutral_800' },
			'bg-brand-section_subtle': { light: 'primary_700', dark: 'neutral_950' },
			'bg-error-primary': { light: 'error_50', dark: 'error_950' },
			'bg-error-secondary': { light: 'error_100', dark: 'error_600' },
			'bg-error-solid': { light: 'error_600', dark: 'error_600' },
			'bg-error-solid_hover': { light: 'error_700', dark: 'error_500' },
			'bg-warning-primary': { light: 'warning_50', dark: 'warning_950' },
			'bg-warning-secondary': { light: 'warning_100', dark: 'warning_600' },
			'bg-warning-solid': { light: 'warning_100', dark: 'warning_600' },
			'bg-warning-solid_hover': { light: 'warning_700', dark: 'warning_500' },
			'bg-success-primary': { light: 'success_50', dark: 'success_950' },
			'bg-success-secondary': { light: 'success_50', dark: 'success_900' },
			'bg-success-solid': { light: 'success_100', dark: 'success_600' },
			'bg-success-solid_hover': { light: 'success_700', dark: 'success_500' },
			'bg-info-primary': { light: 'info_50', dark: 'info_950' },
			'bg-info-secondary': { light: 'info_50', dark: 'info_900' },
			'bg-info-solid': { light: 'info_100', dark: 'info_600' },
			'bg-info-solid_hover': { light: 'info_700', dark: 'info_500' },

			// chrome: app shell surfaces (formerly the `components` contract)
			'bg-header': { light: 'neutral_950', dark: 'neutral_950' },
			'bg-header-avatar': { light: 'primary_600', dark: 'primary_600' },
			'bg-footer': { light: 'neutral_950', dark: 'neutral_950' },
			'bg-footer_secondary': { light: 'neutral_950', dark: 'neutral_950' },
			'bg-app-shell': { light: 'white', dark: 'neutral_950' },
			'bg-sales-card': { light: 'white', dark: 'neutral_900' },
			'bg-sale-card-logo': { light: 'white', dark: 'white' },
			'bg-tab-indicator': { light: 'primary_900', dark: 'primary_400' },
			'bg-footer-button_hover': { light: 'neutral_800', dark: 'neutral_400' },
		},
		utility: {
			'utility-neutral-50': { light: 'neutral_50', dark: 'neutral_900' },
			'utility-neutral-100': { light: 'neutral_100', dark: 'neutral_800' },
			'utility-neutral-200': { light: 'neutral_200', dark: 'neutral_700' },
			'utility-neutral-300': { light: 'neutral_300', dark: 'neutral_700' },
			'utility-neutral-400': { light: 'neutral_400', dark: 'neutral_600' },
			'utility-neutral-500': { light: 'neutral_500', dark: 'neutral_500' },
			'utility-neutral-600': { light: 'neutral_600', dark: 'neutral_400' },
			'utility-neutral-700': { light: 'neutral_700', dark: 'neutral_300' },
			'utility-neutral-800': { light: 'neutral_800', dark: 'neutral_200' },
			'utility-neutral-900': { light: 'neutral_900', dark: 'neutral_100' },

			'utility-primary-50': { light: 'primary_50', dark: 'primary_950' },
			'utility-primary-50_alt': { light: 'primary_50', dark: 'neutral_900' },
			'utility-primary-100': { light: 'primary_100', dark: 'primary_900' },
			'utility-primary-100_alt': { light: 'primary_100', dark: 'neutral_800' },
			'utility-primary-200': { light: 'primary_200', dark: 'primary_800' },
			'utility-primary-200_alt': { light: 'primary_200', dark: 'neutral_700' },
			'utility-primary-300': { light: 'primary_300', dark: 'primary_700' },
			'utility-primary-300_alt': { light: 'primary_300', dark: 'neutral_700' },
			'utility-primary-400': { light: 'primary_400', dark: 'primary_600' },
			'utility-primary-400_alt': { light: 'primary_400', dark: 'neutral_600' },
			'utility-primary-500': { light: 'primary_500', dark: 'primary_500' },
			'utility-primary-500_alt': { light: 'primary_500', dark: 'neutral_500' },
			'utility-primary-600': { light: 'primary_600', dark: 'primary_400' },
			'utility-primary-600_alt': { light: 'primary_600', dark: 'neutral_400' },
			'utility-primary-700': { light: 'primary_700', dark: 'primary_300' },
			'utility-primary-700_alt': { light: 'primary_700', dark: 'neutral_300' },
			'utility-primary-800': { light: 'primary_800', dark: 'primary_200' },
			'utility-primary-800_alt': { light: 'primary_800', dark: 'neutral_200' },
			'utility-primary-900': { light: 'primary_900', dark: 'primary_100' },
			'utility-primary-900_alt': { light: 'primary_900', dark: 'neutral_100' },

			'utility-error-50': { light: 'error_50', dark: 'error_950' },
			'utility-error-100': { light: 'error_100', dark: 'error_900' },
			'utility-error-200': { light: 'error_200', dark: 'error_800' },
			'utility-error-300': { light: 'error_300', dark: 'error_700' },
			'utility-error-400': { light: 'error_400', dark: 'error_600' },
			'utility-error-500': { light: 'error_500', dark: 'error_500' },
			'utility-error-600': { light: 'error_600', dark: 'error_400' },
			'utility-error-700': { light: 'error_700', dark: 'error_300' },

			'utility-warning-50': { light: 'warning_50', dark: 'warning_950' },
			'utility-warning-100': { light: 'warning_100', dark: 'warning_900' },
			'utility-warning-200': { light: 'warning_200', dark: 'warning_800' },
			'utility-warning-300': { light: 'warning_300', dark: 'warning_700' },
			'utility-warning-400': { light: 'warning_400', dark: 'warning_600' },
			'utility-warning-500': { light: 'warning_500', dark: 'warning_500' },
			'utility-warning-600': { light: 'warning_600', dark: 'warning_400' },
			'utility-warning-700': { light: 'warning_700', dark: 'warning_300' },

			'utility-success-50': { light: 'success_50', dark: 'success_950' },
			'utility-success-100': { light: 'success_100', dark: 'success_900' },
			'utility-success-200': { light: 'success_200', dark: 'success_800' },
			'utility-success-300': { light: 'success_300', dark: 'success_700' },
			'utility-success-400': { light: 'success_400', dark: 'success_600' },
			'utility-success-500': { light: 'success_500', dark: 'success_500' },
			'utility-success-600': { light: 'success_600', dark: 'success_400' },
			'utility-success-700': { light: 'success_700', dark: 'success_300' },

			'utility-info-50': { light: 'info_50', dark: 'info_950' },
			'utility-info-100': { light: 'info_100', dark: 'info_900' },
			'utility-info-200': { light: 'info_200', dark: 'info_800' },
			'utility-info-300': { light: 'info_300', dark: 'info_700' },
			'utility-info-400': { light: 'info_400', dark: 'info_600' },
			'utility-info-500': { light: 'info_500', dark: 'info_500' },
			'utility-info-600': { light: 'info_600', dark: 'info_400' },
			'utility-info-700': { light: 'info_700', dark: 'info_300' },
		},
	},

	shadows: {
		none: {
			layers: [{ offsetX: 0, offsetY: 0, blurRadius: 0, spreadRadius: 0, opacity: 0 }],
			color: { light: 'transparent', dark: 'transparent' },
		},

		xs: {
			layers: [{ offsetX: 0, offsetY: 1, blurRadius: 2, spreadRadius: 0, opacity: 0.05 }],
			color: { light: 'black', dark: 'white' },
		},

		sm: {
			layers: [
				{ offsetX: 0, offsetY: 1, blurRadius: 3, spreadRadius: 0, opacity: 0.1 },
				{ offsetX: 0, offsetY: 1, blurRadius: 2, spreadRadius: -1, opacity: 0.1 },
			],
			color: { light: 'black', dark: 'white' },
		},

		md: {
			layers: [
				{ offsetX: 0, offsetY: 4, blurRadius: 6, spreadRadius: -1, opacity: 0.1 },
				{ offsetX: 0, offsetY: 2, blurRadius: 4, spreadRadius: -2, opacity: 0.06 },
			],
			color: { light: 'black', dark: 'white' },
		},

		lg: {
			layers: [
				{ offsetX: 0, offsetY: 12, blurRadius: 16, spreadRadius: -4, opacity: 0.08 },
				{ offsetX: 0, offsetY: 4, blurRadius: 6, spreadRadius: -2, opacity: 0.03 },
				{ offsetX: 0, offsetY: 2, blurRadius: 2, spreadRadius: -1, opacity: 0.04 },
			],
			color: { light: 'black', dark: 'white' },
		},

		xl: {
			layers: [
				{ offsetX: 0, offsetY: 20, blurRadius: 24, spreadRadius: -4, opacity: 0.08 },
				{ offsetX: 0, offsetY: 8, blurRadius: 8, spreadRadius: -4, opacity: 0.03 },
				{ offsetX: 0, offsetY: 3, blurRadius: 3, spreadRadius: -1.5, opacity: 0.04 },
			],
			color: { light: 'black', dark: 'white' },
		},

		'2xl': {
			layers: [
				{ offsetX: 0, offsetY: 24, blurRadius: 48, spreadRadius: -12, opacity: 0.18 },
				{ offsetX: 0, offsetY: 4, blurRadius: 4, spreadRadius: -2, opacity: 0.04 },
			],
			color: { light: 'black', dark: 'white' },
		},

		'3xl': {
			layers: [
				{ offsetX: 0, offsetY: 32, blurRadius: 64, spreadRadius: -12, opacity: 0.14 },
				{ offsetX: 0, offsetY: 5, blurRadius: 5, spreadRadius: -2.5, opacity: 0.04 },
			],
			color: { light: 'black', dark: 'white' },
		},
	},
	focusRing: {
		// UntitledUI focus spec: 2px outline + 2px offset, brand-500: identical in light and dark
		'focus-ring': { color: { light: 'primary_500', dark: 'primary_500' } },
		'focus-ring-error': { color: { light: 'error_500', dark: 'error_500' } },
	},

	gradients: {
		neutral_600_500_90: {
			type: 'linear',
			angle: 90,
			stops: [
				{ color: 'neutral_600', position: 0 },
				{ color: 'neutral_500', position: 100 },
			],
		},
		neutral_700_600_45: {
			type: 'linear',
			angle: 45,
			stops: [
				{ color: 'neutral_700', position: 0 },
				{ color: 'neutral_600', position: 100 },
			],
		},
		neutral_800_600_45: {
			type: 'linear',
			angle: 45,
			stops: [
				{ color: 'neutral_800', position: 0 },
				{ color: 'neutral_600', position: 100 },
			],
		},
		neutral_800_600_90: {
			type: 'linear',
			angle: 90,
			stops: [
				{ color: 'neutral_800', position: 0 },
				{ color: 'neutral_600', position: 100 },
			],
		},
		neutral_800_700_26_5: {
			type: 'linear',
			angle: 26.5,
			stops: [
				{ color: 'neutral_800', position: 0 },
				{ color: 'neutral_700', position: 100 },
			],
		},
		neutral_900_600_45: {
			type: 'linear',
			angle: 45,
			stops: [
				{ color: 'neutral_900', position: 0 },
				{ color: 'neutral_600', position: 100 },
			],
		},
		neutral_900_700_45: {
			type: 'linear',
			angle: 45,
			stops: [
				{ color: 'neutral_900', position: 0 },
				{ color: 'neutral_700', position: 100 },
			],
		},
		neutral_50_white_180: {
			type: 'linear',
			angle: 180,
			stops: [
				{ color: 'neutral_50', position: 0 },
				{ color: 'white', position: 100 },
			],
		},
		neutral_100_white_180: {
			type: 'linear',
			angle: 180,
			stops: [
				{ color: 'neutral_100', position: 0 },
				{ color: 'white', position: 100 },
			],
		},
		neutral_100_50_180: {
			type: 'linear',
			angle: 180,
			stops: [
				{ color: 'neutral_100', position: 0 },
				{ color: 'neutral_50', position: 100 },
			],
		},
		neutral_200_50_180: {
			type: 'linear',
			angle: 180,
			stops: [
				{ color: 'neutral_200', position: 0 },
				{ color: 'neutral_50', position: 100 },
			],
		},
		neutral_200_100_180: {
			type: 'linear',
			angle: 180,
			stops: [
				{ color: 'neutral_200', position: 0 },
				{ color: 'neutral_100', position: 100 },
			],
		},
		white_neutral_50_180: {
			type: 'linear',
			angle: 180,
			stops: [
				{ color: 'white', position: 0 },
				{ color: 'neutral_50', position: 100 },
			],
		},
		primary_600_500_90: {
			type: 'linear',
			angle: 90,
			stops: [
				{ color: 'primary_600', position: 0 },
				{ color: 'primary_500', position: 100 },
			],
		},
		primary_700_600_45: {
			type: 'linear',
			angle: 45,
			stops: [
				{ color: 'primary_700', position: 0 },
				{ color: 'primary_600', position: 100 },
			],
		},
		primary_800_600_45: {
			type: 'linear',
			angle: 45,
			stops: [
				{ color: 'primary_800', position: 0 },
				{ color: 'primary_600', position: 100 },
			],
		},
		primary_800_600_90: {
			type: 'linear',
			angle: 90,
			stops: [
				{ color: 'primary_800', position: 0 },
				{ color: 'primary_600', position: 100 },
			],
		},
		primary_800_700_26_5: {
			type: 'linear',
			angle: 26.5,
			stops: [
				{ color: 'primary_800', position: 0 },
				{ color: 'primary_700', position: 100 },
			],
		},
		primary_900_600_45: {
			type: 'linear',
			angle: 45,
			stops: [
				{ color: 'primary_900', position: 0 },
				{ color: 'primary_600', position: 100 },
			],
		},
		primary_900_700_45: {
			type: 'linear',
			angle: 45,
			stops: [
				{ color: 'primary_900', position: 0 },
				{ color: 'primary_700', position: 100 },
			],
		},
	},

	breakpoints: {
		mobile: 0,
		tablet: 600,
		desktop: 1024,
		wide: 1440,
		ultra: 1920,
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
			columns: 12,
			gutter: 'md', // 32px
			margin: 'md', // 32px
			maxWidth: '3xl', // 1280px
		},

		wide: {
			columns: 12,
			gutter: 'md', // 32px
			margin: 'lg', // 48px
			maxWidth: '4xl', // 1440px
		},

		ultra: {
			columns: 12,
			gutter: 'lg', // 48px
			margin: 'xl', // 64px
			maxWidth: '5xl', // 1600px
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
				borderDisabled: 'border-quaternary',
			},
			secondary: {
				bg: 'bg-tertiary',
				on: 'text-primary',
				border: 'border-primary',
				bgHover: 'bg-quaternary',
				onHover: 'text-primary',
				bgActive: 'bg-quaternary',
				onActive: 'text-primary',
				bgFocus: 'bg-tertiary',
				onFocus: 'text-primary',
				borderFocus: 'border-primary',
				bgDisabled: 'bg-tertiary',
				onDisabled: 'text-quaternary',
				borderDisabled: 'border-quaternary',
			},
			ghost: {
				bg: 'transparent',
				on: 'text-primary',
				border: 'border-primary',
				bgHover: 'bg-tertiary',
				onHover: 'text-primary',
				bgActive: 'bg-quaternary',
				onActive: 'text-primary',
				bgFocus: 'bg-tertiary',
				onFocus: 'text-primary',
				borderFocus: 'border-primary',
				bgDisabled: 'transparent',
				onDisabled: 'text-quaternary',
				borderDisabled: 'transparent',
			},
			link: {
				on: 'text-brand-tertiary',
				onHover: 'text-brand-secondary_hover',
				onActive: 'text-brand-tertiary',
				onFocus: 'text-brand-secondary_hover',
				onDisabled: 'text-quaternary',
			},
			tertiary: {
				bg: 'white',
				on: 'bg-brand-solid',
				border: 'bg-brand-solid',
				bgHover: 'bg-tertiary',
				onHover: 'bg-brand-solid',
				bgActive: 'bg-tertiary',
				onActive: 'bg-brand-solid',
				bgFocus: 'white',
				onFocus: 'bg-brand-solid',
				borderFocus: 'white',
				bgDisabled: 'bg-tertiary',
				onDisabled: 'text-quaternary',
				borderDisabled: 'bg-tertiary',
			},
		},

		feedback: {
			error: {
				bg: 'bg-error-primary',
				on: 'text-error-primary',
				border: 'border-error',
				borderWidth: 1,
				borderRadius: { type: 'radii' as const, value: 'lg' },
				bgInverse: 'bg-error-solid',
				onInverse: 'fg-error-secondary',
			},
			success: {
				bg: 'bg-success-primary',
				on: 'text-success-primary',
				border: 'utility-success-300',
				borderWidth: 1,
				borderRadius: { type: 'radii' as const, value: 'lg' },
				bgInverse: 'bg-success-solid',
				onInverse: 'fg-success-secondary',
			},
			warning: {
				bg: 'bg-warning-primary',
				on: 'text-warning-primary',
				border: 'utility-warning-300',
				borderWidth: 1,
				borderRadius: { type: 'radii' as const, value: 'lg' },
				bgInverse: 'bg-warning-solid',
				onInverse: 'fg-warning-secondary',
			},
			info: {
				bg: 'bg-info-primary',
				on: 'text-info-primary',
				border: 'utility-info-300',
				borderWidth: 1,
				borderRadius: { type: 'radii' as const, value: 'lg' },
				bgInverse: 'bg-info-solid',
				onInverse: 'fg-info-secondary',
			},
		},

		surfaces: {
			base: { bg: 'bg-primary', on: 'text-primary', border: 'border-primary' },
			alt: { bg: 'bg-secondary', on: 'text-primary', border: 'border-primary' },
			raised: { bg: 'bg-tertiary', on: 'text-primary', border: 'border-primary' },
			sunken: { bg: 'bg-quaternary', on: 'text-primary', border: 'border-primary' },
			inverse: { bg: 'bg-primary-solid', on: 'text-white', border: 'border-primary' },
			brand: {
				bg: 'bg-brand-secondary',
				on: 'text-brand-tertiary',
				border: 'border-brand',
			},
		},
	},
};

const defaultTheme = TokensSchema.parse(defaultThemeTokens);

export default defaultTheme;
