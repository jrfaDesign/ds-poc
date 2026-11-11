type ChipRowProps = {
	options: readonly string[];
	value: string;
	onSelect: (value: string) => void;
};

/** Row of selectable chips (style preset, fonts, …). */
export function ChipRow({ options, value, onSelect }: ChipRowProps) {
	return (
		<div className="flex flex-wrap gap-xs">
			{options.map((option) => (
				<button
					key={option}
					type="button"
					onClick={() => onSelect(option)}
					className={`px-xs py-xxs rounded-md border text-sm cursor-pointer ${
						value === option ? 'border-brand' : 'border-secondary'
					}`}
				>
					{option}
				</button>
			))}
		</div>
	);
}
