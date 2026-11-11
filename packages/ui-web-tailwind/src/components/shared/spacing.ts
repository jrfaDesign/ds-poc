import type { CSSProperties } from 'react';
import type { MarginProps, PaddingProps } from '@repo/core';
import { spacingVar } from './cssVars';

export type { MarginProps, PaddingProps };

export function resolveMargin(p: MarginProps): CSSProperties {
	const top = p.marginTop ?? p.marginY ?? p.margin;
	const bottom = p.marginBottom ?? p.marginY ?? p.margin;
	const left = p.marginLeft ?? p.marginX ?? p.margin;
	const right = p.marginRight ?? p.marginX ?? p.margin;
	const style: CSSProperties = {};
	if (top) style.marginTop = spacingVar(top);
	if (bottom) style.marginBottom = spacingVar(bottom);
	if (left) style.marginLeft = spacingVar(left);
	if (right) style.marginRight = spacingVar(right);
	return style;
}

export function resolvePadding(p: PaddingProps): CSSProperties {
	const top = p.paddingTop ?? p.paddingY ?? p.padding;
	const bottom = p.paddingBottom ?? p.paddingY ?? p.padding;
	const left = p.paddingLeft ?? p.paddingX ?? p.padding;
	const right = p.paddingRight ?? p.paddingX ?? p.padding;
	const style: CSSProperties = {};
	if (top) style.paddingTop = spacingVar(top);
	if (bottom) style.paddingBottom = spacingVar(bottom);
	if (left) style.paddingLeft = spacingVar(left);
	if (right) style.paddingRight = spacingVar(right);
	return style;
}
