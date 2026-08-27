import * as stylex from '@stylexjs/stylex';
import { styles } from './ThemeVariables.styles';
import { defaultTheme } from '@repo/themes';
import type { ColorTokenLeaf } from '@repo/foundations';
import { Grid, Stack, Inline, Box, Typography, Card } from '@repo/ui-web-stylex';
import ContractsDemo from './ContractsDemo';

const colorFamilies = [
	'primary',
	'secondary',
	'neutral',
	'error',
	'info',
	'success',
	'warning',
] as const;
const scales = [
	'50',
	'100',
	'200',
	'300',
	'400',
	'500',
	'600',
	'700',
	'800',
	'900',
	'950',
] as const;

/** Extract the raw color-token name from a leaf (string or { base, alpha }). */
function leafBase(leaf: ColorTokenLeaf): string {
	return typeof leaf === 'string' ? leaf : leaf.base;
}

/** Human-readable label for a leaf. */
function leafLabel(leaf: ColorTokenLeaf): string {
	return typeof leaf === 'string' ? leaf : `${leaf.base} @ ${Math.round(leaf.alpha * 100)}%`;
}

function Swatch({ token, label }: { token: string; label: string }) {
	return (
		<div {...stylex.props(styles.swatch)}>
			<div {...stylex.props(styles.swatchColor)} style={{ backgroundColor: `var(--${token})` }} />
			<Typography role="bodySm" {...stylex.props(styles.swatchLabel)}>
				{label}
			</Typography>
		</div>
	);
}

function FamilyRow({ family }: { family: string }) {
	return (
		<div {...stylex.props(styles.familyRow)}>
			<Typography role="bodySm">{family}</Typography>
			<div {...stylex.props(styles.swatchGroup)}>
				{scales.map((s) => (
					<Swatch key={s} token={`${family}_${s}`} label={s} />
				))}
			</div>
		</div>
	);
}

