import { createContext } from 'react';
import type { BreakpointKey } from './Grid.types';

type GridContextValue = {
	activeBp: BreakpointKey;
	columns: number;
};

export const GridContext = createContext<GridContextValue>({
	activeBp: 'desktop',
	columns: 12,
});
