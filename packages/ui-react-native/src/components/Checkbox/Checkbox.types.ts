import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export type CheckboxProps = {
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	disabled?: boolean;
	label?: ReactNode;
	style?: ViewStyle;
};
