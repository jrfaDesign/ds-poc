import type { FilterSectionData } from '../../../../data/mockFilters';

export type FilterBarProps = {
	sections: FilterSectionData[];
	onSectionToggle: (sectionId: string, optionId: string) => void;
};
