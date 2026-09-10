import { useState } from 'react';
import type { FilterSectionData } from '../data/mockFilters';

type FilterBarProps = {
	sections: FilterSectionData[];
	onSectionToggle: (sectionId: string, optionId: string) => void;
};

export function FilterBar({ sections, onSectionToggle }: FilterBarProps) {
	const [expandedId, setExpandedId] = useState<string | null>(null);

	const multiSections = sections.filter((s) => s.type === 'multiSelect');
	const activeCount = multiSections.reduce(
		(acc, s) => acc + s.options.filter((o) => o.checked).length,
		0
	);

	return (
		<div className="md:hidden flex flex-col gap-xs px-md py-sm">
			{/* Summary chips */}
			<div className="flex items-center gap-xs overflow-x-auto">
				{multiSections.map((section) => {
					const checked = section.options.filter((o) => o.checked);
					if (checked.length === 0) return null;
					const isExpanded = expandedId === section.id;
					const summary =
						checked.length <= 2
							? checked.map((o) => o.label).join(', ')
							: `${checked[0].label}, ${checked[1].label} +${checked.length - 2}`;
					return (
						<button
							key={section.id}
							onClick={() => setExpandedId(isExpanded ? null : section.id)}
							className="inline-flex items-center gap-xxs px-sm py-xxs rounded-full text-xs font-medium bg-surface-brand-bg text-surface-brand-on whitespace-nowrap shrink-0 cursor-pointer"
						>
							{section.label}: {summary}
						</button>
					);
				})}
				{activeCount > 0 && (
					<span className="text-xs text-text-tertiary whitespace-nowrap shrink-0">
						{activeCount} filter{activeCount !== 1 ? 's' : ''} active
					</span>
				)}
			</div>

			{/* Expanded accordion content */}
			{expandedId && (
				<div className="flex flex-wrap gap-xs pt-xs">
					{multiSections
						.filter((s) => s.id === expandedId)
						.map((section) =>
							section.options.map((opt) => (
								<button
									key={opt.id}
									onClick={() => onSectionToggle(section.id, opt.id)}
									className={[
										'inline-flex items-center px-sm py-xxs rounded-full text-xs font-medium cursor-pointer transition-colors border',
										opt.checked
											? 'bg-surface-brand-bg text-surface-brand-on border-surface-brand-border'
											: 'bg-surface-alt-bg text-surface-alt-on border-surface-alt-border',
									].join(' ')}
								>
									{opt.label}
								</button>
							))
						)}
				</div>
			)}
		</div>
	);
}
