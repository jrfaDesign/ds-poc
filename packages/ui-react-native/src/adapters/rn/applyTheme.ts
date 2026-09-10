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
	TypographyContractToken,
} from '@repo/foundations';
import type { ButtonVariant, CardVariant } from '@repo/globals';

function hexToRgba(hex: string, alpha: number): string {
	if (hex === 'transparent') return 'rgba(0,0,0,0)';
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r},${g},${b},${alpha})`;
}

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

export type ResolvedTypography = {
	fontSizePx: number;
	fontWeight: number;
	lineHeight: number;
	letterSpacing?: number;
	fontFamily?: string;
	color: string;
};

export type ResolvedInputField = {
	bg: string;
	on: string;
	border: string;
	placeholder: string;
	bgHover: string;
	borderHover: string;
	bgFocus: string;
	borderFocus: string;
	onFocus: string;
	bgDisabled: string;
	onDisabled: string;
	borderDisabled: string;
	borderError: string;
	onError: string;
	borderSuccess: string;
	onSuccess: string;
};

export type ResolvedSelectionControl = {
	bg: string;
	border: string;
	bgChecked: string;
	borderChecked: string;
	onChecked: string;
	bgHover: string;
	borderHover: string;
	bgDisabled: string;
	borderDisabled: string;
	onDisabled: string;
	borderError: string;
};

export type ResolvedToggle = {
	trackBg: string;
	trackBgChecked: string;
	trackBorder: string;
	thumbColor: string;
	thumbColorChecked: string;
	bgHover: string;
	trackBgCheckedHover: string;
	bgDisabled: string;
	trackBgDisabled: string;
	thumbDisabled: string;
	borderError: string;
};

export type ResolvedShadow = ViewStyle;

type FontSizeScale = { fontSizePx: number; fontSizeRem: number; letterSpacing?: number };

export type ResolvedTheme = {
	colors: Record<ColorToken, string>;
	colorTokens: Record<ColorTokenName, string>;
	contracts: {
		actions: ResolvedActions;
		feedback: ResolvedFeedback;
		surfaces: ResolvedSurfaces;
		typography: Record<TypographyContractToken, ResolvedTypography>;
		inputField: ResolvedInputField;
		selectionControl: ResolvedSelectionControl;
		toggle: ResolvedToggle;
		components: { buttonBorderRadii: number; cardBorderRadii: number; inputBorderRadii: number };
		extraContracts: Record<string, Record<string, any>>;
	};
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
// ---------------------------------------------

function toKebab(s: string): string {
	return s.replace(/([A-Z])/g, '-$1').toLowerCase();
}

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
 * the `isDark` boolean — light values in light mode, dark values in dark mode.
 */
export function applyTheme(theme: Tokens, isDark: boolean): ResolvedTheme {
	// Raw palette colors (mode-invariant)
	const colors = { ...theme.colors } as Record<ColorToken, string>;

	// Semantic color tokens — resolve light/dark pair based on isDark
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

	// Typography contracts
	const resolvedTypography = {} as Record<TypographyContractToken, ResolvedTypography>;
	for (const [name, cv] of Object.entries(theme.contracts.typography)) {
		const key = name as TypographyContractToken;
		const scale = theme.typography.fontSize[cv.fontSize];
		const fw = theme.typography.fontWeight[cv.fontWeight];
		const lh = theme.typography.lineHeight[cv.lineHeight];
		const ff = theme.typography.fontFamilies[cv.fontFamily];
		resolvedTypography[key] = {
			fontSizePx: scale.fontSizePx,
			fontWeight: fw,
			lineHeight: lh,
			letterSpacing: cv.letterSpacing
				? theme.typography.letterSpacing[cv.letterSpacing]
				: undefined,
			fontFamily: ff,
			color: resolveRef(cv.color ?? 'text-primary'),
		};
	}

	// Action contracts
	const actions = theme.contracts.actions;
	const resolvedActions: ResolvedActions = {
		primary: resolveFullAction(actions.primary, resolveRef),
		secondary: resolveFullAction(actions.secondary, resolveRef),
		ghost: resolveFullAction(actions.ghost, resolveRef),
		link: resolveLinkAction(actions.link, resolveRef),
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

	// InputField contracts
	const if_ = theme.contracts.inputField;
	const resolvedInputField: ResolvedInputField = {
		bg: resolveRef(if_.bg),
		on: resolveRef(if_.on),
		border: resolveRef(if_.border),
		placeholder: resolveRef(if_.placeholder),
		bgHover: resolveRef(if_.bgHover),
		borderHover: resolveRef(if_.borderHover),
		bgFocus: resolveRef(if_.bgFocus),
		borderFocus: resolveRef(if_.borderFocus),
		onFocus: resolveRef(if_.onFocus),
		bgDisabled: resolveRef(if_.bgDisabled),
		onDisabled: resolveRef(if_.onDisabled),
		borderDisabled: resolveRef(if_.borderDisabled),
		borderError: resolveRef(if_.borderError),
		onError: resolveRef(if_.onError),
		borderSuccess: resolveRef(if_.borderSuccess),
		onSuccess: resolveRef(if_.onSuccess),
	};

	// SelectionControl contracts
	const sc = theme.contracts.selectionControl;
	const resolvedSelectionControl: ResolvedSelectionControl = {
		bg: resolveRef(sc.bg),
		border: resolveRef(sc.border),
		bgChecked: resolveRef(sc.bgChecked),
		borderChecked: resolveRef(sc.borderChecked),
		onChecked: resolveRef(sc.onChecked),
		bgHover: resolveRef(sc.bgHover),
		borderHover: resolveRef(sc.borderHover),
		bgDisabled: resolveRef(sc.bgDisabled),
		borderDisabled: resolveRef(sc.borderDisabled),
		onDisabled: resolveRef(sc.onDisabled),
		borderError: resolveRef(sc.borderError),
	};

	// Toggle contracts
	const tg = theme.contracts.toggle;
	const resolvedToggle: ResolvedToggle = {
		trackBg: resolveRef(tg.trackBg),
		trackBgChecked: resolveRef(tg.trackBgChecked),
		trackBorder: resolveRef(tg.trackBorder),
		thumbColor: resolveRef(tg.thumbColor),
		thumbColorChecked: resolveRef(tg.thumbColorChecked),
		bgHover: resolveRef(tg.bgHover),
		trackBgCheckedHover: resolveRef(tg.trackBgCheckedHover),
		bgDisabled: resolveRef(tg.bgDisabled),
		trackBgDisabled: resolveRef(tg.trackBgDisabled),
		thumbDisabled: resolveRef(tg.thumbDisabled),
		borderError: resolveRef(tg.borderError),
	};

	// Shadows — resolve to RN shadow props
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

	// Components contracts — resolve radii tokens to px values
	const sh = theme.contracts.components;
	const resolvedComponents = {
		buttonBorderRadii: theme.radii[sh.buttonBorderRadii.value],
		cardBorderRadii: theme.radii[sh.cardBorderRadii.value],
		inputBorderRadii: theme.radii[sh.inputBorderRadii.value],
	};

	// Generic resolution for any extra contracts not covered by typed resolution
	const knownContracts = new Set([
		'actions',
		'feedback',
		'surfaces',
		'typography',
		'inputField',
		'selectionControl',
		'toggle',
		'components',
	]);
	const extraContracts: Record<string, Record<string, any>> = {};
	for (const [name, preset] of Object.entries(theme.contracts)) {
		if (knownContracts.has(name) || !preset || typeof preset !== 'object') continue;
		const resolved: Record<string, any> = {};
		for (const [field, value] of Object.entries(preset as Record<string, any>)) {
			if (typeof value === 'string') resolved[field] = resolveRef(value);
			else if (typeof value === 'number') resolved[field] = value;
			else if (value && typeof value === 'object' && 'type' in value) {
				if (value.type === 'radii') resolved[field] = theme.radii[value.value as RadiiToken];
			}
		}
		extraContracts[name] = resolved;
	}

	return {
		colors,
		colorTokens,
		contracts: {
			actions: resolvedActions,
			feedback: resolvedFeedback,
			surfaces: resolvedSurfaces,
			typography: resolvedTypography,
			inputField: resolvedInputField,
			selectionControl: resolvedSelectionControl,
			toggle: resolvedToggle,
			components: resolvedComponents,
			extraContracts,
		},
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
