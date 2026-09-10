import * as stylex from '@stylexjs/stylex';
import { styles } from './CardGrid.styles';
import { Section, Card, Typography } from '@repo/ui-web-stylex';

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
		desc: 'Uses roles.surfaceRaised - one step above the base surface. Great for modals and elevated panels.',
		meta: 'surfaceRaised / borderWeak',
	},
	{
		variant: 'alt' as const,
		title: 'Alt Card',
		desc: 'Uses roles.surfaceAlt - the alternate surface. Commonly used for cards and panels on top of the base.',
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
		<Section title="Card Surface Variants">
			<div {...stylex.props(styles.grid)}>
				{cards.map((c) => (
					<Card key={c.variant} variant={c.variant}>
						<Typography
							role="h4"
							color={c.variant === 'brand' ? 'text-brand-secondary' : undefined}
						>
							{c.title}
						</Typography>
						<Typography role="p">{c.desc}</Typography>
						<Typography role="caption" color="text-tertiary">
							{c.meta}
						</Typography>
					</Card>
				))}
			</div>
		</Section>
	);
}
