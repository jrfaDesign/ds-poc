import type { ReactNode, CSSProperties } from 'react';

export type BadgeVariant =
	'brand' | 'success' | 'success_inverted' | 'warning' | 'error' | 'info' | 'neutral';

export type BadgeSurface = 'brand' | 'alt' | 'raised' | 'inverse';

export type BadgeSize = 'sm' | 'md';

export type BadgeRadii = 'full' | 'xs' | 'sm' | 'md' | 'lg';

export type BadgeProps = {
	/** Badge label text. */
	label: string;
	/** Optional icon element rendered before the label. */
	icon?: ReactNode;
	/** Semantic variant for color resolution (solid colors via color tokens). */
	variant?: BadgeVariant;
	/** Surface variant for contract-based resolution (Tailwind classes). Mutually exclusive with variant. */
	surface?: BadgeSurface;
	/** Size preset: sm or md. */
	size?: BadgeSize;
	/** Border radius override. */
	radii?: BadgeRadii;
	/** Force light or dark mode colors. When omitted, resolves based on theme. */
	mode?: 'light' | 'dark';
	/** Reverse flex direction (icon after label). */
	reverse?: boolean;
	/** Additional CSS class names. */
	className?: string;
	/** Inline style overrides. */
	style?: CSSProperties;
	/** Click event handler for the badge when rendered as a button. */
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};
