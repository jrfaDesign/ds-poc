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
	// ABSOLUTE — rarely used directly, but essential for contrast logic
	'white', // absolute white — used for text-on-dark, icons, inverse surfaces
	'black', // absolute black — used for text-on-light, icons, high-contrast states

	// BRAND — primary brand identity colors
	'primary', // main brand color — CTAs, highlights, brand accents
	'secondary', // secondary brand color — supporting accents, less dominant than primary

	// SURFACE — backgrounds and layers
	'surface', // base background — app/page background
	'surfaceAlt', // alternate background — cards, panels, sheets
	'surfaceRaised', // elevated surfaces — modals, popovers, floating cards
	'surfaceSunken', // inset surfaces — input fields, sunken panels
	'surfaceInverse', // inverted surface — dark-on-light or light-on-dark contexts
	'surfaceBrand', // brand-tinted surface — marketing sections, branded panels

	// TEXT — foreground roles
	'text', // primary text — body, headings, essential content
	'textSecondary', // secondary text — labels, metadata, helper text
	'textTertiary', // tertiary text — captions, timestamps, low-emphasis text
	'textPlaceholder', // placeholder text — input placeholders
	'textInverse', // text on inverted surfaces — dark-on-light or light-on-dark
	'textBrand', // brand-colored text — links, highlights, brand accents

	// STRUCTURE — borders and separators
	'border', // standard border — inputs, cards, containers
	'borderStrong', // strong border — high-contrast outlines, emphasized containers
	'borderWeak', // subtle border — muted outlines, low-emphasis containers
	'borderInverse', // border on inverted surfaces — dark-on-light or light-on-dark
	'divider', // subtle separators — list dividers, section separators
	'focusRing', // focus outline — accessibility focus indicator

	// ACTION — primary CTA
	'actionPrimaryBg', // primary action background — default
	'actionPrimaryBgHover', // hover background
	'actionPrimaryBgActive', // active/pressed background

	'actionPrimaryFg', // primary action text/icon
	'actionPrimaryBorder', // primary action border

	'actionPrimaryDisabledBg', // disabled background
	'actionPrimaryDisabledFg', // disabled text/icon
	'actionPrimaryDisabledBorder', // disabled border

	// ACTION — secondary CTA
	'actionSecondaryBg', // secondary action background — default
	'actionSecondaryBgHover', // hover background
	'actionSecondaryBgActive', // active/pressed background
	'actionSecondaryFg', // secondary action text/icon
	'actionSecondaryBorder', // secondary action border
	'actionSecondaryDisabledBg', // disabled background
	'actionSecondaryDisabledFg', // disabled text/icon
	'actionSecondaryDisabledBorder', // disabled border

	// ACTION — ghost CTA (transparent)
	'actionGhostBg', // ghost background — usually transparent
	'actionGhostBgHover', // hover background — subtle tint
	'actionGhostBgActive', // active background — stronger tint
	'actionGhostFg', // ghost text/icon
	'actionGhostBorder', // ghost border — optional

	// ACTION — link
	'actionLinkFg', // link text — brand or accent color
	'actionLinkFgHover', // link hover — brighter or darker variant
	'actionLinkFgActive', // link active — pressed state

	// FEEDBACK — ERROR
	'errorBg', // error background — alerts, banners
	'errorFg', // error text/icon
	'errorBorder', // error border
	'errorBgInverse', // error background on inverted surfaces
	'errorFgInverse', // error text/icon on inverted surfaces

	// FEEDBACK — SUCCESS
	'successBg',
	'successFg',
	'successBorder',
	'successBgInverse',
	'successFgInverse',

	// FEEDBACK — WARNING
	'warningBg',
	'warningFg',
	'warningBorder',
	'warningBgInverse',
	'warningFgInverse',

	// FEEDBACK — INFO
	'infoBg',
	'infoFg',
	'infoBorder',
	'infoBgInverse',
	'infoFgInverse',
] as const;

export type RoleName = (typeof roleKeys)[number];

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
// TYPOGRAPHY ROLES (semantic compositions)
// ---------------------------------------------
const typographyRoleKeys = [
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

export type TypographyRoleToken = (typeof typographyRoleKeys)[number];

const FontSizeTokenSchema = z.enum(fontSizeKeys);
const FontWeightTokenSchema = z.enum(fontWeightKeys);
const LineHeightTokenSchema = z.enum(lineHeightKeys);
const LetterSpacingTokenSchema = z.enum(letterSpacingKeys);

const TypographyRoleValueSchema = z.object({
	fontSize: FontSizeTokenSchema,
	fontWeight: FontWeightTokenSchema,
	lineHeight: LineHeightTokenSchema,
	letterSpacing: LetterSpacingTokenSchema.optional(),
	color: z.enum(roleKeys).optional().default('text'),
});

const TypographyRolesSchema = z
	.object(
		typographyRoleKeys.reduce(
			(acc, key) => ({ ...acc, [key]: TypographyRoleValueSchema }),
			{} as Record<TypographyRoleToken, typeof TypographyRoleValueSchema>
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
	roles: TypographyRolesSchema,
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

/** A named viewport threshold — one of `'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultra'`. */
export type BreakpointToken = (typeof breakpointKeys)[number];

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

export const TokensSchema = z
	.object({
		spacing: SpacingSchema,
		radii: RadiiSchema,
		colors: ColorsSchema,
		typography: TypographySchema,
		roles: RolesSchema,
		shadows: ShadowsSchema,
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
 * The fully‑validated shape of your design system theme.
 *
 * This type represents the *canonical* structure of all tokens
 * (spacing, radii, colors, roles, components) after being parsed
 * and runtime‑validated by Zod. Every theme variant (default, dark,
 * brand A, brand B) must conform to this type.
 */
export type Tokens = z.infer<typeof TokensSchema>;

/**
 * A map of all valid token names extracted from the Tokens type.
 *
 * This enforces naming consistency across the entire design system:
 * - Zod theme definitions
 * - Component‑level token usage
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
	shadows: keyof Tokens['shadows'];
	gradients: keyof Tokens['gradients'];
	breakpoints: keyof Tokens['breakpoints'];
	grid: keyof Tokens['grid'];
	gridBreakpoint: keyof Tokens['grid']['mobile'];
	components: keyof Tokens['components'];
	typography: keyof Tokens['typography'];
	typographyRole: keyof Tokens['typography']['roles'];
	fontSize: keyof Tokens['typography']['fontSize'];
	fontWeight: keyof Tokens['typography']['fontWeight'];
	lineHeight: keyof Tokens['typography']['lineHeight'];
	letterSpacing: keyof Tokens['typography']['letterSpacing'];
};
