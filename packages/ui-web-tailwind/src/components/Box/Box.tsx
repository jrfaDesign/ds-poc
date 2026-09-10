import { createElement } from 'react';
import type { BackgroundProp, BoxProps } from './Box.types';
import type { ColorTokenName } from '@repo/foundations';
import { resolveMargin, resolvePadding } from '../shared/spacing';
import { resolveBorder } from '../shared/border';
import { spacingVar, radiiVar, shadowVar, colorTokenVar } from '../shared/cssVars';

/**
 * Resolve a `BackgroundProp` to a CSS color value.
 *
 * - `"bg-primary"` → `var(--ct-bg-primary)`
 * - `"bg-secondary/60"` → `color-mix(in oklab, var(--ct-bg-secondary) 60%, transparent)`
 *
 * The `/N` suffix mirrors Tailwind v4's `/alpha` modifier syntax and emits the
 * same `color-mix()` call Tailwind generates internally. Works on `var()`
 * references at runtime, so no theme object is needed.
 */
function resolveBackground(bg: BackgroundProp): string {
	const slashIdx = bg.indexOf('/');
	if (slashIdx === -1) return colorTokenVar(bg as ColorTokenName);
	const token = bg.slice(0, slashIdx) as ColorTokenName;
	const pct = bg.slice(slashIdx + 1);
	return `color-mix(in oklab, ${colorTokenVar(token)} ${pct}%, transparent)`;
}

export function Box({
	as: Tag = 'div',
	children,
	gap,
	background,
	backdropBlur,
	borderRadius,
	shadow,
	border,
	invert,
	mode,
	display,
	flex,
	flexBasis,
	flexGrow,
	flexShrink,
	flexDirection,
	flexWrap,
	alignItems,
	alignContent,
	alignSelf,
	justifyContent,
	justifySelf,
	justifyItems,
	width,
	height,
	minWidth,
	maxWidth,
	minHeight,
	maxHeight,
	position,
	top,
	right,
	bottom,
	left,
	inset,
	overflow,
	overflowX,
	overflowY,
	className,
	style,
	title,
	...marginPadding
}: BoxProps) {
	const effectiveBg = background ?? (invert ? 'bg-primary' : undefined);

	const bgColor = effectiveBg && !mode ? resolveBackground(effectiveBg) : undefined;

	return createElement(
		Tag,
		{
			title,
			style: {
				...resolveMargin(marginPadding),
				...resolvePadding(marginPadding),
				gap: gap ? spacingVar(gap) : undefined,
				backgroundColor: bgColor,
				backdropFilter: backdropBlur ? 'blur(8px)' : undefined,
				WebkitBackdropFilter: backdropBlur ? 'blur(8px)' : undefined,
				borderRadius: borderRadius ? radiiVar(borderRadius) : undefined,
				boxShadow: shadow ? shadowVar(shadow) : undefined,
				...(border ? resolveBorder(border) : undefined),
				display,
				flex,
				flexBasis,
				flexGrow,
				flexShrink,
				flexDirection,
				flexWrap,
				alignItems,
				alignContent,
				alignSelf,
				justifyContent,
				justifySelf,
				justifyItems,
				width,
				height,
				minWidth,
				maxWidth,
				minHeight,
				maxHeight,
				position,
				top,
				right,
				bottom,
				left,
				inset,
				overflow,
				overflowX,
				overflowY,
				boxSizing: 'border-box',
				...style,
			},
			className:
				[
					mode === 'dark' && 'ds-force-dark',
					mode === 'light' && 'ds-force-light',
					!mode && invert && 'ds-invert',
					className,
				]
					.filter(Boolean)
					.join(' ') || undefined,
		},
		children
	);
}
