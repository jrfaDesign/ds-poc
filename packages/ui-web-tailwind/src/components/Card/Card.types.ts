import type { ReactNode, CSSProperties } from 'react';
import type { CardVariant } from '@repo/globals';
import type { SpacingToken, ShadowToken } from '@repo/foundations';
import type { MarginProps } from '../shared/spacing';
import type { BorderProp } from '../shared/border';

export type { CardVariant };

export type CardProps = MarginProps & {
	/** Visual variant — controls background, border, and shadow. */
	variant?: CardVariant;
	/** Flip light/dark values for this card's subtree. */
	invert?: boolean;
	/** Border shorthand — `{width}-{colorToken}-{style}` (e.g. `'1px-border-primary-solid'`). */
	border?: BorderProp;
	/** Override the box shadow with a shadow token (e.g. `'md'`, `'lg'`). */
	shadow?: ShadowToken;
	/** Override the card padding with a spacing token (e.g. `'xl'`, `'2xl'`). */
	padding?: SpacingToken;
	/** Content to render inside the card. */
	children: ReactNode;
	/** Additional CSS class names. */
	className?: string;
	/** Inline style overrides. */
	style?: CSSProperties;

	/** Ref for the card's root div element. */
	ref?: React.Ref<HTMLDivElement> | undefined;
};
