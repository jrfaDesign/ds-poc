import type { ReactNode, CSSProperties } from 'react';

/**
 * Named viewport thresholds used by the responsive grid.
 * Ordered from smallest to largest.
 */
export type BreakpointKey = 'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultra';

export type GridProps = {
	children: ReactNode;
	/**
	 * Override the auto-resolved gap between grid items.
	 * Value is a spacing token name (e.g. `'sm'`, `'md'`, `'lg'`).
	 * @default resolved from `grid[currentBreakpoint].gutter`
	 */
	gap?: string;
	/**
	 * Override the auto-resolved number of grid columns.
	 * @default resolved from `grid[currentBreakpoint].columns`
	 */
	columns?: number;
	/**
	 * Override the auto-resolved maximum width of the grid container.
	 * Accepts a raw CSS value (e.g. `'960px'`, `'100%'`).
	 * @default resolved from `grid[currentBreakpoint].maxWidth`
	 */
	maxWidth?: string;
	/**
	 * Override the auto-resolved inline padding of the grid container.
	 * Value is a spacing token name (e.g. `'sm'`, `'md'`, `'lg'`).
	 * @default resolved from `grid[currentBreakpoint].margin`
	 */
	margin?: string;
	style?: CSSProperties;
};

export type GridItemProps = {
	children: ReactNode;
	/**
	 * Number of grid columns this item should span.
	 *
	 * - `number` (e.g. `6`): same span at all breakpoints.
	 * - `object` (e.g. `{ mobile: 12, tablet: 6, desktop: 4 }`): span per
	 *   breakpoint. Falls back to the nearest smaller defined breakpoint if
	 *   the current one is not specified.
	 * - not set: defaults to `4` at every breakpoint, which gives:
	 *   mobile (4‑col grid) → 1 per row · tablet (8‑col grid) → 2 per row
	 *   desktop+ (12‑col grid) → 3 per row
	 *
	 * @default { mobile: 4, tablet: 4, desktop: 4, wide: 4, ultra: 4 }
	 */
	span?: number | Partial<Record<BreakpointKey, number>>;
	style?: CSSProperties;
};
