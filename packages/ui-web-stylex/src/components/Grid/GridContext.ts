import { createContext, useContext } from 'react';
import type { BreakpointKey } from './Grid.types';

export type GridContextValue = {
	activeBp: BreakpointKey;
	columns: number;
};

export const GridContext = createContext<GridContextValue>({
	activeBp: 'desktop',
	columns: 12,
});

export function useGridContext() {
	return useContext(GridContext);
}
