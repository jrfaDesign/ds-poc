import * as stylex from '@stylexjs/stylex';
import { styles } from './Pagination.styles';
import { Button, Section, Typography } from '@repo/ui-web-stylex';

const pages = [1, 2, 3, 4, 5];
const current = 3;

export function Pagination() {
	return (
		<Section title="Pagination">
			<div {...stylex.props(styles.pagination)}>
				<Button variant="ghost" {...stylex.props(styles.navBtn)}>
					{'<'}
				</Button>
				{pages.map((p) => (
					<Button
						key={p}
						variant="ghost"
						{...stylex.props(styles.pageBtn, p === current ? styles.pageBtnActive : null)}
					>
						{p}
					</Button>
				))}
				<Typography {...stylex.props(styles.ellipsis)}>...</Typography>
				<Button variant="ghost" {...stylex.props(styles.pageBtn)}>
					10
				</Button>
				<Button variant="ghost" {...stylex.props(styles.navBtn)}>
					{'>'}
				</Button>
			</div>
		</Section>
	);
}
