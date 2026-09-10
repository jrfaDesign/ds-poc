import { createElement } from 'react';
import type { CSSProperties } from 'react';
import type { GridProps, AutoLayout } from './Grid.types';
import { resolveResponsive, tokenVar } from '../shared/responsive';
import { Column } from './Column';

/**
 * Convert an `AutoLayout` preset to its column count.
 */
const autoLayoutCols: Record<AutoLayout, number> = {
	'12': 12,
	'6': 6,
	'5': 5,
	'3': 3,
	'2': 2,
};

/**
 * `<Grid>` - a flexible, responsive layout primitive.
 *
 * Reads grid tokens (columns, gutter, margin) per breakpoint from the active
 * theme via runtime CSS variables written by `applyTheme`. Responsiveness is
 * 100% CSS (static media queries in `tailwind-theme.css`) - no `matchMedia`,
 * no React state, no SSR flash.
 *
 * All size props accept either a single token (applies at every breakpoint) or
 * a per-breakpoint map. Raw pixel values are rejected by the type system; every
 * dimension flows through design tokens so the grid stays theme-driven.
 *
 * @example
 * <Grid columns={{ mobile: 4, tablet: 6, desktop: 12 }} gutter="md">
 *   <Grid.Column span={{ mobile: 4, desktop: 6 }}>…</Grid.Column>
 * </Grid>
 *
 * @example
 * <Grid autoLayout="3">  // 3 equal columns, responsive
 *   <Grid.Column>A</Grid.Column>
 *   <Grid.Column>B</Grid.Column>
 *   <Grid.Column>C</Grid.Column>
 * </Grid>
 */
export function Grid({
	children,
	columns,
	autoLayout,
	gutter,
	gap,
	as: Tag = 'div',
	className,
	style,
	id,
}: GridProps) {
	// autoLayout overrides columns when set
	const colSource = autoLayout
		? resolveResponsive('--ds-cols', autoLayout, (v) => String(autoLayoutCols[v]))
		: resolveResponsive('--ds-cols', columns, (v) => String(v));

	const gutterVars = resolveResponsive('--ds-colgap', gutter, (v) => tokenVar('ds-layout', v));
	const gapVars = resolveResponsive('--ds-rowgap', gap, (v) => tokenVar('ds-spacing', v));

	return createElement(
		Tag,
		{
			id,
			className: ['ds-grid', className].filter(Boolean).join(' ') || undefined,
			style: {
				...colSource,
				...gutterVars,
				...gapVars,
				...style,
			} as CSSProperties,
		},
		children
	);
}

Grid.Column = Column;
