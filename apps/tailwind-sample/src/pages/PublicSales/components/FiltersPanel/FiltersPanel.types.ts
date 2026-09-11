export type FiltersPanelProps = {
	sections: FilterSectionData[];
	onSectionToggle: (sectionId: string, optionId: string) => void;
	onClearAll: () => void;
	onApply: () => void;
};

import type { FilterSectionData } from '../../../../data/mockFilters';
