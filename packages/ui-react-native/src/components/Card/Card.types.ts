import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { CardVariant } from '@repo/globals';
import type { MarginProps } from '../shared/spacing';

export type { CardVariant };

export type CardProps = MarginProps & {
	variant?: CardVariant;
	children?: ReactNode;
	style?: ViewStyle;
};
