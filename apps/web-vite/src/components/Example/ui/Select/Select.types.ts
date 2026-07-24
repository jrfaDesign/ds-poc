import type { ReactNode } from 'react';

export type SelectProps = {
	label?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	id?: string;
	children: ReactNode;
};
