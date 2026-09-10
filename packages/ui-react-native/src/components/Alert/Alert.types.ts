import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
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
	/** Press handler — if provided, the alert becomes pressable. */
	onPress?: () => void;
	/** Inline style overrides for the container. */
	style?: ViewStyle;
	/** Inline style overrides for the text. */
	textStyle?: TextStyle;
};
