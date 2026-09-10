import { defineVars } from '@stylexjs/stylex';
import type { TokenNames } from '@repo/foundations';

// spacing
const spacingTokens: Record<TokenNames['spacing'], string> = {
	none: 'var(--spacing-none)',
	xxs: 'var(--spacing-xxs)',
	xs: 'var(--spacing-xs)',
	sm: 'var(--spacing-sm)',
	md: 'var(--spacing-md)',
	lg: 'var(--spacing-lg)',
	xl: 'var(--spacing-xl)',
	'2xl': 'var(--spacing-2xl)',
	'3xl': 'var(--spacing-3xl)',
	'4xl': 'var(--spacing-4xl)',
	'5xl': 'var(--spacing-5xl)',
	'6xl': 'var(--spacing-6xl)',
	'7xl': 'var(--spacing-7xl)',
	'8xl': 'var(--spacing-8xl)',
	'9xl': 'var(--spacing-9xl)',
	'10xl': 'var(--spacing-10xl)',
	'11xl': 'var(--spacing-11xl)',
};

export const spacing = defineVars(spacingTokens);

// typography - font family
const fontFamilyTokens: Record<'body' | 'heading' | 'mono', string> = {
	body: 'var(--typography-fontFamily)',
	heading: 'var(--typography-headingFontFamily)',
	mono: 'var(--typography-monospaceFont)',
};
export const fontFamily = defineVars(fontFamilyTokens);

// typography - font size
const fontSizeTokens: Record<TokenNames['fontSize'], string> = {
	xxs: 'var(--typography-fontSize-xxs)',
	xs: 'var(--typography-fontSize-xs)',
	sm: 'var(--typography-fontSize-sm)',
	md: 'var(--typography-fontSize-md)',
	lg: 'var(--typography-fontSize-lg)',
	xl: 'var(--typography-fontSize-xl)',
	'2xl': 'var(--typography-fontSize-2xl)',
	'3xl': 'var(--typography-fontSize-3xl)',
	'4xl': 'var(--typography-fontSize-4xl)',
	'5xl': 'var(--typography-fontSize-5xl)',
	'6xl': 'var(--typography-fontSize-6xl)',
};
export const fontSize = defineVars(fontSizeTokens);

// typography - font weight
const fontWeightTokens: Record<TokenNames['fontWeight'], string> = {
	thin: 'var(--typography-fontWeight-thin)',
	light: 'var(--typography-fontWeight-light)',
	regular: 'var(--typography-fontWeight-regular)',
	medium: 'var(--typography-fontWeight-medium)',
	semibold: 'var(--typography-fontWeight-semibold)',
	bold: 'var(--typography-fontWeight-bold)',
	black: 'var(--typography-fontWeight-black)',
};
export const fontWeight = defineVars(fontWeightTokens);

// typography - line height
const lineHeightTokens: Record<TokenNames['lineHeight'], string> = {
	none: 'var(--typography-lineHeight-none)',
	tight: 'var(--typography-lineHeight-tight)',
	normal: 'var(--typography-lineHeight-normal)',
	relaxed: 'var(--typography-lineHeight-relaxed)',
	loose: 'var(--typography-lineHeight-loose)',
};
export const lineHeight = defineVars(lineHeightTokens);

// typography - letter spacing
const letterSpacingTokens: Record<TokenNames['letterSpacing'], string> = {
	tighter: 'var(--typography-letterSpacing-tighter)',
	tight: 'var(--typography-letterSpacing-tight)',
	normal: 'var(--typography-letterSpacing-normal)',
	wide: 'var(--typography-letterSpacing-wide)',
	wider: 'var(--typography-letterSpacing-wider)',
	widest: 'var(--typography-letterSpacing-widest)',
};
export const letterSpacing = defineVars(letterSpacingTokens);

