import type { CSSProperties } from 'react';
import type { ButtonProps, ButtonVariant } from './Button.types';
import { resolveMargin } from '../shared/spacing';

const FOCUS =
	'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-brand-tertiary-alt';

const variantClass: Record<ButtonVariant, string> = {
	primary:
		'border border-action-primary-border bg-action-primary-bg text-action-primary-on hover:bg-action-primary-bg-hover',
	secondary:
		'border border-action-secondary-border bg-action-secondary-bg text-action-secondary-on hover:bg-action-secondary-bg-hover',
	ghost: 'border border-transparent text-action-ghost-on hover:bg-action-ghost-bg-hover',
	link: 'text-action-link-on hover:text-action-link-on-hover',
	tertiary:
		'border border-action-tertiary-border bg-action-tertiary-bg text-action-tertiary-on hover:bg-action-tertiary-bg-hover',
};

const disabledClass: Record<ButtonVariant, string> = {
	primary:
		'border border-action-primary-border-disabled bg-action-primary-bg-disabled text-action-primary-on-disabled',
	secondary:
		'border border-action-secondary-border-disabled bg-action-secondary-bg-disabled text-action-secondary-on-disabled',
	ghost: 'border border-transparent text-action-ghost-on-disabled',
	link: 'text-action-link-on-disabled',
	tertiary:
		'border border-action-tertiary-border bg-action-tertiary-bg-disabled text-action-tertiary-on-disabled',
};

const sizeClasses: Record<string, string> = {
	sm: 'text-xs px-lg',
	md: 'text-sm px-3xl  ',
	lg: 'text-md px-3xl  ',
};

const sizeInlineStyles: Record<string, CSSProperties> = {
	sm: { paddingTop: '2px', paddingBottom: '2px', minHeight: 30 },
	md: { paddingTop: 'var(--ds-spacing-xs)', paddingBottom: 'var(--ds-spacing-xs)', minHeight: 40 },
	lg: { paddingTop: 'var(--ds-spacing-sm)', paddingBottom: 'var(--ds-spacing-sm)', minHeight: 50 },
};

export function Button({
	variant = 'primary',
	disabled = false,
	invert = false,
	size = 'md',
	type = 'button',
	children,
	onClick,
	className,
	style,
	...margin
}: ButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			style={{
				...sizeInlineStyles[size],
				...resolveMargin(margin),
				...style,
			}}
			className={[
				'inline-flex items-center justify-center leading-none font-medium cursor-pointer transition-colors rounded-buttonBorderRadii',
				variant === 'link' && 'px-0 py-0',
				invert && 'ds-invert',
				sizeClasses[size],
				disabled
					? `${disabledClass[variant]} opacity-80 cursor-not-allowed`
					: `${variantClass[variant]} ${FOCUS}`,
				className,
			]
				.filter(Boolean)
				.join(' ')}
		>
			{children}
		</button>
	);
}
