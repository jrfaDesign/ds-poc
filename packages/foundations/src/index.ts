import { z } from 'zod';

// ---------------------------------------------
// BASE TYPES
// ---------------------------------------------
type ColorScale =
	'50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950';
type CoreColorFamily =
	'primary' | 'secondary' | 'neutral' | 'error' | 'success' | 'warning' | 'info';
type AccentColorFamily = 'primary_accent' | 'secondary_accent';
type ColorFamily = CoreColorFamily | AccentColorFamily;

/** Families a theme MUST explicitly provide when calling `createTheme`. */
export type ThemeMandatoryFamily = 'primary' | 'secondary' | 'neutral';

export type ColorToken = `${ColorFamily}_${ColorScale}` | 'white' | 'black' | 'transparent';

// ---------------------------------------------
// COLORS SCHEMA
// ---------------------------------------------
const ColorValueSchema = z.union([z.string().regex(/^#/), z.literal('transparent')]);

const coreColorFamilies = [
	'primary',
	'secondary',
	'neutral',
	'error',
	'success',
	'warning',
	'info',
] as const satisfies readonly CoreColorFamily[];

const optionalColorFamilies = [
	'primary_accent',
	'secondary_accent',
] as const satisfies readonly AccentColorFamily[];

const colorScales = [
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
] as const satisfies readonly ColorScale[];

/** Raw color palette - hex values organized by family and scale (50-950). The 7 core families are mandatory; the *_accent families are optional. */
const ColorsSchema = z
	.object(
		(() => {
			const obj: Record<string, z.ZodTypeAny> = {
				white: ColorValueSchema,
				black: ColorValueSchema,
				transparent: ColorValueSchema,
			};
			coreColorFamilies.forEach((family) => {
				colorScales.forEach((scale) => {
					obj[`${family}_${scale}`] = ColorValueSchema;
				});
			});
			optionalColorFamilies.forEach((family) => {
				colorScales.forEach((scale) => {
					obj[`${family}_${scale}`] = ColorValueSchema.optional();
				});
			});
			return obj as Record<ColorToken, z.ZodTypeAny>;
		})()
	)
	.strict();

const colorTokenKeysRaw = [
	'white',
	'black',
	'transparent',
	...coreColorFamilies.flatMap((family) =>
		colorScales.map((scale) => `${family}_${scale}` as ColorToken)
	),
	...optionalColorFamilies.flatMap((family) =>
		colorScales.map((scale) => `${family}_${scale}` as ColorToken)
	),
] as const satisfies readonly ColorToken[];

export const ColorTokenSchema = z.custom<ColorToken>(
	(val): val is ColorToken =>
		typeof val === 'string' && (colorTokenKeysRaw as readonly string[]).includes(val)
);

// ---------------------------------------------
// COLOR TOKENS (formerly "Roles")
// ---------------------------------------------
// A leaf can be a raw color token, or a raw color token with an alpha opacity
// (e.g. { base: 'black', alpha: 0.1 } -> "black at 10% opacity").
const ColorTokenLeafSchema = z.union([
	ColorTokenSchema,
	z.object({ base: ColorTokenSchema, alpha: z.number().min(0).max(1) }),
]);

export type ColorTokenLeaf = z.infer<typeof ColorTokenLeafSchema>;

const ColorTokenPairSchema = z.object({
	light: ColorTokenLeafSchema,
	dark: ColorTokenLeafSchema,
});

// TEXT color tokens
const textColorTokenKeys = [
	'text-primary',
	'text-primary_on-brand',
	'text-secondary',
	'text-secondary_hover',
	'text-secondary_on-brand',
	'text-tertiary',
	'text-tertiary_hover',
	'text-tertiary_on-brand',
	'text-quaternary',
	'text-quaternary_on-brand',
	'text-white',
	'text-placeholder',
	'text-brand-primary',
	'text-brand-secondary',
	'text-brand-secondary_hover',
	'text-brand-tertiary',
	'text-brand-tertiary_alt',
	'text-error-primary',
	'text-warning-primary',
	'text-success-primary',
	'text-info-primary',
] as const;

// BORDER color tokens
const borderColorTokenKeys = [
	'border-primary',
	'border-secondary',
	'border-secondary_alt',
	'border-tertiary',
	'border-brand',
	'border-brand_alt',
	'border-error',
	'border-error_subtle',
] as const;

// FOREGROUND (fg) color tokens
const fgColorTokenKeys = [
	'fg-primary',
	'fg-secondary',
	'fg-secondary_hover',
	'fg-tertiary',
	'fg-tertiary_hover',
	'fg-quaternary',
	'fg-quaternary_hover',
	'fg-white',
	'fg-brand-primary',
	'fg-brand-primary_alt',
	'fg-brand-secondary',
	'fg-brand-secondary_alt',
	'fg-error-primary',
	'fg-error-secondary',
	'fg-warning-primary',
	'fg-warning-secondary',
	'fg-success-primary',
	'fg-success-secondary',
	'fg-info-primary',
	'fg-info-secondary',
] as const;

// BACKGROUND (bg) color tokens
const bgColorTokenKeys = [
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

// UTILITY color tokens
const utilityColorTokenKeys = [
	// neutral
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
	// primary (brand -> primary)
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
	// error
	'utility-error-50',
	'utility-error-100',
	'utility-error-200',
	'utility-error-300',
	'utility-error-400',
	'utility-error-500',
	'utility-error-600',
	'utility-error-700',
	// warning
	'utility-warning-50',
	'utility-warning-100',
	'utility-warning-200',
	'utility-warning-300',
	'utility-warning-400',
	'utility-warning-500',
	'utility-warning-600',
	'utility-warning-700',
	// success
	'utility-success-50',
	'utility-success-100',
	'utility-success-200',
	'utility-success-300',
	'utility-success-400',
	'utility-success-500',
	'utility-success-600',
	'utility-success-700',
	// info (maps to primary per spec)
	'utility-info-50',
	'utility-info-100',
	'utility-info-200',
	'utility-info-300',
	'utility-info-400',
	'utility-info-500',
	'utility-info-600',
	'utility-info-700',
] as const;

const colorTokenKeysArray: readonly string[] = [
	...textColorTokenKeys,
	...borderColorTokenKeys,
	...fgColorTokenKeys,
	...bgColorTokenKeys,
	...utilityColorTokenKeys,
];

export type ColorTokenName =
	| (typeof textColorTokenKeys)[number]
	| (typeof borderColorTokenKeys)[number]
	| (typeof fgColorTokenKeys)[number]
	| (typeof bgColorTokenKeys)[number]
	| (typeof utilityColorTokenKeys)[number];

export const ColorTokenNameSchema = z.custom<ColorTokenName>(
	(val): val is ColorTokenName => typeof val === 'string' && colorTokenKeysArray.includes(val)
);

const ColorTokenRefSchema = z.union([ColorTokenNameSchema, ColorTokenSchema]);

function buildColorTokenObject<T extends string>(
	keys: readonly T[]
): z.ZodType<Record<T, z.infer<typeof ColorTokenPairSchema>>> {
	return z
		.object(
			keys.reduce(
				(acc, key) => {
					acc[key] = ColorTokenPairSchema;
					return acc;
				},
				{} as Record<T, typeof ColorTokenPairSchema>
			)
		)
		.strict();
}

/** Semantic color tokens - each maps to a light/dark pair of raw color tokens. Organized by category (text, border, fg, bg, utility). */
const ColorTokensSchema = z
	.object({
		text: buildColorTokenObject(textColorTokenKeys),
		border: buildColorTokenObject(borderColorTokenKeys),
		fg: buildColorTokenObject(fgColorTokenKeys),
		bg: buildColorTokenObject(bgColorTokenKeys),
		utility: buildColorTokenObject(utilityColorTokenKeys),
	})
	.strict();

export type ColorTokenCategory = keyof typeof ColorTokensSchema.shape;

// ---------------------------------------------
// COMPONENT COLOR TOKEN
// ---------------------------------------------
const ColorTokenRefComponentSchema = z.object({
	type: z.literal('colorTokens'),
	value: ColorTokenRefSchema,
});

const LiteralColorSchema = z.object({
	light: ColorTokenLeafSchema,
	dark: ColorTokenLeafSchema,
});

const ComponentColorSchema = z.union([ColorTokenRefComponentSchema, LiteralColorSchema]);

// ---------------------------------------------
// NON-COLOR TOKEN
// ---------------------------------------------
const spacingKeys = [
	'none',
	'3xs',
	'2xs',
	'xs',
	'sm',
	'md',
	'lg',
	'xl',
	'2xl',
	'3xl',
	'4xl',
] as const;
const radiiKeys = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;

export type SpacingToken = (typeof spacingKeys)[number];
export type RadiiToken = (typeof radiiKeys)[number];

const SpacingTokenSchema = z.enum(spacingKeys);
const RadiiTokenSchema = z.enum(radiiKeys);

const NonColorTokenSchema = z.object({
	type: z.enum(['spacing', 'radii']),
	value: z.union([SpacingTokenSchema, RadiiTokenSchema]),
});

// ---------------------------------------------
// SHADOWS
// ---------------------------------------------
const shadowKeys = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

export type ShadowToken = (typeof shadowKeys)[number];

const ShadowColorSchema = z.object({
	light: ColorTokenSchema,
	dark: ColorTokenSchema,
});

const ShadowValueSchema = z.object({
	offsetX: z.number(),
	offsetY: z.number(),
	blurRadius: z.number(),
	spreadRadius: z.number(),
	color: ShadowColorSchema,
	opacity: z.number().min(0).max(1),
});

/** Box shadow definitions - each shadow has offset, blur, spread, and a mode-aware color. Resolved to CSS `box-shadow` at runtime. */
const ShadowsSchema = z
	.object(
		shadowKeys.reduce(
			(acc, key) => ({ ...acc, [key]: ShadowValueSchema }),
			{} as Record<ShadowToken, typeof ShadowValueSchema>
		)
	)
	.strict();

// ---------------------------------------------
// FOCUS RING TOKENS
// ---------------------------------------------
const focusRingKeys = [
	'focus-ring',
	'focus-ring-error',
	'focus-ring-shadow-xs',
	'focus-ring-shadow-sm',
	'focus-ring-error-shadow-xs',
] as const;

export type FocusRingToken = (typeof focusRingKeys)[number];

const FocusRingValueSchema = z.object({
	color: ColorTokenPairSchema,
	shadow: z.enum(shadowKeys).optional(),
});

/** Focus ring tokens - each defines a mode-aware color and an optional shadow reference for accessible focus indicators. */
const FocusRingSchema = z
	.object(
		focusRingKeys.reduce(
			(acc, key) => ({ ...acc, [key]: FocusRingValueSchema }),
			{} as Record<FocusRingToken, typeof FocusRingValueSchema>
		)
	)
	.strict();

// ---------------------------------------------
// GRADIENTS
// ---------------------------------------------
const gradientKeys = [
	// neutral (dark)
	'neutral_600_500_90',
	'neutral_700_600_45',
	'neutral_800_600_45',
	'neutral_800_600_90',
	'neutral_800_700_26_5',
	'neutral_900_600_45',
	'neutral_900_700_45',
	// neutral (light)
	'neutral_50_white_180',
	'neutral_100_white_180',
	'neutral_100_50_180',
	'neutral_200_50_180',
	'neutral_200_100_180',
	'white_neutral_50_180',
	// primary
	'primary_600_500_90',
	'primary_700_600_45',
	'primary_800_600_45',
	'primary_800_600_90',
	'primary_800_700_26_5',
	'primary_900_600_45',
	'primary_900_700_45',
] as const;

export type GradientToken = (typeof gradientKeys)[number];

const GradientStopSchema = z.object({
	color: ColorTokenSchema,
	position: z.number().min(0).max(100).optional(),
});

const GradientValueSchema = z.union([
	z.null(),
	z.object({
		type: z.literal('linear'),
		angle: z.number(),
		stops: z.array(GradientStopSchema).min(2),
	}),
]);

/** Linear gradient definitions keyed by compound `from_to_angle` identifiers. Each references raw color tokens. Resolved to CSS `linear-gradient()` at runtime. */
const GradientsSchema = z
	.object(
		gradientKeys.reduce(
			(acc, key) => ({ ...acc, [key]: GradientValueSchema }),
			{} as Record<GradientToken, typeof GradientValueSchema>
		)
	)
	.strict();

// ---------------------------------------------
// TYPOGRAPHY SCALES
// ---------------------------------------------
const fontSizeKeys = [
	'2xs',
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
] as const;
const fontWeightKeys = ['thin', 'light', 'regular', 'medium', 'semibold', 'bold', 'black'] as const;
const lineHeightKeys = ['none', 'tight', 'normal', 'relaxed', 'loose'] as const;
const letterSpacingKeys = ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'] as const;

export type FontSizeToken = (typeof fontSizeKeys)[number];
export type FontWeightToken = (typeof fontWeightKeys)[number];
export type LineHeightToken = (typeof lineHeightKeys)[number];
export type LetterSpacingToken = (typeof letterSpacingKeys)[number];

const FontSizeSchema = z
	.object(
		fontSizeKeys.reduce(
			(acc, key) => ({ ...acc, [key]: z.number() }),
			{} as Record<FontSizeToken, z.ZodNumber>
		)
	)
	.strict();

const FontWeightSchema = z
	.object(
		fontWeightKeys.reduce(
			(acc, key) => ({ ...acc, [key]: z.number() }),
			{} as Record<FontWeightToken, z.ZodNumber>
		)
	)
	.strict();

const LineHeightSchema = z
	.object(
		lineHeightKeys.reduce(
			(acc, key) => ({ ...acc, [key]: z.number() }),
			{} as Record<LineHeightToken, z.ZodNumber>
		)
	)
	.strict();

const LetterSpacingSchema = z
	.object(
		letterSpacingKeys.reduce(
			(acc, key) => ({ ...acc, [key]: z.number() }),
			{} as Record<LetterSpacingToken, z.ZodNumber>
		)
	)
	.strict();

// ---------------------------------------------
// CONTRACTS - Typography presets
// ---------------------------------------------
const typographyContractKeys = [
	'heading1',
	'heading2',
	'heading3',
	'heading4',
	'body',
	'bodySm',
	'caption',
	'label',
	'overline',
] as const;

export type TypographyContractToken = (typeof typographyContractKeys)[number];

const FontSizeTokenSchema = z.enum(fontSizeKeys);
const FontWeightTokenSchema = z.enum(fontWeightKeys);
const LineHeightTokenSchema = z.enum(lineHeightKeys);
const LetterSpacingTokenSchema = z.enum(letterSpacingKeys);

const TypographyContractValueSchema = z.object({
	fontSize: FontSizeTokenSchema,
	fontWeight: FontWeightTokenSchema,
	lineHeight: LineHeightTokenSchema,
	letterSpacing: LetterSpacingTokenSchema.optional(),
	color: ColorTokenRefSchema.optional().default('text-primary'),
});

/** Typography contracts - semantic compositions of font size, weight, line height, and a color-token reference. */
const TypographyContractsSchema = z
	.object(
		typographyContractKeys.reduce(
			(acc, key) => ({ ...acc, [key]: TypographyContractValueSchema }),
			{} as Record<TypographyContractToken, typeof TypographyContractValueSchema>
		)
	)
	.strict();

const TypographySchema = z.object({
	fontFamily: z.string(),
	monospaceFont: z.string(),
	fontSize: FontSizeSchema,
	fontWeight: FontWeightSchema,
	lineHeight: LineHeightSchema,
	letterSpacing: LetterSpacingSchema,
});

// ---------------------------------------------
// CONTRACTS - Action presets
// ---------------------------------------------
const FullActionPresetSchema = z
	.object({
		bg: ColorTokenRefSchema,
		on: ColorTokenRefSchema,
		border: ColorTokenRefSchema,
		bgHover: ColorTokenRefSchema,
		onHover: ColorTokenRefSchema,
		bgActive: ColorTokenRefSchema,
		onActive: ColorTokenRefSchema,
		bgFocus: ColorTokenRefSchema,
		onFocus: ColorTokenRefSchema,
		borderFocus: ColorTokenRefSchema,
		bgDisabled: ColorTokenRefSchema,
		onDisabled: ColorTokenRefSchema,
		borderDisabled: ColorTokenRefSchema,
	})
	.strict();

const LinkActionPresetSchema = z
	.object({
		on: ColorTokenRefSchema,
		onHover: ColorTokenRefSchema,
		onActive: ColorTokenRefSchema,
		onFocus: ColorTokenRefSchema,
		onDisabled: ColorTokenRefSchema,
	})
	.strict();

/** Action contracts - bundles related color tokens (bg, on, border, hover, active, focus, disabled) for each action variant (primary, secondary, ghost, link). */
const ActionsSchema = z
	.object({
		primary: FullActionPresetSchema,
		secondary: FullActionPresetSchema,
		ghost: FullActionPresetSchema,
		link: LinkActionPresetSchema,
	})
	.strict();

// ---------------------------------------------
// CONTRACTS - Feedback presets
// ---------------------------------------------
const FeedbackPresetSchema = z
	.object({
		bg: ColorTokenRefSchema,
		on: ColorTokenRefSchema,
		border: ColorTokenRefSchema,
		bgInverse: ColorTokenRefSchema,
		onInverse: ColorTokenRefSchema,
	})
	.strict();

/** Feedback contracts - bundles related color tokens (bg, on, border, inverse) for each intent (error, success, warning, info). */
const FeedbackSchema = z
	.object({
		error: FeedbackPresetSchema,
		success: FeedbackPresetSchema,
		warning: FeedbackPresetSchema,
		info: FeedbackPresetSchema,
	})
	.strict();

// ---------------------------------------------
// CONTRACTS - Surface presets
// ---------------------------------------------
const SurfacePresetSchema = z
	.object({
		bg: ColorTokenRefSchema,
		on: ColorTokenRefSchema,
		border: ColorTokenRefSchema,
	})
	.strict();

/** Surface contracts - bundles bg, on (text color), and border for each surface type (base, alt, raised, sunken, inverse, brand). */
const SurfacesSchema = z
	.object({
		base: SurfacePresetSchema,
		alt: SurfacePresetSchema,
		raised: SurfacePresetSchema,
		sunken: SurfacePresetSchema,
		inverse: SurfacePresetSchema,
		brand: SurfacePresetSchema,
	})
	.strict();

// ---------------------------------------------
// CONTRACTS - Unified schema
// ---------------------------------------------
/** Structured contracts that group related color tokens into cohesive semantic units. Contracts are the primary API for component styling; use color tokens directly only for atomic overrides not covered by a contract. */
const ContractsSchema = z
	.object({
		actions: ActionsSchema,
		feedback: FeedbackSchema,
		surfaces: SurfacesSchema,
		typography: TypographyContractsSchema,
	})
	.strict();

// ---------------------------------------------
// BREAKPOINTS
// ---------------------------------------------

/** Named viewport thresholds used by the responsive grid system. */
export const breakpointKeys = ['mobile', 'tablet', 'desktop', 'wide', 'ultra'] as const;

/** A named viewport threshold - one of `'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultra'`. */
export type BreakpointToken = (typeof breakpointKeys)[number];

/** Viewport width thresholds for responsive layouts - mobile (0), tablet (600), desktop (1024), wide (1440), ultra (1920). */
const BreakpointsSchema = z
	.object({
		mobile: z.number(),
		tablet: z.number(),
		desktop: z.number(),
		wide: z.number(),
		ultra: z.number(),
	})
	.strict();

// ---------------------------------------------
// GRID
// ---------------------------------------------

const GridValueSchema = z.union([z.number(), z.string()]);

/**
 * Per‑breakpoint grid configuration.
 *
 * - `columns`: number of explicit grid columns
 * - `gutter`:   spacing token name used for `gap`
 * - `margin`:   spacing token name used for `paddingInline`
 * - `maxWidth`: container max-width (`number` = px, `string` = raw CSS)
 */
const GridConfigSchema = z
	.object({
		columns: z.number(),
		gutter: SpacingTokenSchema,
		margin: SpacingTokenSchema,
		maxWidth: GridValueSchema,
	})
	.strict();

const GridSchema = z
	.object({
		mobile: GridConfigSchema,
		tablet: GridConfigSchema,
		desktop: GridConfigSchema,
		wide: GridConfigSchema,
		ultra: GridConfigSchema,
	})
	.strict();

// ---------------------------------------------
// COMPONENTS
// ---------------------------------------------
/** Component-level token overrides - allows themes to customize specific component properties (e.g., buttonBg, buttonBorderRadii) independently of color tokens or contracts. */
const ComponentsSchema = z
	.object({
		buttonBg: ComponentColorSchema,
		buttonBorderRadii: NonColorTokenSchema,
		cardBorderRadii: NonColorTokenSchema,
	})
	.strict();

// ---------------------------------------------
// FINAL TOKENS SCHEMA
// ---------------------------------------------
const SpacingSchema = z
	.object(
		spacingKeys.reduce(
			(acc, key) => ({ ...acc, [key]: z.number() }),
			{} as Record<SpacingToken, z.ZodNumber>
		)
	)
	.strict();

const RadiiSchema = z
	.object(
		radiiKeys.reduce(
			(acc, key) => ({ ...acc, [key]: z.number() }),
			{} as Record<RadiiToken, z.ZodNumber>
		)
	)
	.strict();

/**
 * The fully-validated shape of your design system theme.
 *
 * This type represents the *canonical* structure of all tokens
 * (spacing, radii, colors, colorTokens, contracts, components) after being parsed
 * and runtime-validated by Zod. Every theme variant (default, dark,
 * brand A, brand B) must conform to this type.
 */
export const TokensSchema = z
	.object({
		spacing: SpacingSchema,
		radii: RadiiSchema,
		colors: ColorsSchema,
		typography: TypographySchema,
		colorTokens: ColorTokensSchema,
		contracts: ContractsSchema,
		shadows: ShadowsSchema,
		focusRing: FocusRingSchema,
		gradients: GradientsSchema,
		breakpoints: BreakpointsSchema,
		grid: GridSchema,
		components: ComponentsSchema,
	})
	.strict();

// ---------------------------------------------
// TYPES
// ---------------------------------------------

/**
 * The fully-validated shape of your design system theme.
 *
 * This type represents the *canonical* structure of all tokens
 * (spacing, radii, colors, colorTokens, contracts, components) after being parsed
 * and runtime-validated by Zod. Every theme variant (default, dark,
 * brand A, brand B) must conform to this type.
 */
export type Tokens = z.infer<typeof TokensSchema>;

/**
 * A map of all valid token names extracted from the Tokens type.
 *
 * This enforces naming consistency across the entire design system:
 * - Zod theme definitions
 * - Component-level token usage
 * - Any other usage of design tokens - ex: CSS variables, StyleX, RNative, etc.
 *
 * Developers cannot invent new token names (e.g., "btnBg") because
 * these keys are strictly derived from the validated Tokens type.
 * This guarantees that tokens and theme tokens always match.
 */
export type TokenNames = {
	spacing: keyof Tokens['spacing'];
	radii: keyof Tokens['radii'];
	colors: keyof Tokens['colors'];
	colorTokens: {
		[K in keyof Tokens['colorTokens']]: keyof Tokens['colorTokens'][K];
	}[keyof Tokens['colorTokens']];
	colorTokenCategory: keyof Tokens['colorTokens'];
	contracts: keyof Tokens['contracts'];
	actions: keyof Tokens['contracts']['actions'];
	feedback: keyof Tokens['contracts']['feedback'];
	surfaces: keyof Tokens['contracts']['surfaces'];
	typographyContract: keyof Tokens['contracts']['typography'];
	shadows: keyof Tokens['shadows'];
	focusRing: keyof Tokens['focusRing'];
	gradients: keyof Tokens['gradients'];
	breakpoints: keyof Tokens['breakpoints'];
	grid: keyof Tokens['grid'];
	gridBreakpoint: keyof Tokens['grid']['mobile'];
	components: keyof Tokens['components'];
	typography: keyof Tokens['typography'];
	fontSize: keyof Tokens['typography']['fontSize'];
	fontWeight: keyof Tokens['typography']['fontWeight'];
	lineHeight: keyof Tokens['typography']['lineHeight'];
	letterSpacing: keyof Tokens['typography']['letterSpacing'];
};

// ---------------------------------------------
// ALPHA UTILITY
// ---------------------------------------------

/**
 * Resolve a raw color token to an rgba() string at a given opacity.
 *
 * @param theme    the validated theme (provides the hex palette)
 * @param colorToken a raw color token (e.g. 'primary_500', 'white', 'transparent')
 * @param alpha    opacity between 0 and 1
 */
export function resolveAlpha(theme: Tokens, colorToken: ColorToken, alpha: number): string {
	const hex = theme.colors[colorToken];
	if (hex === 'transparent') return 'rgba(0,0,0,0)';
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r},${g},${b},${alpha})`;
}

// ---------------------------------------------
// THEME CREATION HELPERS
// ---------------------------------------------
export const themeMandatoryFamilies: readonly ThemeMandatoryFamily[] = [
	'primary',
	'secondary',
	'neutral',
];
