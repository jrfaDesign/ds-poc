export type AlertType = 'error' | 'success' | 'warning' | 'info';

export type AlertProps = {
	type?: AlertType;
	title: string;
	message: string;
};
