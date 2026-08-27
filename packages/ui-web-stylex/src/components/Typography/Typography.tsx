import * as stylex from '@stylexjs/stylex';
import { roleStyles, colorStyles } from './Typography.styles';
import type { TypographyProps, TypographyRole } from './Typography.types';
export type { TypographyColor, TypographyRole, TypographyProps } from './Typography.types';

const tagMap: Record<TypographyRole, 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'> = {
	heading1: 'h1',
	heading2: 'h2',
	heading3: 'h3',
	heading4: 'h4',
	body: 'p',
	bodySm: 'p',
	caption: 'span',
	label: 'span',
	overline: 'span',
};

export function Typography({ role = 'body', color, weight, children }: TypographyProps) {
	const Tag = tagMap[role];
	return (
		<Tag
			{...stylex.props(roleStyles[role], color && colorStyles[color])}
			style={weight ? { fontWeight: weight } : undefined}
		>
			{children}
		</Tag>
	);
}
