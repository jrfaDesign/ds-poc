import * as stylex from '@stylexjs/stylex';
import { roleStyles, colorStyles } from './Typography.styles';
import type { TypographyProps, TypographyRole } from './Typography.types';
export type { TypographyColor, TypographyRole, TypographyProps } from './Typography.types';

const tagMap: Record<TypographyRole, 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	p: 'p',
	caption: 'span',
	label: 'span',
	overline: 'span',
};

export function Typography({
	role = 'p',
	color,
	weight,
	size,
	lineHeight,
	letterSpacing,
	textEllipsis = false,
	children,
	...props
}: TypographyProps) {
	const Tag = tagMap[role];
	const ariaProps: Record<string, string | number> = {};
	if (role === 'h1' || role === 'h2' || role === 'h3' || role === 'h4') {
		ariaProps['role'] = 'heading';
		ariaProps['aria-level'] = parseInt(role.charAt(1));
	}

	const overrideStyle: React.CSSProperties = {};
	if (weight) overrideStyle.fontWeight = weight;
	if (size) overrideStyle.fontSize = `var(--typography-fontSize-${size})`;
	if (lineHeight) overrideStyle.lineHeight = `var(--typography-lineHeight-${lineHeight})`;
	if (letterSpacing)
		overrideStyle.letterSpacing = `var(--typography-letterSpacing-${letterSpacing})`;

	if (textEllipsis) {
		overrideStyle.overflow = 'hidden';
		overrideStyle.textOverflow = 'ellipsis';
		overrideStyle.whiteSpace = 'nowrap';
	}

	return (
		<Tag
			{...ariaProps}
			{...stylex.props(roleStyles[role], color && colorStyles[color])}
			style={Object.keys(overrideStyle).length > 0 ? overrideStyle : undefined}
			{...props}
		>
			{children}
		</Tag>
	);
}
