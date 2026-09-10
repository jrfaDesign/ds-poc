import { useState } from 'react';
import type React from 'react';
import { Typography } from '../Typography/Typography';
import type { TextareaProps } from './Textarea.types';

const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
	sm: 'text-xs py-xs ps-sm pe-sm min-h-[60px]',
	md: 'text-sm py-sm ps-md pe-md min-h-[80px]',
	lg: 'text-md py-md ps-lg pe-lg min-h-[100px]',
};

const surfaceClasses = {
	alt: 'bg-surface-alt-bg text-surface-alt-on border-surface-alt-border',
	base: 'bg-surface-base-bg text-surface-base-on border-surface-base-border',
	raised: 'bg-surface-raised-bg text-surface-raised-on border-surface-raised-border',
	sunken: 'bg-surface-sunken-bg text-surface-sunken-on border-surface-sunken-border',
	brand: 'bg-surface-brand-bg text-surface-brand-on border-surface-brand-border',
	inverse: 'bg-surface-inverse-bg text-surface-inverse-on border-surface-inverse-border',
};

const surfaceLabelColor = {
	alt: 'text-surface-alt-on',
	base: 'text-surface-base-on',
	raised: 'text-surface-raised-on',
	sunken: 'text-surface-sunken-on',
	brand: 'text-surface-brand-on',
	inverse: 'text-surface-inverse-on',
};

export function Textarea({
	label,
	placeholder,
	rows = 3,
	size = 'md',
	surface = 'alt',
	value,
	defaultValue,
	onChange,
	id,
	disabled,
}: TextareaProps) {
	const [focused, setFocused] = useState(false);
	const [hovered, setHovered] = useState(false);

	const baseSurface = disabled ? 'sunken' : surface;

	const fieldClasses = [
		'w-full rounded-input border border-solid outline-none cursor-text resize-y',
		'transition-[border-color,box-shadow] duration-150',
		'placeholder:text-placeholder',
		disabled ? 'opacity-50 cursor-not-allowed' : '',
		focused
			? 'border-surface-brand-border ring-focus'
			: hovered && !disabled
				? 'border-surface-raised-border'
				: surfaceClasses[baseSurface],
		sizeClasses[size],
	]
		.filter(Boolean)
		.join(' ');

	const labelClass = surfaceLabelColor[baseSurface];

	return (
		<div className="flex flex-col gap-xxs">
			{label && (
				<Typography role="label" className={labelClass}>
					{label}
				</Typography>
			)}
			<textarea
				className={fieldClasses}
				placeholder={placeholder}
				rows={rows}
				value={value}
				defaultValue={defaultValue}
				onChange={onChange}
				id={id}
				disabled={disabled}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			/>
		</div>
	);
}
