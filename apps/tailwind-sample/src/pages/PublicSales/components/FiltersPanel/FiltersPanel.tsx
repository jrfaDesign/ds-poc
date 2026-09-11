import { useEffect, useState, useRef } from 'react';
import { Button, Card } from '@repo/ui-web-tailwind';

import { FilterSection } from '../FilterSection/FilterSection';
import type { FiltersPanelProps } from './FiltersPanel.types';

function TrashIcon() {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polyline points="3 6 5 6 21 6" />
			<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
		</svg>
	);
}

export function FiltersPanel({
	sections,
	onSectionToggle,
	onClearAll,
	onApply,
}: FiltersPanelProps) {
	const { ref, size } = useCardButtonSize<HTMLDivElement>();

	return (
		<Card
			variant="raised"
			className="sticky top-23 self-start overflow-hidden w-full gap-sm bg-salesCardBg rounded-saleCardRadii"
			ref={ref}
		>
			<div className="flex flex-col">
				{sections.map((section) => (
					<FilterSection
						key={section.id}
						id={section.id}
						label={section.label}
						options={section.options}
						type={section.type}
						onToggle={(optId) => onSectionToggle(section.id, optId)}
					/>
				))}
			</div>

			<div className="flex items-center gap-sm px-md pb-md pt-sm">
				<Button variant="secondary" size={size} onClick={onClearAll} className="flex-1">
					<TrashIcon /> Clear All
				</Button>
				<Button variant="primary" size={size} onClick={onApply} className="flex-1">
					Apply Filter
				</Button>
			</div>
		</Card>
	);
}

function useCardButtonSize<T extends HTMLElement>() {
	const ref = useRef<T | null>(null);
	const [size, setSize] = useState<'sm' | 'md'>('md');

	useEffect(() => {
		if (!ref.current) return;

		const observer = new ResizeObserver((entries) => {
			const width = entries[0].contentRect.width;
			setSize(width < 300 ? 'sm' : 'md');
		});

		observer.observe(ref.current);

		return () => observer.disconnect();
	}, []);

	return { ref, size };
}
