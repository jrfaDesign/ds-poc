import { defineVars } from '@stylexjs/stylex';
import type { TokenNames } from '../../foundations';

// spacing
const spacingTokens: Record<TokenNames['spacing'], string> = {
	none: 'var(--spacing-none)',
	'3xs': 'var(--spacing-3xs)',
	'2xs': 'var(--spacing-2xs)',
	xs: 'var(--spacing-xs)',
	sm: 'var(--spacing-sm)',
	md: 'var(--spacing-md)',
	lg: 'var(--spacing-lg)',
	xl: 'var(--spacing-xl)',
	'2xl': 'var(--spacing-2xl)',
	'3xl': 'var(--spacing-3xl)',
	'4xl': 'var(--spacing-4xl)',
};

export const spacing = defineVars(spacingTokens);

// typography — font family
const fontFamilyTokens: Record<'body' | 'mono', string> = {
	body: 'var(--typography-fontFamily)',
	mono: 'var(--typography-monospaceFont)',
};
export const fontFamily = defineVars(fontFamilyTokens);

// typography — font size
const fontSizeTokens: Record<TokenNames['fontSize'], string> = {
	'2xs': 'var(--typography-fontSize-2xs)',
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

// typography — font weight
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

// typography — line height
const lineHeightTokens: Record<TokenNames['lineHeight'], string> = {
	none: 'var(--typography-lineHeight-none)',
	tight: 'var(--typography-lineHeight-tight)',
	normal: 'var(--typography-lineHeight-normal)',
	relaxed: 'var(--typography-lineHeight-relaxed)',
	loose: 'var(--typography-lineHeight-loose)',
};
export const lineHeight = defineVars(lineHeightTokens);

// typography — letter spacing
const letterSpacingTokens: Record<TokenNames['letterSpacing'], string> = {
	tighter: 'var(--typography-letterSpacing-tighter)',
	tight: 'var(--typography-letterSpacing-tight)',
	normal: 'var(--typography-letterSpacing-normal)',
	wide: 'var(--typography-letterSpacing-wide)',
	wider: 'var(--typography-letterSpacing-wider)',
	widest: 'var(--typography-letterSpacing-widest)',
};
export const letterSpacing = defineVars(letterSpacingTokens);

// typography — contracts (resolved compositions from typography.contracts)
const typographyContractsTokens = {
	heading1FontSize: 'var(--typography-contract-heading1-fontSize)',
	heading1FontWeight: 'var(--typography-contract-heading1-fontWeight)',
	heading1LineHeight: 'var(--typography-contract-heading1-lineHeight)',
	heading1LetterSpacing: 'var(--typography-contract-heading1-letterSpacing)',
	heading1Color: 'var(--typography-contract-heading1-color)',
	heading2FontSize: 'var(--typography-contract-heading2-fontSize)',
	heading2FontWeight: 'var(--typography-contract-heading2-fontWeight)',
	heading2LineHeight: 'var(--typography-contract-heading2-lineHeight)',
	heading2LetterSpacing: 'var(--typography-contract-heading2-letterSpacing)',
	heading2Color: 'var(--typography-contract-heading2-color)',
	heading3FontSize: 'var(--typography-contract-heading3-fontSize)',
	heading3FontWeight: 'var(--typography-contract-heading3-fontWeight)',
	heading3LineHeight: 'var(--typography-contract-heading3-lineHeight)',
	heading3LetterSpacing: 'var(--typography-contract-heading3-letterSpacing)',
	heading3Color: 'var(--typography-contract-heading3-color)',
	heading4FontSize: 'var(--typography-contract-heading4-fontSize)',
	heading4FontWeight: 'var(--typography-contract-heading4-fontWeight)',
	heading4LineHeight: 'var(--typography-contract-heading4-lineHeight)',
	heading4LetterSpacing: 'var(--typography-contract-heading4-letterSpacing)',
	heading4Color: 'var(--typography-contract-heading4-color)',
	bodyFontSize: 'var(--typography-contract-body-fontSize)',
	bodyFontWeight: 'var(--typography-contract-body-fontWeight)',
	bodyLineHeight: 'var(--typography-contract-body-lineHeight)',
	bodyLetterSpacing: 'var(--typography-contract-body-letterSpacing)',
	bodyColor: 'var(--typography-contract-body-color)',
	bodySmFontSize: 'var(--typography-contract-bodySm-fontSize)',
	bodySmFontWeight: 'var(--typography-contract-bodySm-fontWeight)',
	bodySmLineHeight: 'var(--typography-contract-bodySm-lineHeight)',
	bodySmLetterSpacing: 'var(--typography-contract-bodySm-letterSpacing)',
	bodySmColor: 'var(--typography-contract-bodySm-color)',
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
	xs: 'var(--radii-xs)',
	sm: 'var(--radii-sm)',
	md: 'var(--radii-md)',
	lg: 'var(--radii-lg)',
	xl: 'var(--radii-xl)',
	full: 'var(--radii-full)',
};
export const radii = defineVars(radiiTokens);

// colors
const colorTokens: Record<TokenNames['colors'], string> = {
	primary_100: 'var(--primary_100)',
	primary_200: 'var(--primary_200)',
	primary_300: 'var(--primary_300)',
	primary_400: 'var(--primary_400)',
	primary_500: 'var(--primary_500)',
	primary_600: 'var(--primary_600)',
	primary_700: 'var(--primary_700)',
	primary_800: 'var(--primary_800)',
	primary_900: 'var(--primary_900)',

	secondary_100: 'var(--secondary_100)',
	secondary_200: 'var(--secondary_200)',
	secondary_300: 'var(--secondary_300)',
	secondary_400: 'var(--secondary_400)',
	secondary_500: 'var(--secondary_500)',
	secondary_600: 'var(--secondary_600)',
	secondary_700: 'var(--secondary_700)',
	secondary_800: 'var(--secondary_800)',
	secondary_900: 'var(--secondary_900)',

	neutral_100: 'var(--neutral_100)',
	neutral_200: 'var(--neutral_200)',
	neutral_300: 'var(--neutral_300)',
	neutral_400: 'var(--neutral_400)',
	neutral_500: 'var(--neutral_500)',
	neutral_600: 'var(--neutral_600)',
	neutral_700: 'var(--neutral_700)',
	neutral_800: 'var(--neutral_800)',
	neutral_900: 'var(--neutral_900)',

	error_100: 'var(--error_100)',
	error_200: 'var(--error_200)',
	error_300: 'var(--error_300)',
	error_400: 'var(--error_400)',
	error_500: 'var(--error_500)',
	error_600: 'var(--error_600)',
	error_700: 'var(--error_700)',
	error_800: 'var(--error_800)',
	error_900: 'var(--error_900)',

	success_100: 'var(--success_100)',
	success_200: 'var(--success_200)',
	success_300: 'var(--success_300)',
	success_400: 'var(--success_400)',
	success_500: 'var(--success_500)',
	success_600: 'var(--success_600)',
	success_700: 'var(--success_700)',
	success_800: 'var(--success_800)',
	success_900: 'var(--success_900)',

	warning_100: 'var(--warning_100)',
	warning_200: 'var(--warning_200)',
	warning_300: 'var(--warning_300)',
	warning_400: 'var(--warning_400)',
	warning_500: 'var(--warning_500)',
	warning_600: 'var(--warning_600)',
	warning_700: 'var(--warning_700)',
	warning_800: 'var(--warning_800)',
	warning_900: 'var(--warning_900)',

	info_100: 'var(--info_100)',
	info_200: 'var(--info_200)',
	info_300: 'var(--info_300)',
	info_400: 'var(--info_400)',
	info_500: 'var(--info_500)',
	info_600: 'var(--info_600)',
	info_700: 'var(--info_700)',
	info_800: 'var(--info_800)',
	info_900: 'var(--info_900)',

	white: 'var(--white)',
	black: 'var(--black)',
	transparent: 'var(--transparent)',
};

export const colors = defineVars(colorTokens);

// roles
const roleTokens: Record<TokenNames['roles'], string> = {
	// ABSOLUTE
	white: 'var(--role-white)',
	black: 'var(--role-black)',

	// BRAND
	primary: 'var(--role-primary)',
	secondary: 'var(--role-secondary)',

	// SURFACE
	surface: 'var(--role-surface)',
	surfaceAlt: 'var(--role-surfaceAlt)',
	surfaceRaised: 'var(--role-surfaceRaised)',
	surfaceSunken: 'var(--role-surfaceSunken)',
	surfaceInverse: 'var(--role-surfaceInverse)',
	surfaceBrand: 'var(--role-surfaceBrand)',

	// TEXT
	text: 'var(--role-text)',
	textSecondary: 'var(--role-textSecondary)',
	textTertiary: 'var(--role-textTertiary)',
	textPlaceholder: 'var(--role-textPlaceholder)',
	textInverse: 'var(--role-textInverse)',
	textBrand: 'var(--role-textBrand)',

	// STRUCTURE
	border: 'var(--role-border)',
	borderStrong: 'var(--role-borderStrong)',
	borderWeak: 'var(--role-borderWeak)',
	borderInverse: 'var(--role-borderInverse)',
	divider: 'var(--role-divider)',
	focusRing: 'var(--role-focusRing)',

	// ACTION — PRIMARY
	actionPrimaryBg: 'var(--role-actionPrimaryBg)',
	actionPrimaryBgHover: 'var(--role-actionPrimaryBgHover)',
	actionPrimaryBgActive: 'var(--role-actionPrimaryBgActive)',
	actionPrimaryBgFocus: 'var(--role-actionPrimaryBgFocus)',
	actionPrimaryFg: 'var(--role-actionPrimaryFg)',
	actionPrimaryBorder: 'var(--role-actionPrimaryBorder)',
	actionPrimaryBorderFocus: 'var(--role-actionPrimaryBorderFocus)',
	actionPrimaryDisabledBg: 'var(--role-actionPrimaryDisabledBg)',
	actionPrimaryDisabledFg: 'var(--role-actionPrimaryDisabledFg)',
	actionPrimaryDisabledBorder: 'var(--role-actionPrimaryDisabledBorder)',

	// ACTION — SECONDARY
	actionSecondaryBg: 'var(--role-actionSecondaryBg)',
	actionSecondaryBgHover: 'var(--role-actionSecondaryBgHover)',
	actionSecondaryBgActive: 'var(--role-actionSecondaryBgActive)',
	actionSecondaryBgFocus: 'var(--role-actionSecondaryBgFocus)',
	actionSecondaryFg: 'var(--role-actionSecondaryFg)',
	actionSecondaryBorder: 'var(--role-actionSecondaryBorder)',
	actionSecondaryBorderFocus: 'var(--role-actionSecondaryBorderFocus)',
	actionSecondaryDisabledBg: 'var(--role-actionSecondaryDisabledBg)',
	actionSecondaryDisabledFg: 'var(--role-actionSecondaryDisabledFg)',
	actionSecondaryDisabledBorder: 'var(--role-actionSecondaryDisabledBorder)',

	// ACTION — GHOST
	actionGhostBg: 'var(--role-actionGhostBg)',
	actionGhostBgHover: 'var(--role-actionGhostBgHover)',
	actionGhostBgActive: 'var(--role-actionGhostBgActive)',
	actionGhostBgFocus: 'var(--role-actionGhostBgFocus)',
	actionGhostFg: 'var(--role-actionGhostFg)',
	actionGhostBorder: 'var(--role-actionGhostBorder)',
	actionGhostBorderFocus: 'var(--role-actionGhostBorderFocus)',
	actionGhostDisabledBg: 'var(--role-actionGhostDisabledBg)',
	actionGhostDisabledFg: 'var(--role-actionGhostDisabledFg)',
	actionGhostDisabledBorder: 'var(--role-actionGhostDisabledBorder)',

	// ACTION — LINK
	actionLinkFg: 'var(--role-actionLinkFg)',
	actionLinkFgHover: 'var(--role-actionLinkFgHover)',
	actionLinkFgActive: 'var(--role-actionLinkFgActive)',
	actionLinkFgFocus: 'var(--role-actionLinkFgFocus)',
	actionLinkFgDisabled: 'var(--role-actionLinkFgDisabled)',

	// FEEDBACK — ERROR
	errorBg: 'var(--role-errorBg)',
	errorFg: 'var(--role-errorFg)',
	errorBorder: 'var(--role-errorBorder)',
	errorBgInverse: 'var(--role-errorBgInverse)',
	errorFgInverse: 'var(--role-errorFgInverse)',

	// FEEDBACK — SUCCESS
	successBg: 'var(--role-successBg)',
	successFg: 'var(--role-successFg)',
	successBorder: 'var(--role-successBorder)',
	successBgInverse: 'var(--role-successBgInverse)',
	successFgInverse: 'var(--role-successFgInverse)',

	// FEEDBACK — WARNING
	warningBg: 'var(--role-warningBg)',
	warningFg: 'var(--role-warningFg)',
	warningBorder: 'var(--role-warningBorder)',
	warningBgInverse: 'var(--role-warningBgInverse)',
	warningFgInverse: 'var(--role-warningFgInverse)',

	// FEEDBACK — INFO
	infoBg: 'var(--role-infoBg)',
	infoFg: 'var(--role-infoFg)',
	infoBorder: 'var(--role-infoBorder)',
	infoBgInverse: 'var(--role-infoBgInverse)',
	infoFgInverse: 'var(--role-infoFgInverse)',
};

export const roles = defineVars(roleTokens);

// components
const componentTokens: Record<TokenNames['components'], string> = {
	buttonBg: 'var(--component-buttonBg)',
	buttonBorderRadii: 'var(--component-buttonBorderRadii)',

	cardBorderRadii: 'var(--component-cardBorderRadii)',
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

// gradients
const gradientTokens: Record<TokenNames['gradients'], string> = {
	none: 'var(--gradient-none)',
	primary: 'var(--gradient-primary)',
	secondary: 'var(--gradient-secondary)',
	neutral: 'var(--gradient-neutral)',
	brand: 'var(--gradient-brand)',
};

export const gradients = defineVars(gradientTokens);
