import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { CardSharedProps, CardVariant } from '@repo/core';
import type { MarginProps } from '../shared/spacing';

export type { CardVariant };

export type CardProps = MarginProps &
	CardSharedProps & {
		children?: ReactNode;
		style?: ViewStyle;
	};