// typography - contracts (resolved compositions from typography.contracts)
const typographyContractsTokens = {
	h1FontSize: 'var(--typography-contract-h1-fontSize)',
	h1FontWeight: 'var(--typography-contract-h1-fontWeight)',
	h1LineHeight: 'var(--typography-contract-h1-lineHeight)',
	h1LetterSpacing: 'var(--typography-contract-h1-letterSpacing)',
	h1Color: 'var(--typography-contract-h1-color)',
	h2FontSize: 'var(--typography-contract-h2-fontSize)',
	h2FontWeight: 'var(--typography-contract-h2-fontWeight)',
	h2LineHeight: 'var(--typography-contract-h2-lineHeight)',
	h2LetterSpacing: 'var(--typography-contract-h2-letterSpacing)',
	h2Color: 'var(--typography-contract-h2-color)',
	h3FontSize: 'var(--typography-contract-h3-fontSize)',
	h3FontWeight: 'var(--typography-contract-h3-fontWeight)',
	h3LineHeight: 'var(--typography-contract-h3-lineHeight)',
	h3LetterSpacing: 'var(--typography-contract-h3-letterSpacing)',
	h3Color: 'var(--typography-contract-h3-color)',
	h4FontSize: 'var(--typography-contract-h4-fontSize)',
	h4FontWeight: 'var(--typography-contract-h4-fontWeight)',
	h4LineHeight: 'var(--typography-contract-h4-lineHeight)',
	h4LetterSpacing: 'var(--typography-contract-h4-letterSpacing)',
	h4Color: 'var(--typography-contract-h4-color)',
	pFontSize: 'var(--typography-contract-p-fontSize)',
	pFontWeight: 'var(--typography-contract-p-fontWeight)',
	pLineHeight: 'var(--typography-contract-p-lineHeight)',
	pLetterSpacing: 'var(--typography-contract-p-letterSpacing)',
	pColor: 'var(--typography-contract-p-color)',
	captionFontSize: 'var(--typography-contract-caption-fontSize)',
	captionFontWeight: 'var(--typography-contract-caption-fontWeight)',
	captionLineHeight: 'var(--typography-contract-caption-lineHeight)',
	captionLetterSpacing: 'var(--typography-contract-caption-letterSpacing)',
	captionColor: 'var(--typography-contract-caption-color)',
	labelFontSize: 'var(--typography-contract-label-fontSize)',
	labelFontWeight: 'var(--typography-contract-label-fontWeight)',
	labelLineHeight: 'var(--typography-contract-label-lineHeight)',
	labelLetterSpacing: 'var(--typography-contract-label-letterSpacing)',
	labelColor: 'var(--typography-contract-label-color)',
	overlineFontSize: 'var(--typography-contract-overline-fontSize)',
	overlineFontWeight: 'var(--typography-contract-overline-fontWeight)',
	overlineLineHeight: 'var(--typography-contract-overline-lineHeight)',
	overlineLetterSpacing: 'var(--typography-contract-overline-letterSpacing)',
	overlineColor: 'var(--typography-contract-overline-color)',
} as const;
export const typographyContracts = defineVars(typographyContractsTokens);

// radii
const radiiTokens: Record<TokenNames['radii'], string> = {
	none: 'var(--radii-none)',
	xxs: 'var(--radii-xxs)',
	xs: 'var(--radii-xs)',
	sm: 'var(--radii-sm)',
	md: 'var(--radii-md)',
	lg: 'var(--radii-lg)',
	xl: 'var(--radii-xl)',
	'2xl': 'var(--radii-2xl)',
	'3xl': 'var(--radii-3xl)',
	'4xl': 'var(--radii-4xl)',
	full: 'var(--radii-full)',
};
export const radii = defineVars(radiiTokens);

// widths (container max-widths)
const widthTokens: Record<TokenNames['widths'], string> = {
	xxs: 'var(--ds-width-xxs)',
	xs: 'var(--ds-width-xs)',
	sm: 'var(--ds-width-sm)',
	md: 'var(--ds-width-md)',
	lg: 'var(--ds-width-lg)',
	xl: 'var(--ds-width-xl)',
	'2xl': 'var(--ds-width-2xl)',
	'3xl': 'var(--ds-width-3xl)',
	'4xl': 'var(--ds-width-4xl)',
	'5xl': 'var(--ds-width-5xl)',
	'6xl': 'var(--ds-width-6xl)',
};
export const widths = defineVars(widthTokens);

