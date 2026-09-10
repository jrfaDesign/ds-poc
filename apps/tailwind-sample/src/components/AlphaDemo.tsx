import { useState } from 'react';
import { Box, Button, Card, Typography, Select, PageSection } from '@repo/ui-web-tailwind';
import type { BackgroundProp } from '@repo/ui-web-tailwind';
import { fontFamilyVar, spacingVar, colorTokenVar } from '@repo/ui-web-tailwind';

const BG_TOKENS = [
	'bg-primary',
	'bg-primary_alt',
	'bg-primary_hover',
	'bg-primary-solid',
	'bg-secondary',
	'bg-secondary_alt',
	'bg-secondary_hover',
	'bg-secondary-solid',
	'bg-tertiary',
	'bg-quaternary',
	'bg-overlay',
	'bg-brand-primary',
	'bg-brand-primary_alt',
	'bg-brand-secondary',
	'bg-brand-solid',
	'bg-brand-solid_hover',
	'bg-brand-section',
	'bg-brand-section_subtle',
	'bg-error-primary',
	'bg-error-secondary',
	'bg-error-solid',
	'bg-error-solid_hover',
	'bg-warning-primary',
	'bg-warning-secondary',
	'bg-warning-solid',
	'bg-warning-solid_hover',
	'bg-success-primary',
	'bg-success-secondary',
	'bg-success-solid',
	'bg-success-solid_hover',
	'bg-info-primary',
	'bg-info-secondary',
	'bg-info-solid',
	'bg-info-solid_hover',
] as const;

const UTILITY_GROUPS: { label: string; tokens: string[] }[] = [
	{
		label: 'Utility: Neutral',
		tokens: [
			'utility-neutral-50',
			'utility-neutral-100',
			'utility-neutral-200',
			'utility-neutral-300',
			'utility-neutral-400',
			'utility-neutral-500',
			'utility-neutral-600',
			'utility-neutral-700',
			'utility-neutral-800',
			'utility-neutral-900',
		],
	},
	{
		label: 'Utility: Primary',
		tokens: [
			'utility-primary-50',
			'utility-primary-50_alt',
			'utility-primary-100',
			'utility-primary-100_alt',
			'utility-primary-200',
			'utility-primary-200_alt',
			'utility-primary-300',
			'utility-primary-300_alt',
			'utility-primary-400',
			'utility-primary-400_alt',
			'utility-primary-500',
			'utility-primary-500_alt',
			'utility-primary-600',
			'utility-primary-600_alt',
			'utility-primary-700',
			'utility-primary-700_alt',
			'utility-primary-800',
			'utility-primary-800_alt',
			'utility-primary-900',
			'utility-primary-900_alt',
		],
	},
	{
		label: 'Utility: Error',
		tokens: [
			'utility-error-50',
			'utility-error-100',
			'utility-error-200',
			'utility-error-300',
			'utility-error-400',
			'utility-error-500',
			'utility-error-600',
			'utility-error-700',
		],
	},
	{
		label: 'Utility: Warning',
		tokens: [
			'utility-warning-50',
			'utility-warning-100',
			'utility-warning-200',
			'utility-warning-300',
			'utility-warning-400',
			'utility-warning-500',
			'utility-warning-600',
			'utility-warning-700',
		],
	},
	{
		label: 'Utility: Success',
		tokens: [
			'utility-success-50',
			'utility-success-100',
			'utility-success-200',
			'utility-success-300',
			'utility-success-400',
			'utility-success-500',
			'utility-success-600',
			'utility-success-700',
		],
	},
	{
		label: 'Utility: Info',
		tokens: [
			'utility-info-50',
			'utility-info-100',
			'utility-info-200',
			'utility-info-300',
			'utility-info-400',
			'utility-info-500',
			'utility-info-600',
			'utility-info-700',
		],
	},
];

const DEFAULT_TOKEN = 'bg-secondary';
const DEFAULT_ALPHA = 60;

