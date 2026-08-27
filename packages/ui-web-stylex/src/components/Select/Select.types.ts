import type { ReactNode, ChangeEvent } from 'react';

export type SelectProps = {
	label?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
	id?: string;
	children: ReactNode;
};
