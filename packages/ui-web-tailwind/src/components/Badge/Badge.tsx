import type { BadgeProps, BadgeVariant, BadgeSurface } from './Badge.types';
import { colorTokenVar } from '../shared/cssVars';
import type { ColorTokenName } from '@repo/foundations';

const variantTokens: Record<BadgeVariant, { bg: ColorTokenName; on: ColorTokenName }> = {
	brand: { bg: 'bg-brand-solid', on: 'text-white' },
	success: { bg: 'bg-success-solid', on: 'fg-success-secondary' },
	success_inverted: { bg: 'fg-success-primary', on: 'bg-success-primary' },
	warning: { bg: 'bg-warning-solid', on: 'fg-warning-secondary' },
	error: { bg: 'bg-error-solid', on: 'fg-error-secondary' },
	info: { bg: 'bg-info-solid', on: 'fg-info-secondary' },
	neutral: { bg: 'bg-quaternary', on: 'text-primary' },
};

const surfaceClasses: Record<BadgeSurface, { bg: string; on: string }> = {
	brand: { bg: 'bg-surface-brand-bg', on: 'text-surface-brand-on' },
	alt: { bg: 'bg-surface-alt-bg', on: 'text-surface-alt-on' },
	raised: { bg: 'bg-surface-raised-bg', on: 'text-surface-raised-on' },
	inverse: { bg: 'bg-surface-inverse-bg', on: 'text-surface-inverse-on' },
};

const sizeClasses = {
	sm: 'px-md py-[2px] text-xs gap-xxs',
	md: 'px-md py-xxs text-xs gap-xxs',
};

const radiiClasses = {
	full: 'rounded-full',
	xs: 'rounded-xs',
	sm: 'rounded-sm',
	md: 'rounded-md',
	lg: 'rounded-lg',
};

function forcedColorVar(token: ColorTokenName, mode: 'light' | 'dark'): string {
	return `var(--ct-${token}-${mode})`;
}

function forcedSurfaceVar(
	surface: BadgeSurface,
	prop: 'bg' | 'on',
	mode: 'light' | 'dark'
): string {
	const suffix = mode === 'dark' ? `-${mode}` : '';
	return `var(--surface-${surface}-${prop}${suffix})`;
}

export function Badge({
	label,
	icon,
	variant,
	surface,
	size = 'md',
	radii = 'full',
	mode,
	reverse,
	className,
	style,
	onClick,
}: BadgeProps) {
	let bgColor: string;
	let onColor: string;
	let resolvedClasses: string[] = [];

	if (surface) {
		const s = surfaceClasses[surface];
		if (mode) {
			bgColor = forcedSurfaceVar(surface, 'bg', mode);
			onColor = forcedSurfaceVar(surface, 'on', mode);
		} else {
			resolvedClasses = [s.bg, s.on];
			bgColor = '';
			onColor = '';
		}
	} else if (variant) {
		const tokens = variantTokens[variant];
		bgColor = mode ? forcedColorVar(tokens.bg, mode) : colorTokenVar(tokens.bg);
		onColor = mode ? forcedColorVar(tokens.on, mode) : colorTokenVar(tokens.on);
	} else {
		bgColor = '';
		onColor = '';
	}

	const hasInlineColors = bgColor || onColor;

	return (
		<span
			onClick={onClick}
			className={[
				'inline-flex items-center shrink-0 font-medium whitespace-nowrap',
				reverse ? 'flex-row-reverse' : 'flex-row',
				sizeClasses[size],
				radiiClasses[radii],
				onClick ? 'cursor-pointer' : '',
				...resolvedClasses,
				className,
			]
				.filter(Boolean)
				.join(' ')}
			style={
				hasInlineColors
					? { backgroundColor: bgColor || undefined, color: onColor || undefined, ...style }
					: style
			}
		>
			{icon && <span className="flex items-center">{icon}</span>}
			{label}
		</span>
	);
}