// layout (grid gutter/margin scale)
const layoutTokens: Record<TokenNames['layout'], string> = {
	none: 'var(--ds-layout-none)',
	sm: 'var(--ds-layout-sm)',
	md: 'var(--ds-layout-md)',
	lg: 'var(--ds-layout-lg)',
	xl: 'var(--ds-layout-xl)',
};
export const layout = defineVars(layoutTokens);

// colors (raw palette)
const colorTokens = {
	white: 'var(--white)',
	black: 'var(--black)',
	transparent: 'var(--transparent)',

	primary_50: 'var(--primary_50)',
	primary_100: 'var(--primary_100)',
	primary_200: 'var(--primary_200)',
	primary_300: 'var(--primary_300)',
	primary_400: 'var(--primary_400)',
	primary_500: 'var(--primary_500)',
	primary_600: 'var(--primary_600)',
	primary_700: 'var(--primary_700)',
	primary_800: 'var(--primary_800)',
	primary_900: 'var(--primary_900)',
	primary_950: 'var(--primary_950)',

	secondary_50: 'var(--secondary_50)',
	secondary_100: 'var(--secondary_100)',
	secondary_200: 'var(--secondary_200)',
	secondary_300: 'var(--secondary_300)',
	secondary_400: 'var(--secondary_400)',
	secondary_500: 'var(--secondary_500)',
	secondary_600: 'var(--secondary_600)',
	secondary_700: 'var(--secondary_700)',
	secondary_800: 'var(--secondary_800)',
	secondary_900: 'var(--secondary_900)',
	secondary_950: 'var(--secondary_950)',

	neutral_50: 'var(--neutral_50)',
	neutral_100: 'var(--neutral_100)',
	neutral_200: 'var(--neutral_200)',
	neutral_300: 'var(--neutral_300)',
	neutral_400: 'var(--neutral_400)',
	neutral_500: 'var(--neutral_500)',
	neutral_600: 'var(--neutral_600)',
	neutral_700: 'var(--neutral_700)',
	neutral_800: 'var(--neutral_800)',
	neutral_900: 'var(--neutral_900)',
	neutral_950: 'var(--neutral_950)',

	error_50: 'var(--error_50)',
	error_100: 'var(--error_100)',
	error_200: 'var(--error_200)',
	error_300: 'var(--error_300)',
	error_400: 'var(--error_400)',
	error_500: 'var(--error_500)',
	error_600: 'var(--error_600)',
	error_700: 'var(--error_700)',
	error_800: 'var(--error_800)',
	error_900: 'var(--error_900)',
	error_950: 'var(--error_950)',

	info_50: 'var(--info_50)',
	info_100: 'var(--info_100)',
	info_200: 'var(--info_200)',
	info_300: 'var(--info_300)',
	info_400: 'var(--info_400)',
	info_500: 'var(--info_500)',
	info_600: 'var(--info_600)',
	info_700: 'var(--info_700)',
	info_800: 'var(--info_800)',
	info_900: 'var(--info_900)',
	info_950: 'var(--info_950)',

	success_50: 'var(--success_50)',
	success_100: 'var(--success_100)',
	success_200: 'var(--success_200)',
	success_300: 'var(--success_300)',
	success_400: 'var(--success_400)',
	success_500: 'var(--success_500)',
	success_600: 'var(--success_600)',
	success_700: 'var(--success_700)',
	success_800: 'var(--success_800)',
	success_900: 'var(--success_900)',
	success_950: 'var(--success_950)',

	warning_50: 'var(--warning_50)',
	warning_100: 'var(--warning_100)',
	warning_200: 'var(--warning_200)',
	warning_300: 'var(--warning_300)',
	warning_400: 'var(--warning_400)',
	warning_500: 'var(--warning_500)',
	warning_600: 'var(--warning_600)',
	warning_700: 'var(--warning_700)',
	warning_800: 'var(--warning_800)',
	warning_900: 'var(--warning_900)',
	warning_950: 'var(--warning_950)',
};

