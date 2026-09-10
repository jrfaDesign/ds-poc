import * as stylex from '@stylexjs/stylex';
import { styles } from './ProfileCard.styles';
import { Section, Card, Typography } from '@repo/ui-web-stylex';

export function ProfileCard() {
	return (
		<Section title="Profile Card">
			<Card variant="surface">
				<div {...stylex.props(styles.inner)}>
					<Typography role="p">JD</Typography>
					<Typography role="h4">Jane Doe</Typography>
					<Typography role="p">Senior Product Designer</Typography>
					<Typography role="p" color="text-tertiary">
						Crafting intuitive experiences at the intersection of design and technology.
					</Typography>
					<div {...stylex.props(styles.stats)}>
						<div {...stylex.props(styles.stat)}>
							<Typography role="h4">128</Typography>
							<Typography role="overline" color="text-tertiary">
								Projects
							</Typography>
						</div>
						<div {...stylex.props(styles.stat)}>
							<Typography role="h4">2.4k</Typography>
							<Typography role="overline" color="text-tertiary">
								Followers
							</Typography>
						</div>
						<div {...stylex.props(styles.stat)}>
							<Typography role="h4">47</Typography>
							<Typography role="overline" color="text-tertiary">
								Awards
							</Typography>
						</div>
					</div>
				</div>
			</Card>
		</Section>
	);
}
