import { Alert, Box, PageSection, Typography } from '@repo/ui-web-tailwind';
import type { AlertIntent } from '@repo/ui-web-tailwind';

const ALERTS: { intent: AlertIntent; title: string; message: string }[] = [
	{
		intent: 'error',
		title: 'Error',
		message: 'Something went wrong. Please try again later.',
	},
	{
		intent: 'success',
		title: 'Success',
		message: 'Your changes have been saved successfully.',
	},
	{
		intent: 'warning',
		title: 'Warning',
		message: 'Your session will expire in 5 minutes.',
	},
	{
		intent: 'info',
		title: 'Info',
		message: 'A new version is available for download.',
	},
];

export function AlertDemo() {
	return (
		<PageSection padding="lg">
			<Box display="flex" flexDirection="column" gap="md">
				<Typography role="h2">Alerts</Typography>
				<Box display="flex" flexDirection="column" gap="sm">
					{ALERTS.map(({ intent, title, message }) => (
						<Alert key={intent} intent={intent} title={title}>
							{message}
						</Alert>
					))}
				</Box>
			</Box>
		</PageSection>
	);
}
