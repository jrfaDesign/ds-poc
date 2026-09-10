export type SaleAccess = 'public' | 'membersOnly' | 'exclusive';
export type SalePricing = 'fixedPrice' | 'xBid';
export type SaleStatus = 'live' | 'notStarted' | 'openAuction';

export type Sale = {
	id: string;
	title: string;
	description: string;
	access: SaleAccess;
	pricing: SalePricing;
	status: SaleStatus;
	countryCode: string;
	location: string;
	lotsCount: number;
	startsAtLabel: string;
	endsAtLabel: string;
};

const descriptions = [
	'Premium BYD electric vehicles available at competitive auction prices. Includes warranty coverage and service history documentation for all models listed.',
	'Fleet disposal sale featuring late-model BYD vehicles with low mileage. Ideal for dealers and fleet operators seeking quality pre-owned inventory.',
	'Members-only exclusive auction showcasing limited-edition BYD models. Premium selection with guaranteed authenticity and certified pre-owned status.',
	'Open auction event with no reserve prices on select BYD models. First-come-first-served basis with full vehicle inspection reports available.',
	'Fixed-price clearance event on remaining 2024 BYD inventory. Transparent pricing with no hidden fees and immediate delivery available.',
	'Corporate fleet return vehicles with comprehensive service records. All models have been professionally inspected and refurbished to manufacturer standards.',
	"Seasonal sales event featuring BYD's latest electric SUV lineup. Special financing options available for qualified buyers and fleet customers.",
	'International auction featuring BYD vehicles exported from European markets. Complete customs documentation and shipping arrangements available.',
	'Lease return vehicles in excellent condition. All models include remaining manufacturer warranty and certified pre-owned benefits.',
	'Bank repo vehicles available at below-market pricing. Clean titles with complete vehicle history reports provided for every listing.',
	'End-of-model-year clearance on remaining BYD inventory. Significant discounts on fully loaded models with premium features and packages.',
	'Government fleet disposal auction featuring well-maintained BYD sedans and SUVs. Low mileage and regular maintenance history guaranteed.',
	'Certified pre-owned BYD vehicles with extended warranty coverage. Each vehicle undergoes a 120-point inspection before listing.',
	'Emergency liquidation sale with immediate availability. All vehicles priced to sell with no negotiation required.',
];

const locations = [
	'BYD Mem. Martins',
	'BYD Porto',
	'BYD Lisboa',
	'BYD Coimbra',
	'BYD Faro',
	'BYD Braga',
];

const countries = ['PT', 'ES', 'DK', 'DE', 'FR', 'NL'];

const titles = [
	'BYD Lisbon leasing',
	'BYD Porto fleet sale',
	'BYD Sealion auction',
	'BYD Atto 3 clearance',
	'BYD Dolphin bulk sale',
	'BYD Han premium auction',
	'BYD Seal fixed price',
	'BYD Tang SUV sale',
	'BYD Qin Plus auction',
	'BYD e2 fleet disposal',
	'BYD M6 clearance',
	'BYD Song Plus sale',
	'BYD Yuan Plus auction',
	'BYD Blade Truck sale',
];

const statuses: SaleStatus[] = [
	'live',
	'notStarted',
	'openAuction',
	'live',
	'notStarted',
	'live',
	'openAuction',
	'live',
	'notStarted',
	'live',
	'live',
	'notStarted',
	'openAuction',
	'live',
];

const accesses: SaleAccess[] = [
	'public',
	'membersOnly',
	'exclusive',
	'public',
	'public',
	'membersOnly',
	'public',
	'exclusive',
	'public',
	'public',
	'membersOnly',
	'public',
	'exclusive',
	'public',
];

const pricings: SalePricing[] = [
	'xBid',
	'fixedPrice',
	'xBid',
	'fixedPrice',
	'xBid',
	'fixedPrice',
	'xBid',
	'fixedPrice',
	'xBid',
	'fixedPrice',
	'xBid',
	'fixedPrice',
	'xBid',
	'fixedPrice',
];

function randomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const mockSales: Sale[] = Array.from({ length: 14 }, (_, i) => ({
	id: `sale-${i + 1}`,
	title: titles[i] ?? `BYD Vehicle Lot ${i + 1}`,
	description: descriptions[i] ?? descriptions[0],
	access: accesses[i] ?? 'public',
	pricing: pricings[i] ?? 'xBid',
	status: statuses[i] ?? 'live',
	countryCode: countries[i % countries.length],
	location: locations[i % locations.length],
	lotsCount: randomInt(50, 800),
	startsAtLabel: `Starts: ${String(11 + (i % 10)).padStart(2, '0')}/08 19:00`,
	endsAtLabel: `Ends: ${String(13 + (i % 10)).padStart(2, '0')}/08 06:00`,
}));
