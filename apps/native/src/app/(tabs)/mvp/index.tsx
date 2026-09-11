import { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme, Typography, Box, PageSection } from '@repo/ui-react-native';
import { ThemedScreen } from '@/components/ThemedScreen';
import { BrandLogo } from '@/components/mvp/BrandLogo';
import { FilterPanel } from '@/components/mvp/FilterPanel';
import { SaleCard } from '@/components/mvp/SaleCard';
import { mockSales } from '@/data/mockSales';
import { initialFilters } from '@/data/mockFilters';
import type { FilterSectionData } from '@/data/mockFilters';

export default function MVPScreen() {
	const { theme } = useTheme();
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
		<ThemedScreen contentContainerStyle={styles.content}>
			<PageSection padding="lg">
				<Box gap="xl">
					{/* Header with brand logo */}
					<Box gap="sm">
						<Box flexDirection="row" alignItems="center" justifyContent="space-between">
							<Box gap="xs">
								<Typography role="h4" color="text-primary">
									Sales
								</Typography>
								<Typography role="caption" color="text-secondary">
									{mockSales.length} results
								</Typography>
							</Box>
							<BrandLogo style={{ height: 24 }} />
						</Box>
					</Box>

					{/* Filters */}
					<FilterPanel
						sections={filters}
						onSectionToggle={handleSectionToggle}
						onClearAll={handleClearAll}
						onApply={handleApply}
					/>

					{/* Sales Grid */}
					<Box gap="4xl">
						{mockSales.map((sale) => (
							<SaleCard key={sale.id} sale={sale} />
						))}
					</Box>
				</Box>
			</PageSection>
		</ThemedScreen>
	);
}

const styles = StyleSheet.create({
	content: {
		minHeight: '100%',
	},
});
