import type { ReactNode } from 'react';
import type { SurfaceKey } from '@repo/foundations';

export type SelectItemProps = {
	value: string;
	disabled?: boolean;
	children: ReactNode;
};

export type SelectChangeEvent = { target: { value: string } };

export type SelectProps = {
	label?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (e: SelectChangeEvent) => void;
	id?: string;
	size?: 'sm' | 'md' | 'lg';
	surface?: SurfaceKey;
	disabled?: boolean;
	children: ReactNode;
};
