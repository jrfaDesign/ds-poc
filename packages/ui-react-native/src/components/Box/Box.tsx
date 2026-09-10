import { View, type ViewStyle } from 'react-native';
import type { BoxProps } from './Box.types';
import { resolveMargin, resolvePadding } from '../shared/spacing';
import { useTheme } from '../../adapters/rn/useTheme';

export function Box({
	children,
	background,
	borderRadius,
	gap,
	flex,
	flexDirection,
	alignItems,
	justifyContent,
	flexWrap,
	borderWidth,
	borderColor,
	borderStyle,
	width,
	height,
	style,
	...spacing
}: BoxProps) {
	const theme = useTheme();
	const { spacing: spacingMap, radii, colors } = theme.theme;

	const resolvedStyle: ViewStyle = {};
	if (background) resolvedStyle.backgroundColor = colors[background];
	if (borderRadius !== undefined) resolvedStyle.borderRadius = radii[borderRadius];
	if (gap !== undefined) resolvedStyle.gap = spacingMap[gap];
	if (flex !== undefined) resolvedStyle.flex = flex;
	if (flexDirection) resolvedStyle.flexDirection = flexDirection;
	if (alignItems) resolvedStyle.alignItems = alignItems;
	if (justifyContent) resolvedStyle.justifyContent = justifyContent;
	if (flexWrap) resolvedStyle.flexWrap = flexWrap;
	if (borderWidth !== undefined) resolvedStyle.borderWidth = borderWidth;
	if (borderColor) resolvedStyle.borderColor = borderColor;
	if (borderStyle) resolvedStyle.borderStyle = borderStyle;
	if (width !== undefined) resolvedStyle.width = width;
	if (height !== undefined) resolvedStyle.height = height;

	return (
		<View
			style={[
				resolvedStyle,
				resolveMargin(spacing, spacingMap),
				resolvePadding(spacing, spacingMap),
				style,
			]}
		>
			{children}
		</View>
	);
}
