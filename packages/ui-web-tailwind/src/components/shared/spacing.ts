import type { CSSProperties } from 'react';
import type { SpacingToken } from '@repo/foundations';
import { spacingVar } from './cssVars';

export type MarginProps = {
	/** Margin on all sides (spacing token). */
	margin?: SpacingToken;
	/** Horizontal margin — left and right (spacing token). */
	marginX?: SpacingToken;
	/** Vertical margin — top and bottom (spacing token). */
	marginY?: SpacingToken;
	/** Top margin (spacing token). Overrides `marginY`. */
	marginTop?: SpacingToken;
	/** Bottom margin (spacing token). Overrides `marginY`. */
	marginBottom?: SpacingToken;
	/** Left margin (spacing token). Overrides `marginX`. */
	marginLeft?: SpacingToken;
	/** Right margin (spacing token). Overrides `marginX`. */
	marginRight?: SpacingToken;
};

export type PaddingProps = {
	/** Padding on all sides (spacing token). */
	padding?: SpacingToken;
	/** Horizontal padding — left and right (spacing token). */
	paddingX?: SpacingToken;
	/** Vertical padding — top and bottom (spacing token). */
	paddingY?: SpacingToken;
	/** Top padding (spacing token). Overrides `paddingY`. */
	paddingTop?: SpacingToken;
	/** Bottom padding (spacing token). Overrides `paddingY`. */
	paddingBottom?: SpacingToken;
	/** Left padding (spacing token). Overrides `paddingX`. */
	paddingLeft?: SpacingToken;
	/** Right padding (spacing token). Overrides `paddingX`. */
	paddingRight?: SpacingToken;
};

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
