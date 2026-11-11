import type { MarginProps, PaddingProps } from '@repo/core';
import type { ViewStyle } from 'react-native';

export type { MarginProps, PaddingProps };

export function resolveMargin(p: MarginProps, spacing: Record<string, number>): ViewStyle {
	const top = p.marginTop ?? p.marginY ?? p.margin;
	const bottom = p.marginBottom ?? p.marginY ?? p.margin;
	const left = p.marginLeft ?? p.marginX ?? p.margin;
	const right = p.marginRight ?? p.marginX ?? p.margin;
	const style: ViewStyle = {};
	if (top !== undefined) style.marginTop = spacing[top] ?? 0;
	if (bottom !== undefined) style.marginBottom = spacing[bottom] ?? 0;
	if (left !== undefined) style.marginLeft = spacing[left] ?? 0;
	if (right !== undefined) style.marginRight = spacing[right] ?? 0;
	return style;
}

export function resolvePadding(p: PaddingProps, spacing: Record<string, number>): ViewStyle {
	const top = p.paddingTop ?? p.paddingY ?? p.padding;
	const bottom = p.paddingBottom ?? p.paddingY ?? p.padding;
	const left = p.paddingLeft ?? p.paddingX ?? p.padding;
	const right = p.paddingRight ?? p.paddingX ?? p.padding;
	const style: ViewStyle = {};
	if (top !== undefined) style.paddingTop = spacing[top] ?? 0;
	if (bottom !== undefined) style.paddingBottom = spacing[bottom] ?? 0;
	if (left !== undefined) style.paddingLeft = spacing[left] ?? 0;
	if (right !== undefined) style.paddingRight = spacing[right] ?? 0;
	return style;
}
