import * as stylex from '@stylexjs/stylex';
import { styles } from './Alerts.styles';

type AlertType = 'error' | 'success' | 'warning' | 'info';

const alerts: { type: AlertType; title: string; msg: string }[] = [
	{
		type: 'error',
		title: 'Connection Lost',
		msg: 'Unable to reach the server. Please check your network and try again.',
	},
	{ type: 'success', title: 'Changes Saved', msg: 'Your profile has been updated successfully.' },
	{
		type: 'warning',
		title: 'Storage Almost Full',
		msg: 'You are using 90% of your allocated storage. Consider freeing up space.',
	},
	{
		type: 'info',
		title: 'New Update Available',
		msg: 'Version 3.2.0 is ready to install. New features include dark mode support.',
	},
];

const icons: Record<AlertType, string> = {
	error: '!',
	success: '\u2713',
	warning: '\u26A0',
	info: 'i',
};

export function Alerts() {
	return (
		<div {...stylex.props(styles.section)}>
			<span {...stylex.props(styles.tag)}>
				{
					'roles.errorBg/Fg/Border  |  successBg/Fg/Border  |  warningBg/Fg/Border  |  infoBg/Fg/Border'
				}
			</span>
			<h3 {...stylex.props(styles.heading)}>Alert Banners</h3>
			{alerts.map((a) => (
				<div key={a.type} {...stylex.props(styles.alert, styles[a.type])}>
					<div
						{...stylex.props(
							styles.icon,
							styles[
								`icon${a.type.charAt(0).toUpperCase() + a.type.slice(1)}` as keyof typeof styles
							]
						)}
					>
						{icons[a.type]}
					</div>
					<div {...stylex.props(styles.body)}>
						<p {...stylex.props(styles.title)}>{a.title}</p>
						<p {...stylex.props(styles.message)}>{a.msg}</p>
					</div>
				</div>
			))}
		</div>
	);
}
