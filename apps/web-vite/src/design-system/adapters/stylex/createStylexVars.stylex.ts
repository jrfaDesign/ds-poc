import { defineVars } from '@stylexjs/stylex';
import type { TokenNames } from '../../foundations';

// spacing
const spacingTokens: Record<TokenNames['spacing'], string> = {
	none: 'var(--spacing-none)',
	xs: 'var(--spacing-xs)',
	sm: 'var(--spacing-sm)',
	md: 'var(--spacing-md)',
	lg: 'var(--spacing-lg)',
	xl: 'var(--spacing-xl)',
	'2xl': 'var(--spacing-2xl)',
};

export const spacing = defineVars(spacingTokens);

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
	actionPrimaryFg: 'var(--role-actionPrimaryFg)',
	actionPrimaryBorder: 'var(--role-actionPrimaryBorder)',
	actionPrimaryDisabledBg: 'var(--role-actionPrimaryDisabledBg)',
	actionPrimaryDisabledFg: 'var(--role-actionPrimaryDisabledFg)',
	actionPrimaryDisabledBorder: 'var(--role-actionPrimaryDisabledBorder)',

	// ACTION — SECONDARY
	actionSecondaryBg: 'var(--role-actionSecondaryBg)',
	actionSecondaryBgHover: 'var(--role-actionSecondaryBgHover)',
	actionSecondaryBgActive: 'var(--role-actionSecondaryBgActive)',
	actionSecondaryFg: 'var(--role-actionSecondaryFg)',
	actionSecondaryBorder: 'var(--role-actionSecondaryBorder)',
	actionSecondaryDisabledBg: 'var(--role-actionSecondaryDisabledBg)',
	actionSecondaryDisabledFg: 'var(--role-actionSecondaryDisabledFg)',
	actionSecondaryDisabledBorder: 'var(--role-actionSecondaryDisabledBorder)',

	// ACTION — GHOST
	actionGhostBg: 'var(--role-actionGhostBg)',
	actionGhostBgHover: 'var(--role-actionGhostBgHover)',
	actionGhostBgActive: 'var(--role-actionGhostBgActive)',
	actionGhostFg: 'var(--role-actionGhostFg)',
	actionGhostBorder: 'var(--role-actionGhostBorder)',

	// ACTION — LINK
	actionLinkFg: 'var(--role-actionLinkFg)',
	actionLinkFgHover: 'var(--role-actionLinkFgHover)',
	actionLinkFgActive: 'var(--role-actionLinkFgActive)',

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

// gradients
const gradientTokens: Record<TokenNames['gradients'], string> = {
	none: 'var(--gradient-none)',
	primary: 'var(--gradient-primary)',
	secondary: 'var(--gradient-secondary)',
	neutral: 'var(--gradient-neutral)',
	brand: 'var(--gradient-brand)',
};

export const gradients = defineVars(gradientTokens);
