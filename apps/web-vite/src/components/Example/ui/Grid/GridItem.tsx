import { useContext } from 'react';
import { GridContext } from './GridContext';
import type { GridItemProps, BreakpointKey } from './Grid.types';

const DEFAULT_SPAN: Record<BreakpointKey, number> = {
	mobile: 4,
	tablet: 4,
	desktop: 4,
	wide: 4,
	ultra: 4,
};

const BP_ORDER: BreakpointKey[] = ['mobile', 'tablet', 'desktop', 'wide', 'ultra'];

function resolveSpan(
	span: number | Partial<Record<BreakpointKey, number>> | undefined,
	activeBp: BreakpointKey
): number {
	if (span === undefined) return DEFAULT_SPAN[activeBp];
	if (typeof span === 'number') return span;

	const idx = BP_ORDER.indexOf(activeBp);
	const keys = BP_ORDER.slice(0, idx + 1);
	for (let i = keys.length - 1; i >= 0; i--) {
		const key = keys[i] as BreakpointKey;
		const val = (span as Record<string, number | undefined>)[key];
		if (val !== undefined) return val;
	}

	return 12;
}

export function GridItem({ children, span, style }: GridItemProps) {
	const { activeBp, columns } = useContext(GridContext);
	const resolvedSpan = resolveSpan(span, activeBp);
	const clampedSpan = Math.min(columns, resolvedSpan);

	return <div style={{ gridColumn: `span ${clampedSpan}`, minWidth: 0, ...style }}>{children}</div>;
}
