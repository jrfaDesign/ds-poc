import { createTheme } from '@stylexjs/stylex';
import { baseColors, componentTokens, roles } from '../index.stylex';

export const brandAColorsTheme = createTheme(baseColors, {
	primary100: '#E0F2FF',
	primary200: '#B9E6FF',
	primary300: '#7CD4FF',
	primary400: '#36C2FF',
	primary500: '#00AFFF',
	primary600: '#0097E6',
	primary700: '#007BBF',
	primary800: '#005C8F',
	primary900: '#003D5F',
});

export const brandAComponentTheme = createTheme(componentTokens, {
	buttonRadius: '0px',
	cardRadius: '0px',
});

export const brandARolesTheme = createTheme(roles, {
	ctaDefaultBg: baseColors.primary600,
});

const brandA = [brandAColorsTheme, brandAComponentTheme, brandARolesTheme];
export default brandA;
