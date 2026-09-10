import { Box, Card, Grid, PageSection, Typography } from '@repo/ui-web-tailwind';
import type { CardVariant } from '@repo/ui-web-tailwind';

const SURFACE_CARDS: { variant: CardVariant; label: string; onVar: string }[] = [
	{ variant: 'surface', label: 'base', onVar: 'surface-base-on' },
	{ variant: 'alt', label: 'alt', onVar: 'surface-alt-on' },
	{ variant: 'raised', label: 'raised', onVar: 'surface-raised-on' },
	{ variant: 'brand', label: 'brand', onVar: 'surface-brand-on' },
];

const SURFACE_BOXES: { label: string; bgClass: string; borderClass: string; onVar: string }[] = [
	{
		label: 'sunken',
		bgClass: 'bg-surface-sunken-bg',
		borderClass: 'border-surface-sunken-border',
		onVar: 'surface-sunken-on',
	},
	{
		label: 'inverse',
		bgClass: 'bg-surface-inverse-bg',
		borderClass: 'border-surface-inverse-border',
		onVar: 'surface-inverse-on',
	},
];

export function SurfacesDemo() {
	return (
		<PageSection padding="lg">
			<Box display="flex" flexDirection="column" gap="md">
				<Typography role="h2">Surfaces</Typography>
				<Grid columns={{ mobile: 2, tablet: 3 }} gap="md">
					{SURFACE_CARDS.map(({ variant, label, onVar }) => (
						<Grid.Column key={label}>
							<Card variant={variant}>
								<Typography role="caption" style={{ color: `var(--${onVar})` }}>
									{label}
								</Typography>
							</Card>
						</Grid.Column>
					))}
					{SURFACE_BOXES.map(({ label, bgClass, borderClass, onVar }) => (
						<Grid.Column key={label}>
							<Box borderRadius="lg" padding="md" className={`border ${borderClass} ${bgClass}`}>
								<Typography role="caption" style={{ color: `var(--${onVar})` }}>
									{label}
								</Typography>
							</Box>
						</Grid.Column>
					))}
				</Grid>
			</Box>
		</PageSection>
	);
}
