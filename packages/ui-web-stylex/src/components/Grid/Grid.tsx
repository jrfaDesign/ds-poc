import { useState, useEffect, useMemo } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Grid.styles';
import { GridItem } from './GridItem';
import { GridContext } from './GridContext';
import type { GridProps, BreakpointKey } from './Grid.types';
import { defaultTheme } from '@repo/themes';

function Grid({ children, gap, columns, maxWidth, margin: marginProp, style }: GridProps) {
	const [activeBp, setActiveBp] = useState<BreakpointKey>(() => {
		if (typeof window === 'undefined') return 'desktop';
		const bps = defaultTheme.breakpoints;
		if (window.matchMedia(`(max-width: ${bps.tablet - 1}px)`).matches) return 'mobile';
		if (
			window.matchMedia(`(min-width: ${bps.tablet}px) and (max-width: ${bps.desktop - 1}px)`)
				.matches
		)
			return 'tablet';
		if (
			window.matchMedia(`(min-width: ${bps.desktop}px) and (max-width: ${bps.wide - 1}px)`).matches
		)
			return 'desktop';
		if (window.matchMedia(`(min-width: ${bps.wide}px) and (max-width: ${bps.ultra - 1}px)`).matches)
			return 'wide';
		return 'ultra';
	});

	useEffect(() => {
		const bps = defaultTheme.breakpoints;

		const mqMobile = window.matchMedia(`(max-width: ${bps.tablet - 1}px)`);
		const mqTablet = window.matchMedia(
			`(min-width: ${bps.tablet}px) and (max-width: ${bps.desktop - 1}px)`
		);
		const mqDesktop = window.matchMedia(
			`(min-width: ${bps.desktop}px) and (max-width: ${bps.wide - 1}px)`
		);
		const mqWide = window.matchMedia(
			`(min-width: ${bps.wide}px) and (max-width: ${bps.ultra - 1}px)`
		);
		const mqUltra = window.matchMedia(`(min-width: ${bps.ultra}px)`);

		const listener = () => {
			if (mqUltra.matches) setActiveBp('ultra');
			else if (mqWide.matches) setActiveBp('wide');
			else if (mqDesktop.matches) setActiveBp('desktop');
			else if (mqTablet.matches) setActiveBp('tablet');
			else setActiveBp('mobile');
		};

		listener();

		mqMobile.addEventListener('change', listener);
		mqTablet.addEventListener('change', listener);
		mqDesktop.addEventListener('change', listener);
		mqWide.addEventListener('change', listener);
		mqUltra.addEventListener('change', listener);

		return () => {
			mqMobile.removeEventListener('change', listener);
			mqTablet.removeEventListener('change', listener);
			mqDesktop.removeEventListener('change', listener);
			mqWide.removeEventListener('change', listener);
			mqUltra.removeEventListener('change', listener);
		};
	}, []);

	const gridConfig = useMemo(() => {
		const cfg = defaultTheme.grid[activeBp];
		return {
			columns: columns ?? cfg.columns,
			gap: gap ?? cfg.gutter,
			maxWidth: maxWidth ?? (typeof cfg.maxWidth === 'number' ? `${cfg.maxWidth}px` : cfg.maxWidth),
			margin: marginProp ?? cfg.margin,
		};
	}, [activeBp, columns, gap, maxWidth, marginProp]);

	return (
		<GridContext.Provider value={{ activeBp, columns: gridConfig.columns }}>
			<div
				{...stylex.props(styles.grid)}
				style={{
					gridTemplateColumns: `repeat(${gridConfig.columns}, 1fr)`,
					gap: `var(--spacing-${gridConfig.gap})`,
					maxWidth: gridConfig.maxWidth,
					paddingInline: `var(--spacing-${gridConfig.margin})`,
					...style,
				}}
			>
				{children}
			</div>
		</GridContext.Provider>
	);
}

Grid.Item = GridItem;

export { Grid };
export type { GridProps } from './Grid.types';
