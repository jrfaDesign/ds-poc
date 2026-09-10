import type { ChangeEvent } from 'react';

export type InputProps = {
	label?: string;
	placeholder?: string;
	type?: 'text' | 'email' | 'password' | 'number';
	size?: 'sm' | 'md' | 'lg';
	value?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	id?: string;
};
