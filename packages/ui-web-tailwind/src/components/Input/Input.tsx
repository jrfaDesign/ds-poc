import { useState } from 'react';
import { Typography } from '../Typography/Typography';
import type { InputProps } from './Input.types';

const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
	sm: 'text-xs min-h-[30px]',
	md: 'text-sm min-h-[40px]',
	lg: 'text-md min-h-[50px]',
};

const sizeInlineStyles: Record<'sm' | 'md' | 'lg', React.CSSProperties> = {
	sm: {
		paddingTop: '2px',
		paddingBottom: '2px',
		paddingLeft: 'var(--ds-spacing-sm)',
		paddingRight: 'var(--ds-spacing-sm)',
	},
	md: {
		paddingTop: 'var(--ds-spacing-xs)',
		paddingBottom: 'var(--ds-spacing-xs)',
		paddingLeft: 'var(--ds-spacing-3xl)',
		paddingRight: 'var(--ds-spacing-3xl)',
	},
	lg: {
		paddingTop: 'var(--ds-spacing-sm)',
		paddingBottom: 'var(--ds-spacing-sm)',
		paddingLeft: 'var(--ds-spacing-3xl)',
		paddingRight: 'var(--ds-spacing-3xl)',
	},
};

const surfaceClasses = {
	alt: 'bg-surface-alt-bg text-surface-alt-on border-surface-alt-border',
	base: 'bg-surface-base-bg text-surface-base-on border-surface-base-border',
	raised: 'bg-surface-raised-bg text-surface-raised-on border-surface-raised-border',
	sunken: 'bg-surface-sunken-bg text-surface-sunken-on border-surface-sunken-border',
	brand: 'bg-surface-brand-bg text-surface-brand-on border-surface-brand-border',
	inverse: 'bg-surface-inverse-bg text-surface-inverse-on border-surface-inverse-border',
};

const feedbackClasses = {
	error: 'bg-feedback-error-bg text-feedback-error-on border-feedback-error-border',
	success: 'bg-feedback-success-bg text-feedback-success-on border-feedback-success-border',
};

const surfaceLabelColor = {
	alt: 'text-surface-alt-on',
	base: 'text-surface-base-on',
	raised: 'text-surface-raised-on',
	sunken: 'text-surface-sunken-on',
	brand: 'text-surface-brand-on',
	inverse: 'text-surface-inverse-on',
};

const feedbackLabelColor = {
	error: 'text-feedback-error-on',
	success: 'text-feedback-success-on',
};

export function Input({
	label,
	placeholder,
	type = 'text',
	size = 'md',
	surface = 'alt',
	status = 'default',
	value,
	defaultValue,
	onChange,
	id,
	disabled,
	className,
	style,
}: InputProps) {
	const [focused, setFocused] = useState(false);
	const [hovered, setHovered] = useState(false);

	const baseSurface = disabled ? 'sunken' : surface;
	const isFeedback = status === 'error' || status === 'success';

	const fieldClasses = [
		'w-full rounded-inputBorderRadii border border-solid outline-none cursor-text',
		'transition-[border-color,box-shadow] duration-150',
		'placeholder:text-placeholder',
		disabled ? 'opacity-50 cursor-not-allowed' : '',
		isFeedback
			? feedbackClasses[status]
			: focused
				? 'border-surface-brand-border ring-focus'
				: hovered && !disabled
					? 'border-surface-raised-border'
					: surfaceClasses[baseSurface],
		sizeClasses[size],
		className, // user overrides
	]
		.filter(Boolean)
		.join(' ');

	const labelClass = isFeedback ? feedbackLabelColor[status] : surfaceLabelColor[baseSurface];

	return (
		<div className="flex flex-col gap-xxs">
			{label && (
				<Typography role="label" className={labelClass}>
					{label}
				</Typography>
			)}
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				defaultValue={defaultValue}
				onChange={onChange}
				id={id}
				disabled={disabled}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				style={{ ...sizeInlineStyles[size], ...style }} // user can override with !px-0 etc.
				className={fieldClasses}
			/>
		</div>
	);
}
