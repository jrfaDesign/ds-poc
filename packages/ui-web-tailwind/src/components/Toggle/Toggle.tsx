import { useState, useCallback } from 'react';
import { Typography } from '../Typography/Typography';
import type { ToggleProps } from './Toggle.types';

const FOCUS_RING = 'ring-2 ring-text-brand-tertiary-alt';

const trackBgClasses = {
	default: 'bg-toggle-track-bg',
	checked: 'bg-toggle-track-bg-checked',
	checkedHovered: 'bg-toggle-track-bg-checked-hover',
	hovered: 'bg-toggle-bg-hover',
	disabled: 'bg-toggle-track-bg-disabled',
};

const thumbBgClasses = {
	default: 'bg-toggle-thumb-color',
	checked: 'bg-toggle-thumb-color-checked',
	disabled: 'bg-toggle-thumb-disabled',
};

export function Toggle({
	checked: controlled,
	defaultChecked = false,
	onChange,
	disabled = false,
	label,
	id,
}: ToggleProps) {
	const [uncontrolled, setUncontrolled] = useState(defaultChecked);
	const [hovered, setHovered] = useState(false);
	const [focused, setFocused] = useState(false);
	const isChecked = controlled ?? uncontrolled;

	const handleChange = useCallback(() => {
		if (disabled) return;
		const next = !isChecked;
		setUncontrolled(next);
		onChange?.(next);
	}, [isChecked, disabled, onChange]);

	const trackBg = disabled
		? trackBgClasses.disabled
		: isChecked
			? hovered
				? trackBgClasses.checkedHovered
				: trackBgClasses.checked
			: hovered
				? trackBgClasses.hovered
				: trackBgClasses.default;

	const thumbBg = disabled
		? thumbBgClasses.disabled
		: isChecked
			? thumbBgClasses.checked
			: thumbBgClasses.default;

	const trackClasses = [
		'relative inline-flex w-[44px] h-[24px] shrink-0',
		'rounded-full border border-solid transition-[background-color,border-color] duration-200',
		trackBg,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<label
			htmlFor={id}
			className="flex items-center gap-xs select-none cursor-pointer"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<input
				id={id}
				type="checkbox"
				checked={isChecked}
				onChange={handleChange}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				disabled={disabled}
				className="sr-only"
			/>
			<span
				className={[trackClasses, focused ? FOCUS_RING : '', disabled ? 'cursor-not-allowed' : '']
					.filter(Boolean)
					.join(' ')}
			>
				<span
					className={[
						'pointer-events-none absolute top-[2px] left-[2px] w-[18px] h-[18px] rounded-full',
						'shadow-sm transition-[transform,background-color] duration-200',
						thumbBg,
						isChecked ? 'translate-x-[20px]' : 'translate-x-0',
					]
						.filter(Boolean)
						.join(' ')}
				/>
			</span>
			{label && (
				<Typography role="label" className={disabled ? 'text-toggle-thumb-disabled' : undefined}>
					{label}
				</Typography>
			)}
		</label>
	);
}
