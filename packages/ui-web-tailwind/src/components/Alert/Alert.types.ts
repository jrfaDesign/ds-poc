import type { ReactNode, CSSProperties } from 'react';
import type { AlertIntent, AlertSharedProps } from '@repo/core';
import type { MarginProps } from '../shared/spacing';

export type { AlertIntent };

export type AlertProps = MarginProps &
	AlertSharedProps & {
		/** Alert message content. */
		children: ReactNode;
		/** Flip light/dark values for this alert's subtree. */
		invert?: boolean;
		/** Additional CSS class names. */
		className?: string;
		/** Inline style overrides. */
		style?: CSSProperties;
	};
