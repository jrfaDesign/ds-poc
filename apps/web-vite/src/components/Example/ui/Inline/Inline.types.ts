import type { ReactNode, CSSProperties } from 'react';

export type InlineProps = {
	children: ReactNode;
	gap?: string;
	wrap?: boolean;
	align?: CSSProperties['alignItems'];
	justify?: CSSProperties['justifyContent'];
	padding?: string;
	className?: string;
	style?: CSSProperties;
};
