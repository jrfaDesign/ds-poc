import { useState, useCallback } from 'react';
import { Typography } from '../Typography/Typography';
import type { CheckboxProps } from './Checkbox.types';

const FOCUS_RING = 'ring-2 ring-text-brand-tertiary-alt';

const bgClasses = {
	default: 'bg-selectioncontrol-bg',
	checked: 'bg-selectioncontrol-bg-checked',
	hovered: 'bg-selectioncontrol-bg-hover',
	disabled: 'bg-selectioncontrol-bg-disabled',
};

const borderClasses = {
	default: 'border-selectioncontrol-border',
	checked: 'border-selectioncontrol-border-checked',
	hovered: 'border-selectioncontrol-border-hover',
	disabled: 'border-selectioncontrol-border-disabled',
};

export function Checkbox({
	checked: controlled,
	defaultChecked = false,
	onChange,
	disabled = false,
	label,
	id,
}: CheckboxProps) {
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

	const bgColor = disabled
		? bgClasses.disabled
		: isChecked
			? bgClasses.checked
			: hovered
				? bgClasses.hovered
				: bgClasses.default;

	const borderColor = disabled
		? borderClasses.disabled
		: isChecked
			? borderClasses.checked
			: hovered
				? borderClasses.hovered
				: borderClasses.default;

	const indicatorClasses = [
		'w-[18px] h-[18px] shrink-0 flex items-center justify-center',
		'border-2 border-solid rounded-input transition-[background-color,border-color] duration-150',
		bgColor,
		borderColor,
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
				type="checkbox"
				id={id}
				checked={isChecked}
				onChange={handleChange}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				disabled={disabled}
				className="sr-only"
			/>
			<span className={[indicatorClasses, focused ? FOCUS_RING : ''].filter(Boolean).join(' ')}>
				{isChecked && (
					<svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 text-selectioncontrol-on-checked">
						<path
							d="M10 3L4.5 8.5L2 6"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				)}
			</span>
			{label && (
				<Typography
					role="label"
					className={disabled ? 'text-selectioncontrol-on-disabled' : undefined}
				>
					{label}
				</Typography>
			)}
		</label>
	);
}
