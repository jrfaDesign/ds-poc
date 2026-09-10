export type FilterOption = {
	id: string;
	label: string;
	checked: boolean;
};

export type FilterSectionData = {
	id: string;
	label: string;
	type: 'multiSelect' | 'displayOnly';
	options: FilterOption[];
};

export const countryOptions: FilterOption[] = [
	{ id: 'pt', label: 'Portugal', checked: true },
	{ id: 'es', label: 'Spain', checked: true },
	{ id: 'dk', label: 'Denmark', checked: true },
	{ id: 'de', label: 'Germany', checked: false },
	{ id: 'fr', label: 'France', checked: false },
	{ id: 'nl', label: 'Netherlands', checked: false },
];

export const locationOptions: FilterOption[] = [
	{ id: 'mem-martins', label: 'BYD Mem. Martins', checked: true },
	{ id: 'porto', label: 'BYD Porto', checked: false },
	{ id: 'lisboa', label: 'BYD Lisboa', checked: true },
	{ id: 'coimbra', label: 'BYD Coimbra', checked: false },
	{ id: 'faro', label: 'BYD Faro', checked: false },
	{ id: 'braga', label: 'BYD Braga', checked: false },
];

export const formatOptions: FilterOption[] = [
	{ id: 'fixed-price', label: 'Fixed Price', checked: false },
	{ id: 'xbid', label: 'xBid', checked: false },
	{ id: 'open-auction', label: 'Open Auction', checked: false },
];

export const profileOptions: FilterOption[] = [
	{ id: 'dealer', label: 'Dealer', checked: false },
	{ id: 'private', label: 'Private', checked: false },
	{ id: 'fleet', label: 'Fleet', checked: false },
];

export const initialFilters: FilterSectionData[] = [
	{ id: 'country', label: 'Country', type: 'multiSelect', options: countryOptions },
	{ id: 'location', label: 'Location', type: 'multiSelect', options: locationOptions },
	{ id: 'format', label: 'Format', type: 'displayOnly', options: formatOptions },
	{ id: 'profile', label: 'Profile', type: 'displayOnly', options: profileOptions },
];
