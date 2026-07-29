import * as stylex from '@stylexjs/stylex';
import { styles } from './ThemeVariables.styles';
import defaultTheme from '../../design-system/themes/default';
import { Grid } from '../Example/ui/Grid/Grid';
import { Stack } from '../Example/ui/Stack/Stack';
import { Inline } from '../Example/ui/Inline/Inline';
import { Box } from '../Example/ui/Box/Box';
import { Typography } from '../Example/ui/Typography/Typography';
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
const scales = ['100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;

function Swatch({ token, label }: { token: string; label: string }) {
	return (
		<div {...stylex.props(styles.swatch)}>
			<div {...stylex.props(styles.swatchColor)} style={{ backgroundColor: `var(--${token})` }} />
			<span {...stylex.props(styles.swatchLabel)}>{label}</span>
		</div>
	);
}

function FamilyRow({ family }: { family: string }) {
	return (
		<div {...stylex.props(styles.familyRow)}>
			<span {...stylex.props(styles.familyLabel)}>{family}</span>
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
			<header {...stylex.props(styles.header)}>
				<h1 {...stylex.props(styles.h1)}>Design Tokens</h1>
				<p {...stylex.props(styles.p)}>A visual reference of every theme variable.</p>
			</header>

			{/* Colors */}
			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.h2)}>Colors</h2>
				{colorFamilies.map((f) => (
					<FamilyRow key={f} family={f} />
				))}
				<div {...stylex.props(styles.familyRow)}>
					<span {...stylex.props(styles.familyLabel)}>base</span>
					<div {...stylex.props(styles.swatchGroup)}>
						<Swatch token="white" label="white" />
						<Swatch token="black" label="black" />
					</div>
				</div>
			</section>

			{/* Roles */}
			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.h2)}>Roles</h2>
				<Grid gap="lg">
					{Object.entries(theme.roles).map(([name, role]) => (
						<Grid.Item key={name} span={{ mobile: 2, tablet: 4, desktop: 3 }}>
							<div {...stylex.props(styles.card)}>
								<span {...stylex.props(styles.cardTitle)}>{name}</span>
								<div {...stylex.props(styles.rolePair)}>
									<div {...stylex.props(styles.roleSide)}>
										<span {...stylex.props(styles.roleLabel)}>on light</span>
										<div
											{...stylex.props(styles.roleColor)}
											style={{ backgroundColor: `var(--${role.light})` }}
										/>
										<span {...stylex.props(styles.roleLabel)}>{role.light}</span>
									</div>
									<span {...stylex.props(styles.arrow)}>→</span>
									<div {...stylex.props(styles.roleSide)}>
										<span {...stylex.props(styles.roleLabel)}>on dark</span>
										<div
											{...stylex.props(styles.roleColor)}
											style={{ backgroundColor: `var(--${role.dark})` }}
										/>
										<span {...stylex.props(styles.roleLabel)}>{role.dark}</span>
									</div>
								</div>
							</div>
						</Grid.Item>
					))}
				</Grid>
			</section>

			<ContractsDemo />

			{/* Spacing + Radii */}
			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.h2)}>Spacing &amp; Radii</h2>
				<Grid columns={2} gap="lg">
					<Grid.Item span={1}>
						<Typography role="overline" color="textSecondary">
							Spacing
						</Typography>
						{Object.entries(theme.spacing).map(([k, v]) => (
							<div key={k} {...stylex.props(styles.spacingRow)}>
								<span {...stylex.props(styles.spacingLabel)}>{k}</span>
								<div {...stylex.props(styles.spacingTrack)}>
									<div {...stylex.props(styles.spacingFill)} style={{ width: v > 0 ? v * 8 : 4 }} />
								</div>
								<span {...stylex.props(styles.spacingVal)}>{v}px</span>
							</div>
						))}
					</Grid.Item>
					<Grid.Item span={1}>
						<Typography role="overline" color="textSecondary">
							Radii
						</Typography>
						<div {...stylex.props(styles.radiiGrid)}>
							{Object.entries(theme.radii).map(([k, v]) => (
								<div key={k} {...stylex.props(styles.radiiCell)}>
									<div {...stylex.props(styles.radiiBox)} style={{ borderRadius: v }} />
									<span {...stylex.props(styles.radiiLabel)}>{k}</span>
									<span {...stylex.props(styles.radiiVal)}>{v}px</span>
								</div>
							))}
						</div>
					</Grid.Item>
				</Grid>
			</section>

			{/* Shadows */}
			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.h2)}>Shadows</h2>
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
			</section>

			{/* Gradients */}
			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.h2)}>Gradients</h2>
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
			</section>

			{/* Layout */}
			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.h2)}>Layout</h2>
				<Stack gap="lg" padding="none">
					<div>
						<Typography role="overline" color="textSecondary">
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
							<Typography role="overline" color="textSecondary">
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
							<Typography role="overline" color="textSecondary">
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
						<Typography role="overline" color="textSecondary">
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
			</section>

			{/* Component Tokens */}
			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.h2)}>Component Tokens</h2>
				<Grid columns={3} gap="sm">
					{Object.entries(theme.components).map(([name, token]) => (
						<Grid.Item key={name} span={1}>
							<div {...stylex.props(styles.card)}>
								<span {...stylex.props(styles.cardTitle)}>{name}</span>
								<div {...stylex.props(styles.compBody)}>
									{'light' in token ? (
										<>
											<div
												{...stylex.props(styles.compSwatch)}
												style={{ backgroundColor: `var(--${token.light})` }}
											/>
											<span>{token.light}</span>
											<div
												{...stylex.props(styles.compSwatch)}
												style={{ backgroundColor: `var(--${token.dark})` }}
											/>
											<span>{token.dark}</span>
										</>
									) : token.type === 'roles' ? (
										<span>→ roles.{token.value}</span>
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
			</section>
		</div>
	);
}

export default ThemeVariables;
