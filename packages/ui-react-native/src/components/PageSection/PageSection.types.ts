import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { SpacingToken, WidthToken, LayoutToken } from '@repo/core';

export type PageSectionProps = {
	children?: ReactNode;
	padding?: SpacingToken;
	maxWidth?: WidthToken;
	inset?: LayoutToken;
	fluid?: boolean;
	background?: string;
	invert?: boolean;
	style?: ViewStyle;
};
