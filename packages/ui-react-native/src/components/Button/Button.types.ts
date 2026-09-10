import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
import type { ButtonVariant } from '@repo/globals';
import type { MarginProps } from '../shared/spacing';

export type { ButtonVariant };

export type ButtonProps = MarginProps & {
	variant?: ButtonVariant;
	disabled?: boolean;
	size?: 'sm' | 'md' | 'lg';
	children?: ReactNode;
	onPress?: () => void;
	style?: ViewStyle;
	textStyle?: TextStyle;
};
