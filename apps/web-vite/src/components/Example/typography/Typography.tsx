import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import {
	Typography as TypographyComponent,
	Section,
	Select,
	Textarea,
	Card,
	type TypographyRole,
	type TypographyColor,
	Typography,
} from '@repo/ui-web-stylex';
import { styles as s } from './Typography.styles';

const roleOptions: TypographyRole[] = ['h1', 'h2', 'h3', 'h4', 'p', 'caption', 'label', 'overline'];

const colorOptions = [
	{ value: '', label: 'none (role default)' },
	{ value: 'text-primary', label: 'text-primary' },
	{ value: 'text-secondary', label: 'text-secondary' },
	{ value: 'text-tertiary', label: 'text-tertiary' },
	{ value: 'text-quaternary', label: 'text-quaternary' },
	{ value: 'text-white', label: 'text-white' },
	{ value: 'text-placeholder', label: 'text-placeholder' },
	{ value: 'text-brand-primary', label: 'text-brand-primary' },
	{ value: 'text-brand-secondary', label: 'text-brand-secondary' },
	{ value: 'text-brand-tertiary', label: 'text-brand-tertiary' },
	{ value: 'text-error-primary', label: 'text-error-primary' },
	{ value: 'text-success-primary', label: 'text-success-primary' },
	{ value: 'text-warning-primary', label: 'text-warning-primary' },
	{ value: 'text-info-primary', label: 'text-info-primary' },
	{ value: 'inherit', label: 'inherit' },
] as const;

const sizeOptions = [
	{ value: '', label: 'role default' },
	{ value: 'xxs', label: 'xxs (12px)' },
	{ value: 'xs', label: 'xs (14px)' },
	{ value: 'sm', label: 'sm (16px)' },
	{ value: 'md', label: 'md (18px)' },
	{ value: 'lg', label: 'lg (20px)' },
	{ value: 'xl', label: 'xl (24px)' },
	{ value: '2xl', label: '2xl (30px)' },
	{ value: '3xl', label: '3xl (36px)' },
	{ value: '4xl', label: '4xl (48px)' },
	{ value: '5xl', label: '5xl (60px)' },
	{ value: '6xl', label: '6xl (72px)' },
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

const lineHeightOptions = [
	{ value: '', label: 'role default' },
	{ value: 'none', label: 'none (1.0)' },
	{ value: 'tight', label: 'tight (1.25)' },
	{ value: 'normal', label: 'normal (1.5)' },
	{ value: 'relaxed', label: 'relaxed (1.75)' },
	{ value: 'loose', label: 'loose (2.0)' },
] as const;

const letterSpacingOptions = [
	{ value: '', label: 'role default' },
	{ value: 'tighter', label: 'tighter (-0.05em)' },
	{ value: 'tight', label: 'tight (-0.025em)' },
	{ value: 'normal', label: 'normal (0)' },
	{ value: 'wide', label: 'wide (0.025em)' },
	{ value: 'wider', label: 'wider (0.05em)' },
	{ value: 'widest', label: 'widest (0.1em)' },
] as const;

const fontSizeValues: Record<string, number> = {
	xxs: 12,
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
	h1: {
		fontSize: '6xl',
		fontWeight: 'bold',
		lineHeight: 'normal',
		letterSpacing: 'tight',
		color: 'text-primary',
	},
	h2: {
		fontSize: '5xl',
		fontWeight: 'bold',
		lineHeight: 'normal',
		letterSpacing: 'tight',
		color: 'text-primary',
	},
	h3: {
		fontSize: '4xl',
		fontWeight: 'semibold',
		lineHeight: 'normal',
		letterSpacing: null,
		color: 'text-primary',
	},
	h4: {
		fontSize: '3xl',
		fontWeight: 'semibold',
		lineHeight: 'normal',
		letterSpacing: null,
		color: 'text-primary',
	},
	p: {
		fontSize: 'md',
		fontWeight: 'regular',
		lineHeight: 'normal',
		letterSpacing: null,
		color: 'text-primary',
	},
	caption: {
		fontSize: 'xs',
		fontWeight: 'medium',
		lineHeight: 'normal',
		letterSpacing: null,
		color: 'text-primary',
	},
	label: {
		fontSize: 'sm',
		fontWeight: 'medium',
		lineHeight: 'tight',
		letterSpacing: null,
		color: 'text-primary',
	},
	overline: {
		fontSize: 'xxs',
		fontWeight: 'semibold',
		lineHeight: 'tight',
		letterSpacing: 'wider',
		color: 'text-primary',
	},
};

const roleTagMap: Record<TypographyRole, string> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	p: 'p',
	caption: 'span',
	label: 'span',
	overline: 'span',
};

