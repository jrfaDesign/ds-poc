import type { ReactNode, CSSProperties } from 'react';

export type StackProps = {
	children: ReactNode;
	gap?: string;
	align?: CSSProperties['alignItems'];
	padding?: string;
	paddingX?: string;
	paddingY?: string;
	background?: string;
	borderRadius?: string;
	className?: string;
	style?: CSSProperties;
};
