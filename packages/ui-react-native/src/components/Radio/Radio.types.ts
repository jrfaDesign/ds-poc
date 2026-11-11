import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { RadioSharedProps } from '@repo/core';

export type RadioProps = RadioSharedProps & {
	label?: ReactNode;
	style?: ViewStyle;
};
