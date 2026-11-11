import type { ViewStyle } from 'react-native';
import type {
	Tokens,
	ColorToken,
	ColorTokenLeaf,
	ColorTokenName,
	SpacingToken,
	RadiiToken,
	WidthToken,
	LayoutToken,
	FontSizeToken,
	FontWeightToken,
	LineHeightToken,
	LetterSpacingToken,
	FontFamilyToken,
	ShadowToken,
} from '@repo/foundations';
import { SHAPE_PRESETS, hexToRgba } from '@repo/foundations';

function resolveLeaf(leaf: ColorTokenLeaf, theme: Tokens): string {
	const token = typeof leaf === 'string' ? leaf : leaf.base;
	const hex = theme.colors[token];
	if (hex === 'transparent') return 'rgba(0,0,0,0)';
	if (typeof leaf === 'string') return hex;
	return hexToRgba(hex, leaf.alpha);
}

type ColorPair = { light: ColorTokenLeaf; dark: ColorTokenLeaf };

// ---------------------------------------------
// TYPED CONTRACT SHAPES
// ---------------------------------------------

type ResolvedFullAction = {
	bg: string;
	on: string;
	border: string;
	bgHover: string;
	onHover: string;
	bgActive: string;
	onActive: string;
	bgFocus: string;
	onFocus: string;
	borderFocus: string;
	bgDisabled: string;
	onDisabled: string;
	borderDisabled: string;
};

type ResolvedLinkAction = {
	on: string;
	onHover: string;
	onActive: string;
	onFocus: string;
	onDisabled: string;
};

export type ResolvedActions = {
	primary: ResolvedFullAction;
	secondary: ResolvedFullAction;
	ghost: ResolvedFullAction;
	link: ResolvedLinkAction;
	tertiary: ResolvedFullAction;
};

export type ResolvedFeedback = {
	error: {
		bg: string;
		on: string;
		border: string;
		borderWidth: number;
		borderRadius: number;
		bgInverse: string;
		onInverse: string;
	};
	success: {
		bg: string;
		on: string;
		border: string;
		borderWidth: number;
		borderRadius: number;
		bgInverse: string;
		onInverse: string;
	};
	warning: {
		bg: string;
		on: string;
		border: string;
		borderWidth: number;
		borderRadius: number;
		bgInverse: string;
		onInverse: string;
	};
	info: {
		bg: string;
		on: string;
		border: string;
		borderWidth: number;
		borderRadius: number;
		bgInverse: string;
		onInverse: string;
	};
};

export type ResolvedSurfaces = {
	base: { bg: string; on: string; border: string };
	alt: { bg: string; on: string; border: string };
	raised: { bg: string; on: string; border: string };
	sunken: { bg: string; on: string; border: string };
	inverse: { bg: string; on: string; border: string };
	brand: { bg: string; on: string; border: string };
};

export type SurfaceKey = keyof ResolvedSurfaces;

/** Resolved shape preset: border radius (px) per element bucket, from `theme.style`. */
export type ResolvedShape = {
	button: number;
	input: number;
	card: number;
};

export type ResolvedShadow = ViewStyle;

type FontSizeScale = {
	fontSizePx: number;
	fontSizeRem: number;
	letterSpacing?: number;
	lineHeightPx: number;
	lineHeightRem: number;
};

export type ResolvedTheme = {
	colors: Record<ColorToken, string>;
	colorTokens: Record<ColorTokenName, string>;
	contracts: {
		actions: ResolvedActions;
		feedback: ResolvedFeedback;
		surfaces: ResolvedSurfaces;
	};
	shape: ResolvedShape;
	spacing: Record<SpacingToken, number>;
	radii: Record<RadiiToken, number>;
	widths: Record<WidthToken, number>;
	layout: Record<LayoutToken, number>;
	typography: {
		fontFamilies: Record<FontFamilyToken, string>;
		fontSize: Record<FontSizeToken, FontSizeScale>;
		fontWeight: Record<FontWeightToken, number>;
		lineHeight: Record<LineHeightToken, number>;
		letterSpacing: Record<LetterSpacingToken, number>;
	};
	shadows: Record<ShadowToken, ResolvedShadow>;
};

type FullActionRaw = Tokens['contracts']['actions']['primary'];
type LinkActionRaw = Tokens['contracts']['actions']['link'];

function resolveFullAction(
	raw: FullActionRaw,
	resolveRef: (ref: string) => string
): ResolvedFullAction {
	return {
		bg: resolveRef(raw.bg),
		on: resolveRef(raw.on),
		border: resolveRef(raw.border),
		bgHover: resolveRef(raw.bgHover),
		onHover: resolveRef(raw.onHover),
		bgActive: resolveRef(raw.bgActive),
		onActive: resolveRef(raw.onActive),
		bgFocus: resolveRef(raw.bgFocus),
		onFocus: resolveRef(raw.onFocus),
		borderFocus: resolveRef(raw.borderFocus),
		bgDisabled: resolveRef(raw.bgDisabled),
		onDisabled: resolveRef(raw.onDisabled),
		borderDisabled: resolveRef(raw.borderDisabled),
	};
}

function resolveLinkAction(
	raw: LinkActionRaw,
	resolveRef: (ref: string) => string
): ResolvedLinkAction {
	return {
		on: resolveRef(raw.on),
		onHover: resolveRef(raw.onHover),
		onActive: resolveRef(raw.onActive),
		onFocus: resolveRef(raw.onFocus),
		onDisabled: resolveRef(raw.onDisabled),
	};
}

