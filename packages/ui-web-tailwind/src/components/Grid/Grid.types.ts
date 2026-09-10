import type { CSSProperties, ReactNode } from 'react';
import type { SpacingToken, LayoutToken, BreakpointToken } from '@repo/foundations';
import type { Responsive } from '../shared/responsive';

/**
 * Built-in auto-layout presets. Each divides the grid into equal columns so
 * children auto-flow without explicit spans.
 *
 * - `'12'` → 12 equal columns (default desktop grid)
 * - `'6'`  → 6 equal columns
 * - `'5'`  → 5 equal columns
 * - `'3'`  → 3 equal columns
 * - `'2'`  → 2 equal columns
 */
export type AutoLayout = '12' | '6' | '5' | '3' | '2';

export type GridProps = {
	children?: ReactNode;
	/** Number of grid columns. Single value applies to all breakpoints; pass a per-breakpoint map for responsive column counts. Falls back to the theme grid config when omitted. */
	columns?: Responsive<number>;
	/** Auto-layout preset - divides the grid into equal columns. Overrides `columns` when set. */
	autoLayout?: Responsive<AutoLayout>;
	/** Inter-column gap (column-gap) as a layout token. Falls back to the active breakpoint's grid `gutter`. */
	gutter?: Responsive<LayoutToken>;
	/** Inter-row gap (row-gap) as a spacing token. Defaults to `gutter` when omitted. */
	gap?: Responsive<SpacingToken>;
	/** Render as a different element (default `div`). */
	as?: 'div' | 'section' | 'main' | 'article' | 'header' | 'footer' | 'aside' | 'nav';
	className?: string;
	style?: CSSProperties;
	id?: string;
};

export type ColumnProps = {
	children?: ReactNode;
	/** How many grid columns this cell spans (1–12). Single value or per-breakpoint. */
	span?: Responsive<number>;
	/** Render as a different element (default `div`). */
	as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer' | 'aside' | 'nav' | 'span';
	className?: string;
	style?: CSSProperties;
};

/** Re-exported so consumers don't need to import from foundations directly. */
export type { BreakpointToken };
