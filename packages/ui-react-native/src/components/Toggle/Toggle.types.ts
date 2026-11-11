import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { ToggleSharedProps } from '@repo/core';

export type ToggleProps = ToggleSharedProps & {
	label?: ReactNode;
	style?: ViewStyle;
};
