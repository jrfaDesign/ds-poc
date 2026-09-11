import type { ReactNode } from 'react';

export type SectionHeaderProps = {
	title: string;
	subtitle?: string;
	children?: ReactNode;
	className?: string;
};
