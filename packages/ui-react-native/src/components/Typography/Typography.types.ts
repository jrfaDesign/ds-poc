import type { TypographyColor } from '@repo/core';
import type { FontSizeToken, LetterSpacingToken, LineHeightToken } from '@repo/core';
import type { TextStyle } from 'react-native';
import type { MarginProps } from '../shared/spacing';

export type { TypographyColor };

/**
 * Mobile-native type roles: platform concepts (display/title/headline…),
 * not the web's h1/h2 heading hierarchy. Role→style mapping lives in the
 * RN library, per platform needs.
 */
export type TypographyVariant = 'display' | 'title' | 'headline' | 'body' | 'label' | 'caption';

export type TypographyProps = MarginProps & {
	variant?: TypographyVariant;
	color?: TypographyColor;
	weight?: TextStyle['fontWeight'];
	size?: FontSizeToken;
	lineHeight?: LineHeightToken;
	letterSpacing?: LetterSpacingToken;
	children?: React.ReactNode;
	style?: TextStyle;
};
