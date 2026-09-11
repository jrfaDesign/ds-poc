import { Box, Container, PageSection, Typography } from '@repo/ui-web-tailwind';
import { Grid } from '@repo/ui-web-tailwind';

export function GridSystemDemo() {
	return (
		<PageSection padding="lg" background="bg-secondary">
			<Box display="flex" flexDirection="column" gap="xl">
				<Box display="flex" flexDirection="column" gap="sm">
					<Typography role="h2">Grid system</Typography>
					<Typography role="p" color="text-secondary" className="max-w-prose">
						A responsive, token-driven grid built on CSS custom properties. Columns, gutter, margin,
						and max-width are read per breakpoint from the active theme. Resize the window to watch
						everything respond — no JavaScript, no flash.
					</Typography>
				</Box>

				{/* Container: fixed vs fluid */}
				<Box display="flex" flexDirection="column" gap="sm">
					<Typography role="overline" color="text-secondary">
						Container
					</Typography>
					<Typography role="caption" color="text-tertiary" className="max-w-prose">
						<Typography role="caption" style={{ fontFamily: 'var(--typography-monospaceFont)' }}>
							Container
						</Typography>{' '}
						centers content and caps its width. In{' '}
						<Typography role="p" weight="bold">
							fixed
						</Typography>{' '}
						mode the max-width follows the theme&apos;s width tokens per breakpoint. In{' '}
						<Typography role="p" weight="bold">
							fluid
						</Typography>{' '}
						mode the cap is removed but inline margins still apply.
					</Typography>
					<Grid columns={2} gap="md">
						<Grid.Column>
							<Box
								borderRadius="md"
								padding="md"
								background="bg-tertiary"
								border="1px-border-primary-solid"
							>
								<Typography role="caption" color="text-tertiary" marginBottom="sm">
									fixed — max-width capped per breakpoint
								</Typography>
								<Container>
									<Box background="bg-brand-solid" borderRadius="sm" padding="sm">
										<Typography role="caption" color="text-white">
											capped content
										</Typography>
									</Box>
								</Container>
							</Box>
						</Grid.Column>
						<Grid.Column>
							<Box
								borderRadius="md"
								padding="md"
								background="bg-tertiary"
								border="1px-border-primary-solid"
							>
								<Typography role="caption" color="text-tertiary" marginBottom="sm">
									fluid — no cap, margins apply
								</Typography>
								<Container fluid>
									<Box background="bg-brand-solid" borderRadius="sm" padding="sm">
										<Typography role="caption" color="text-white">
											full-bleed content
										</Typography>
									</Box>
								</Container>
							</Box>
						</Grid.Column>
					</Grid>
				</Box>

				{/* Auto layouts */}
				<Box display="flex" flexDirection="column" gap="sm">
					<Typography role="overline" color="text-secondary">
						Auto-layout presets
					</Typography>
					<Typography role="caption" color="text-tertiary" className="max-w-prose">
						<Typography role="caption" style={{ fontFamily: 'var(--typography-monospaceFont)' }}>
							autoLayout
						</Typography>{' '}
						divides the grid into equal-width columns so children flow without explicit{' '}
						<Typography role="caption" style={{ fontFamily: 'var(--typography-monospaceFont)' }}>
							span
						</Typography>{' '}
						values. Pass{' '}
						<Typography role="caption" style={{ fontFamily: 'var(--typography-monospaceFont)' }}>
							&quot;2&quot;
						</Typography>
						,{' '}
						<Typography role="caption" style={{ fontFamily: 'var(--typography-monospaceFont)' }}>
							&quot;3&quot;
						</Typography>
						,{' '}
						<Typography role="caption" style={{ fontFamily: 'var(--typography-monospaceFont)' }}>
							&quot;5&quot;
						</Typography>
						,{' '}
						<Typography role="caption" style={{ fontFamily: 'var(--typography-monospaceFont)' }}>
							&quot;6&quot;
						</Typography>
						, or{' '}
						<Typography role="caption" style={{ fontFamily: 'var(--typography-monospaceFont)' }}>
							&quot;12&quot;
						</Typography>{' '}
						to set the column count.
					</Typography>
					{(['12', '6', '5', '3', '2'] as const).map((layout) => (
						<Box key={layout} display="flex" flexDirection="column" gap="xs">
							<Typography role="caption" color="text-secondary">
								autoLayout=&ldquo;{layout}&rdquo; &rarr; {layout} equal columns
							</Typography>
							<Grid autoLayout={layout} gap="xs">
								{Array.from({ length: Number(layout) }, (_, i) => (
									<Grid.Column key={i}>
										<Box
											background="bg-brand-primary"
											borderRadius="sm"
											border="1px-border-brand-solid"
											style={{ height: 'var(--ds-spacing-xl)' }}
										/>
									</Grid.Column>
								))}
							</Grid>
						</Box>
					))}
				</Box>

				{/* Responsive column spans */}
				<Box display="flex" flexDirection="column" gap="sm">
					<Typography role="overline" color="text-secondary">
						Responsive column spans
					</Typography>
					<Typography role="caption" color="text-tertiary" className="max-w-prose">
						Each{' '}
						<Typography role="caption" style={{ fontFamily: 'var(--typography-monospaceFont)' }}>
							Grid.Column
						</Typography>{' '}
						accepts a{' '}
						<Typography role="caption" style={{ fontFamily: 'var(--typography-monospaceFont)' }}>
							span
						</Typography>{' '}
						— a single number or a per-breakpoint map. The column grows or shrinks at each
						breakpoint to fill its share of the parent grid.
					</Typography>
					<Grid columns={{ mobile: 4, tablet: 6, desktop: 12 }} gap="md">
						<Grid.Column span={{ mobile: 4, tablet: 3, desktop: 4 }}>
							<Box
								background="bg-brand-solid"
								borderRadius="md"
								padding="md"
								border="1px-border-brand-solid"
							>
								<Typography role="caption" color="text-white">
									span &#123; mobile: 4, tablet: 3, desktop: 4 &#125;
								</Typography>
							</Box>
						</Grid.Column>
						<Grid.Column span={{ mobile: 4, tablet: 3, desktop: 8 }}>
							<Box
								background="bg-tertiary"
								borderRadius="md"
								padding="md"
								border="1px-border-primary-solid"
							>
								<Typography role="caption" color="text-secondary">
									span &#123; mobile: 4, tablet: 3, desktop: 8 &#125;
								</Typography>
							</Box>
						</Grid.Column>
					</Grid>
				</Box>
			</Box>
		</PageSection>
	);
}
