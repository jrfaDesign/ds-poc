import * as stylex from '@stylexjs/stylex';
import { styles } from './ModalDialog.styles';
import { Section, Button, Typography } from '@repo/ui-web-stylex';

export function ModalDialog() {
	return (
		<Section title="Modal Dialog">
			<div {...stylex.props(styles.wrapper)}>
				<div {...stylex.props(styles.dialog)}>
					<div {...stylex.props(styles.header)}>
						<Typography role="h4">Confirm Deletion</Typography>
						<button {...stylex.props(styles.closeBtn)}>&times;</button>
					</div>
					<Typography role="p">
						Are you sure you want to delete the project &ldquo;Q4 Campaign&rdquo;? This action
						cannot be undone. All associated files and data will be permanently removed.
					</Typography>
					<div {...stylex.props(styles.footer)}>
						<Button variant="secondary">Cancel</Button>
						<Button variant="primary">Delete</Button>
					</div>
				</div>
			</div>
		</Section>
	);
}
