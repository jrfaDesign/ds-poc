import * as stylex from '@stylexjs/stylex';
import { styles } from './Example.styles';
import { Alerts } from './alerts/Alerts';
import { Navigation } from './navigation/Navigation';
import { ProfileCard } from './cards/ProfileCard';
import { FormElements } from './forms/FormElements';
import { ButtonVariants } from './buttons/ButtonVariants';
import { Badges } from './badges/Badges';
import { StatusDots } from './status/StatusDots';
import { CardGrid } from './cardgrid/CardGrid';
import { ModalDialog } from './modal/ModalDialog';
import { Pagination } from './pagination/Pagination';

export function Example() {
	return (
		<div {...stylex.props(styles.page)}>
			<header {...stylex.props(styles.header)}>
				<h1 {...stylex.props(styles.h1)}>Design Token Examples</h1>
				<p {...stylex.props(styles.p)}>
					Real-world UI patterns built with the design system tokens.
				</p>
			</header>

			<div {...stylex.props(styles.grid)}>
				<div {...stylex.props(styles.full)}>
					<Navigation />
				</div>

				<div>
					<ProfileCard />
				</div>

				<div>
					<FormElements />
				</div>

				<div {...stylex.props(styles.full)}>
					<ButtonVariants />
				</div>

				<div {...stylex.props(styles.full)}>
					<Alerts />
				</div>

				<div {...stylex.props(styles.full)}>
					<CardGrid />
				</div>

				<div>
					<Badges />
					<StatusDots />
				</div>

				<div>
					<ModalDialog />
				</div>

				<div {...stylex.props(styles.full)}>
					<Pagination />
				</div>
			</div>
		</div>
	);
}
