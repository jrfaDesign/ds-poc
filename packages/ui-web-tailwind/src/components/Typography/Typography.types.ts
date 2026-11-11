import type { ReactNode, CSSProperties } from 'react';
import type { TypographyColor } from '@repo/core';
import type { FontSizeToken, LineHeightToken, LetterSpacingToken } from '@repo/core';
import type { MarginProps } from '../shared/spacing';

export type { TypographyColor };

/**
 * Web heading roles: the h1/h2 hierarchy is a web concept; the mapping to
 * type-scale presets lives in this package's `Typography` component.
 */
export const typographyRoleKeys = [
	'h1',
	'h2',
	'h3',
	'h4',
	'p',
	'caption',
	'label',
	'overline',
] as const;

export type TypographyRole = (typeof typographyRoleKeys)[number];

export type TypographyTag =
	'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';

export type TypographyProps = MarginProps & {
	/** Semantic role: determines the HTML tag, ARIA attributes, and type scale preset. */
	role?: TypographyRole;
	/** Text color token (e.g. `'text-primary'`, `'text-secondary'`). */
	color?: TypographyColor;
	/** Override the font weight (e.g. `'bold'`, `'700'`). */
	weight?: CSSProperties['fontWeight'];
	/** Override the font size scale token (e.g. `'lg'`, `'2xl'`). */
	size?: FontSizeToken;
	/** Override the line height scale token (e.g. `'tight'`, `'normal'`). */
	lineHeight?: LineHeightToken;
	/** Override the letter spacing scale token (e.g. `'tight'`, `'wide'`). */
	letterSpacing?: LetterSpacingToken;
	/** Override the HTML element (default is inferred from `role`). */
	as?: TypographyTag;
	/** Flip light/dark values for this text's subtree. */
	invert?: boolean;
	/** Truncate text with ellipsis when it overflows. */
	textEllipsis?: boolean;
	/** Text content. */
	children: ReactNode;
	/** Additional CSS class names. */
	className?: string;
	/** Inline style overrides. */
	style?: CSSProperties;
};