export function AlphaDemo() {
	const [token, setToken] = useState<string>(DEFAULT_TOKEN);
	const [alpha, setAlpha] = useState<number>(DEFAULT_ALPHA);
	const [blur, setBlur] = useState<boolean>(false);

	const background = `${token}/${alpha}` as unknown as BackgroundProp;
	const codePreview = `<Box background="${token}/${alpha}"${blur ? ' backdropBlur' : ''}>`;

	return (
		<PageSection padding={'lg'}>
			<Box display="flex" flexDirection="column" gap="xl">
				<Box display="flex" flexDirection="column" gap="sm">
					<Typography role="h2">Background alpha playground</Typography>
					<Typography role="p" color="text-secondary" className="max-w-prose">
						Pick any color token and drag the slider to set the alpha value. The overlay uses{' '}
						<Typography
							role="caption"
							color="text-brand-secondary"
							style={{ fontFamily: fontFamilyVar('mono') }}
						>{`<Box background="token/value">`}</Typography>{' '}
						— the same{' '}
						<Typography
							role="caption"
							color="text-brand-secondary"
							style={{ fontFamily: fontFamilyVar('mono') }}
						>{`color-mix()`}</Typography>{' '}
						technique Tailwind v4 uses for its /alpha modifiers.
					</Typography>
				</Box>

				<Card variant="surface" style={{ gap: spacingVar('md') }}>
					{/* ---- Controls ---- */}
					<Box display="flex" flexWrap="wrap" alignItems="flex-end" gap="md">
						<Box className="min-w-48">
							<Select
								label="Token"
								value={token}
								onChange={(e) => setToken(e.target.value)}
								id="alpha-token"
							>
								<optgroup label="Background">
									{BG_TOKENS.map((t) => (
										<Select.Item key={t} value={t}>
											{t}
										</Select.Item>
									))}
								</optgroup>
								{UTILITY_GROUPS.map((group) => (
									<optgroup key={group.label} label={group.label}>
										{group.tokens.map((t) => (
											<Select.Item key={t} value={t}>
												{t}
											</Select.Item>
										))}
									</optgroup>
								))}
							</Select>
						</Box>

						<Box display="flex" flexDirection="column" gap="xxs" className="flex-1 min-w-48">
							<Box display="flex" alignItems="center" justifyContent="space-between">
								<Typography role="label" color="text-secondary">
									Alpha
								</Typography>
								<Typography role="label" color="text-primary">
									/{alpha}
								</Typography>
							</Box>
							<input
								type="range"
								min={0}
								max={100}
								value={alpha}
								onChange={(e) => setAlpha(Number(e.target.value))}
								className="w-full accent-current"
								style={{ accentColor: colorTokenVar('text-brand-tertiary') }}
							/>
						</Box>

						<Box display="flex" flexDirection="column" gap="xxs" justifyContent="center">
							<Typography role="label" color="text-secondary">
								Backdrop blur
							</Typography>
							<button
								type="button"
								role="switch"
								aria-checked={blur}
								onClick={() => setBlur((b) => !b)}
								className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-brand-tertiary-alt"
								style={{
									backgroundColor: blur
										? colorTokenVar('text-brand-tertiary')
										: colorTokenVar('border-secondary'),
								}}
							>
								<span
									className="inline-block h-5 w-5 transform rounded-full bg-white transition-transform"
									style={{
										transform: blur ? 'translateX(1.375rem)' : 'translateX(0.125rem)',
									}}
								/>
							</button>
						</Box>

						<Button
							variant="ghost"
							onClick={() => {
								setToken(DEFAULT_TOKEN);
								setAlpha(DEFAULT_ALPHA);
								setBlur(false);
							}}
						>
							Reset
						</Button>
					</Box>

					{/* ---- Live code preview ---- */}
					<Box
						background="bg-tertiary"
						borderRadius="md"
						padding="sm"
						style={{ overflowX: 'auto' }}
					>
						<Typography
							role="caption"
							color="text-brand-secondary"
							style={{ fontFamily: fontFamilyVar('mono') }}
						>
							{codePreview}
						</Typography>
					</Box>

					{/* ---- Visual demo: base + translucent overlay ---- */}
					<Box
						position="relative"
						borderRadius="lg"
						overflow="hidden"
						height="10rem"
						background="bg-tertiary"
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						{/* base content visible through the overlay */}
						<Typography role="h1" style={{ position: 'relative', zIndex: 0 }}>
							See through me
						</Typography>

						{/* translucent overlay — the star of the show */}
						<Box
							position="absolute"
							inset={0}
							background={background}
							backdropBlur={blur}
							display="flex"
							alignItems="flex-start"
							justifyContent="center"
							height={'100%'}
							style={{ zIndex: 1 }}
						/>
					</Box>
				</Card>
			</Box>
		</PageSection>
	);
}
