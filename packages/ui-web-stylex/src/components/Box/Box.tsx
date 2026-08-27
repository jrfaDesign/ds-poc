import { createElement } from 'react';
import type { BoxProps } from './Box.types';

export function Box({
	as: Tag = 'div',
	children,
	padding,
	paddingX,
	paddingY,
	margin,
	background,
	borderRadius,
	shadow,
	display,
	width,
	height,
	flex,
	flexDirection,
	flexWrap,
	alignItems,
	justifyContent,
	gap,
	position,
	overflow,
	className,
	style,
}: BoxProps) {
	return createElement(
		Tag,
		{
			className,
			style: {
				padding: padding ? `var(--spacing-${padding})` : undefined,
				paddingInline: paddingX ? `var(--spacing-${paddingX})` : undefined,
				paddingBlock: paddingY ? `var(--spacing-${paddingY})` : undefined,
				margin: margin ? `var(--spacing-${margin})` : undefined,
				backgroundColor: background ? `var(--ct-${background})` : undefined,
				borderRadius: borderRadius ? `var(--radii-${borderRadius})` : undefined,
				boxShadow: shadow ? `var(--shadow-${shadow})` : undefined,
				display,
				width,
				height,
				flex,
				flexDirection,
				flexWrap,
				alignItems,
				justifyContent,
				gap: gap ? `var(--spacing-${gap})` : undefined,
				position,
				overflow,
				boxSizing: 'border-box',
				...style,
			},
		},
		children
	);
}