export const colors = defineVars(colorTokens);

// components
const componentTokens: Record<TokenNames['components'], string> = {
	buttonBorderRadii: 'var(--components-button-border-radii)',
	cardBorderRadii: 'var(--components-card-border-radii)',
	inputBorderRadii: 'var(--components-input-border-radii)',
};

export const components = defineVars(componentTokens);

// actions contracts
const actionContractTokens = {
	// primary
	primaryBg: 'var(--action-primary-bg)',
	primaryOn: 'var(--action-primary-on)',
	primaryBorder: 'var(--action-primary-border)',
	primaryBgHover: 'var(--action-primary-bgHover)',
	primaryOnHover: 'var(--action-primary-onHover)',
	primaryBgActive: 'var(--action-primary-bgActive)',
	primaryOnActive: 'var(--action-primary-onActive)',
	primaryBgFocus: 'var(--action-primary-bgFocus)',
	primaryOnFocus: 'var(--action-primary-onFocus)',
	primaryBorderFocus: 'var(--action-primary-borderFocus)',
	primaryBgDisabled: 'var(--action-primary-bgDisabled)',
	primaryOnDisabled: 'var(--action-primary-onDisabled)',
	primaryBorderDisabled: 'var(--action-primary-borderDisabled)',
	// secondary
	secondaryBg: 'var(--action-secondary-bg)',
	secondaryOn: 'var(--action-secondary-on)',
	secondaryBorder: 'var(--action-secondary-border)',
	secondaryBgHover: 'var(--action-secondary-bgHover)',
	secondaryOnHover: 'var(--action-secondary-onHover)',
	secondaryBgActive: 'var(--action-secondary-bgActive)',
	secondaryOnActive: 'var(--action-secondary-onActive)',
	secondaryBgFocus: 'var(--action-secondary-bgFocus)',
	secondaryOnFocus: 'var(--action-secondary-onFocus)',
	secondaryBorderFocus: 'var(--action-secondary-borderFocus)',
	secondaryBgDisabled: 'var(--action-secondary-bgDisabled)',
	secondaryOnDisabled: 'var(--action-secondary-onDisabled)',
	secondaryBorderDisabled: 'var(--action-secondary-borderDisabled)',
	// ghost
	ghostBg: 'var(--action-ghost-bg)',
	ghostOn: 'var(--action-ghost-on)',
	ghostBorder: 'var(--action-ghost-border)',
	ghostBgHover: 'var(--action-ghost-bgHover)',
	ghostOnHover: 'var(--action-ghost-onHover)',
	ghostBgActive: 'var(--action-ghost-bgActive)',
	ghostOnActive: 'var(--action-ghost-onActive)',
	ghostBgFocus: 'var(--action-ghost-bgFocus)',
	ghostOnFocus: 'var(--action-ghost-onFocus)',
	ghostBorderFocus: 'var(--action-ghost-borderFocus)',
	ghostBgDisabled: 'var(--action-ghost-bgDisabled)',
	ghostOnDisabled: 'var(--action-ghost-onDisabled)',
	ghostBorderDisabled: 'var(--action-ghost-borderDisabled)',
	// link
	linkOn: 'var(--action-link-on)',
	linkOnHover: 'var(--action-link-onHover)',
	linkOnActive: 'var(--action-link-onActive)',
	linkOnFocus: 'var(--action-link-onFocus)',
	linkOnDisabled: 'var(--action-link-onDisabled)',
} as const;
export const actionContracts = defineVars(actionContractTokens);

