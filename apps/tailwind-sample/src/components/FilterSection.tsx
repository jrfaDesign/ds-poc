import { useState } from 'react';
import { Badge, Typography } from '@repo/ui-web-tailwind';

import { GoX } from 'react-icons/go';

type FilterOption = {
	id: string;
	label: string;
	checked: boolean;
};

type FilterSectionProps = {
	label: string;
	id: string;
	options: FilterOption[];
	type: 'multiSelect' | 'displayOnly';
	onToggle?: (optionId: string) => void;
};

function ChevronIcon({ open }: { open: boolean }) {
	return (
		<svg
			viewBox="0 0 20 20"
			fill="currentColor"
			className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
		>
			<path
				fillRule="evenodd"
				d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
				clipRule="evenodd"
			/>
		</svg>
	);
}

function formatSelectedSummary(selected: FilterOption[]): string {
	if (selected.length === 0) return 'All';
	if (selected.length <= 2) return selected.map((o) => o.label).join(', ');
	return `${selected[0].label}, ${selected[1].label} +${selected.length - 2}`;
}

export function FilterSection({ label, options, type, onToggle }: FilterSectionProps) {
	const [isExpanded, setExpanded] = useState(false);
	const selectedOptions = options.filter((o) => o.checked);

	return (
		<div className="border-b border-surface-base-border last:border-b-0">
			{/* Accordion Header */}
			<button
				onClick={() => setExpanded(!isExpanded)}
				className="w-full flex items-center justify-between py-md px-md cursor-pointer hover:bg-surface-alt-bg/50 transition-colors"
			>
				<div className="flex flex-col items-start gap-xxs min-w-0">
					<Typography role="label" color="text-primary">
						{label}
					</Typography>
					{/* Collapsed: show single summary chip */}
					{!isExpanded && (
						<Badge
							label={formatSelectedSummary(selectedOptions)}
							surface="brand"
							icon={<GoX />}
							reverse
						/>
					)}
				</div>
				<ChevronIcon open={isExpanded} />
			</button>

			{/* Accordion Content */}
			<div
				className="overflow-hidden transition-[grid-template-rows] duration-500 ease-in-out"
				style={{
					display: 'grid',
					gridTemplateRows: isExpanded ? '1fr' : '0fr',
				}}
			>
				<div className="min-h-0">
					<div className="px-md pb-md flex flex-wrap gap-xs">
						{type === 'multiSelect'
							? options.map((opt) => (
									<Badge
										key={opt.id}
										label={opt.label}
										variant={opt.checked ? 'brand' : 'neutral'}
										icon={<GoX />}
										onClick={() => onToggle?.(opt.id)}
									/>
								))
							: options.map((opt) => <Badge key={opt.id} label={opt.label} variant="neutral" />)}
					</div>
				</div>
			</div>
		</div>
	);
}
