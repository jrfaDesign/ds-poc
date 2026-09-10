import type { ReactNode, ChangeEvent } from 'react';

export type SelectItemProps = {
	value: string;
	disabled?: boolean;
	children: ReactNode;
};

export type SelectProps = {
	label?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
	id?: string;
	children: ReactNode;
	size?: 'sm' | 'md' | 'lg';
};
