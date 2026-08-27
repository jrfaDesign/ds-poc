import type { ReactNode, CSSProperties } from 'react';
import type { BreakpointKey } from '@repo/globals';

export type { BreakpointKey };

export type GridProps = {
	children: ReactNode;
	gap?: string;
	columns?: number;
	maxWidth?: string;
	margin?: string;
	style?: CSSProperties;
};

export type GridItemProps = {
	children: ReactNode;
	span?: number | Partial<Record<BreakpointKey, number>>;
	style?: CSSProperties;
};
