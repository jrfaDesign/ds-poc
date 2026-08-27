import type { ReactNode } from 'react';
import type { ButtonVariant } from '@repo/globals';

export type { ButtonVariant };

export type ButtonProps = {
	variant?: ButtonVariant;
	disabled?: boolean;
	children: ReactNode;
	onClick?: () => void;
};
