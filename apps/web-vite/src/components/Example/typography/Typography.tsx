import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import type { TypographyRole, TypographyColor } from '../ui/Typography/Typography';
import { Typography as TypographyComponent } from '../ui/Typography/Typography';
import { Section } from '../ui/Section/Section';
import { Select } from '../ui/Select/Select';
import { Textarea } from '../ui/Textarea/Textarea';
import { styles as s } from './Typography.styles';

const roleOptions: TypographyRole[] = [
	'heading1',
	'heading2',
	'heading3',
	'heading4',
	'body',
	'bodySm',
	'caption',
	'label',
	'overline',
];

const colorOptions = [
	{ value: '', label: 'none (role default)' },
	{ value: 'text', label: 'text' },
	{ value: 'textSecondary', label: 'textSecondary' },
	{ value: 'textTertiary', label: 'textTertiary' },
	{ value: 'textInverse', label: 'textInverse' },
	{ value: 'textBrand', label: 'textBrand' },
	{ value: 'primary', label: 'primary' },
	{ value: 'secondary', label: 'secondary' },
	{ value: 'errorFg', label: 'errorFg' },
	{ value: 'successFg', label: 'successFg' },
	{ value: 'warningFg', label: 'warningFg' },
	{ value: 'infoFg', label: 'infoFg' },
	{ value: 'inherit', label: 'inherit' },
] as const;

const weightOptions = [
	{ value: '', label: 'role default' },
	{ value: 'thin', label: 'thin (100)' },
	{ value: 'light', label: 'light (300)' },
	{ value: 'regular', label: 'regular (400)' },
	{ value: 'medium', label: 'medium (500)' },
	{ value: 'semibold', label: 'semibold (600)' },
	{ value: 'bold', label: 'bold (700)' },
	{ value: 'black', label: 'black (900)' },
] as const;

type WeightKey = (typeof weightOptions)[number]['value'] & string;

const weightValueMap: Record<string, string> = {
	thin: '100',
	light: '300',
	regular: '400',
	medium: '500',
	semibold: '600',
	bold: '700',
	black: '900',
};

type ColorKey = (typeof colorOptions)[number]['value'] & string;

const fontSizeValues: Record<string, number> = {
	'2xs': 12,
	xs: 14,
	sm: 16,
	md: 18,
	lg: 22,
	xl: 24,
	'2xl': 28,
	'3xl': 32,
	'4xl': 40,
	'5xl': 56,
	'6xl': 72,
};

const fontWeightValues: Record<string, number> = {
	thin: 100,
	light: 300,
	regular: 400,
	medium: 500,
	semibold: 600,
	bold: 700,
	black: 900,
};

const lineHeightValues: Record<string, number> = {
	none: 1,
	tight: 1.25,
	normal: 1.5,
	relaxed: 1.75,
	loose: 2,
};

const letterSpacingValues: Record<string, string> = {
	tighter: '-0.05em',
	tight: '-0.025em',
	normal: '0',
	wide: '0.025em',
	wider: '0.05em',
	widest: '0.1em',
};

type RoleConfig = {
	fontSize: string;
	fontWeight: string;
	lineHeight: string;
	letterSpacing: string | null;
	color: string;
};

const roleConfigs: Record<TypographyRole, RoleConfig> = {
	heading1: {
		fontSize: '6xl',
		fontWeight: 'bold',
		lineHeight: 'tight',
		letterSpacing: 'tight',
		color: 'text',
	},
	heading2: {
		fontSize: '4xl',
		fontWeight: 'bold',
		lineHeight: 'tight',
		letterSpacing: 'tight',
		color: 'text',
	},
	heading3: {
		fontSize: '3xl',
		fontWeight: 'semibold',
		lineHeight: 'tight',
		letterSpacing: null,
		color: 'text',
	},
	heading4: {
		fontSize: '2xl',
		fontWeight: 'semibold',
		lineHeight: 'normal',
		letterSpacing: null,
		color: 'text',
	},
	body: {
		fontSize: 'md',
		fontWeight: 'regular',
		lineHeight: 'normal',
		letterSpacing: null,
		color: 'text',
	},
	bodySm: {
		fontSize: 'sm',
		fontWeight: 'regular',
		lineHeight: 'normal',
		letterSpacing: null,
		color: 'textSecondary',
	},
	caption: {
		fontSize: 'xs',
		fontWeight: 'regular',
		lineHeight: 'tight',
		letterSpacing: null,
		color: 'textTertiary',
	},
	label: {
		fontSize: 'xs',
		fontWeight: 'medium',
		lineHeight: 'tight',
		letterSpacing: 'wide',
		color: 'textSecondary',
	},
	overline: {
		fontSize: '2xs',
		fontWeight: 'semibold',
		lineHeight: 'none',
		letterSpacing: 'widest',
		color: 'textTertiary',
	},
};

