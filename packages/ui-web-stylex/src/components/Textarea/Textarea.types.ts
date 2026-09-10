import type { ChangeEvent } from 'react';

export type TextareaProps = {
	label?: string;
	placeholder?: string;
	rows?: number;
	size?: 'sm' | 'md' | 'lg';
	value?: string;
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	disabled?: boolean;
	id?: string;
};
