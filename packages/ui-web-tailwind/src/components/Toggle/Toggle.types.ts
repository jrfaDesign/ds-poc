import type { ReactNode } from 'react';

export type ToggleProps = {
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	disabled?: boolean;
	label?: ReactNode;
	id?: string;
};
