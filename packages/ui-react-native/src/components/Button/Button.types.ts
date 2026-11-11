import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
import type { ButtonSharedProps, ButtonSize, ButtonVariant } from '@repo/core';
import type { MarginProps } from '../shared/spacing';

export type { ButtonSize, ButtonVariant };

export type ButtonProps = MarginProps &
	ButtonSharedProps & {
		children?: ReactNode;
		/** Press handler: RN-native activate handler (web uses `onClick`). */
		onPress?: () => void;
		style?: ViewStyle;
		textStyle?: TextStyle;
	};
