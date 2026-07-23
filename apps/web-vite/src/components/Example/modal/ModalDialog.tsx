import * as stylex from '@stylexjs/stylex';
import { styles } from './ModalDialog.styles';

export function ModalDialog() {
	return (
		<div {...stylex.props(styles.section)}>
			<span {...stylex.props(styles.tag)}>
				{
					'roles.surfaceRaised / text / textSecondary / divider / actionPrimaryBg/Fg/Border / actionGhostBg/Hover / components.buttonBorderRadii / components.cardBorderRadii'
				}
			</span>
			<h3 {...stylex.props(styles.heading)}>Modal Dialog</h3>
			<div {...stylex.props(styles.wrapper)}>
				<div {...stylex.props(styles.dialog)}>
					<div {...stylex.props(styles.header)}>
						<h4 {...stylex.props(styles.modalTitle)}>Confirm Deletion</h4>
						<button {...stylex.props(styles.closeBtn)}>&times;</button>
					</div>
					<p {...stylex.props(styles.body)}>
						Are you sure you want to delete the project "Q4 Campaign"? This action cannot be undone.
						All associated files and data will be permanently removed.
					</p>
					<div {...stylex.props(styles.footer)}>
						<button {...stylex.props(styles.btn, styles.btnGhost)}>Cancel</button>
						<button {...stylex.props(styles.btn, styles.btnPrimary)}>Delete</button>
					</div>
				</div>
			</div>
		</div>
	);
}
