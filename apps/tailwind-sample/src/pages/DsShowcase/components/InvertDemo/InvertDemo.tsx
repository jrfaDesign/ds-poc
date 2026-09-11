import { Box, Button, Card, PageSection, Typography } from '@repo/ui-web-tailwind';

export function InvertDemo() {
	return (
		<Box display="flex" flexDirection="column" gap="3xl">
			<PageSection>
				<Box display="flex" flexDirection="column" gap="sm">
					<Typography role="h2">Invert mode</Typography>
					<Typography role="p" color="text-secondary" className="max-w-prose">
						Set <code className="font-mono text-sm text-brand-secondary">{`invert`}</code> on any
						component to flip light/dark values for that subtree — a dark section on a light page
						(or vice-versa). All children inherit the inversion automatically. Toggle the page dark
						mode to see the inverted section swap opposite.
					</Typography>
				</Box>

				{/* Normal section (for reference) */}
				<Box display="flex" flexDirection="column" gap="md">
					<Typography role="overline" color="text-secondary">
						Normal (follows page mode)
					</Typography>
					<Card variant="surface" style={{ gap: 'var(--ds-spacing-md)' }}>
						<Typography role="h3">Standard section</Typography>
						<Typography role="p" color="text-secondary">
							This card uses the page's current mode.
						</Typography>
						<Box display="flex" gap="sm" flexWrap="wrap">
							<Button variant="primary">Primary</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="ghost">Ghost</Button>
						</Box>
					</Card>
				</Box>
			</PageSection>

			<PageSection invert background="bg-primary" className="py-xl">
				{/* Inverted section — the star of the show */}
				<Box display="flex" flexDirection="column" gap="md">
					<Typography role="overline" color="text-secondary">
						Inverted (flips relative to page)
					</Typography>
					<Box
						borderRadius="lg"
						padding="lg"
						display="flex"
						flexDirection="column"
						gap="md"
						className="border border-primary"
						background="bg-primary"
					>
						<Typography role="h3">Inverted section</Typography>
						<Typography role="p" color="text-secondary">
							Every token below is flipped — light page shows dark tones here, and vice-versa.
							Notice the native scrollbar color also changes.
						</Typography>

						<Box display="flex" gap="sm" flexWrap="wrap">
							<Button variant="primary">Primary</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="ghost">Ghost</Button>
						</Box>

						<Box display="grid" gap="md" className="grid-cols-1 tablet:grid-cols-2">
							<Card variant="surface">
								<Typography role="caption" color="text-quaternary">
									Inverted surface card
								</Typography>
								<Typography role="p" color="text-quaternary">
									Card inside an inverted section.
								</Typography>
							</Card>
							<Card variant="brand">
								<Typography role="caption" color="text-secondary">
									Inverted brand card
								</Typography>
								<Typography role="p">Brand variant, also inverted.</Typography>
							</Card>
						</Box>

						{/* Scrollable area to show native color-scheme flip */}
						<Box
							maxHeight="8rem"
							borderRadius="md"
							padding="md"
							overflowY="auto"
							background="bg-tertiary"
						>
							<Typography role="caption" as="div" color="text-secondary">
								Scroll me — the scrollbar matches the inverted mode (color-scheme flipped).
							</Typography>
							{Array.from({ length: 20 }, (_, i) => (
								<Typography key={i} role="caption" as="div" color="text-tertiary">
									Line {i + 1} — padding so the scrollbar is scrollable.
								</Typography>
							))}
						</Box>
					</Box>
				</Box>
			</PageSection>
		</Box>
	);
}
