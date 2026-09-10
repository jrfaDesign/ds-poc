import { Text, StyleSheet, type TextStyle } from 'react-native';
import type { TypographyProps, TypographyRole } from './Typography.types';
import type { FontSizeToken, LineHeightToken } from '@repo/foundations';
import { resolveMargin } from '../shared/spacing';
import { useTheme } from '../../adapters/rn/useTheme';

const roleFontSizeMap: Record<TypographyRole, FontSizeToken> = {
	h1: '5xl',
	h2: '4xl',
	h3: '3xl',
	h4: '2xl',
	p: 'md',
	caption: 'xs',
	label: 'sm',
	overline: 'xs',
};

const roleLineHeightMap: Record<TypographyRole, LineHeightToken> = {
	h1: 'tight',
	h2: 'tight',
	h3: 'tight',
	h4: 'tight',
	p: 'normal',
	caption: 'normal',
	label: 'tight',
	overline: 'tight',
};

const roleWeightMap: Record<TypographyRole, number> = {
	h1: 700,
	h2: 700,
	h3: 600,
	h4: 600,
	p: 400,
	caption: 400,
	label: 500,
	overline: 600,
};

export function Typography({
	role = 'p',
	color,
	weight,
	size,
	lineHeight,
	letterSpacing,
	children,
	style,
	...margin
}: TypographyProps) {
	const theme = useTheme();
	const { spacing, typography, colorTokens } = theme.theme;

	const fontSizeKey = size ?? roleFontSizeMap[role];
	const lhKey = lineHeight ?? roleLineHeightMap[role];
	const fw = weight ?? roleWeightMap[role];

	const fontSizeValue = typography.fontSize[fontSizeKey];
	const lhValue = typography.lineHeight[lhKey];
	const ffValue = typography.fontFamilies.body;

	const resolvedColor = color && color !== 'inherit' ? (colorTokens[color] ?? color) : undefined;

	const letterSpacingValue = letterSpacing ? typography.letterSpacing[letterSpacing] : undefined;

	const resolvedStyle: TextStyle = {
		fontSize: fontSizeValue?.fontSizePx ?? 16,
		fontWeight: fw as TextStyle['fontWeight'],
		fontFamily: ffValue,
	};
	if (lhValue && fontSizeValue) {
		resolvedStyle.lineHeight = lhValue * fontSizeValue.fontSizePx;
	}
	if (letterSpacingValue !== undefined) {
		resolvedStyle.letterSpacing = letterSpacingValue;
	}
	if (resolvedColor) {
		resolvedStyle.color = resolvedColor;
	}

	return <Text style={[resolvedStyle, resolveMargin(margin, spacing), style]}>{children}</Text>;
}
