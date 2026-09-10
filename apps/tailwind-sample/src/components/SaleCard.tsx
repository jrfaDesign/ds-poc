import { Button, Card, Typography } from '@repo/ui-web-tailwind';
import type { Sale } from '../data/mockSales';

const accessConfig: Record<
	Sale['access'],
	{ label: string; dotClass: string; textClass: string; icon?: 'lock' | 'star' }
> = {
	exclusive: {
		label: 'Exclusive',
		dotClass: 'bg-amber-400',
		textClass: 'text-surface-brand-on',
		icon: 'star',
	},
	public: {
		label: 'Public',
		dotClass: 'bg-emerald-500',
		textClass: 'text-surface-brand-on',
	},
	membersOnly: {
		label: 'Members Only',
		dotClass: 'bg-neutral-700',
		textClass: 'text-surface-brand-on',
		icon: 'lock',
	},
};

const statusConfig: Record<Sale['status'], { label: string; bgClass: string; textClass: string }> =
	{
		live: { label: 'xBid Live', bgClass: 'bg-utility-success-500', textClass: 'text-white' },
		notStarted: {
			label: 'Open Auction Not Started',
			bgClass: 'bg-white',
			textClass: 'text-surface-brand-on',
		},
		membersOnly: {
			label: 'Members Only',
			bgClass: 'bg-white',
			textClass: 'text-surface-brand-on',
		},
		openAuction: {
			label: 'Fixed Price',
			bgClass: 'bg-white',
			textClass: 'text-surface-brand-on',
		},
	};

function LocationPinIcon() {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
			<circle cx="12" cy="10" r="3" />
		</svg>
	);
}

function CarIcon() {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
			<circle cx="7" cy="17" r="2" />
			<path d="M9 17h6" />
			<circle cx="17" cy="17" r="2" />
		</svg>
	);
}

function CountryFlag({ code }: { code: string }) {
	const flags: Record<string, string> = {
		PT: '🇵🇹',
		ES: '🇪🇸',
		DK: '🇩🇰',
		DE: '🇩🇪',
		FR: '🇫🇷',
		NL: '🇳🇱',
	};
	return <span className="text-sm">{flags[code] ?? '🏳️'}</span>;
}

function LockIcon() {
	return (
		<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
			<path d="M12 2C9.24 2 7 4.24 7 7v3H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-1V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v3H9V7c0-1.66 1.34-3 3-3z" />
		</svg>
	);
}

function StarIcon() {
	return (
		<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
			<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
		</svg>
	);
}

export function SaleCard({ sale }: { sale: Sale }) {
	const access = accessConfig[sale.access];
	const status = statusConfig[sale.status];

	return (
		<Card
			variant="raised"
			className="rounded-sale-card px-0 py-0 bg-components-sales-card h-full overflow-hidden"
			style={{ gap: 0 }}
		>
			{/* Image */}
			<div className="relative aspect-video w-full">
				<img
					src={sale.image.src}
					alt={sale.image.alt}
					className="w-full h-full object-cover rounded-t-sale-card"
					loading="lazy"
				/>
				{/* Overlay */}
				<div className="absolute inset-0 p-xl flex flex-col justify-between">
					<div className="flex items-start justify-start">
						{/* Status Indicator */}
						<span
							className={`inline-flex justify-center items-center px-md rounded-xs text-xs font-medium ${status.bgClass} ${status.textClass} text-[12px]`}
						>
							{status.label}
						</span>
					</div>
					<div className="flex justify-end">
						<div className="bg-white rounded-sm p-1 shadow-sm">
							<img src="/themeBrands/default.svg" alt="Brand" className="h-5 w-auto" />
						</div>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="p-xl flex flex-col gap-lg flex-1 bg-components-sales-card">
				{/* Row 1: Flag + Access Badge with colored dot */}
				<div className="flex items-center gap-xs">
					<CountryFlag code={sale.countryCode} />
					<span
						className={`inline-flex items-center gap-xxs text-xs font-medium ${access.textClass}`}
					>
						<span className={`w-2 h-2 rounded-full shrink-0 ${access.dotClass}`} />
						{access.icon === 'lock' && <LockIcon />}
						{access.icon === 'star' && <StarIcon />}
						{access.label}
					</span>
				</div>

				{/* Row 2: Title */}
				<Typography
					color="text-primary"
					size="2xl"
					weight="bold"
					className="leading-tigh line-clamp-1"
				>
					{sale.title}
				</Typography>

				{/* Row 3: Description */}
				<Typography role="p" color="text-tertiary" size="sm" className="line-clamp-2">
					{sale.description}
				</Typography>

				{/* Row 4: Link */}
				<Button variant="link" size="sm" className="w-fit pb-0">
					See full description
				</Button>

				{/* Row 5: Divider */}
				<div className="border-t border-utility-primary-200 mt-sm" />

				{/* Row 6: Starts / Ends */}
				<div className="flex items-center gap-sm text-xs">
					<span className="text-text-tertiary">
						{sale.startsAtLabel.split(': ')[0]}:{' '}
						<span className="text-text-primary font-medium">
							{sale.startsAtLabel.split(': ').slice(1).join(': ')}
						</span>
					</span>
					<span className="text-text-tertiary">
						{sale.endsAtLabel.split(': ')[0]}:{' '}
						<span className="text-text-primary font-medium">
							{sale.endsAtLabel.split(': ').slice(1).join(': ')}
						</span>
					</span>
				</div>

				{/* Row 7: Divider */}
				<div className="border-t border-utility-primary-200" />

				{/* Row 8: Location + Lots */}
				<div className="flex items-center gap-xs">
					<span className="inline-flex items-center gap-xxs px-md py-xxs rounded-full bg-utility-neutral-200 text-text-primary text-xs font-bold">
						<LocationPinIcon />
						{sale.location}
					</span>
					<span className="inline-flex items-center gap-xxs px-md py-xxs rounded-full bg-utility-neutral-200 text-text-primary text-xs font-bold">
						<CarIcon />
						{sale.lotsCount} Lots
					</span>
				</div>
			</div>
		</Card>
	);
}
