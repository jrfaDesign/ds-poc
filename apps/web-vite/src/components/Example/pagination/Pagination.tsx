import * as stylex from '@stylexjs/stylex';
import { styles } from './Pagination.styles';
import { Section } from '@repo/ui-web-stylex';

const pages = [1, 2, 3, 4, 5];
const current = 3;

export function Pagination() {
	return (
		<Section title="Pagination">
			<div {...stylex.props(styles.pagination)}>
				<button {...stylex.props(styles.navBtn)}>{'\u2039'}</button>
				{pages.map((p) => (
					<button
						key={p}
						{...stylex.props(styles.pageBtn, p === current ? styles.pageBtnActive : null)}
					>
						{p}
					</button>
				))}
				<span {...stylex.props(styles.ellipsis)}>...</span>
				<button {...stylex.props(styles.pageBtn)}>10</button>
				<button {...stylex.props(styles.navBtn)}>{'\u203A'}</button>
			</div>
		</Section>
	);
}
