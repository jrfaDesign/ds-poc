import { useState } from 'react';
import { Typography } from '@repo/ui-web-tailwind';
import { themeColorPresets, hexColorRegex } from '@repo/foundations';

type ColorFieldProps = {
	label: string;
	value: string;
	onChange: (hex: string) => void;
};

/** Preset swatches + native color picker + hex input for a 600-step theme color. */
export function ColorField({ label, value, onChange }: ColorFieldProps) {
	const [draft, setDraft] = useState(value);
	const [prevValue, setPrevValue] = useState(value);
	// Sync the draft when the value changes externally (preset click, reset, tier switch).
	if (value !== prevValue) {
		setPrevValue(value);
		setDraft(value);
	}
	const invalid = draft.length > 0 && !hexColorRegex.test(draft);

	return (
		<div className="flex flex-col gap-xxs">
			<Typography role="caption" color="text-secondary">
				{label} (600)
			</Typography>
			<div className="flex flex-wrap gap-xs">
				{themeColorPresets.map((preset) => {
					const selected = value.toLowerCase() === preset.hex.toLowerCase();
					return (
						<button
							key={preset.hex}
							type="button"
							onClick={() => {
								setDraft(preset.hex);
								onChange(preset.hex);
							}}
							className={`flex items-center gap-xxs rounded-md border px-xs py-xxs cursor-pointer ${
								selected ? 'border-brand' : 'border-secondary'
							}`}
						>
							<span
								className="w-3 h-3 rounded-full border border-secondary shrink-0"
								style={{ backgroundColor: preset.hex }}
							/>
							<Typography role="caption" color={selected ? 'text-primary' : 'text-secondary'}>
								{preset.label}
							</Typography>
						</button>
					);
				})}
			</div>
			<div className="flex items-center gap-xs">
				<input
					type="color"
					aria-label={`${label} color picker`}
					value={hexColorRegex.test(value) ? value : '#000000'}
					onChange={(e) => {
						setDraft(e.target.value);
						onChange(e.target.value);
					}}
					className="w-8 h-8 p-0 border border-secondary rounded-md cursor-pointer"
				/>
				<input
					type="text"
					aria-label={`${label} hex`}
					value={draft}
					placeholder="#7f56d9"
					onChange={(e) => {
						const next = e.target.value;
						setDraft(next);
						if (hexColorRegex.test(next)) onChange(next);
					}}
					className={`w-28 px-xs py-xxs border rounded-md text-sm font-mono bg-primary text-primary ${
						invalid ? 'border-error' : 'border-secondary'
					}`}
				/>
			</div>
			{invalid && (
				<Typography role="caption" color="text-error-primary">
					Invalid hex: expected #RRGGBB
				</Typography>
			)}
		</div>
	);
}