function ThemeVariables() {
	const theme = defaultTheme;

	return (
		<div {...stylex.props(styles.page)}>
			<Card>
				<Typography role="heading3">Design Tokens</Typography>
				<Typography role="body">A visual reference of every theme variable.</Typography>
			</Card>

			{/* Colors */}
			<Card>
				<Typography role="heading4">Colors</Typography>
				{colorFamilies.map((f) => (
					<FamilyRow key={f} family={f} />
				))}
				<div {...stylex.props(styles.familyRow)}>
					<Typography role="bodySm">base</Typography>
					<div {...stylex.props(styles.swatchGroup)}>
						<Swatch token="white" label="white" />
						<Swatch token="black" label="black" />
					</div>
				</div>
			</Card>

			{/* Color Tokens */}
			<Card>
				<Typography role="heading4">Color Tokens</Typography>
				<Stack gap="lg" padding="none">
					{Object.entries(theme.colorTokens).map(([category, tokens]) => (
						<div key={category}>
							<Typography role="overline" color="text-secondary">
								{category}
							</Typography>
							<Grid gap="lg">
								{Object.entries(
									tokens as Record<string, { light: ColorTokenLeaf; dark: ColorTokenLeaf }>
								).map(([name, pair]) => (
									<Grid.Item key={name} span={{ mobile: 2, tablet: 4, desktop: 3 }}>
										<Card>
											<Typography>{name}</Typography>
											<div {...stylex.props(styles.rolePair)}>
												<div {...stylex.props(styles.roleSide)}>
													<Typography role="caption">on light</Typography>
													<div
														{...stylex.props(styles.roleColor)}
														style={{ backgroundColor: `var(--${leafBase(pair.light)})` }}
													/>
													<Typography role="caption">{leafLabel(pair.light)}</Typography>
												</div>
												<span {...stylex.props(styles.arrow)}>→</span>
												<div {...stylex.props(styles.roleSide)}>
													<Typography role="caption">on dark</Typography>
													<div
														{...stylex.props(styles.roleColor)}
														style={{ backgroundColor: `var(--${leafBase(pair.dark)})` }}
													/>
													<Typography role="caption">{leafLabel(pair.dark)}</Typography>
												</div>
											</div>
										</Card>
									</Grid.Item>
								))}
							</Grid>
						</div>
					))}
				</Stack>
			</Card>

			<ContractsDemo />

			{/* Spacing + Radii */}
			<Card>
				<Typography role="heading4">Spacing &amp; Radii</Typography>
				<Grid columns={2} gap="lg">
					<Grid.Item span={1}>
						<Typography role="overline" color="text-secondary">
							Spacing
						</Typography>
						{Object.entries(theme.spacing).map(([k, v]) => (
							<div key={k} {...stylex.props(styles.spacingRow)}>
								<Typography role="body">{k}</Typography>
								<div {...stylex.props(styles.spacingTrack)}>
									<div {...stylex.props(styles.spacingFill)} style={{ width: v > 0 ? v * 8 : 4 }} />
								</div>
								<Typography role="caption">{v}px</Typography>
							</div>
						))}
					</Grid.Item>
					<Grid.Item span={1}>
						<Typography role="overline" color="text-secondary">
							Radii
						</Typography>
						<div {...stylex.props(styles.radiiGrid)}>
							{Object.entries(theme.radii).map(([k, v]) => (
								<div key={k} {...stylex.props(styles.radiiCell)}>
									<div {...stylex.props(styles.radiiBox)} style={{ borderRadius: v }} />
									<Typography role="body">{k}</Typography>
									<Typography role="caption">{v}px</Typography>
								</div>
							))}
						</div>
					</Grid.Item>
				</Grid>
			</Card>

			{/* Shadows */}
			<Card>
				<Typography role="heading4">Shadows</Typography>
				<Grid gap="md">
					{Object.keys(theme.shadows).map((k) => (
						<Grid.Item key={k} span={{ mobile: 12, tablet: 6, desktop: 4 }}>
							<div style={{ padding: 20 }}>
								<div {...stylex.props(styles.card)} style={{ boxShadow: `var(--shadow-${k})` }}>
									<span {...stylex.props(styles.shadowLabel)}>{k}</span>
								</div>
							</div>
						</Grid.Item>
					))}
				</Grid>
			</Card>

			{/* Gradients */}
			<Card>
				<Typography role="heading4">Gradients</Typography>
				<Grid gap="md">
					{Object.entries(theme.gradients).map(([k, v]) => (
						<Grid.Item key={k} span={{ mobile: 12, tablet: 6, desktop: 4 }}>
							<div {...stylex.props(styles.gradientCard)}>
								<div
									{...stylex.props(styles.gradientBox)}
									style={{
										backgroundImage: v !== null ? `var(--gradient-${k})` : undefined,
										backgroundColor: v === null ? 'var(--neutral_200)' : undefined,
									}}
								/>
								<span {...stylex.props(styles.gradientLabel)}>{k}</span>
							</div>
						</Grid.Item>
					))}
				</Grid>
			</Card>

			{/* Layout */}
			<Card>
				<Typography role="heading4">Layout</Typography>
				<Stack gap="lg" padding="none">
					<div>
						<Typography role="overline" color="text-secondary">
							Breakpoints &amp; Container Widths
						</Typography>
						<div {...stylex.props(styles.tokenTable)}>
							{(['mobile', 'tablet', 'desktop', 'wide', 'ultra'] as const).map((bp) => (
								<Inline key={bp} gap="md" style={{ padding: '8px 12px' }}>
									<Box>
										<Typography role="bodySm" weight="700">
											{bp}
										</Typography>
									</Box>
									<Box>
										<Typography role="caption">{theme.breakpoints[bp]}px</Typography>
									</Box>
									<Box>
										<Typography role="caption">
											→{' '}
											{typeof theme.grid[bp].maxWidth === 'number'
												? `${theme.grid[bp].maxWidth}px`
												: theme.grid[bp].maxWidth}
										</Typography>
									</Box>
								</Inline>
							))}
						</div>
					</div>

					<Inline gap="lg" wrap={false} align="stretch">
						<Box flex={1}>
							<Typography role="overline" color="text-secondary">
								Gutter
							</Typography>
							<div {...stylex.props(styles.tokenTable)}>
								{(['mobile', 'tablet', 'desktop', 'wide', 'ultra'] as const).map((bp) => (
									<Inline key={bp} gap="md" style={{ padding: '8px 12px' }}>
										<Box>
											<Typography role="bodySm" weight="700">
												{bp}
											</Typography>
										</Box>
										<Box>
											<Typography role="caption">
												{theme.grid[bp].gutter} ({theme.spacing[theme.grid[bp].gutter]}px)
											</Typography>
										</Box>
									</Inline>
								))}
							</div>
						</Box>
						<Box flex={1}>
							<Typography role="overline" color="text-secondary">
								Margin
							</Typography>
							<div {...stylex.props(styles.tokenTable)}>
								{(['mobile', 'tablet', 'desktop', 'wide', 'ultra'] as const).map((bp) => (
									<Inline key={bp} gap="md" style={{ padding: '8px 12px' }}>
										<Box>
											<Typography role="bodySm" weight="700">
												{bp}
											</Typography>
										</Box>
										<Box>
											<Typography role="caption">
												{theme.grid[bp].margin} ({theme.spacing[theme.grid[bp].margin]}px)
											</Typography>
										</Box>
									</Inline>
								))}
							</div>
						</Box>
					</Inline>

					<div>
						<Typography role="overline" color="text-secondary">
							12-Column Grid ({theme.grid.desktop.columns} columns)
						</Typography>
						<Grid gap="sm" margin="sm" style={{ marginTop: 8 }}>
							{Array.from({ length: theme.grid.desktop.columns }, (_, i) => i + 1).map((n) => (
								<Grid.Item key={n} span={1}>
									<div {...stylex.props(styles.colDemo)}>{n}</div>
								</Grid.Item>
							))}
						</Grid>
					</div>
				</Stack>
			</Card>

			{/* Component Tokens */}
			<Card>
				<h2 {...stylex.props(styles.h2)}>Component Tokens</h2>
				<Grid columns={3} gap="sm">
					{Object.entries(theme.components).map(([name, token]) => (
						<Grid.Item key={name} span={1}>
							<div {...stylex.props(styles.card)}>
								<span {...stylex.props(styles.cardTitle)}>{name}</span>
								<div {...stylex.props(styles.compBody)}>
									{'light' in token && 'dark' in token ? (
										<>
											<div
												{...stylex.props(styles.compSwatch)}
												style={{
													backgroundColor: `var(--${leafBase(token.light as ColorTokenLeaf)}`,
												}}
											/>
											<span>{leafLabel(token.light as ColorTokenLeaf)}</span>
											<div
												{...stylex.props(styles.compSwatch)}
												style={{
													backgroundColor: `var(--${leafBase(token.dark as ColorTokenLeaf)}`,
												}}
											/>
											<span>{leafLabel(token.dark as ColorTokenLeaf)}</span>
										</>
									) : token.type === 'colorTokens' ? (
										<span>→ colorTokens.{token.value}</span>
									) : (
										<span>
											→ {token.type}.{token.value}
										</span>
									)}
								</div>
							</div>
						</Grid.Item>
					))}
				</Grid>
			</Card>
		</div>
	);
}

export default ThemeVariables;
