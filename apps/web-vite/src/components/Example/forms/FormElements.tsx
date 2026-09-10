import * as stylex from '@stylexjs/stylex';
import { styles } from './FormElements.styles';
import { Section, Input, Textarea, Select } from '@repo/ui-web-stylex';

export function FormElements() {
	return (
		<Section title="Form Elements">
			<div {...stylex.props(styles.form)}>
				<Input type="email" placeholder="you@example.com" label="Email" />
				<Input
					type="password"
					placeholder={'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}
					label="Password"
				/>
				<Select defaultValue="" label="Role">
					<Select.Item value="" disabled>
						Select a role
					</Select.Item>
					<Select.Item value="admin">Admin</Select.Item>
					<Select.Item value="editor">Editor</Select.Item>
					<Select.Item value="viewer">Viewer</Select.Item>
				</Select>
				<Textarea placeholder="Write your message here\u2026" label="Message" />
			</div>
		</Section>
	);
}
