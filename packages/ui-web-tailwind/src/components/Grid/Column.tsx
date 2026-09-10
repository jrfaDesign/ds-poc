import { createElement } from 'react';
import type { CSSProperties } from 'react';
import type { ColumnProps } from './Grid.types';
import { resolveResponsive } from '../shared/responsive';

/**
 * `<Grid.Column>` - a child cell of a `<Grid>`.
 *
 * Spans a number of the parent grid's columns. Responsive: pass a single
 * number (applies at all breakpoints) or a per-breakpoint map. The column count
 * and gutter come from the parent `<Grid>` / theme grid config; you only set
 * the span. Width is auto-calculated as `span / parentColumns × 100%`.
 *
 * Renders as a `div` by default with the `.ds-col` class; the static grid
 * stylesheet resolves `--ds-colspan-{bp}` at each breakpoint via media queries
 * (no JS, no flash).
 */
export function Column({ children, span, as: Tag = 'div', className, style }: ColumnProps) {
	const spanVars = resolveResponsive('--ds-colspan', span, (v) => String(v));

	return createElement(
		Tag,
		{
			className: ['ds-col', className].filter(Boolean).join(' ') || undefined,
			style: { ...spanVars, ...style } as CSSProperties,
		},
		children
	);
}
