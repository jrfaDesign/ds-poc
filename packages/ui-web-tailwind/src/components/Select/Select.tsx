import { useState, useRef, useEffect, useCallback, Children, isValidElement } from 'react';
import type React from 'react';
import { Typography } from '../Typography/Typography';
import type { SelectProps, SelectItemProps } from './Select.types';

const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
	sm: 'text-xs py-[2px] ps-sm pe-sm min-h-[30px]',
	md: 'text-sm py-xs ps-3xl pe-3xl min-h-[40px]',
	lg: 'text-md py-sm ps-3xl pe-3xl min-h-[50px]',
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

function ChevronIcon({ open }: { open: boolean }) {
	return (
		<svg
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
			style={{
				width: 16,
				height: 16,
				flexShrink: 0,
				transition: 'transform 150ms',
				transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
			}}
		>
			<path
				fillRule="evenodd"
				d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
				clipRule="evenodd"
			/>
		</svg>
	);
}

// SelectItem is only a marker — its props are read by SelectRoot
function SelectItem(_props: SelectItemProps) {
	return null;
}

function SelectRoot({
	label,
	value: controlledValue,
	defaultValue = '',
	onChange,
	id,
	children,
	size = 'md',
	surface = 'alt',
	disabled = false,
}: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
	const [hoveredIdx, setHoveredIdx] = useState(-1);
	const [focused, setFocused] = useState(false);
	const [hovered, setHovered] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	const selectedValue = controlledValue ?? uncontrolledValue;

	const items: { value: string; label: string; disabled: boolean }[] = [];
	Children.forEach(children, (child) => {
		if (isValidElement(child) && child.type === SelectItem) {
			const props = child.props as SelectItemProps;
			items.push({
				value: props.value,
				label: typeof props.children === 'string' ? props.children : props.value,
				disabled: props.disabled ?? false,
			});
		}
	});

	const selectedItem = items.find((i) => i.value === selectedValue);

	const selectItem = useCallback(
		(itemValue: string) => {
			setUncontrolledValue(itemValue);
			setIsOpen(false);
			setHoveredIdx(-1);
			onChange?.({ target: { value: itemValue } });
			triggerRef.current?.focus();
		},
		[onChange]
	);

	const handleTriggerKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (disabled) return;
			switch (e.key) {
				case 'Enter':
				case ' ':
					e.preventDefault();
					setIsOpen((p) => !p);
					break;
				case 'ArrowDown':
					e.preventDefault();
					if (!isOpen) {
						setIsOpen(true);
					} else {
						const ci = items.findIndex((i) => i.value === selectedValue);
						const next = items.find((i, idx) => idx > ci && !i.disabled);
						if (next) selectItem(next.value);
					}
					break;
				case 'ArrowUp':
					e.preventDefault();
					if (!isOpen) {
						setIsOpen(true);
					} else {
						const ci = items.findIndex((i) => i.value === selectedValue);
						for (let idx = ci - 1; idx >= 0; idx--) {
							const it = items[idx];
							if (it && !it.disabled) {
								selectItem(it.value);
								break;
							}
						}
					}
					break;
				case 'Escape':
					setIsOpen(false);
					break;
			}
		},
		[disabled, isOpen, items, selectedValue, selectItem]
	);

	useEffect(() => {
		if (!isOpen) return;
		const handler = (e: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setIsOpen(false);
		};
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, [isOpen]);

	const triggerClasses = [
		'w-full flex items-center justify-center gap-2 cursor-pointer rounded-inputBorderRadii border border-solid outline-none',
		'transition-[border-color,box-shadow] duration-150',
		disabled ? 'opacity-50 cursor-not-allowed' : '',
		focused
			? 'border-surface-brand-border ring-focus'
			: hovered && !disabled
				? 'border-surface-raised-border'
				: surfaceClasses[surface],
		sizeClasses[size],
	]
		.filter(Boolean)
		.join(' ');

	const labelClass = surfaceLabelColor[surface];

	return (
		<div className="flex flex-col gap-xxs">
			{label && (
				<Typography role="label" className={labelClass}>
					{label}
				</Typography>
			)}
			<div ref={wrapperRef} className="relative">
				<button
					ref={triggerRef}
					type="button"
					id={id}
					role="combobox"
					aria-expanded={isOpen}
					aria-haspopup="listbox"
					disabled={disabled}
					className={triggerClasses}
					onClick={() => !disabled && setIsOpen((p) => !p)}
					onKeyDown={handleTriggerKeyDown}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
				>
					<span className="flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
						{selectedItem?.label ?? <span className="opacity-50">Select...</span>}
					</span>
					<ChevronIcon open={isOpen} />
				</button>

				{isOpen && (
					<div
						role="listbox"
						className="absolute z-50 left-0 right-0 mt-1 rounded-inputBorderRadii border border-solid bg-surface-alt-bg shadow-md max-h-60 overflow-y-auto py-xs"
					>
						{items.map((item, idx) => {
							const isSelected = item.value === selectedValue;
							const isHovered = idx === hoveredIdx;
							return (
								<div
									key={item.value}
									role="option"
									aria-selected={isSelected}
									className={[
										'py-xs ps-sm pe-sm text-sm cursor-pointer transition-colors',
										isSelected
											? 'bg-surface-brand-bg text-surface-brand-on font-semibold'
											: isHovered
												? 'bg-surface-raised-bg'
												: '',
										item.disabled ? 'opacity-50 cursor-not-allowed' : '',
									]
										.filter(Boolean)
										.join(' ')}
									onClick={() => !item.disabled && selectItem(item.value)}
									onMouseEnter={() => !item.disabled && setHoveredIdx(idx)}
									onMouseLeave={() => setHoveredIdx(-1)}
									onMouseDown={(e) => e.preventDefault()}
								>
									{item.label}
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export const Select = Object.assign(SelectRoot, { Item: SelectItem });
