import type { ChangeEvent } from 'react';

export type TextareaProps = {
	label?: string;
	placeholder?: string;
	rows?: number;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
