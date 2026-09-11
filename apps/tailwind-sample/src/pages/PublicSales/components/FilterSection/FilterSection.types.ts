export type FilterOption = {
	id: string;
	label: string;
	checked: boolean;
};

export type FilterSectionProps = {
	label: string;
	id: string;
	options: FilterOption[];
	type: 'multiSelect' | 'displayOnly';
	onToggle?: (optionId: string) => void;
};
