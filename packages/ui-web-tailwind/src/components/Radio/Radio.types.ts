import type { ReactNode } from 'react';

export type RadioProps = {
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	disabled?: boolean;
	label?: ReactNode;
	name?: string;
	id?: string;
};