// feedback contracts
const feedbackContractTokens = {
	errorBg: 'var(--feedback-error-bg)',
	errorOn: 'var(--feedback-error-on)',
	errorBorder: 'var(--feedback-error-border)',
	errorBgInverse: 'var(--feedback-error-bgInverse)',
	errorOnInverse: 'var(--feedback-error-onInverse)',
	successBg: 'var(--feedback-success-bg)',
	successOn: 'var(--feedback-success-on)',
	successBorder: 'var(--feedback-success-border)',
	successBgInverse: 'var(--feedback-success-bgInverse)',
	successOnInverse: 'var(--feedback-success-onInverse)',
	warningBg: 'var(--feedback-warning-bg)',
	warningOn: 'var(--feedback-warning-on)',
	warningBorder: 'var(--feedback-warning-border)',
	warningBgInverse: 'var(--feedback-warning-bgInverse)',
	warningOnInverse: 'var(--feedback-warning-onInverse)',
	infoBg: 'var(--feedback-info-bg)',
	infoOn: 'var(--feedback-info-on)',
	infoBorder: 'var(--feedback-info-border)',
	infoBgInverse: 'var(--feedback-info-bgInverse)',
	infoOnInverse: 'var(--feedback-info-onInverse)',
} as const;
export const feedbackContracts = defineVars(feedbackContractTokens);

// surfaces contracts
const surfaceContractTokens = {
	baseBg: 'var(--surface-base-bg)',
	baseOn: 'var(--surface-base-on)',
	baseBorder: 'var(--surface-base-border)',
	altBg: 'var(--surface-alt-bg)',
	altOn: 'var(--surface-alt-on)',
	altBorder: 'var(--surface-alt-border)',
	raisedBg: 'var(--surface-raised-bg)',
	raisedOn: 'var(--surface-raised-on)',
	raisedBorder: 'var(--surface-raised-border)',
	sunkenBg: 'var(--surface-sunken-bg)',
	sunkenOn: 'var(--surface-sunken-on)',
	sunkenBorder: 'var(--surface-sunken-border)',
	inverseBg: 'var(--surface-inverse-bg)',
	inverseOn: 'var(--surface-inverse-on)',
	inverseBorder: 'var(--surface-inverse-border)',
	brandBg: 'var(--surface-brand-bg)',
	brandOn: 'var(--surface-brand-on)',
	brandBorder: 'var(--surface-brand-border)',
} as const;
export const surfaceContracts = defineVars(surfaceContractTokens);

// shadows
const shadowTokens: Record<TokenNames['shadows'], string> = {
	none: 'var(--shadow-none)',
	xs: 'var(--shadow-xs)',
	sm: 'var(--shadow-sm)',
	md: 'var(--shadow-md)',
	lg: 'var(--shadow-lg)',
	xl: 'var(--shadow-xl)',
	'2xl': 'var(--shadow-2xl)',
	'3xl': 'var(--shadow-3xl)',
};

export const shadows = defineVars(shadowTokens);

// breakpoints
const breakpointTokens = {
	mobile: 'var(--breakpoint-mobile)',
	tablet: 'var(--breakpoint-tablet)',
	desktop: 'var(--breakpoint-desktop)',
	wide: 'var(--breakpoint-wide)',
	ultra: 'var(--breakpoint-ultra)',
} as const;
export const breakpoints = defineVars(breakpointTokens);

