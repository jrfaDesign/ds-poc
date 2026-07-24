import type { ReactNode } from 'react';

export type CardVariant = 'surface' | 'raised' | 'alt' | 'brand';

export type CardProps = {
	variant?: CardVariant;
	children: ReactNode;
};
