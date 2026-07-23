import * as stylex from '@stylexjs/stylex';
import { styles } from './ThemeVariables.styles';
import defaultTheme from '../../design-system/themes/default';

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
				<div {...stylex.props(styles.grid3)}>
					{Object.entries(theme.roles).map(([name, role]) => (
						<div key={name} {...stylex.props(styles.card)}>
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
					))}
				</div>
			</section>

			{/* Spacing + Radii */}
			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.h2)}>Spacing &amp; Radii</h2>
				<div {...stylex.props(styles.split)}>
					<div {...stylex.props(styles.splitCol)}>
						<h3 {...stylex.props(styles.h3)}>Spacing</h3>
						{Object.entries(theme.spacing).map(([k, v]) => (
							<div key={k} {...stylex.props(styles.spacingRow)}>
								<span {...stylex.props(styles.spacingLabel)}>{k}</span>
								<div {...stylex.props(styles.spacingTrack)}>
									<div {...stylex.props(styles.spacingFill)} style={{ width: v > 0 ? v * 8 : 4 }} />
								</div>
								<span {...stylex.props(styles.spacingVal)}>{v}px</span>
							</div>
						))}
					</div>
					<div {...stylex.props(styles.splitCol)}>
						<h3 {...stylex.props(styles.h3)}>Radii</h3>
						<div {...stylex.props(styles.radiiGrid)}>
							{Object.entries(theme.radii).map(([k, v]) => (
								<div key={k} {...stylex.props(styles.radiiCell)}>
									<div {...stylex.props(styles.radiiBox)} style={{ borderRadius: v }} />
									<span {...stylex.props(styles.radiiLabel)}>{k}</span>
									<span {...stylex.props(styles.radiiVal)}>{v}px</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Shadows */}
			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.h2)}>Shadows</h2>
				<div {...stylex.props(styles.shadowGrid)}>
					{Object.entries(theme.shadows).map(([k, v]) => (
						<div key={k} {...stylex.props(styles.shadowCard)}>
							<div
								{...stylex.props(styles.shadowBox)}
								style={{ boxShadow: `var(--shadow-${k})` }}
							/>
							<span {...stylex.props(styles.shadowLabel)}>{k}</span>
						</div>
					))}
				</div>
			</section>

			{/* Gradients */}
			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.h2)}>Gradients</h2>
				<div {...stylex.props(styles.gradientGrid)}>
					{Object.entries(theme.gradients).map(([k, v]) => (
						<div key={k} {...stylex.props(styles.gradientCard)}>
							<div
								{...stylex.props(styles.gradientBox)}
								style={{
									backgroundImage: v !== null ? `var(--gradient-${k})` : undefined,
									backgroundColor: v === null ? 'var(--neutral_200)' : undefined,
								}}
							/>
							<span {...stylex.props(styles.gradientLabel)}>{k}</span>
						</div>
					))}
				</div>
			</section>

			{/* Component Tokens */}
			<section {...stylex.props(styles.section)}>
				<h2 {...stylex.props(styles.h2)}>Component Tokens</h2>
				<div {...stylex.props(styles.grid2)}>
					{Object.entries(theme.components).map(([name, token]) => (
						<div key={name} {...stylex.props(styles.card)}>
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
					))}
				</div>
			</section>
		</div>
	);
}

export default ThemeVariables;
