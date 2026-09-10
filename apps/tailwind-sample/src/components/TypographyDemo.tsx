import { useState } from 'react';
import { Box, Card, PageSection, Select, Typography } from '@repo/ui-web-tailwind';
import type { TypographyRole, TypographyColor } from '@repo/ui-web-tailwind';
import type { FontSizeToken, LineHeightToken, LetterSpacingToken } from '@repo/foundations';
import { colorTokenVar, spacingVar, fontFamilyVar } from '@repo/ui-web-tailwind';

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

type TypographyDemoProps = { fontFamily: string };

const DEFAULT_TEXT =
	'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.';

const MONO = fontFamilyVar('mono');
const BORDER = `1px solid ${colorTokenVar('border-secondary')}`;

const TH_STYLE: React.CSSProperties = {
	textAlign: 'left',
	padding: '6px 12px',
	borderBottom: BORDER,
	color: colorTokenVar('text-tertiary'),
	fontWeight: 600,
	textTransform: 'uppercase',
	fontSize: 10,
	letterSpacing: '0.5px',
};
const TD_STYLE: React.CSSProperties = {
	padding: '6px 12px',
	borderBottom: BORDER,
	color: colorTokenVar('text-primary'),
	whiteSpace: 'nowrap',
};
const TD_MUTED: React.CSSProperties = { ...TD_STYLE, color: colorTokenVar('text-secondary') };
const TD_VALUE: React.CSSProperties = { ...TD_STYLE, fontWeight: 500 };
const LABEL_STYLE: React.CSSProperties = {
	fontFamily: MONO,
	fontSize: 10,
	fontWeight: 600,
	letterSpacing: '0.5px',
	textTransform: 'uppercase',
};
const TABLE_STYLE: React.CSSProperties = {
	width: '100%',
	borderCollapse: 'collapse',
	fontFamily: MONO,
	fontSize: 12,
};

type ResolvedRow = { property: string; token: string; value: string };

function getResolvedRows(
	role: TypographyRole,
	colorOverride: string,
	weightOverride: string,
	sizeOverride: string,
	lineHeightOverride: string,
	letterSpacingOverride: string,
	fontFamilyValue: string
): ResolvedRow[] {
	const cfg = roleConfigs[role];
	const sk = sizeOverride || cfg.fontSize;
	const wk = weightOverride || cfg.fontWeight;
	const lk = lineHeightOverride || cfg.lineHeight;
	const lsk = letterSpacingOverride || cfg.letterSpacing;
	const color = colorOverride || cfg.color;
	const rows: ResolvedRow[] = [
		{ property: 'font-size', token: `fontSize.${sk}`, value: `${fontSizeValues[sk]}px` },
		{ property: 'font-weight', token: `fontWeight.${wk}`, value: `${fontWeightValues[wk]}` },
		{ property: 'line-height', token: `lineHeight.${lk}`, value: `${lineHeightValues[lk]}` },
	];
	if (lsk)
		rows.push({
			property: 'letter-spacing',
			token: `letterSpacing.${lsk}`,
			value: letterSpacingValues[lsk] || 'normal',
		});
	else rows.push({ property: 'letter-spacing', token: '-', value: 'normal' });
	rows.push({ property: 'font-family', token: 'fontFamily', value: fontFamilyValue });
	rows.push({ property: 'color', token: `colorTokens.${color}`, value: color });
	return rows;
}

function buildCodeString(
	role: TypographyRole,
	size: string,
	weight: string,
	lh: string,
	ls: string,
	color: string
): string {
	const a = [`role="${role}"`];
	if (size) a.push(`size="${size}"`);
	if (weight) a.push(`weight="${weight}"`);
	if (lh) a.push(`lineHeight="${lh}"`);
	if (ls) a.push(`letterSpacing="${ls}"`);
	if (color) a.push(`color="${color}"`);
	return `<Typography ${a.join(' ')}>\n  ...\n</Typography>`;
}

function ThCell({ children }: { children: React.ReactNode }) {
	return (
		<th style={TH_STYLE}>
			<Typography role="caption">{children}</Typography>
		</th>
	);
}

