import { createTheme } from '@stylexjs/stylex';
import { baseColors, componentTokens, roles } from '../index.stylex';

const brandBColorsTheme = createTheme(baseColors, {
	primary100: '#FEE2E2',
	primary200: '#FECACA',
	primary300: '#FCA5A5',
	primary400: '#F87171',
	primary500: '#EF4444',
	primary600: '#DC2626',
	primary700: '#B91C1C',
	primary800: '#991B1B',
	primary900: '#7F1D1D',
});

const brandBComponentTheme = createTheme(componentTokens, {
	buttonRadius: '6px',
});

const brandBRolesTheme = createTheme(roles, {
	ctaDefaultBg: baseColors.primary500,
});

const brandB = [brandBColorsTheme, brandBComponentTheme, brandBRolesTheme];
export default brandB;
