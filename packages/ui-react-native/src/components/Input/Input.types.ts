import type { ViewStyle, TextStyle } from 'react-native';
import type { InputSharedProps, InputStatus } from '@repo/core';
import type { MarginProps } from '../shared/spacing';

export type { InputStatus };

export type InputProps = MarginProps &
	InputSharedProps & {
		/** Change handler: RN passes the text string (web uses a ChangeEvent). */
		onChange?: (text: string) => void;
		style?: ViewStyle;
		textStyle?: TextStyle;
	};