const fontFamilyLabel =
	typeof window !== 'undefined'
		? getComputedStyle(document.documentElement)
				.getPropertyValue('--typography-fontFamily')
				.trim() || '"Google Sans Flex", system-ui, -apple-system, sans-serif'
		: '"Google Sans Flex", system-ui, -apple-system, sans-serif';

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
	weightOverride: string,
	sizeOverride: string,
	lineHeightOverride: string,
	letterSpacingOverride: string
): ResolvedRow[] {
	const cfg = roleConfigs[role];
	const actualSizeKey = sizeOverride || cfg.fontSize;
	const actualWeightKey = weightOverride || cfg.fontWeight;
	const actualLineHeightKey = lineHeightOverride || cfg.lineHeight;
	const actualLetterSpacingKey = letterSpacingOverride || cfg.letterSpacing;
	const actualColor = colorOverride || cfg.color;

	const fs = fontSizeValues[actualSizeKey];
	const fw = fontWeightValues[actualWeightKey];
	const lh = lineHeightValues[actualLineHeightKey];

	const rows: ResolvedRow[] = [
		{ property: 'font-size', token: `fontSize.${actualSizeKey}`, value: `${fs}px` },
		{ property: 'font-weight', token: `fontWeight.${actualWeightKey}`, value: `${fw}` },
		{ property: 'line-height', token: `lineHeight.${actualLineHeightKey}`, value: `${lh}` },
	];

	if (actualLetterSpacingKey) {
		rows.push({
			property: 'letter-spacing',
			token: `letterSpacing.${actualLetterSpacingKey}`,
			value: letterSpacingValues[actualLetterSpacingKey] || 'normal',
		});
	} else {
		rows.push({ property: 'letter-spacing', token: '-', value: 'normal' });
	}

	rows.push(
		{ property: 'font-family', token: 'fontFamily', value: fontFamilyLabel },
		{
			property: 'color',
			token: `colorTokens.${actualColor}`,
			value: actualColor,
			colorRef: actualColor,
		}
	);

	return rows;
}

function buildCodeString(
	role: TypographyRole,
	sizeOverride: string,
	weightOverride: string,
	lineHeightOverride: string,
	letterSpacingOverride: string,
	colorOverride: string
): string {
	const attrs: string[] = [`role="${role}"`];
	if (sizeOverride) attrs.push(`size="${sizeOverride}"`);
	if (weightOverride) attrs.push(`weight="${weightOverride}"`);
	if (lineHeightOverride) attrs.push(`lineHeight="${lineHeightOverride}"`);
	if (letterSpacingOverride) attrs.push(`letterSpacing="${letterSpacingOverride}"`);
	if (colorOverride) attrs.push(`color="${colorOverride}"`);
	return `<Typography ${attrs.join(' ')}>\n  ...\n</Typography>`;
}