// grid
const gridTokens = {
	mobileColumns: 'var(--grid-mobile-columns)',
	mobileGutter: 'var(--grid-mobile-gutter)',
	mobileMargin: 'var(--grid-mobile-margin)',
	mobileMaxWidth: 'var(--grid-mobile-maxWidth)',
	tabletColumns: 'var(--grid-tablet-columns)',
	tabletGutter: 'var(--grid-tablet-gutter)',
	tabletMargin: 'var(--grid-tablet-margin)',
	tabletMaxWidth: 'var(--grid-tablet-maxWidth)',
	desktopColumns: 'var(--grid-desktop-columns)',
	desktopGutter: 'var(--grid-desktop-gutter)',
	desktopMargin: 'var(--grid-desktop-margin)',
	desktopMaxWidth: 'var(--grid-desktop-maxWidth)',
	wideColumns: 'var(--grid-wide-columns)',
	wideGutter: 'var(--grid-wide-gutter)',
	wideMargin: 'var(--grid-wide-margin)',
	wideMaxWidth: 'var(--grid-wide-maxWidth)',
	ultraColumns: 'var(--grid-ultra-columns)',
	ultraGutter: 'var(--grid-ultra-gutter)',
	ultraMargin: 'var(--grid-ultra-margin)',
	ultraMaxWidth: 'var(--grid-ultra-maxWidth)',
} as const;
export const grid = defineVars(gridTokens);

// gradients (compound from_to_angle keys)
const gradientTokens: Record<TokenNames['gradients'], string> = {
	neutral_600_500_90: 'var(--gradient-neutral_600_500_90)',
	neutral_700_600_45: 'var(--gradient-neutral_700_600_45)',
	neutral_800_600_45: 'var(--gradient-neutral_800_600_45)',
	neutral_800_600_90: 'var(--gradient-neutral_800_600_90)',
	neutral_800_700_26_5: 'var(--gradient-neutral_800_700_26_5)',
	neutral_900_600_45: 'var(--gradient-neutral_900_600_45)',
	neutral_900_700_45: 'var(--gradient-neutral_900_700_45)',
	neutral_50_white_180: 'var(--gradient-neutral_50_white_180)',
	neutral_100_white_180: 'var(--gradient-neutral_100_white_180)',
	neutral_100_50_180: 'var(--gradient-neutral_100_50_180)',
	neutral_200_50_180: 'var(--gradient-neutral_200_50_180)',
	neutral_200_100_180: 'var(--gradient-neutral_200_100_180)',
	white_neutral_50_180: 'var(--gradient-white_neutral_50_180)',
	primary_600_500_90: 'var(--gradient-primary_600_500_90)',
	primary_700_600_45: 'var(--gradient-primary_700_600_45)',
	primary_800_600_45: 'var(--gradient-primary_800_600_45)',
	primary_800_600_90: 'var(--gradient-primary_800_600_90)',
	primary_800_700_26_5: 'var(--gradient-primary_800_700_26_5)',
	primary_900_600_45: 'var(--gradient-primary_900_600_45)',
	primary_900_700_45: 'var(--gradient-primary_900_700_45)',
};

export const gradients = defineVars(gradientTokens);

/**
 * @deprecated Compatibility shim mapping the legacy `roles` namespace to the
 * new color-token CSS variables. Kept so the demo app's showcase styles can
 * reference `roles.*` while migrating. Production components use `var(--ct-*)`
 * directly.
 */
