import { Section } from '../ui/Section/Section';
import { Alert } from '../ui/Alert/Alert';

const alerts = [
	{
		type: 'error' as const,
		title: 'Connection Lost',
		message: 'Unable to reach the server. Please check your network and try again.',
	},
	{
		type: 'success' as const,
		title: 'Changes Saved',
		message: 'Your profile has been updated successfully.',
	},
	{
		type: 'warning' as const,
		title: 'Storage Almost Full',
		message: 'You are using 90% of your allocated storage. Consider freeing up space.',
	},
	{
		type: 'info' as const,
		title: 'New Update Available',
		message: 'Version 3.2.0 is ready to install. New features include dark mode support.',
	},
];

export function Alerts() {
	return (
		<Section title="Alert Banners">
			{alerts.map((a) => (
				<Alert key={a.type} type={a.type} title={a.title} message={a.message} />
			))}
		</Section>
	);
}
