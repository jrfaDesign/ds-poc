import * as stylex from '@stylexjs/stylex';
import { styles } from './ProfileCard.styles';
import { Section, Card, Typography } from '@repo/ui-web-stylex';

export function ProfileCard() {
	return (
		<Section title="Profile Card">
			<Card variant="surface">
				<div {...stylex.props(styles.inner)}>
					<div {...stylex.props(styles.avatar)}>JD</div>
					<Typography role="heading4">Jane Doe</Typography>
					<Typography role="body">Senior Product Designer</Typography>
					<Typography role="bodySm" color="textTertiary">
						Crafting intuitive experiences at the intersection of design and technology.
					</Typography>
					<div {...stylex.props(styles.stats)}>
						<div {...stylex.props(styles.stat)}>
							<Typography role="heading4">128</Typography>
							<Typography role="overline" color="textTertiary">
								Projects
							</Typography>
						</div>
						<div {...stylex.props(styles.stat)}>
							<Typography role="heading4">2.4k</Typography>
							<Typography role="overline" color="textTertiary">
								Followers
							</Typography>
						</div>
						<div {...stylex.props(styles.stat)}>
							<Typography role="heading4">47</Typography>
							<Typography role="overline" color="textTertiary">
								Awards
							</Typography>
						</div>
					</div>
				</div>
			</Card>
		</Section>
	);
}
