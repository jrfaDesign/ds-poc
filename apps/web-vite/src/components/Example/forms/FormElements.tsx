import * as stylex from '@stylexjs/stylex';
import { styles } from './FormElements.styles';
import { Section } from '../ui/Section/Section';
import { Input } from '../ui/Input/Input';
import { Textarea } from '../ui/Textarea/Textarea';
import { Select } from '../ui/Select/Select';

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
					<option value="" disabled>
						Select a role
					</option>
					<option value="admin">Admin</option>
					<option value="editor">Editor</option>
					<option value="viewer">Viewer</option>
				</Select>
				<Textarea placeholder="Write your message here\u2026" label="Message" />
			</div>
		</Section>
	);
}
