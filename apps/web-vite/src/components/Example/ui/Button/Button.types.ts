import type { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';

export type ButtonProps = {
	variant?: ButtonVariant;
	disabled?: boolean;
	children: ReactNode;
	onClick?: () => void;
};