export function TypographyDemo() {
	const [role, setRole] = useState<TypographyRole>('p');
	const [color, setColor] = useState('');
	const [weight, setWeight] = useState('');
	const [size, setSize] = useState('');
	const [lineHeight, setLineHeight] = useState('');
	const [letterSpacing, setLetterSpacing] = useState('');
	const [text, setText] = useState(DEFAULT_TEXT);

	const resolvedRows = getResolvedRows(role, color, weight, size, lineHeight, letterSpacing);
	const codePreview = buildCodeString(role, size, weight, lineHeight, letterSpacing, color);
	const cfg = roleConfigs[role];
	const tag = roleTagMap[role];

	return (
		<Section title="Typography">
			<div {...stylex.props(s.panel)}>
				{/* Role description */}
				<div {...stylex.props(s.description)}>
					<Typography role="caption" color="text-tertiary">
						<code>{`<${tag}>`}</code> — fontSize: <code>{cfg.fontSize}</code> (
						{fontSizeValues[cfg.fontSize]}px), weight: <code>{cfg.fontWeight}</code> (
						{fontWeightValues[cfg.fontWeight]}), lineHeight: <code>{cfg.lineHeight}</code> (
						{lineHeightValues[cfg.lineHeight]})
						{cfg.letterSpacing ? (
							<>
								, letterSpacing: <code>{cfg.letterSpacing}</code> (
								{letterSpacingValues[cfg.letterSpacing]})
							</>
						) : null}
					</Typography>
				</div>

				{/* Controls */}
				<div {...stylex.props(s.controls)}>
					<div {...stylex.props(s.field)}>
						<Select
							label="Role"
							id="typo-role"
							value={role}
							onChange={(e) => setRole(e.target.value as TypographyRole)}
						>
							{roleOptions.map((r) => (
								<Select.Item key={r} value={r}>
									{r}
								</Select.Item>
							))}
						</Select>
					</div>

					<div {...stylex.props(s.field)}>
						<Select
							label="Size"
							id="typo-size"
							value={size}
							onChange={(e) => setSize(e.target.value)}
						>
							{sizeOptions.map((opt) => (
								<Select.Item key={opt.value} value={opt.value}>
									{opt.label}
								</Select.Item>
							))}
						</Select>
					</div>

					<div {...stylex.props(s.field)}>
						<Select
							label="Weight"
							id="typo-weight"
							value={weight}
							onChange={(e) => setWeight(e.target.value)}
						>
							{weightOptions.map((opt) => (
								<Select.Item key={opt.value} value={opt.value}>
									{opt.label}
								</Select.Item>
							))}
						</Select>
					</div>

					<div {...stylex.props(s.field)}>
						<Select
							label="Line Height"
							id="typo-lh"
							value={lineHeight}
							onChange={(e) => setLineHeight(e.target.value)}
						>
							{lineHeightOptions.map((opt) => (
								<Select.Item key={opt.value} value={opt.value}>
									{opt.label}
								</Select.Item>
							))}
						</Select>
					</div>

					<div {...stylex.props(s.field)}>
						<Select
							label="Letter Spacing"
							id="typo-ls"
							value={letterSpacing}
							onChange={(e) => setLetterSpacing(e.target.value)}
						>
							{letterSpacingOptions.map((opt) => (
								<Select.Item key={opt.value} value={opt.value}>
									{opt.label}
								</Select.Item>
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
								<Select.Item key={opt.value} value={opt.value}>
									{opt.label}
								</Select.Item>
							))}
						</Select>
					</div>
				</div>

				{/* Editable text */}
				<Textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Type your text here…"
				/>

				{/* Live preview */}
				<Card>
					<Typography>Preview</Typography>
					<TypographyComponent
						role={role}
						color={color ? (color as TypographyColor) : undefined}
						weight={weight || undefined}
						size={size || undefined}
						lineHeight={lineHeight || undefined}
						letterSpacing={letterSpacing || undefined}
					>
						{text}
					</TypographyComponent>
				</Card>

				{/* Code preview */}
				<div>
					<div {...stylex.props(s.previewLabel)}>
						<Typography>Code</Typography>
					</div>
					<div {...stylex.props(s.codeBlock)}>
						<code {...stylex.props(s.codeText)}>{codePreview}</code>
					</div>
				</div>

				{/* Resolved properties table */}
				<div>
					<div {...stylex.props(s.previewLabel)}>
						<Typography>Resolved Properties</Typography>
					</div>
					<table {...stylex.props(s.table)}>
						<thead>
							<tr>
								<th {...stylex.props(s.th)}>
									<Typography>Property</Typography>
								</th>
								<th {...stylex.props(s.th)}>
									<Typography>Token</Typography>
								</th>
								<th {...stylex.props(s.th)}>
									<Typography>Value</Typography>
								</th>
							</tr>
						</thead>
						<tbody>
							{resolvedRows.map((row) => (
								<tr key={row.property}>
									<td {...stylex.props(s.td)}>
										<Typography role="caption">{row.property}</Typography>
									</td>
									<td {...stylex.props(s.td, s.tdMuted)}>
										<Typography role="caption">{row.token}</Typography>
									</td>
									<td {...stylex.props(s.td, s.tdValue)}>
										<Typography role="caption">
											{(() => {
												const cr = row.colorRef;
												return cr ? (
													<>
														<span
															{...stylex.props(s.colorSwatch)}
															style={{ backgroundColor: `var(--ct-${cr})` }}
														/>
														{row.value}
													</>
												) : (
													row.value
												);
											})()}
										</Typography>
									</td>
								</tr>
							))}
							<tr>
								<td {...stylex.props(s.td)}>
									<Typography role="caption">html-tag</Typography>
								</td>
								<td {...stylex.props(s.td, s.tdMuted)}>
									<Typography role="caption">role → tag</Typography>
								</td>
								<td {...stylex.props(s.td, s.tdValue)}>
									<Typography role="caption">{`<${tag}>`}</Typography>
								</td>
							</tr>
							{(role === 'h1' || role === 'h2' || role === 'h3' || role === 'h4') && (
								<tr>
									<td {...stylex.props(s.td)}>
										<Typography role="caption">aria</Typography>
									</td>
									<td {...stylex.props(s.td, s.tdMuted)}>
										<Typography role="caption">role + level</Typography>
									</td>
									<td {...stylex.props(s.td, s.tdValue)}>
										<Typography role="caption">{`role="heading" aria-level="${role.charAt(1)}"`}</Typography>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</Section>
	);
}
