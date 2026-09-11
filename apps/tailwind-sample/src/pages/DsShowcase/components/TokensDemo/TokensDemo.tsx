import { Box, Card, PageSection, Typography } from '@repo/ui-web-tailwind';
import type { SpacingToken, RadiiToken, ShadowToken } from '@repo/ui-web-tailwind';
import type { TokensDemoProps } from './TokensDemo.types';

const SPACING_KEYS: SpacingToken[] = [
	'none',
	'xxs',
	'xs',
	'sm',
	'md',
	'lg',
	'xl',
	'2xl',
	'3xl',
	'4xl',
	'5xl',
	'6xl',
	'7xl',
	'8xl',
	'9xl',
	'10xl',
	'11xl',
];

const RADII_KEYS: RadiiToken[] = [
	'none',
	'xxs',
	'xs',
	'sm',
	'md',
	'lg',
	'xl',
	'2xl',
	'3xl',
	'4xl',
	'5xl',
	'6xl',
	'full',
];

const SHADOW_KEYS: ShadowToken[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];

export function TokensDemo({ theme }: TokensDemoProps) {
	return (
		<PageSection padding="lg">
			<Box marginBottom="3xl">
				<Typography role="h2" marginBottom="xl">
					Tokens
				</Typography>

				{/* Spacing */}
				<Card variant="surface">
					<Box display="flex" flexDirection="column" gap="xs">
						<Typography role="label" color="text-secondary" marginBottom="xl">
							Spacing · {SPACING_KEYS.length} tokens
						</Typography>
						<Typography role="caption" color="text-tertiary" className="max-w-prose">
							Each bar&apos;s height is the token&apos;s pixel value (hover for name + px).
						</Typography>
						<Box display="flex" alignItems="flex-end" flexWrap="wrap" gap="xl" marginTop="xs">
							{SPACING_KEYS.map((s) => {
								const px = theme.spacing[s];
								return (
									<Box display="flex" flexDirection="column" alignItems="center" gap="xxs" key={s}>
										<Box
											background="bg-brand-solid"
											borderRadius="xs"
											style={{ width: 'var(--ds-spacing-lg)', height: `${px}px`, minHeight: '1px' }}
										/>
										<Typography role="caption" color="text-secondary">
											{s}
										</Typography>
										<Typography role="caption" color="text-tertiary">
											{px}px
										</Typography>
									</Box>
								);
							})}
						</Box>
					</Box>
				</Card>
			</Box>

			<Box marginBottom="3xl">
				<Card variant="surface">
					<Box display="flex" flexDirection="column" gap="xs">
						<Typography role="label" color="text-secondary" marginBottom="xl">
							Radii · {RADII_KEYS.length} tokens
						</Typography>
						<Typography role="caption" color="text-tertiary" className="max-w-prose">
							Each square is the same size; only the corner radius differs (hover for name + px).
						</Typography>
						<Box display="flex" alignItems="flex-end" flexWrap="wrap" gap="xl" marginTop="xs">
							{RADII_KEYS.map((r) => (
								<Box display="flex" flexDirection="column" alignItems="center" gap="xxs" key={r}>
									<Box
										background="bg-brand-solid"
										width={100}
										height={100}
										borderRadius={r}
										padding="5xl"
									/>
									<Typography role="caption" color="text-secondary">
										{r}
									</Typography>
									<Typography role="caption" color="text-tertiary">
										{theme.radii[r]}px
									</Typography>
								</Box>
							))}
						</Box>
					</Box>
				</Card>
			</Box>

			<Box marginBottom="3xl">
				<Card variant="surface">
					<Box display="flex" flexDirection="column" gap="xs">
						<Typography role="label" color="text-secondary" marginBottom="xl">
							Shadows · {SHADOW_KEYS.length} tokens
						</Typography>
						<Typography role="caption" color="text-tertiary" className="max-w-prose">
							Elevation tokens resolved from offset, blur, spread, and a mode-aware color (hover for
							name).
						</Typography>
						<Box display="flex" flexWrap="wrap" gap="4xl" marginTop="xs" padding="3xl">
							{SHADOW_KEYS.map((sh) => (
								<Box display="flex" flexDirection="column" alignItems="center" gap="md" key={sh}>
									<Box
										background="bg-tertiary"
										borderRadius="md"
										display="flex"
										alignItems="center"
										justifyContent="center"
										padding="5xl"
										style={{
											width: 'var(--ds-spacing-xl)',
											height: 'var(--ds-spacing-xl)',
											boxShadow: `var(--ds-shadow-${sh})`,
										}}
										border="1px-border-primary-solid"
									/>
									<Typography role="caption" color="text-secondary">
										{sh}
									</Typography>
								</Box>
							))}
						</Box>
					</Box>
				</Card>
			</Box>
		</PageSection>
	);
}
