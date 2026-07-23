import * as stylex from '@stylexjs/stylex';
import { styles } from './ProfileCard.styles';

export function ProfileCard() {
	return (
		<div {...stylex.props(styles.section)}>
			<span {...stylex.props(styles.tag)}>
				{
					'roles.surface / text / textSecondary / textTertiary / surfaceBrand / textBrand / divider / components.cardBorderRadii'
				}
			</span>
			<h3 {...stylex.props(styles.heading)}>Profile Card</h3>
			<div {...stylex.props(styles.card)}>
				<div {...stylex.props(styles.avatar)}>JD</div>
				<p {...stylex.props(styles.name)}>Jane Doe</p>
				<p {...stylex.props(styles.role)}>Senior Product Designer</p>
				<p {...stylex.props(styles.bio)}>
					Crafting intuitive experiences at the intersection of design and technology.
				</p>
				<div {...stylex.props(styles.stats)}>
					<div {...stylex.props(styles.stat)}>
						<span {...stylex.props(styles.statValue)}>128</span>
						<span {...stylex.props(styles.statLabel)}>Projects</span>
					</div>
					<div {...stylex.props(styles.stat)}>
						<span {...stylex.props(styles.statValue)}>2.4k</span>
						<span {...stylex.props(styles.statLabel)}>Followers</span>
					</div>
					<div {...stylex.props(styles.stat)}>
						<span {...stylex.props(styles.statValue)}>47</span>
						<span {...stylex.props(styles.statLabel)}>Awards</span>
					</div>
				</div>
			</div>
		</div>
	);
}
