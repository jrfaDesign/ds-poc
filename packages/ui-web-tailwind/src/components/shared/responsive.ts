import type { BreakpointToken } from '@repo/foundations';

/**
 * A value that can be set once for all breakpoints, or per breakpoint.
 *
 * - `Responsive<number>` = `12` (same at every breakpoint) or
 *   `{ mobile: 4, tablet: 6, desktop: 12 }` (override per breakpoint).
 *
 * Only the breakpoints you specify are overridden; the rest fall back to the
 * theme's grid config. Raw CSS values (px) are intentionally rejected - every
 * prop is a token so the grid stays theme-driven.
 */
export type Responsive<T> = T | Partial<Record<BreakpointToken, T>>;

/**
 * Resolve a `Responsive<T>` into per-breakpoint CSS custom properties.
 *
 * Returns an object like `{ '--ds-cols-tablet': '8' }` for each breakpoint the
 * caller explicitly set. Breakpoints not present in `value` are omitted so the
 * static media-query stylesheet falls back to the theme grid tokens.
 *
 * @param prefix  the CSS var stem, e.g. `--ds-cols`, `--ds-colspan`, `--ds-colgap`
 * @param value   the `Responsive<T>` prop
 * @param format  converts a resolved token/value to a CSS string (e.g. token -> `var(--ds-layout-sm)`)
 */
export function resolveResponsive<T>(
	prefix: string,
	value: Responsive<T> | undefined,
	format: (v: T) => string
): Record<string, string> {
	if (value === undefined) return {};
	const out: Record<string, string> = {};
	if (value === null || typeof value !== 'object') {
		// single value applies at every breakpoint
		const bpKeys = ['mobile', 'tablet', 'desktop', 'wide', 'ultra'] as const;
		for (const bp of bpKeys) {
			out[`${prefix}-${bp}`] = format(value as T);
		}
		return out;
	}
	(Object.entries(value) as [BreakpointToken, T][]).forEach(([bp, v]) => {
		if (v !== undefined) out[`${prefix}-${bp}`] = format(v);
	});
	return out;
}

/**
 * Resolve a single (non-responsive) spacing/layout token to its CSS var.
 * e.g. `('ds-layout', 'md')` -> `var(--ds-layout-md)`.
 */
export function tokenVar(namespace: string, token: string): string {
	return `var(--${namespace}-${token})`;
}
