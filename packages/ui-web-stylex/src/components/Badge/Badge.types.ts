import type { ReactNode } from 'react';
import type { BadgeVariant } from '@repo/globals';

export type { BadgeVariant };

export type BadgeProps = {
	variant?: BadgeVariant;
	dot?: boolean;
	children: ReactNode;
};
