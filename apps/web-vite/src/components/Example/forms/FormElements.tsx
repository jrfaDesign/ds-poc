import * as stylex from '@stylexjs/stylex';
import { styles } from './FormElements.styles';

export function FormElements() {
	return (
		<div {...stylex.props(styles.section)}>
			<span {...stylex.props(styles.tag)}>
				{
					'roles.text / textSecondary / textPlaceholder / surfaceSunken / border / focusRing / components.buttonBorderRadii'
				}
			</span>
			<h3 {...stylex.props(styles.heading)}>Form Elements</h3>
			<div {...stylex.props(styles.form)}>
				<div {...stylex.props(styles.field)}>
					<label {...stylex.props(styles.label)}>Email</label>
					<input {...stylex.props(styles.input)} type="email" placeholder="you@example.com" />
				</div>
				<div {...stylex.props(styles.field)}>
					<label {...stylex.props(styles.label)}>Password</label>
					<input
						{...stylex.props(styles.input)}
						type="password"
						placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
					/>
				</div>
				<div {...stylex.props(styles.field)}>
					<label {...stylex.props(styles.label)}>Role</label>
					<select {...stylex.props(styles.select)} defaultValue="">
						<option value="" disabled>
							Select a role
						</option>
						<option value="admin">Admin</option>
						<option value="editor">Editor</option>
						<option value="viewer">Viewer</option>
					</select>
				</div>
				<div {...stylex.props(styles.field)}>
					<label {...stylex.props(styles.label)}>Message</label>
					<textarea
						{...stylex.props(styles.textarea)}
						placeholder="Write your message here\u2026"
					/>
				</div>
			</div>
		</div>
	);
}
