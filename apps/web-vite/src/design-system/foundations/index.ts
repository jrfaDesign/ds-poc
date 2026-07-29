import { z } from 'zod';

// ---------------------------------------------
// BASE TYPES
// ---------------------------------------------
type ColorScale = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type ColorFamily = 'primary' | 'secondary' | 'neutral' | 'error' | 'success' | 'warning' | 'info';

export type ColorToken = `${ColorFamily}_${ColorScale}` | 'white' | 'black' | 'transparent';

// ---------------------------------------------
// COLORS SCHEMA
// ---------------------------------------------
const ColorValueSchema = z.union([z.string().regex(/^#/), z.literal('transparent')]);

/** Raw color palette - hex values organized by family (primary, secondary, neutral, etc.) and scale (100–900). These are the primitive values that roles and contracts reference. */
const ColorsSchema = z
	.object(
		(() => {
			const obj: Partial<Record<ColorToken, z.ZodTypeAny>> = {
				white: ColorValueSchema,
				black: ColorValueSchema,
				transparent: ColorValueSchema,
			};

			(['primary', 'secondary', 'neutral', 'error', 'info', 'success', 'warning'] as const).forEach(
				(family) => {
					(['100', '200', '300', '400', '500', '600', '700', '800', '900'] as const).forEach(
						(scale) => {
							obj[`${family}_${scale}`] = ColorValueSchema;
						}
					);
				}
			);

			return obj as Record<ColorToken, z.ZodTypeAny>;
		})()
	)
	.strict();

const colorFamilies = [
	'primary',
	'secondary',
	'neutral',
	'error',
	'success',
	'warning',
	'info',
] as const satisfies readonly ColorFamily[];

const colorScales = [
	'100',
	'200',
	'300',
	'400',
	'500',
	'600',
	'700',
	'800',
	'900',
] as const satisfies readonly ColorScale[];

const colorTokenKeys = [
	'white',
	'black',
	'transparent',
	...colorFamilies.flatMap((family) =>
		colorScales.map((scale) => `${family}_${scale}` as ColorToken)
	),
] as const satisfies readonly ColorToken[];

export const ColorTokenSchema = z.custom<ColorToken>(
	(val): val is ColorToken =>
		typeof val === 'string' && (colorTokenKeys as readonly string[]).includes(val)
);

// ---------------------------------------------
// ROLES
// ---------------------------------------------
const roleKeys = [
	// ABSOLUTE - rarely used directly, but essential for contrast logic
	'white', // absolute white - used for text-on-dark, icons, inverse surfaces
	'black', // absolute black - used for text-on-light, icons, high-contrast states

	// BRAND - primary brand identity colors
	'primary', // main brand color - CTAs, highlights, brand accents
	'secondary', // secondary brand color - supporting accents, less dominant than primary

	// SURFACE - backgrounds and layers
	'surface', // base background - app/page background
	'surfaceAlt', // alternate background - cards, panels, sheets
	'surfaceRaised', // elevated surfaces - modals, popovers, floating cards
	'surfaceSunken', // inset surfaces - input fields, sunken panels
	'surfaceInverse', // inverted surface - dark-on-light or light-on-dark contexts
	'surfaceBrand', // brand-tinted surface - marketing sections, branded panels

	// TEXT - foreground roles
	'text', // primary text - body, headings, essential content
	'textSecondary', // secondary text - labels, metadata, helper text
	'textTertiary', // tertiary text - captions, timestamps, low-emphasis text
	'textPlaceholder', // placeholder text - input placeholders
	'textInverse', // text on inverted surfaces - dark-on-light or light-on-dark
	'textBrand', // brand-colored text - links, highlights, brand accents

	// STRUCTURE - borders and separators
	'border', // standard border - inputs, cards, containers
	'borderStrong', // strong border - high-contrast outlines, emphasized containers
	'borderWeak', // subtle border - muted outlines, low-emphasis containers
	'borderInverse', // border on inverted surfaces - dark-on-light or light-on-dark
	'divider', // subtle separators - list dividers, section separators
	'focusRing', // focus outline - accessibility focus indicator

	// ACTION - primary CTA
	'actionPrimaryBg', // primary action background - default
	'actionPrimaryBgHover', // hover background
	'actionPrimaryBgActive', // active/pressed background
	'actionPrimaryBgFocus', // focus background

	'actionPrimaryFg', // primary action text/icon
	'actionPrimaryBorder', // primary action border
	'actionPrimaryBorderFocus', // focus border

	'actionPrimaryDisabledBg', // disabled background
	'actionPrimaryDisabledFg', // disabled text/icon
	'actionPrimaryDisabledBorder', // disabled border

	// ACTION - secondary CTA
	'actionSecondaryBg', // secondary action background - default
	'actionSecondaryBgHover', // hover background
	'actionSecondaryBgActive', // active/pressed background
	'actionSecondaryBgFocus', // focus background

	'actionSecondaryFg', // secondary action text/icon
	'actionSecondaryBorder', // secondary action border
	'actionSecondaryBorderFocus', // focus border

	'actionSecondaryDisabledBg', // disabled background
	'actionSecondaryDisabledFg', // disabled text/icon
	'actionSecondaryDisabledBorder', // disabled border

	// ACTION - ghost CTA (transparent)
	'actionGhostBg', // ghost background - usually transparent
	'actionGhostBgHover', // hover background - subtle tint
	'actionGhostBgActive', // active background - stronger tint
	'actionGhostBgFocus', // focus background
	'actionGhostFg', // ghost text/icon
	'actionGhostBorder', // ghost border - optional
	'actionGhostBorderFocus', // focus border

	'actionGhostDisabledBg', // disabled background
	'actionGhostDisabledFg', // disabled text/icon
	'actionGhostDisabledBorder', // disabled border

	// ACTION - link
	'actionLinkFg', // link text - brand or accent color
	'actionLinkFgHover', // link hover - brighter or darker variant
	'actionLinkFgActive', // link active - pressed state
	'actionLinkFgFocus', // link focus state

	'actionLinkFgDisabled', // disabled link text

	// FEEDBACK - ERROR
	'errorBg', // error background - alerts, banners
	'errorFg', // error text/icon
	'errorBorder', // error border
	'errorBgInverse', // error background on inverted surfaces
	'errorFgInverse', // error text/icon on inverted surfaces

	// FEEDBACK - SUCCESS
	'successBg',
	'successFg',
	'successBorder',
	'successBgInverse',
	'successFgInverse',

	// FEEDBACK - WARNING
	'warningBg',
	'warningFg',
	'warningBorder',
	'warningBgInverse',
	'warningFgInverse',

	// FEEDBACK - INFO
	'infoBg',
	'infoFg',
	'infoBorder',
	'infoBgInverse',
	'infoFgInverse',
] as const;

export type RoleName = (typeof roleKeys)[number];

/** Semantic color tokens - each role maps to a light/dark color pair, providing the bridge between raw colors and component usage. Roles are the atomic layer; use contracts for grouped presets. */
const RolesSchema = z
	.object(
		roleKeys.reduce(
			(acc, role) => {
				acc[role] = z.object({
					light: ColorTokenSchema,
					dark: ColorTokenSchema,
				});
				return acc;
			},
			{} as Record<RoleName, z.ZodType<{ light: ColorToken; dark: ColorToken }>>
		)
	)
	.strict();

// ---------------------------------------------
// COMPONENT COLOR TOKEN
// ---------------------------------------------
const RoleRefSchema = z.object({
	type: z.literal('roles'),
	value: z.enum(roleKeys),
});

const LiteralColorSchema = z.object({
	light: ColorTokenSchema,
	dark: ColorTokenSchema,
});

const ComponentColorSchema = z.union([RoleRefSchema, LiteralColorSchema]);

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

// ---------------------------------------------
// SHADOWS
// ---------------------------------------------
const shadowKeys = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;

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
// GRADIENTS
// ---------------------------------------------
const gradientKeys = ['none', 'primary', 'secondary', 'neutral', 'brand'] as const;

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

/** Linear gradient definitions - each gradient has an angle and color stops referencing raw color tokens. Resolved to CSS `linear-gradient()` at runtime. */
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
	color: z.enum(roleKeys).optional().default('text'),
});

/** Typography contracts - semantic compositions of font size, weight, line height, and color. Each contract (heading1, body, caption, etc.) defines a complete typographic style. */
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

const SpacingTokenSchema = z.enum(spacingKeys);
const RadiiTokenSchema = z.enum(radiiKeys);

const NonColorTokenSchema = z.object({
	type: z.enum(['spacing', 'radii']),
	value: z.union([SpacingTokenSchema, RadiiTokenSchema]),
});

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
/** Component-level token overrides - allows themes to customize specific component properties (e.g., buttonBg, buttonBorderRadii) independently of roles or contracts. */
const ComponentsSchema = z
	.object({
		buttonBg: ComponentColorSchema,
		buttonBorderRadii: NonColorTokenSchema,
		cardBorderRadii: NonColorTokenSchema,
	})
	.strict();

// ---------------------------------------------
// CONTRACTS - Action presets
// ---------------------------------------------
const FullActionPresetSchema = z
	.object({
		bg: z.enum(roleKeys),
		on: z.enum(roleKeys),
		border: z.enum(roleKeys),
		bgHover: z.enum(roleKeys),
		onHover: z.enum(roleKeys),
		bgActive: z.enum(roleKeys),
		onActive: z.enum(roleKeys),
		bgFocus: z.enum(roleKeys),
		onFocus: z.enum(roleKeys),
		borderFocus: z.enum(roleKeys),
		bgDisabled: z.enum(roleKeys),
		onDisabled: z.enum(roleKeys),
		borderDisabled: z.enum(roleKeys),
	})
	.strict();

const LinkActionPresetSchema = z
	.object({
		on: z.enum(roleKeys),
		onHover: z.enum(roleKeys),
		onActive: z.enum(roleKeys),
		onFocus: z.enum(roleKeys),
		onDisabled: z.enum(roleKeys),
	})
	.strict();

/** Action contracts - bundles all related roles (bg, on, border, hover, active, focus, disabled) for each action variant (primary, secondary, ghost, link). Use these instead of individual action role tokens. */
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
		bg: z.enum(roleKeys),
		on: z.enum(roleKeys),
		border: z.enum(roleKeys),
		bgInverse: z.enum(roleKeys),
		onInverse: z.enum(roleKeys),
	})
	.strict();

