/**
 * codegen.js — Pure JS token name lists for build scripts.
 *
 * IMPORTANT: Keep in sync with the TypeScript arrays in index.ts.
 * This file exists so .mjs build scripts can import token names
 * without needing a TypeScript loader.
 */

export const textColorKeys = [
	'text-primary',
	'text-primary_on-brand',
	'text-secondary',
	'text-secondary_hover',
	'text-secondary_on-brand',
	'text-tertiary',
	'text-tertiary_hover',
	'text-tertiary_on-brand',
	'text-quaternary',
	'text-quaternary_on-brand',
	'text-white',
	'text-placeholder',
	'text-brand-primary',
	'text-brand-secondary',
	'text-brand-secondary_hover',
	'text-brand-tertiary',
	'text-brand-tertiary_alt',
	'text-error-primary',
	'text-warning-primary',
	'text-success-primary',
	'text-info-primary',
];

export const borderColorKeys = [
	'border-primary',
	'border-secondary',
	'border-secondary_alt',
	'border-tertiary',
	'border-brand',
	'border-brand_alt',
	'border-error',
	'border-error_subtle',
];

export const fgColorKeys = [
	'fg-primary',
	'fg-secondary',
	'fg-secondary_hover',
	'fg-tertiary',
	'fg-tertiary_hover',
	'fg-quaternary',
	'fg-quaternary_hover',
	'fg-white',
	'fg-brand-primary',
	'fg-brand-primary_alt',
	'fg-brand-secondary',
	'fg-brand-secondary_alt',
	'fg-error-primary',
	'fg-error-secondary',
	'fg-warning-primary',
	'fg-warning-secondary',
	'fg-success-primary',
	'fg-success-secondary',
	'fg-info-primary',
	'fg-info-secondary',
];

export const bgColorKeys = [
	'bg-primary',
	'bg-primary_alt',
	'bg-primary_hover',
	'bg-primary-solid',
	'bg-secondary',
	'bg-secondary_alt',
	'bg-secondary_hover',
	'bg-secondary-solid',
	'bg-tertiary',
	'bg-quaternary',
	'bg-overlay',
	'bg-brand-primary',
	'bg-brand-primary_alt',
	'bg-brand-secondary',
	'bg-brand-solid',
	'bg-brand-solid_hover',
	'bg-brand-section',
	'bg-brand-section_subtle',
	'bg-error-primary',
	'bg-error-secondary',
	'bg-error-solid',
	'bg-error-solid_hover',
	'bg-warning-primary',
	'bg-warning-secondary',
	'bg-warning-solid',
	'bg-warning-solid_hover',
	'bg-success-primary',
	'bg-success-secondary',
	'bg-success-solid',
	'bg-success-solid_hover',
	'bg-info-primary',
	'bg-info-secondary',
	'bg-info-solid',
	'bg-info-solid_hover',
];

export const utilityColorKeys = [
	'utility-neutral-50',
	'utility-neutral-100',
	'utility-neutral-200',
	'utility-neutral-300',
	'utility-neutral-400',
	'utility-neutral-500',
	'utility-neutral-600',
	'utility-neutral-700',
	'utility-neutral-800',
	'utility-neutral-900',
	'utility-primary-50',
	'utility-primary-50_alt',
	'utility-primary-100',
	'utility-primary-100_alt',
	'utility-primary-200',
	'utility-primary-200_alt',
	'utility-primary-300',
	'utility-primary-300_alt',
	'utility-primary-400',
	'utility-primary-400_alt',
	'utility-primary-500',
	'utility-primary-500_alt',
	'utility-primary-600',
	'utility-primary-600_alt',
	'utility-primary-700',
	'utility-primary-700_alt',
	'utility-primary-800',
	'utility-primary-800_alt',
	'utility-primary-900',
	'utility-primary-900_alt',
	'utility-error-50',
	'utility-error-100',
	'utility-error-200',
	'utility-error-300',
	'utility-error-400',
	'utility-error-500',
	'utility-error-600',
	'utility-error-700',
	'utility-warning-50',
	'utility-warning-100',
	'utility-warning-200',
	'utility-warning-300',
	'utility-warning-400',
	'utility-warning-500',
	'utility-warning-600',
	'utility-warning-700',
	'utility-success-50',
	'utility-success-100',
	'utility-success-200',
	'utility-success-300',
	'utility-success-400',
	'utility-success-500',
	'utility-success-600',
	'utility-success-700',
	'utility-info-50',
	'utility-info-100',
	'utility-info-200',
	'utility-info-300',
	'utility-info-400',
	'utility-info-500',
	'utility-info-600',
	'utility-info-700',
];

