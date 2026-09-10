import { createElement } from 'react';
import type { CSSProperties } from 'react';
import type {
	TypographyProps,
	TypographyRole,
	TypographyColor,
	TypographyTag,
} from './Typography.types';
import type { FontSizeToken } from '@repo/foundations';
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

// Static class map - Tailwind's scanner needs complete string literals to
// detect and emit the `type-*` utilities. A template literal like
// `type-${role}` would be invisible to the scanner.
const roleClass: Record<TypographyRole, string> = {
	h1: 'type-h1',
	h2: 'type-h2',
	h3: 'type-h3',
	h4: 'type-h4',
	p: 'type-p',
	caption: 'type-caption',
	label: 'type-label',
	overline: 'type-overline',
};

// Static class map for font size overrides - same scanner requirement.
const sizeClass: Record<FontSizeToken, string> = {
	xxs: 'text-xxs',
	xs: 'text-xs',
	sm: 'text-sm',
	md: 'text-md',
	lg: 'text-lg',
	xl: 'text-xl',
	'2xl': 'text-2xl',
	'3xl': 'text-3xl',
	'4xl': 'text-4xl',
	'5xl': 'text-5xl',
	'6xl': 'text-6xl',
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

	const overrideClasses: string[] = [];
	if (size) overrideClasses.push(sizeClass[size]);
	if (lineHeight) overrideClasses.push(`leading-${lineHeight}`);
	if (letterSpacing) overrideClasses.push(`tracking-${letterSpacing}`);

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
			className: [roleClass[role], ...overrideClasses, invert && 'ds-invert', className]
				.filter(Boolean)
				.join(' '),
			style: { ...overrideStyle, ...style },
		},
		children
	);
}
