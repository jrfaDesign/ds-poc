import type { ReactNode, CSSProperties } from 'react';
import type { ButtonVariant } from '@repo/globals';
import type { MarginProps } from '../shared/spacing';

export type { ButtonVariant };

export type ButtonProps = MarginProps & {
	/** Visual style variant. */
	variant?: ButtonVariant;
	/** Disables the button and applies muted styling. */
	disabled?: boolean;
	/** Flip light/dark values for this button's subtree. */
	invert?: boolean;
	/** Button size preset. */
	size?: 'sm' | 'md' | 'lg';
	/** HTML button type attribute (default `'button'`). */
	type?: 'button' | 'submit' | 'reset';
	/** Button label content. */
	children: ReactNode;
	/** Click handler. */
	onClick?: () => void;
	/** Additional CSS class names. */
	className?: string;
	/** Inline style overrides. */
	style?: CSSProperties;
};