function TdCell({
	children,
	muted,
	value,
}: {
	children: React.ReactNode;
	muted?: boolean;
	value?: boolean;
}) {
	return <td style={value ? TD_VALUE : muted ? TD_MUTED : TD_STYLE}>{children}</td>;
}

export function TypographyDemo({ fontFamily }: TypographyDemoProps) {
	const [role, setRole] = useState<TypographyRole>('p');
	const [color, setColor] = useState('');
	const [weight, setWeight] = useState('');
	const [size, setSize] = useState('');
	const [lineHeight, setLineHeight] = useState('');
	const [letterSpacing, setLetterSpacing] = useState('');
	const [text, setText] = useState(DEFAULT_TEXT);

	const resolvedRows = getResolvedRows(
		role,
		color,
		weight,
		size,
		lineHeight,
		letterSpacing,
		fontFamily
	);
	const codePreview = buildCodeString(role, size, weight, lineHeight, letterSpacing, color);
	const cfg = roleConfigs[role];
	const tag = roleTagMap[role];

	return (
		<PageSection padding="lg">
			<Box display="flex" flexDirection="column" gap="md" marginBottom="xl">
				<Typography role="h2">Typography Playground</Typography>
				<Typography role="p" color="text-secondary" className="max-w-prose">
					Select a role and override individual properties to see how the Typography component
					resolves tokens.
				</Typography>
			</Box>

			<Card variant="surface" style={{ gap: spacingVar('lg') }}>
				{/* Role description */}
				<Box
					padding="md"
					background="bg-secondary"
					borderRadius="md"
					style={{
						fontFamily: fontFamilyVar('mono'),
						fontSize: 12,
						lineHeight: 1.6,
						color: colorTokenVar('text-secondary'),
					}}
				>
					<Typography role="caption" color="text-secondary">
						{`<${tag}>`} — fontSize: {cfg.fontSize} ({fontSizeValues[cfg.fontSize]}px), weight:{' '}
						{cfg.fontWeight} ({fontWeightValues[cfg.fontWeight]}), lineHeight: {cfg.lineHeight} (
						{lineHeightValues[cfg.lineHeight]})
						{cfg.letterSpacing ? (
							<>
								, letterSpacing: {cfg.letterSpacing} ({letterSpacingValues[cfg.letterSpacing]})
							</>
						) : null}
					</Typography>
				</Box>
				{/* Controls */}
				<Box display="flex" flexWrap="wrap" gap="md" alignItems="flex-end">
					<Box className="min-w-[160px]">
						<Select
							label="Role"
							id="tw-role"
							value={role}
							onChange={(e) => setRole(e.target.value as TypographyRole)}
						>
							{roleOptions.map((r) => (
								<Select.Item key={r} value={r}>
									{r}
								</Select.Item>
							))}
						</Select>
					</Box>
					<Box className="min-w-[160px]">
						<Select
							label="Size"
							id="tw-size"
							value={size}
							onChange={(e) => setSize(e.target.value)}
						>
							{sizeOptions.map((o) => (
								<Select.Item key={o.value} value={o.value}>
									{o.label}
								</Select.Item>
							))}
						</Select>
					</Box>
					<Box className="min-w-[160px]">
						<Select
							label="Weight"
							id="tw-weight"
							value={weight}
							onChange={(e) => setWeight(e.target.value)}
						>
							{weightOptions.map((o) => (
								<Select.Item key={o.value} value={o.value}>
									{o.label}
								</Select.Item>
							))}
						</Select>
					</Box>
					<Box className="min-w-[160px]">
						<Select
							label="Line Height"
							id="tw-lh"
							value={lineHeight}
							onChange={(e) => setLineHeight(e.target.value)}
						>
							{lineHeightOptions.map((o) => (
								<Select.Item key={o.value} value={o.value}>
									{o.label}
								</Select.Item>
							))}
						</Select>
					</Box>
					<Box className="min-w-[160px]">
						<Select
							label="Letter Spacing"
							id="tw-ls"
							value={letterSpacing}
							onChange={(e) => setLetterSpacing(e.target.value)}
						>
							{letterSpacingOptions.map((o) => (
								<Select.Item key={o.value} value={o.value}>
									{o.label}
								</Select.Item>
							))}
						</Select>
					</Box>
					<Box className="min-w-[160px]">
						<Select
							label="Color"
							id="tw-color"
							value={color}
							onChange={(e) => setColor(e.target.value)}
						>
							{colorOptions.map((o) => (
								<Select.Item key={o.value} value={o.value}>
									{o.label}
								</Select.Item>
							))}
						</Select>
					</Box>
				</Box>

				{/* Editable text */}
				<Box>
					<Typography role="label">Preview Text</Typography>
					<textarea
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Type your text here…"
						rows={3}
						style={{
							width: '100%',
							padding: '8px 12px',
							borderRadius: 'var(--components-input-border-radii)',
							border: `1px solid ${colorTokenVar('border-primary')}`,
							backgroundColor: colorTokenVar('bg-primary'),
							color: colorTokenVar('text-primary'),
							fontFamily: fontFamilyVar('body'),
							fontSize: 14,
							resize: 'vertical',
							outline: 'none',
						}}
					/>
				</Box>

				{/* Live preview */}
				<Card variant="surface">
					<Typography>Preview</Typography>
					<Typography
						role={role}
						color={color ? (color as TypographyColor) : undefined}
						weight={weight || undefined}
						size={size ? (size as FontSizeToken) : undefined}
						lineHeight={lineHeight ? (lineHeight as LineHeightToken) : undefined}
						letterSpacing={letterSpacing ? (letterSpacing as LetterSpacingToken) : undefined}
					>
						{text}
					</Typography>
				</Card>

				{/* Code preview */}
				<Box>
					<Box marginBottom="sm">
						<Typography role="caption" color="text-tertiary" style={LABEL_STYLE}>
							Code
						</Typography>
					</Box>
					<Box
						background="bg-secondary"
						borderRadius="md"
						padding="sm"
						style={{ overflowX: 'auto' }}
					>
						<Typography role="caption">{codePreview}</Typography>
					</Box>
				</Box>

				{/* Resolved properties table */}
				<Box>
					<Box marginBottom="sm">
						<Typography role="caption" color="text-tertiary" style={LABEL_STYLE}>
							Resolved Properties
						</Typography>
					</Box>
					<table style={TABLE_STYLE}>
						<thead>
							<tr>
								<ThCell>Property</ThCell>
								<ThCell>Token</ThCell>
								<ThCell>Value</ThCell>
							</tr>
						</thead>
						<tbody>
							{resolvedRows.map((row) => (
								<tr key={row.property}>
									<TdCell>
										<Typography role="caption">{row.property}</Typography>
									</TdCell>
									<TdCell muted>
										<Typography role="caption" textEllipsis>
											{row.token}
										</Typography>
									</TdCell>
									<TdCell value>
										<Typography role="caption" textEllipsis>
											{row.value}
										</Typography>
									</TdCell>
								</tr>
							))}
							<tr>
								<TdCell>
									<Typography role="caption">html-tag</Typography>
								</TdCell>
								<TdCell muted>
									<Typography role="caption">role → tag</Typography>
								</TdCell>
								<TdCell value>
									<Typography role="caption">{`<${tag}>`}</Typography>
								</TdCell>
							</tr>
							{(role === 'h1' || role === 'h2' || role === 'h3' || role === 'h4') && (
								<tr>
									<TdCell>
										<Typography role="caption">aria</Typography>
									</TdCell>
									<TdCell muted>
										<Typography role="caption">role + level</Typography>
									</TdCell>
									<TdCell value>
										<Typography role="caption">{`role="heading" aria-level="${role.charAt(1)}"`}</Typography>
									</TdCell>
								</tr>
							)}
						</tbody>
					</table>
				</Box>
			</Card>
		</PageSection>
	);
}
