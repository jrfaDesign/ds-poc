import * as stylex from '@stylexjs/stylex';
import { styles } from './Badges.styles';

export function Badges() {
	return (
		<div {...stylex.props(styles.section)}>
			<span {...stylex.props(styles.tag)}>
				{
					'roles.surfaceBrand/textBrand / surfaceAlt / borderWeak / errorBg/Fg/Border / successBg/Fg/Border / radii.sm'
				}
			</span>
			<h3 {...stylex.props(styles.heading)}>Badges &amp; Tags</h3>
			<div {...stylex.props(styles.row)}>
				<span {...stylex.props(styles.badge, styles.brand)}>Premium</span>
				<span {...stylex.props(styles.badge, styles.alt)}>Draft</span>
				<span {...stylex.props(styles.badge, styles.outline)}>Archived</span>
			</div>
			<div {...stylex.props(styles.row)}>
				<span {...stylex.props(styles.badge, styles.error)}>
					<span {...stylex.props(styles.dot)} />
					Failed
				</span>
				<span {...stylex.props(styles.badge, styles.success)}>
					<span {...stylex.props(styles.dot)} />
					Active
				</span>
				<span {...stylex.props(styles.badge, styles.warning)}>
					<span {...stylex.props(styles.dot)} />
					Pending
				</span>
				<span {...stylex.props(styles.badge, styles.info)}>
					<span {...stylex.props(styles.dot)} />
					Updated
				</span>
			</div>
		</div>
	);
}
