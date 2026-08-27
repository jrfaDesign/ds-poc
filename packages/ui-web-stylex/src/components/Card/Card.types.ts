import type { ReactNode } from 'react';
import type { CardVariant } from '@repo/globals';

export type { CardVariant };

export type CardProps = {
	variant?: CardVariant;
	children: ReactNode;
};
