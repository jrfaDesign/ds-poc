import type { ReactNode, CSSProperties } from 'react';
import type { AlertIntent } from '@repo/globals';
import type { MarginProps } from '../shared/spacing';

export type { AlertIntent };

export type AlertProps = MarginProps & {
	/** Visual intent — controls background, border, and text color. */
	intent: AlertIntent;
	/** Optional title text displayed above the message. */
	title?: string;
	/** Alert message content. */
	children: ReactNode;
	/** Flip light/dark values for this alert's subtree. */
	invert?: boolean;
	/** Additional CSS class names. */
	className?: string;
	/** Inline style overrides. */
	style?: CSSProperties;
};
