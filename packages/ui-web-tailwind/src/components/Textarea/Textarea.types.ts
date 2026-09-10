import type { ChangeEvent } from 'react';
import type { SurfaceKey } from '@repo/foundations';

export type TextareaProps = {
	label?: string;
	placeholder?: string;
	rows?: number;
	size?: 'sm' | 'md' | 'lg';
	surface?: SurfaceKey;
	value?: string;
	defaultValue?: string;
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	id?: string;
	disabled?: boolean;
};
