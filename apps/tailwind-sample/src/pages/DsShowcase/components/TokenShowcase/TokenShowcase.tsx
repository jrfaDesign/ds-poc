import { Box, Card, PageSection, Typography } from '@repo/ui-web-tailwind';
import type { ColorTokenCategory } from '@repo/foundations';
import type { TokenShowcaseProps } from './TokenShowcase.types';

const PALETTE_FAMILIES = [
	'primary',
	'secondary',
	'neutral',
	'error',
	'info',
	'success',
	'warning',
] as const;
const PALETTE_SCALES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
const BASE_COLORS = ['white', 'black', 'transparent'] as const;

const CATEGORY_LABELS: Record<ColorTokenCategory, string> = {
	text: 'Text',
	border: 'Border',
	fg: 'Foreground',
	bg: 'Background',
	utility: 'Utility',
};

function PaletteStrip({ family }: { family: string }) {
	return (
		<Box display="flex" alignItems="stretch" gap="xxs" className="w-full">
			<Typography role="caption" color="text-secondary" className="w-20 shrink-0 capitalize pt-xxs">
				{family}
			</Typography>
			<Box
				display="grid"
				gap="xs"
				className="flex-1"
				style={{ gridTemplateColumns: 'repeat(11, 1fr)' }}
			>
				{PALETTE_SCALES.map((scale) => {
					const key = `${family}_${scale}`;
					return (
						<Box
							key={key}
							height="2.5rem"
							borderRadius="xs"
							style={{
								background: `var(--${key})`,
								borderWidth: '1px',
								borderStyle: 'solid',
								borderColor: 'var(--ct-border-tertiary)',
							}}
							title={`${family}_${scale}`}
						/>
					);
				})}
			</Box>
		</Box>
	);
}

function GroupTitle({ children }: { children: string }) {
	return (
		<Typography role="overline" marginBottom="sm" color="text-secondary">
			{children}
		</Typography>
	);
}

export function TokenShowcase({ theme }: TokenShowcaseProps) {
	return (
		<PageSection padding="lg">
			<Box display="flex" flexDirection="column" gap="xl">
				{/* ---------------- Color palette (raw) ---------------- */}
				<Box display="flex" flexDirection="column" gap="md">
					<Typography role="h2">Color palette</Typography>
					<Typography role="p" color="text-secondary" className="max-w-prose">
						Raw color tokens ({`--{family}_{scale}`}) - the foundation palette shared by every
						theme. Values update live when switching themes. Hover a swatch to see the token name.
					</Typography>

					<Card variant="surface" style={{ gap: 'var(--ds-spacing-md)' }}>
						{PALETTE_FAMILIES.map((family) => (
							<PaletteStrip key={family} family={family} />
						))}

						{/* base colors row */}
						<Box display="flex" alignItems="stretch" gap="xxs" className="w-full">
							<Typography role="caption" color="text-secondary" className="w-20 shrink-0 pt-xxs">
								base
							</Typography>
							<Box
								display="grid"
								gap="xs"
								className="flex-1"
								style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
							>
								{BASE_COLORS.map((c) => (
									<Box
										key={c}
										height="2.5rem"
										borderRadius="xs"
										style={{
											background: `var(--${c})`,
											borderWidth: '1px',
											borderStyle: 'solid',
											borderColor: 'var(--ct-border-tertiary)',
										}}
										title={c}
									/>
								))}
							</Box>
						</Box>

						{/* scale legend */}
						<Box display="flex" gap="xs" className="w-full">
							<Typography role="caption" color="text-tertiary" className="w-20 shrink-0">
								scale
							</Typography>
							<Box
								display="grid"
								gap="xs"
								className="flex-1"
								style={{ gridTemplateColumns: 'repeat(11, 1fr)' }}
							>
								{PALETTE_SCALES.map((scale) => (
									<Typography
										key={scale}
										role="caption"
										color="text-tertiary"
										className="text-center"
									>
										{scale}
									</Typography>
								))}
							</Box>
						</Box>
					</Card>
				</Box>

				{/* ---------------- Semantic color tokens ---------------- */}
				<Box display="flex" flexDirection="column" gap="md">
					<Typography role="h2">Semantic color tokens</Typography>
					<Typography role="p" color="text-secondary" className="max-w-prose">
						Semantic tokens ({`--ct-{name}`}) resolve to a light/dark pair - they flip automatically
						when you toggle dark mode.
					</Typography>

					<Box
						display="grid"
						gap="md"
						style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
					>
						{(Object.keys(theme.colorTokens) as ColorTokenCategory[]).map((category) => {
							const tokens = theme.colorTokens[category] as Record<string, unknown>;
							return (
								<Card key={category} variant="surface">
									<GroupTitle>{CATEGORY_LABELS[category]}</GroupTitle>
									<Box
										display="grid"
										gap="sm"
										style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}
									>
										{Object.keys(tokens).map((name) => (
											<Box key={name} display="flex" flexDirection="column" gap="xs">
												<Box
													height="2.25rem"
													borderRadius="sm"
													style={{
														background: `var(--ct-${name})`,
														borderWidth: '1px',
														borderStyle: 'solid',
														borderColor: 'var(--ct-border-tertiary)',
													}}
													title={name}
												/>
												<Typography role="caption" color="text-tertiary" className="break-all">
													{name}
												</Typography>
											</Box>
										))}
									</Box>
								</Card>
							);
						})}
					</Box>
				</Box>

				{/* ---------------- Gradients ---------------- */}
				<Box display="flex" flexDirection="column" gap="md">
					<Typography role="h2">Gradients</Typography>
					<Typography role="p" color="text-secondary" className="max-w-prose">
						Linear gradient tokens ({`--gradient-{key}`}) composed from raw palette colors.
					</Typography>

					<Box
						display="grid"
						gap="md"
						style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}
					>
						{Object.keys(theme.gradients).map((key) => (
							<Card key={key} variant="surface">
								<Box
									width="100%"
									height="3rem"
									borderRadius="sm"
									style={{ background: `var(--gradient-${key})` }}
								/>
								<Typography role="caption" color="text-tertiary" className="break-all">
									{key}
								</Typography>
							</Card>
						))}
					</Box>
				</Box>
			</Box>
		</PageSection>
	);
}
