// The manager bundler compiles JSX with the classic runtime (React.createElement),
// so React must be in scope here, unlike the preview, which uses the automatic runtime.
import React from 'react';
import { useTheme } from 'storybook/theming';
import { createChipRowStyles } from '../styles';

type ChipRowProps = {
	options: readonly string[];
	value: string;
	onSelect: (value: string) => void;
};

/** Row of selectable chips (style preset, fonts, …). */
export function ChipRow({ options, value, onSelect }: ChipRowProps) {
	const s = createChipRowStyles(useTheme());

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
			{options.map((option) => (
				<button
					key={option}
					type="button"
					onClick={() => onSelect(option)}
					style={value === option ? s.chipSelected : s.chip}
				>
					{option}
				</button>
			))}
		</div>
	);
}
