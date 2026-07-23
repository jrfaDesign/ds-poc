import * as stylex from '@stylexjs/stylex';
import { styles } from './CardGrid.styles';

const cards = [
	{
		variant: 'surface' as const,
		title: 'Standard Card',
		desc: 'Uses roles.surface for the base background. Ideal for content containers.',
		meta: 'surface / border',
	},
	{
		variant: 'raised' as const,
		title: 'Raised Card',
		desc: 'Uses roles.surfaceRaised — one step above the base surface. Great for modals and elevated panels.',
		meta: 'surfaceRaised / borderWeak',
	},
	{
		variant: 'alt' as const,
		title: 'Alt Card',
		desc: 'Uses roles.surfaceAlt — the alternate surface. Commonly used for cards and panels on top of the base.',
		meta: 'surfaceAlt / border',
	},
	{
		variant: 'brand' as const,
		title: 'Brand Card',
		desc: 'Uses roles.surfaceBrand for brand-tinted backgrounds. Perfect for marketing or featured content.',
		meta: 'surfaceBrand / textBrand',
	},
];

export function CardGrid() {
	return (
		<div {...stylex.props(styles.section)}>
			<span {...stylex.props(styles.tag)}>
				{
					'roles.surface / surfaceRaised / surfaceAlt / surfaceBrand / text / textBrand / textSecondary / textTertiary / border / borderWeak'
				}
			</span>
			<h3 {...stylex.props(styles.heading)}>Card Surface Variants</h3>
			<div {...stylex.props(styles.grid)}>
				{cards.map((c) => (
					<div key={c.variant} {...stylex.props(styles.card, styles[c.variant])}>
						<p
							{...stylex.props(
								styles.cardTitle,
								c.variant === 'brand' ? styles.cardTitleBrand : null
							)}
						>
							{c.title}
						</p>
						<p {...stylex.props(styles.cardDesc)}>{c.desc}</p>
						<p {...stylex.props(styles.cardMeta)}>{c.meta}</p>
					</div>
				))}
			</div>
		</div>
	);
}
