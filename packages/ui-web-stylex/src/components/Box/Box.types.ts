import type { ReactNode, CSSProperties } from 'react';

export type BoxProps = {
	children: ReactNode;
	as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer' | 'aside' | 'nav' | 'span';
	padding?: string;
	paddingX?: string;
	paddingY?: string;
	margin?: string;
	background?: string;
	borderRadius?: string;
	shadow?: string;
	display?: CSSProperties['display'];
	width?: CSSProperties['width'];
	height?: CSSProperties['height'];
	flex?: CSSProperties['flex'];
	flexDirection?: CSSProperties['flexDirection'];
	flexWrap?: CSSProperties['flexWrap'];
	alignItems?: CSSProperties['alignItems'];
	justifyContent?: CSSProperties['justifyContent'];
	gap?: string;
	position?: CSSProperties['position'];
	overflow?: CSSProperties['overflow'];
	className?: string;
	style?: CSSProperties;
};
