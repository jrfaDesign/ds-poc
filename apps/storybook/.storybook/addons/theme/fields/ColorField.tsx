// The manager bundler compiles JSX with the classic runtime (React.createElement),
// so React must be in scope here, unlike the preview, which uses the automatic runtime.
import React, { useState } from 'react';
import { useTheme } from 'storybook/theming';
import { hexColorRegex, themeColorPresets } from '@repo/foundations';
import { createColorFieldStyles } from '../styles';

type ColorFieldProps = {
	label: string;
	value: string;
	onChange: (hex: string) => void;
};

/** One 600-step color field: preset swatches + a native color picker + a
 * validated hex input (same interaction as the sample apps' config editors). */
export function ColorField({ label, value, onChange }: ColorFieldProps) {
	const sbTheme = useTheme();
	const s = createColorFieldStyles(sbTheme);

	const [draft, setDraft] = useState(value);
	const [prevValue, setPrevValue] = useState(value);
	// Sync the draft when the value changes externally (preset click, reset).
	if (value !== prevValue) {
		setPrevValue(value);
		setDraft(value);
	}
	const invalid = draft.length > 0 && !hexColorRegex.test(draft);

	const commit = (hex: string) => {
		setDraft(hex);
		if (hexColorRegex.test(hex)) onChange(hex);
	};

	return (
		<div>
			<span style={s.label}>{label}</span>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
				{themeColorPresets.map((preset) => {
					const selected = value.toLowerCase() === preset.hex.toLowerCase();
					return (
						<button
							key={preset.hex}
							type="button"
							onClick={() => commit(preset.hex)}
							style={selected ? s.chipSelected : s.chip}
						>
							<span style={{ ...s.swatch, backgroundColor: preset.hex }} />
							{preset.label}
						</button>
					);
				})}
			</div>
			<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
				<input
					type="color"
					aria-label={`${label} color picker`}
					value={hexColorRegex.test(value) ? value : '#000000'}
					onChange={(event) => commit(event.target.value)}
					style={s.picker}
				/>
				<input
					type="text"
					aria-label={`${label} hex`}
					value={draft}
					placeholder="#7f56d9"
					onChange={(event) => commit(event.target.value)}
					style={{
						...s.hexInput,
						borderColor: invalid ? sbTheme.fgColor.negative : undefined,
					}}
				/>
				{invalid && <span style={s.error}>Invalid hex: expected #RRGGBB</span>}
			</div>
		</div>
	);
}
