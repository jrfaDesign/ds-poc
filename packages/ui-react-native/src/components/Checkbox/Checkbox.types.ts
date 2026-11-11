import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { CheckboxSharedProps } from '@repo/core';

export type CheckboxProps = CheckboxSharedProps & {
	label?: ReactNode;
	style?: ViewStyle;
};