/** Feedback contracts - bundles all related roles (bg, on, border, inverse) for each intent (error, success, warning, info). Use these instead of individual feedback role tokens. */
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
		bg: z.enum(roleKeys),
		on: z.enum(roleKeys),
		border: z.enum(roleKeys),
	})
	.strict();

/** Surface contracts - bundles bg, on (text color), and border for each surface type (base, alt, raised, sunken, inverse, brand). Use these to ensure consistent text-on-surface combinations. */
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
/** Structured contracts that group related roles into cohesive semantic units. Contracts are the primary API for component styling; use roles directly only for atomic overrides not covered by a contract. */
const ContractsSchema = z
	.object({
		actions: ActionsSchema,
		feedback: FeedbackSchema,
		surfaces: SurfacesSchema,
		typography: TypographyContractsSchema,
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
 * (spacing, radii, colors, roles, contracts, components) after being parsed
 * and runtime-validated by Zod. Every theme variant (default, dark,
 * brand A, brand B) must conform to this type.
 */
export const TokensSchema = z
	.object({
		/** Spacing scale - numeric values in pixels used for padding, margin, and gap. */
		spacing: SpacingSchema,
		/** Border radius scale - numeric values in pixels for rounded corners. */
		radii: RadiiSchema,
		/** Raw color palette - hex values organized by family and scale. */
		colors: ColorsSchema,
		/** Typography configuration - font families, size/weight/line-height scales. */
		typography: TypographySchema,
		/** Semantic color tokens - light/dark pairs bridging raw colors to component usage. */
		roles: RolesSchema,
		/** Structured contracts grouping related roles into cohesive semantic units (actions, feedback, surfaces, typography). */
		contracts: ContractsSchema,
		/** Box shadow definitions - mode-aware shadows resolved to CSS at runtime. */
		shadows: ShadowsSchema,
		/** Linear gradient definitions - color stops referencing raw color tokens. */
		gradients: GradientsSchema,
		/** Viewport width thresholds for responsive layouts. */
		breakpoints: BreakpointsSchema,
		/** Per-breakpoint grid configuration - columns, gutter, margin, max-width. */
		grid: GridSchema,
		/** Component-level token overrides for theme-specific customizations. */
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
 * (spacing, radii, colors, roles, contracts, components) after being parsed
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
	roles: keyof Tokens['roles'];
	contracts: keyof Tokens['contracts'];
	actions: keyof Tokens['contracts']['actions'];
	feedback: keyof Tokens['contracts']['feedback'];
	surfaces: keyof Tokens['contracts']['surfaces'];
	typographyContract: keyof Tokens['contracts']['typography'];
	shadows: keyof Tokens['shadows'];
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
