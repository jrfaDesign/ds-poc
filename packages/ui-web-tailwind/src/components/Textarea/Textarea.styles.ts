export const textareaStyles = {
	field: 'flex flex-col gap-[var(--ds-spacing-xxs)]',
	base: [
		'w-full',
		'rounded-[var(--components-input-border-radii)]',
		'border border-inputfield-border',
		'bg-inputfield-bg',
		'text-inputfield-on',
		'placeholder:text-inputfield-placeholder',
		'font-[family-name:var(--typography-fontFamily)]',
		'outline-none',
		'resize-vertical',
		'[-webkit-text-fill-color:currentColor]',
		'[color-scheme:light_dark]',
		'transition-[border-color,box-shadow] duration-150',
		'hover:border-inputfield-border-hover',
		'focus:border-inputfield-border-focus focus:shadow-[var(--focusring-focus-ring)]',
		'focus-visible:border-inputfield-border-focus focus-visible:shadow-[var(--focusring-focus-ring)]',
		'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-inputfield-bg-disabled disabled:text-inputfield-on-disabled disabled:border-inputfield-border-disabled',
	].join(' '),
} as const;

export const textareaSizeStyles = {
	sm: 'text-[var(--typography-fontSize-xs)] py-[2px] px-[var(--ds-spacing-sm)] min-h-[60px]',
	md: 'text-[var(--typography-fontSize-sm)] py-[var(--ds-spacing-xs)] px-[var(--ds-spacing-md)] min-h-[80px]',
	lg: 'text-[var(--typography-fontSize-md)] py-[var(--ds-spacing-sm)] px-[var(--ds-spacing-lg)] min-h-[100px]',
} as const;
