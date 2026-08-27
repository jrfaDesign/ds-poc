import type { ReactNode } from 'react';
import type { TypographyRole, TypographyColor } from '@repo/globals';

export type { TypographyRole, TypographyColor };

export type TypographyProps = {
	role?: TypographyRole;
	color?: TypographyColor;
	weight?: string;
	children: ReactNode;
};