const fontFamilyLabel = '"Google Sans Flex", system-ui, -apple-system, sans-serif';

const DEFAULT_TEXT =
	'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.';

type ResolvedRow = {
	property: string;
	token: string;
	value: string;
	colorRef?: string;
};

function getResolvedRows(
	role: TypographyRole,
	colorOverride: string,
	weightOverride: string
): ResolvedRow[] {
	const cfg = roleConfigs[role];
	const fs = fontSizeValues[cfg.fontSize];
	const actualWeightKey = weightOverride || cfg.fontWeight;
	const fw = fontWeightValues[actualWeightKey];
	const lh = lineHeightValues[cfg.lineHeight];
	const actualColor = colorOverride || cfg.color;

	const rows: ResolvedRow[] = [
		{ property: 'font-size', token: `fontSize.${cfg.fontSize}`, value: `${fs}px` },
		{ property: 'font-weight', token: `fontWeight.${actualWeightKey}`, value: `${fw}` },
		{ property: 'line-height', token: `lineHeight.${cfg.lineHeight}`, value: `${lh}` },
	];

	const ls = cfg.letterSpacing;
	if (ls) {
		rows.push({
			property: 'letter-spacing',
			token: `letterSpacing.${ls}`,
			value: letterSpacingValues[ls]!,
		});
	} else {
		rows.push({ property: 'letter-spacing', token: '—', value: 'normal' });
	}

	rows.push(
		{ property: 'font-family', token: 'fontFamily.body', value: fontFamilyLabel },
		{ property: 'color', token: `roles.${actualColor}`, value: actualColor, colorRef: actualColor }
	);

	return rows;
}

export function TypographyDemo() {
	const [role, setRole] = useState<TypographyRole>('body');
	const [color, setColor] = useState('');
	const [weight, setWeight] = useState('');
	const [text, setText] = useState(DEFAULT_TEXT);

	const resolvedRows = getResolvedRows(role, color as ColorKey, weight as WeightKey);

	return (
		<Section title="Typography">
			<div {...stylex.props(s.panel)}>
				<div {...stylex.props(s.controls)}>
					<div {...stylex.props(s.field)}>
						<Select
							label="Role"
							id="typo-role"
							value={role}
							onChange={(e) => setRole(e.target.value as TypographyRole)}
						>
							{roleOptions.map((r) => (
								<option key={r} value={r}>
									{r}
								</option>
							))}
						</Select>
					</div>

					<div {...stylex.props(s.field)}>
						<Select
							label="Color"
							id="typo-color"
							value={color}
							onChange={(e) => setColor(e.target.value)}
						>
							{colorOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</Select>
					</div>

					<div {...stylex.props(s.field)}>
						<Select
							id="typo-weight"
							value={weight}
							onChange={(e) => setWeight(e.target.value)}
							label="Font Weight"
						>
							{weightOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</Select>
					</div>
				</div>

				<Textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Type your text here…"
				/>

				<div {...stylex.props(s.preview)}>
					<div {...stylex.props(s.previewLabel)}>Preview</div>
					<TypographyComponent
						role={role}
						color={color ? (color as TypographyColor) : undefined}
						weight={weight ? weightValueMap[weight] : undefined}
					>
						{text}
					</TypographyComponent>
				</div>

				<div>
					<div {...stylex.props(s.previewLabel)}>Resolved Properties</div>
					<table {...stylex.props(s.table)}>
						<thead>
							<tr>
								<th {...stylex.props(s.th)}>Property</th>
								<th {...stylex.props(s.th)}>Token</th>
								<th {...stylex.props(s.th)}>Value</th>
							</tr>
						</thead>
						<tbody>
							{resolvedRows.map((row) => (
								<tr key={row.property}>
									<td {...stylex.props(s.td)}>{row.property}</td>
									<td {...stylex.props(s.td, s.tdMuted)}>{row.token}</td>
									<td {...stylex.props(s.td, s.tdValue)}>
										{(() => {
											const cr = row.colorRef;
											return cr ? (
												<>
													<span
														{...stylex.props(s.colorSwatch)}
														style={{ backgroundColor: `var(--role-${cr})` }}
													/>
													{row.value}
												</>
											) : (
												row.value
											);
										})()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</Section>
	);
}
