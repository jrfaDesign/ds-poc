import { createElement } from 'react';
import type { CSSProperties } from 'react';
import type {
	TypographyProps,
	TypographyRole,
	TypographyColor,
	TypographyTag,
} from './Typography.types';
import { resolveMargin } from '../shared/spacing';
import { colorTokenVar } from '../shared/cssVars';

const roleTag: Record<TypographyRole, TypographyTag> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	p: 'p',
	caption: 'span',
	label: 'span',
	overline: 'span',
};

// Role → type-scale preset, owned by the web library (the h1/h2 hierarchy is a
// web concept). Line height / letter spacing ride on the `text-*` size tuples;
// static string literals so Tailwind's scanner sees every class.
const roleClass: Record<TypographyRole, string> = {
	h1: 'text-6xl font-bold font-heading text-primary',
	h2: 'text-5xl font-bold font-heading text-primary',
	h3: 'text-4xl font-semibold font-heading text-primary',
	h4: 'text-3xl font-semibold font-heading text-primary',
	p: 'text-md font-regular text-primary',
	caption: 'text-xs font-medium text-primary',
	label: 'text-sm font-medium text-primary',
	overline: 'text-xs font-semibold text-primary uppercase',
};

function resolveColor(color: TypographyColor): string {
	return color === 'inherit' ? 'inherit' : colorTokenVar(color);
}

export function Typography({
	role = 'p',
	color,
	weight,
	size,
	lineHeight,
	letterSpacing,
	as,
	invert = false,
	textEllipsis = false,
	children,
	className,
	style,
	...margin
}: TypographyProps) {
	const Tag = as ?? roleTag[role];
	const overrideStyle: CSSProperties = { ...resolveMargin(margin) };
	if (color) overrideStyle.color = resolveColor(color);
	if (weight) overrideStyle.fontWeight = weight;

	// Overrides resolve to CSS vars as inline styles so they always win over
	// the role's base classes (a second `text-*` class would not).
	if (size) {
		overrideStyle.fontSize = `var(--typography-fontSize-${size})`;
		overrideStyle.lineHeight = `var(--typography-fontSize-${size}-lineHeight)`;
		overrideStyle.letterSpacing = `var(--typography-fontSize-${size}-letterSpacing, normal)`;
	}
	if (lineHeight) overrideStyle.lineHeight = `var(--leading-${lineHeight})`;
	if (letterSpacing) overrideStyle.letterSpacing = `var(--tracking-${letterSpacing})`;

	if (textEllipsis) {
		overrideStyle.overflow = 'hidden';
		overrideStyle.textOverflow = 'ellipsis';
		overrideStyle.whiteSpace = 'nowrap';
	}

	const ariaProps: Record<string, string | number> = {};
	if (role === 'h1' || role === 'h2' || role === 'h3' || role === 'h4') {
		ariaProps['role'] = 'heading';
		ariaProps['aria-level'] = parseInt(role.charAt(1));
	}

	return createElement(
		Tag,
		{
			...ariaProps,
			className: [roleClass[role], invert && 'ds-invert', className].filter(Boolean).join(' '),
			style: { ...overrideStyle, ...style },
		},
		children
	);
}
