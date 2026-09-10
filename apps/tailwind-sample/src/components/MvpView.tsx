import { useState, useCallback } from 'react';
import { Container, Grid, PageSection } from '@repo/ui-web-tailwind';
import { AppShell } from './AppShell';
import { SectionHeader } from './SectionHeader';
import { FiltersPanel } from './FiltersPanel';
import { FilterBar } from './FilterBar';
import { SalesGrid } from './SalesGrid';
import { mockSales } from '../data/mockSales';
import { initialFilters } from '../data/mockFilters';
import type { FilterSectionData } from '../data/mockFilters';

export function MvpView() {
	const [filters, setFilters] = useState<FilterSectionData[]>(initialFilters);

	const handleSectionToggle = useCallback((sectionId: string, optionId: string) => {
		setFilters((prev) =>
			prev.map((section) => {
				if (section.id !== sectionId || section.type !== 'multiSelect') return section;
				return {
					...section,
					options: section.options.map((opt) =>
						opt.id === optionId ? { ...opt, checked: !opt.checked } : opt
					),
				};
			})
		);
	}, []);

	const handleClearAll = useCallback(() => {
		setFilters((prev) =>
			prev.map((section) => ({
				...section,
				options: section.options.map((opt) => ({ ...opt, checked: false })),
			}))
		);
	}, []);

	const handleApply = useCallback(() => {
		// Mock apply
	}, []);

	return (
		<PageSection>
			{/* <FilterBar sections={filters} onSectionToggle={handleSectionToggle} /> */}

			<Grid columns={{ mobile: 1, tablet: 6, desktop: 12, ultra: 12, wide: 12 }}>
				<Grid.Column span={{ mobile: 12, tablet: 3, desktop: 3, ultra: 3, wide: 3 }}>
					<FiltersPanel
						sections={filters}
						onSectionToggle={handleSectionToggle}
						onClearAll={handleClearAll}
						onApply={handleApply}
					/>
				</Grid.Column>

				<Grid.Column span={{ mobile: 12, tablet: 3, desktop: 9, ultra: 9, wide: 9 }}>
					<SectionHeader title="Sales" subtitle={`${mockSales.length} results`} />
					<SalesGrid sales={mockSales} />
				</Grid.Column>
			</Grid>
		</PageSection>
	);
}
