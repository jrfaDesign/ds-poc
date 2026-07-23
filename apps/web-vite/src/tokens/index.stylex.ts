// foundations/spacing.ts
import { defineVars } from '@stylexjs/stylex';

export const spacing = defineVars({
	none: '0px',
	xs: '4px',
	sm: '8px',
	md: '12px',
	lg: '20px',
	xl: '32px',
	xxl: '48px',
	xxxl: '96px',
});

export const radii = defineVars({
	none: '0px',
	sm: '2px',
	md: '4px',
	lg: '8px',
	xl: '16px',
	round: '50%',
});

export const baseColors = defineVars({
	primary100: '#E0E7FF',
	primary200: '#C7D2FE',
	primary300: '#A5B4FC',
	primary400: '#818CF8',
	primary500: '#6366F1',
	primary600: '#4F46E5',
	primary700: '#4338CA',
	primary800: '#3730A3',
	primary900: '#312E81',

	white: '#ffffff',
	black: '#000000',

	neutral100: '#F3F4F6',
	neutral200: '#E5E7EB',
	neutral300: '#D1D5DB',
	neutral400: '#9CA3AF',
	neutral500: '#6B7280',
	neutral600: '#4B5563',
	neutral700: '#374151',
	neutral800: '#1F2937',
	neutral900: '#111827',

	error: '#EF4444',
	errorSurface: '#FBECE7',
	success: '#22C55E',
	successSurface: '#E4F1E0',
	warning: '#F59E0B',
	warningSurface: '#FFF3E7',
});

export const roles = defineVars({
	ctaDefaultBg: baseColors.primary600,
	ctaDefaultFg: baseColors.white,

	ctaHoverBg: baseColors.primary700,
	ctaHoverFg: baseColors.white,

	ctaActiveBg: baseColors.primary800,
	ctaActiveFg: baseColors.white,

	ctaFocusRing: 'rgba(79, 70, 229, 0.25)',

	bgSurface: baseColors.neutral200,
	bgSurfaceFg: baseColors.neutral900,

	bgLight: baseColors.neutral200,
	bgLightFg: baseColors.neutral800,

	fgPrimary: baseColors.primary700,
	fgSecondary: baseColors.neutral600,
});

export const component = defineVars({
	buttonRadius: radii.md,
	placeholderTextColor: baseColors.primary300,
	cardRadius: spacing.md,
});