export const roles = {
	white: 'var(--ct-text-white)',
	black: 'var(--ct-text-primary)',
	primary: 'var(--ct-text-brand-tertiary_alt)',
	secondary: 'var(--ct-text-brand-secondary)',
	surface: 'var(--ct-bg-primary)',
	surfaceAlt: 'var(--ct-bg-secondary)',
	surfaceRaised: 'var(--ct-bg-tertiary)',
	surfaceSunken: 'var(--ct-bg-quaternary)',
	surfaceInverse: 'var(--ct-bg-primary-solid)',
	surfaceBrand: 'var(--ct-bg-brand-secondary)',
	text: 'var(--ct-text-primary)',
	textSecondary: 'var(--ct-text-secondary)',
	textTertiary: 'var(--ct-text-tertiary)',
	textPlaceholder: 'var(--ct-text-placeholder)',
	textInverse: 'var(--ct-text-white)',
	textBrand: 'var(--ct-text-brand-secondary)',
	border: 'var(--ct-border-primary)',
	borderStrong: 'var(--ct-border-primary)',
	borderWeak: 'var(--ct-border-tertiary)',
	borderInverse: 'var(--ct-border-primary)',
	divider: 'var(--ct-border-secondary)',
	focusRing: 'var(--focusring-focus-ring)',
	actionPrimaryBg: 'var(--ct-bg-brand-solid)',
	actionPrimaryBgHover: 'var(--ct-bg-brand-solid_hover)',
	actionPrimaryBgActive: 'var(--ct-bg-brand-solid_hover)',
	actionPrimaryBgFocus: 'var(--ct-bg-brand-solid)',
	actionPrimaryFg: 'var(--ct-text-white)',
	actionPrimaryBorder: 'var(--ct-border-brand)',
	actionPrimaryBorderFocus: 'var(--ct-border-brand)',
	actionPrimaryDisabledBg: 'var(--ct-bg-quaternary)',
	actionPrimaryDisabledFg: 'var(--ct-text-quaternary)',
	actionPrimaryDisabledBorder: 'var(--ct-border-primary)',
	actionSecondaryBg: 'var(--ct-bg-tertiary)',
	actionSecondaryBgHover: 'var(--ct-bg-quaternary)',
	actionSecondaryBgActive: 'var(--ct-bg-quaternary)',
	actionSecondaryBgFocus: 'var(--ct-bg-tertiary)',
	actionSecondaryFg: 'var(--ct-text-primary)',
	actionSecondaryBorder: 'var(--ct-border-primary)',
	actionSecondaryBorderFocus: 'var(--ct-border-primary)',
	actionSecondaryDisabledBg: 'var(--ct-bg-tertiary)',
	actionSecondaryDisabledFg: 'var(--ct-text-quaternary)',
	actionSecondaryDisabledBorder: 'var(--ct-border-secondary)',
	actionGhostBg: 'transparent',
	actionGhostBgHover: 'var(--ct-bg-tertiary)',
	actionGhostBgActive: 'var(--ct-bg-quaternary)',
	actionGhostBgFocus: 'var(--ct-bg-tertiary)',
	actionGhostFg: 'var(--ct-text-primary)',
	actionGhostBorder: 'var(--ct-border-primary)',
	actionGhostBorderFocus: 'var(--ct-border-primary)',
	actionGhostDisabledBg: 'transparent',
	actionGhostDisabledFg: 'var(--ct-text-quaternary)',
	actionGhostDisabledBorder: 'transparent',
	actionLinkFg: 'var(--ct-text-brand-tertiary_alt)',
	actionLinkFgHover: 'var(--ct-text-brand-secondary_hover)',
	actionLinkFgActive: 'var(--ct-text-brand-tertiary)',
	actionLinkFgFocus: 'var(--ct-text-brand-secondary_hover)',
	actionLinkFgDisabled: 'var(--ct-text-quaternary)',
	errorBg: 'var(--ct-bg-error-primary)',
	errorFg: 'var(--ct-text-error-primary)',
	errorBorder: 'var(--ct-border-error)',
	errorBgInverse: 'var(--ct-bg-error-solid)',
	errorFgInverse: 'var(--ct-fg-error-secondary)',
	successBg: 'var(--ct-bg-success-primary)',
	successFg: 'var(--ct-text-success-primary)',
	successBorder: 'var(--ct-utility-success-300)',
	successBgInverse: 'var(--ct-bg-success-solid)',
	successFgInverse: 'var(--ct-fg-success-secondary)',
	warningBg: 'var(--ct-bg-warning-primary)',
	warningFg: 'var(--ct-text-warning-primary)',
	warningBorder: 'var(--ct-utility-warning-300)',
	warningBgInverse: 'var(--ct-bg-warning-solid)',
	warningFgInverse: 'var(--ct-fg-warning-secondary)',
	infoBg: 'var(--ct-bg-info-primary)',
	infoFg: 'var(--ct-text-info-primary)',
	infoBorder: 'var(--ct-utility-info-300)',
	infoBgInverse: 'var(--ct-bg-info-solid)',
	infoFgInverse: 'var(--ct-fg-info-secondary)',
} as const;
