import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
import type { MarginProps } from '../shared/spacing';

export type InputStatus = 'default' | 'error' | 'success';

export type InputProps = MarginProps & {
	label?: string;
	placeholder?: string;
	size?: 'sm' | 'md' | 'lg';
	status?: InputStatus;
	value?: string;
	defaultValue?: string;
	onChange?: (text: string) => void;
	id?: string;
	disabled?: boolean;
	style?: ViewStyle;
	textStyle?: TextStyle;
};
