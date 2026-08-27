import type { AlertType } from '@repo/globals';

export type { AlertType };

export type AlertProps = {
	type?: AlertType;
	title: string;
	message: string;
};
