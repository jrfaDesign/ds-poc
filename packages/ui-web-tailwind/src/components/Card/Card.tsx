import type { CardProps, CardVariant } from './Card.types';
import type { CSSProperties } from 'react';
import { resolveMargin } from '../shared/spacing';
import { resolveBorder } from '../shared/border';
import { shadowVar, spacingVar } from '../shared/cssVars';

const variantClass: Record<CardVariant, string> = {
	surface: 'bg-surface-base-bg border-surface-base-border',
	raised: 'border-surface-raised-border shadow-md',
	alt: 'bg-surface-alt-bg border-surface-alt-border',
	brand: 'bg-surface-brand-bg border-surface-brand-border',
};

export function Card({
	variant = 'surface',
	invert = false,
	border,
	shadow,
	padding,
	children,
	className,
	style,
	ref,
	...margin
}: CardProps) {
	const cardStyle: CSSProperties = {
		...(shadow ? { boxShadow: shadowVar(shadow) } : undefined),
		...(padding ? { padding: spacingVar(padding) } : undefined),
		...(border ? resolveBorder(border) : undefined),
		...resolveMargin(margin),
		...style,
	};

	return (
		<div
			className={[
				'border rounded-cardBorderRadii flex flex-col gap-sm',
				!(shadow || padding) && 'p-md',
				variantClass[variant],
				invert && 'ds-invert',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			style={{ ...cardStyle, ...style }}
			ref={ref}
		>
			{children}
		</div>
	);
}
