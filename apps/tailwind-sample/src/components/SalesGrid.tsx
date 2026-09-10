import { useState, useCallback } from 'react';
import { Button, Grid } from '@repo/ui-web-tailwind';
import { SaleCard } from './SaleCard';
import type { Sale } from '../data/mockSales';

type SalesGridProps = {
	sales: Sale[];
};

export function SalesGrid({ sales }: SalesGridProps) {
	const [visibleCount, setVisibleCount] = useState(9);

	const visibleSales = sales.slice(0, visibleCount);
	const hasMore = visibleCount < sales.length;

	const loadMore = useCallback(() => {
		setVisibleCount((prev) => Math.min(prev + 6, sales.length));
	}, [sales.length]);

	return (
		<>
			<Grid
				columns={{ mobile: 1, tablet: 1, desktop: 4, ultra: 3, wide: 3 }}
				gap="xl"
				gutter={'md'}
			>
				{visibleSales.map((sale) => (
					<Grid.Column key={sale.id} span={{ mobile: 1, tablet: 1, desktop: 2, ultra: 1, wide: 1 }}>
						<SaleCard sale={sale} />
					</Grid.Column>
				))}
			</Grid>

			{/* Load More */}
			{hasMore && (
				<div className="flex justify-center mt-lg">
					<Button variant="tertiary" className="min-w-79" onClick={loadMore}>
						Load More Sales
					</Button>
				</div>
			)}
		</>
	);
}