function resolveFeedback(
	raw: Tokens['contracts']['feedback']['error'],
	resolveRef: (ref: string) => string,
	theme: Tokens
) {
	return {
		bg: resolveRef(raw.bg),
		on: resolveRef(raw.on),
		border: resolveRef(raw.border),
		borderWidth: raw.borderWidth,
		borderRadius:
			typeof raw.borderRadius === 'object' && 'type' in raw.borderRadius
				? theme.radii[raw.borderRadius.value]
				: theme.radii[raw.borderRadius as RadiiToken],
		bgInverse: resolveRef(raw.bgInverse),
		onInverse: resolveRef(raw.onInverse),
	};
}

function resolveSurface(
	raw: Tokens['contracts']['surfaces']['base'],
	resolveRef: (ref: string) => string
) {
	return {
		bg: resolveRef(raw.bg),
		on: resolveRef(raw.on),
		border: resolveRef(raw.border),
	};
}

/**
 * Resolve a design-system Tokens object into a typed ResolvedTheme.
 *
 * Mode-aware tokens (colorTokens, contracts, shadows) are resolved based on
 * the `isDark` boolean: light values in light mode, dark values in dark mode.
 */
export function applyTheme(theme: Tokens, isDark: boolean): ResolvedTheme {
	// Raw palette colors (mode-invariant)
	const colors = { ...theme.colors } as Record<ColorToken, string>;

	// Semantic color tokens: resolve light/dark pair based on isDark
	const colorTokens = {} as Record<ColorTokenName, string>;
	const ctMap: Record<string, ColorPair> = {};
	const colorTokenGroups = theme.colorTokens;
	for (const group of Object.values(colorTokenGroups)) {
		for (const [name, pair] of Object.entries(group)) {
			ctMap[name] = pair;
			(colorTokens as Record<string, string>)[name] = resolveLeaf(
				isDark ? pair.dark : pair.light,
				theme
			);
		}
	}

	// Helper: resolve a color token reference to its hex value
	const resolveRef = (ref: string): string => {
		if (ctMap[ref]) {
			return resolveLeaf(isDark ? ctMap[ref].dark : ctMap[ref].light, theme);
		}
		return (colors as Record<string, string>)[ref] ?? ref;
	};

	// Action contracts
	const actions = theme.contracts.actions;
	const resolvedActions: ResolvedActions = {
		primary: resolveFullAction(actions.primary, resolveRef),
		secondary: resolveFullAction(actions.secondary, resolveRef),
		ghost: resolveFullAction(actions.ghost, resolveRef),
		link: resolveLinkAction(actions.link, resolveRef),
		tertiary: resolveFullAction(actions.tertiary, resolveRef),
	};

	// Feedback contracts
	const fb = theme.contracts.feedback;
	const resolvedFeedback: ResolvedFeedback = {
		error: resolveFeedback(fb.error, resolveRef, theme),
		success: resolveFeedback(fb.success, resolveRef, theme),
		warning: resolveFeedback(fb.warning, resolveRef, theme),
		info: resolveFeedback(fb.info, resolveRef, theme),
	};

	// Surface contracts
	const sf = theme.contracts.surfaces;
	const resolvedSurfaces: ResolvedSurfaces = {
		base: resolveSurface(sf.base, resolveRef),
		alt: resolveSurface(sf.alt, resolveRef),
		raised: resolveSurface(sf.raised, resolveRef),
		sunken: resolveSurface(sf.sunken, resolveRef),
		inverse: resolveSurface(sf.inverse, resolveRef),
		brand: resolveSurface(sf.brand, resolveRef),
	};

	// Shape preset: border radius (px) per element bucket
	const shapePreset = SHAPE_PRESETS[theme.style];
	const shape: ResolvedShape = {
		button: theme.radii[shapePreset.button],
		input: theme.radii[shapePreset.input],
		card: theme.radii[shapePreset.card],
	};

	// Shadows: resolve to RN shadow props
	const resolvedShadows = {} as Record<ShadowToken, ViewStyle>;
	for (const [key, value] of Object.entries(theme.shadows)) {
		const colorToken = isDark ? value.color.dark : value.color.light;
		const hex = theme.colors[colorToken as ColorToken] ?? '#000000';
		const topLayer = value.layers[0];
		if (topLayer) {
			(resolvedShadows as Record<string, ViewStyle>)[key] = {
				shadowColor: hex,
				shadowOffset: { width: topLayer.offsetX, height: topLayer.offsetY },
				shadowRadius: topLayer.blurRadius,
				elevation: Math.ceil(topLayer.offsetY + topLayer.blurRadius),
			};
		}
	}

	return {
		colors,
		colorTokens,
		contracts: {
			actions: resolvedActions,
			feedback: resolvedFeedback,
			surfaces: resolvedSurfaces,
		},
		shape,
		spacing: theme.spacing,
		radii: theme.radii,
		widths: theme.widths,
		layout: theme.layout,
		typography: {
			fontFamilies: theme.typography.fontFamilies,
			fontSize: theme.typography.fontSize,
			fontWeight: theme.typography.fontWeight,
			lineHeight: theme.typography.lineHeight,
			letterSpacing: theme.typography.letterSpacing,
		},
		shadows: resolvedShadows,
	};
}
