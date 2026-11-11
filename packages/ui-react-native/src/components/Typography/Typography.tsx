import { Text, type TextStyle } from 'react-native';
import type { FontSizeToken } from '@repo/foundations';
import type { TypographyProps, TypographyVariant } from './Typography.types';
import { resolveMargin } from '../shared/spacing';
import { useTheme } from '../../adapters/rn/useTheme';

/** Variant → font-size step, weight, and family bucket (heading vs body). */
const variantStyles: Record<
	TypographyVariant,
	{ size: FontSizeToken; weight: TextStyle['fontWeight']; heading?: boolean }
> = {
	display: { size: '5xl', weight: '700', heading: true },
	title: { size: '3xl', weight: '600', heading: true },
	headline: { size: 'xl', weight: '600', heading: true },
	body: { size: 'md', weight: '400' },
	label: { size: 'sm', weight: '500' },
	caption: { size: 'xs', weight: '400' },
};

/** RN accepts a single family name, not a CSS font stack: take the first entry. */
function firstFontFamily(stack: string): string {
	const [first = stack] = stack.split(',');
	return first.replace(/["']/g, '').trim();
}

export function Typography({
	variant = 'body',
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

	const variantStyle = variantStyles[variant];
	const fontFamily = variantStyle.heading
		? typography.fontFamilies.heading
		: typography.fontFamilies.body;

	const fontSizePx = size
		? (typography.fontSize[size]?.fontSizePx ?? typography.fontSize[variantStyle.size].fontSizePx)
		: typography.fontSize[variantStyle.size].fontSizePx;

	const lhRatio = lineHeight !== undefined ? typography.lineHeight[lineHeight] : undefined;
	const lineHeightPx =
		lhRatio !== undefined
			? lhRatio * fontSizePx
			: size !== undefined
				? (typography.fontSize[size]?.lineHeightPx ??
					typography.fontSize[variantStyle.size].lineHeightPx)
				: typography.fontSize[variantStyle.size].lineHeightPx;

	const fw = weight ?? variantStyle.weight;
	const resolvedColor =
		color === 'inherit'
			? undefined
			: color
				? (colorTokens[color] ?? color)
				: colorTokens['text-primary'];

	const lsEm =
		letterSpacing !== undefined
			? typography.letterSpacing[letterSpacing]
			: typography.fontSize[size ?? variantStyle.size].letterSpacing;

	const resolvedStyle: TextStyle = {
		fontSize: fontSizePx,
		fontWeight: fw,
		fontFamily: firstFontFamily(fontFamily),
		lineHeight: lineHeightPx,
	};
	if (lsEm !== undefined) {
		// Token tracking is em-based; RN letterSpacing is px.
		resolvedStyle.letterSpacing = lsEm * fontSizePx;
	}
	if (resolvedColor) {
		resolvedStyle.color = resolvedColor;
	}

	return <Text style={[resolvedStyle, resolveMargin(margin, spacing), style]}>{children}</Text>;
}
