import type { TypographyRole, TypographyColor } from '@repo/globals';
import type { FontSizeToken, LineHeightToken, LetterSpacingToken } from '@repo/foundations';
import type { TextStyle } from 'react-native';
import type { MarginProps } from '../shared/spacing';

export type { TypographyRole, TypographyColor };

export type TypographyProps = MarginProps & {
	role?: TypographyRole;
	color?: TypographyColor;
	weight?: TextStyle['fontWeight'];
	size?: FontSizeToken;
	lineHeight?: LineHeightToken;
	letterSpacing?: LetterSpacingToken;
	children?: React.ReactNode;
	style?: TextStyle;
};
