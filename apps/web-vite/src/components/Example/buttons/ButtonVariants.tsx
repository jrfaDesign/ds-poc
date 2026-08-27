import * as stylex from '@stylexjs/stylex';
import { create } from '@stylexjs/stylex';
import { spacing } from '@repo/ui-web-stylex/vars.stylex';
import { Section, Button, Typography } from '@repo/ui-web-stylex';

const btnStyles = create({
	row: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: spacing.md,
		marginBottom: spacing.md,
		alignItems: 'center',
	},
});

export function ButtonVariants() {
	return (
		<Section title="Button Variants">
			<div>
				<div {...stylex.props(btnStyles.row)}>
					<Typography role="overline">Primary</Typography>
					<Button variant="primary">Default</Button>
					<Button variant="primary" disabled>
						Disabled
					</Button>
				</div>
				<div {...stylex.props(btnStyles.row)}>
					<Typography role="overline">Secondary</Typography>
					<Button variant="secondary">Default</Button>
					<Button variant="secondary" disabled>
						Disabled
					</Button>
				</div>
				<div {...stylex.props(btnStyles.row)}>
					<Typography role="overline">Ghost</Typography>
					<Button variant="ghost">Default</Button>
					<Button variant="ghost" disabled>
						Disabled
					</Button>
				</div>
				<div {...stylex.props(btnStyles.row)}>
					<Typography role="overline">Link</Typography>
					<Button variant="link">Default</Button>
					<Button variant="link" disabled>
						Disabled
					</Button>
				</div>
			</div>
		</Section>
	);
}
