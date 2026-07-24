import type { ReactNode } from 'react';

export type BadgeVariant = 'brand' | 'alt' | 'outline' | 'error' | 'success' | 'warning' | 'info';

export type BadgeProps = {
	variant?: BadgeVariant;
	dot?: boolean;
	children: ReactNode;
};
