import type { ReactNode } from 'react';
import type { ViewStyle, DimensionValue } from 'react-native';
import type { SpacingToken, RadiiToken, ColorToken } from '@repo/foundations';
import type { MarginProps, PaddingProps } from '../shared/spacing';

export type BoxProps = MarginProps &
	PaddingProps & {
		children?: ReactNode;
		background?: ColorToken;
		borderRadius?: RadiiToken;
		gap?: SpacingToken;
		flex?: number;
		flexDirection?: ViewStyle['flexDirection'];
		alignItems?: ViewStyle['alignItems'];
		justifyContent?: ViewStyle['justifyContent'];
		flexWrap?: ViewStyle['flexWrap'];
		borderWidth?: number;
		borderColor?: string;
		borderStyle?: ViewStyle['borderStyle'];
		width?: DimensionValue;
		height?: DimensionValue;
		style?: ViewStyle;
	};