export const spacingKeys = [
	'none',
	'xxs',
	'xs',
	'sm',
	'md',
	'lg',
	'xl',
	'2xl',
	'3xl',
	'4xl',
	'5xl',
	'6xl',
	'7xl',
	'8xl',
	'9xl',
	'10xl',
	'11xl',
];

export const radiiKeys = ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'];

export const widthKeys = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];

export const layoutKeys = ['none', 'sm', 'md', 'lg', 'xl'];

export const fontSizeKeys = [
	'xxs',
	'xs',
	'sm',
	'md',
	'lg',
	'xl',
	'2xl',
	'3xl',
	'4xl',
	'5xl',
	'6xl',
];

export const fontWeightKeys = ['thin', 'light', 'regular', 'medium', 'semibold', 'bold', 'black'];

export const lineHeightKeys = ['none', 'tight', 'normal', 'relaxed', 'loose'];

export const letterSpacingKeys = ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'];

export const fontFamilyKeys = ['body', 'heading', 'mono'];

export const typographyContractKeys = ['h1', 'h2', 'h3', 'h4', 'p', 'caption', 'label', 'overline'];

export const shadowKeys = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];

// ---------------------------------------------
// CONTRACT STRUCTURE METADATA
// ---------------------------------------------

export const CONTRACT_STRUCTURE = {
	actions: 'nested',
	feedback: 'nested',
	surfaces: 'nested',
	inputField: 'flat',
	selectionControl: 'flat',
	toggle: 'flat',
	components: 'flat',
};

export const CONTRACT_PREFIX = {
	actions: 'action',
	surfaces: 'surface',
	inputField: 'inputfield',
	selectionControl: 'selectioncontrol',
	toggle: 'toggle',
	components: 'components',
	feedback: 'feedback',
};

export const CONTRACT_VARIANTS = {
	actions: ['primary', 'secondary', 'ghost', 'link'],
	feedback: ['error', 'success', 'warning', 'info'],
	surfaces: ['base', 'alt', 'raised', 'sunken', 'inverse', 'brand'],
};

export const NESTED_CONTRACT_PROPERTIES = {
	actions: [
		'bg',
		'on',
		'border',
		'bgHover',
		'onHover',
		'bgActive',
		'onActive',
		'bgFocus',
		'onFocus',
		'borderFocus',
		'bgDisabled',
		'onDisabled',
		'borderDisabled',
	],
	feedback: ['bg', 'on', 'border', 'bgInverse', 'onInverse'],
	surfaces: ['bg', 'on', 'border'],
};

export const FLAT_CONTRACT_PROPERTIES = {
	inputField: [
		'bg',
		'on',
		'border',
		'placeholder',
		'bgHover',
		'borderHover',
		'bgFocus',
		'borderFocus',
		'onFocus',
		'bgDisabled',
		'onDisabled',
		'borderDisabled',
		'borderError',
		'onError',
		'borderSuccess',
		'onSuccess',
	],
	selectionControl: [
		'bg',
		'border',
		'bgChecked',
		'borderChecked',
		'onChecked',
		'bgHover',
		'borderHover',
		'bgDisabled',
		'borderDisabled',
		'onDisabled',
		'borderError',
	],
	toggle: [
		'trackBg',
		'trackBgChecked',
		'trackBorder',
		'thumbColor',
		'thumbColorChecked',
		'bgHover',
		'trackBgCheckedHover',
		'bgDisabled',
		'trackBgDisabled',
		'thumbDisabled',
		'borderError',
	],
	components: [
		'buttonBorderRadii',
		'cardBorderRadii',
		'inputBorderRadii',
		'salesCardBg',
		'appShellBg',
	],
};

export const breakpoints = {
	mobile: 0,
	tablet: 600,
	desktop: 1024,
	wide: 1440,
	ultra: 1920,
};
