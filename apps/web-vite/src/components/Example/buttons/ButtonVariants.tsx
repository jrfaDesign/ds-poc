import * as stylex from '@stylexjs/stylex';
import { styles } from './ButtonVariants.styles';

export function ButtonVariants() {
	return (
		<div {...stylex.props(styles.section)}>
			<span {...stylex.props(styles.tag)}>
				{
					'actionPrimary* / actionSecondary* / actionGhost* / actionLink* (Bg / Fg / Border / Hover / Active / Disabled)'
				}
			</span>
			<h3 {...stylex.props(styles.heading)}>Button Variants</h3>

			<div {...stylex.props(styles.row)}>
				<span {...stylex.props(styles.groupLabel)}>Primary</span>
				<button {...stylex.props(styles.btn, styles.primary)}>Default</button>
				<button {...stylex.props(styles.btn, styles.primary, styles.primaryDisabled)} disabled>
					Disabled
				</button>
			</div>

			<div {...stylex.props(styles.row)}>
				<span {...stylex.props(styles.groupLabel)}>Secondary</span>
				<button {...stylex.props(styles.btn, styles.secondary)}>Default</button>
				<button {...stylex.props(styles.btn, styles.secondary, styles.secondaryDisabled)} disabled>
					Disabled
				</button>
			</div>

			<div {...stylex.props(styles.row)}>
				<span {...stylex.props(styles.groupLabel)}>Ghost</span>
				<button {...stylex.props(styles.btn, styles.ghost)}>Default</button>
				<button {...stylex.props(styles.btn, styles.ghost, styles.ghostDisabled)} disabled>
					Disabled
				</button>
			</div>

			<div {...stylex.props(styles.row)}>
				<span {...stylex.props(styles.groupLabel)}>Link</span>
				<button {...stylex.props(styles.btn, styles.link)}>Default</button>
				<button {...stylex.props(styles.btn, styles.link, styles.linkDisabled)} disabled>
					Disabled
				</button>
			</div>
		</div>
	);
}
