import * as stylex from '@stylexjs/stylex';
import { styles } from './StylexExample.styles';
import type { FC } from 'react';
import type { StylexExampleProps } from './StylexExample.types';

export const StylexExample: FC<StylexExampleProps> = ({
	cardSX,
	buttonSX,
	showError,
	showSuccess,
}) => {
	return (
		<div {...stylex.props(styles.page)}>
			<div {...stylex.props(styles.container, cardSX)}>
				<header {...stylex.props(styles.header)}>
					<h2 {...stylex.props(styles.title)}>Sign In</h2>
					<p {...stylex.props(styles.subtitle)}>
						Use your account credentials to access the dashboard.
					</p>
				</header>

				<div {...stylex.props(styles.fieldGroup)}>
					<label {...stylex.props(styles.label)}>Email</label>
					<input type="email" placeholder="you@example.com" {...stylex.props(styles.input)} />
				</div>

				<div {...stylex.props(styles.fieldGroup)}>
					<label {...stylex.props(styles.label)}>Password</label>
					<input type="password" placeholder="••••••••" {...stylex.props(styles.input)} />
				</div>

				<button type="button" {...stylex.props(styles.button, buttonSX)}>
					Login
				</button>

				{showError && (
					<div {...stylex.props(styles.errorBox)}>
						Invalid credentials. Please check your email and password.
					</div>
				)}

				{showSuccess && (
					<div {...stylex.props(styles.successBox)}>
						You have successfully signed in. Redirecting…
					</div>
				)}
			</div>
		</div>
	);
};
