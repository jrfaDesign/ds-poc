import type { ChangeEvent, CSSProperties } from 'react';
import type { SurfaceKey } from '@repo/foundations';

export type InputStatus = 'default' | 'error' | 'success';

export type InputProps = {
	label?: string;
	placeholder?: string;
	type?: 'text' | 'email' | 'password' | 'number';
	size?: 'sm' | 'md' | 'lg';
	surface?: SurfaceKey;
	status?: InputStatus;
	value?: string;
	defaultValue?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	id?: string;
	disabled?: boolean;
	/** Additional CSS class names. */
	className?: string;

	/** Inline style overrides. */
	style?: CSSProperties;
};
