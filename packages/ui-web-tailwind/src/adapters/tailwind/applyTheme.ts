import type {
	Tokens,
	ColorTokenLeaf,
	SpacingToken,
	RadiiToken,
	WidthToken,
	LayoutToken,
	FontSizeToken,
	FontWeightToken,
	LineHeightToken,
	LetterSpacingToken,
	FontFamilyToken,
} from '@repo/foundations';

const MODE_STYLE_ID = 'ds-mode-switch';

function hexToRgba(hex: string, alpha: number): string {
	if (hex === 'transparent') return 'rgba(0,0,0,0)';
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r},${g},${b},${alpha})`;
}

function resolveLeaf(leaf: ColorTokenLeaf, theme: Tokens): string {
	const token = typeof leaf === 'string' ? leaf : leaf.base;
	const hex = theme.colors[token as keyof Tokens['colors']];
	if (hex === 'transparent') return 'rgba(0,0,0,0)';
	if (typeof leaf === 'string') return hex as string;
	return hexToRgba(hex as string, leaf.alpha);
}

const toKebab = (s: string): string => s.replace(/([A-Z])/g, '-$1').toLowerCase();

type ColorPair = { light: ColorTokenLeaf; dark: ColorTokenLeaf };

/**
 * Apply a validated design-system theme to the runtime environment.
 *
 * Writes the theme's resolved values onto `:root` as CSS custom properties
 * using the same naming convention referenced by the static `@theme` block
 * in `tailwind-theme.css`. Dark mode is class-based: every mode-aware token
 * is emitted as a `-default` (light) / `-dark` pair plus a selection rule
 * (injected once into a `<style id="ds-mode-switch">`) that resolves the
 * active value based on whether the `dark` class is present on `<html>`.
 *
 * Switching theme: call `applyTheme(theme)` again (idempotent; only the
 * runtime values change, the selection rules are stable across themes).
 * Switching mode: just toggle `document.documentElement.classList` 'dark'
 * - no JS re-run required.
 */
export function applyTheme(theme: Tokens): void {
	const root = document.documentElement;
	const lightRules: string[] = [];
	const darkRules: string[] = [];
	const register = (base: string): void => {
		lightRules.push(`--${base}:var(--${base}-default);`);
		darkRules.push(`--${base}:var(--${base}-dark);`);
	};

	// spacing (mode-invariant)
	(Object.entries(theme.spacing) as [SpacingToken, number][]).forEach(([key, value]) => {
		root.style.setProperty(`--ds-spacing-${key}`, `${value}px`);
	});

	// radii (mode-invariant)
	(Object.entries(theme.radii) as [RadiiToken, number][]).forEach(([key, value]) => {
		root.style.setProperty(`--radii-${key}`, `${value}px`);
	});

	// widths (mode-invariant) - container max-widths; unitless -> px
	(Object.entries(theme.widths) as [WidthToken, number][]).forEach(([key, value]) => {
		root.style.setProperty(`--ds-width-${key}`, `${value}px`);
	});

	// layout (mode-invariant) - grid gutter/margin scale; unitless -> px
	(Object.entries(theme.layout) as [LayoutToken, number][]).forEach(([key, value]) => {
		root.style.setProperty(`--ds-layout-${key}`, `${value}px`);
	});

	// typography base scales (mode-invariant)
	(Object.entries(theme.typography.fontFamilies) as [FontFamilyToken, string][]).forEach(
		([key, value]) => {
			root.style.setProperty(`--typography-fontFamilies-${key}`, value);
		}
	);
	(
		Object.entries(theme.typography.fontSize) as [
			FontSizeToken,
			{
				fontSizePx: number;
				fontSizeRem: number;
				letterSpacing?: number;
			},
		][]
	).forEach(([key, value]) => {
		root.style.setProperty(`--typography-fontSize-${key}`, `${value.fontSizePx}px`);
		root.style.setProperty(`--typography-fontSize-${key}-rem`, `${value.fontSizeRem}rem`);
		if (value.letterSpacing !== undefined) {
			root.style.setProperty(`--typography-letterSpacing-${key}`, `${value.letterSpacing}em`);
		}
	});
	(Object.entries(theme.typography.fontWeight) as [FontWeightToken, number][]).forEach(
		([key, value]) => {
			root.style.setProperty(`--typography-fontWeight-${key}`, String(value));
		}
	);
	(Object.entries(theme.typography.lineHeight) as [LineHeightToken, number][]).forEach(
		([key, value]) => {
			root.style.setProperty(`--typography-lineHeight-${key}`, String(value));
		}
	);
	(Object.entries(theme.typography.letterSpacing) as [LetterSpacingToken, number][]).forEach(
		([key, value]) => {
			root.style.setProperty(`--typography-letterSpacing-${key}`, `${value}em`);
		}
	);

	// raw palette colors (mode-invariant)
	(Object.entries(theme.colors) as [string, string][]).forEach(([key, value]) => {
		root.style.setProperty(`--${key}`, value);
	});

	// semantic color tokens (mode-aware: light/dark pair)
	const ctMap: Record<string, ColorPair> = {};
	(Object.values(theme.colorTokens) as Record<string, ColorPair>[]).forEach((group) => {
		(Object.entries(group) as [string, ColorPair][]).forEach(([name, pair]) => {
			ctMap[name] = pair;
			root.style.setProperty(`--ct-${name}-default`, resolveLeaf(pair.light, theme));
			root.style.setProperty(`--ct-${name}-dark`, resolveLeaf(pair.dark, theme));
			register(`ct-${name}`);
		});
	});

	// Helper: set a var that references a color token. If the referenced token
	// is semantic (in ctMap), register it as mode-aware so it flips with
	// .ds-invert. If it's a raw palette color, it's mode-invariant.
	const setRefVar = (name: string, refColor: string): void => {
		if (ctMap[refColor]) {
			root.style.setProperty(`--${name}-default`, `var(--ct-${refColor}-default)`);
			root.style.setProperty(`--${name}-dark`, `var(--ct-${refColor}-dark)`);
			register(name);
		} else {
			root.style.setProperty(`--${name}`, `var(--${refColor})`);
		}
	};

	// Generic contract value resolver — handles self-describing values
	const resolveAndEmit = (cssVar: string, value: any): void => {
		if (typeof value === 'string') {
			setRefVar(cssVar, value);
		} else if (typeof value === 'number') {
			root.style.setProperty(`--${cssVar}`, `${value}px`);
		} else if (value && typeof value === 'object' && 'type' in value) {
			if (value.type === 'radii') {
				root.style.setProperty(`--${cssVar}`, `${theme.radii[value.value as RadiiToken]}px`);
			}
		} else if (value && typeof value === 'object' && 'light' in value && 'dark' in value) {
			root.style.setProperty(`--${cssVar}-default`, resolveLeaf(value.light, theme));
			root.style.setProperty(`--${cssVar}-dark`, resolveLeaf(value.dark, theme));
			register(cssVar);
		}
	};

	// Generic contract emitter — handles nested (actions, feedback, surfaces, typography)
	// and flat (inputField, selectionControl, toggle, components) contracts
	// CONTRACT_PREFIX maps contract keys to their CSS var prefix (backward compat with CSS bridge)
	const CONTRACT_PREFIX: Record<string, string> = {
		actions: 'action',
		surfaces: 'surface',
		inputField: 'inputfield',
		selectionControl: 'selectioncontrol',
	};

	const emitFlatContract = (prefix: string, preset: Record<string, any>): void => {
		Object.entries(preset).forEach(([field, value]) => {
			resolveAndEmit(`${prefix}-${toKebab(field)}`, value);
		});
	};

	const emitNestedContract = (name: string, contract: Record<string, any>): void => {
		const prefix = CONTRACT_PREFIX[name] ?? name;
		Object.entries(contract).forEach(([variant, preset]) => {
			if (preset && typeof preset === 'object' && !Array.isArray(preset)) {
				emitFlatContract(`${prefix}-${toKebab(variant)}`, preset);
			}
		});
	};

	// typography contracts — special case (multi-field scale resolution)
	(
		Object.entries(theme.contracts.typography) as [
			string,
			Tokens['contracts']['typography'][keyof Tokens['contracts']['typography']],
		][]
	).forEach(([contractName, cv]) => {
		const scale = theme.typography.fontSize[cv.fontSize];
		const fw = theme.typography.fontWeight[cv.fontWeight];
		const lh = theme.typography.lineHeight[cv.lineHeight];
		const ff = theme.typography.fontFamilies[cv.fontFamily as FontFamilyToken];
		root.style.setProperty(
			`--typography-contract-${contractName}-fontSize`,
			`${scale.fontSizePx}px`
		);
		root.style.setProperty(`--typography-contract-${contractName}-fontWeight`, String(fw));
		root.style.setProperty(`--typography-contract-${contractName}-lineHeight`, String(lh));
		if (cv.letterSpacing) {
			const ls = theme.typography.letterSpacing[cv.letterSpacing];
			root.style.setProperty(`--typography-contract-${contractName}-letterSpacing`, `${ls}em`);
		}
		if (ff) {
			root.style.setProperty(`--typography-contract-${contractName}-fontFamily`, ff);
		}
		const color = (cv.color ?? 'text-primary') as string;
		setRefVar(`typography-contract-${contractName}-color`, color);
	});

	// ALL other contracts — generic resolution (no per-contract code needed)
	// CONTRACT_STRUCTURE explicitly declares nested vs flat to avoid fragile auto-detection
	const CONTRACT_STRUCTURE: Record<string, 'nested' | 'flat'> = {
		actions: 'nested',
		feedback: 'nested',
		surfaces: 'nested',
		inputField: 'flat',
		selectionControl: 'flat',
		toggle: 'flat',
		components: 'flat',
	};

	const { typography, ...restContracts } = theme.contracts;
	Object.entries(restContracts).forEach(([contractName, preset]) => {
		if (!preset || typeof preset !== 'object') return;
		// Resolve the CSS var prefix (handles case mismatches: selectionControl → selectioncontrol)
		const prefix = CONTRACT_PREFIX[contractName] ?? contractName;
		const structure = CONTRACT_STRUCTURE[contractName];
		if (structure === 'nested') {
			emitNestedContract(contractName, preset as Record<string, any>);
		} else if (structure === 'flat') {
			emitFlatContract(prefix, preset as Record<string, any>);
		} else {
			// Unknown contract — auto-detect as fallback
			const firstVal = Object.values(preset)[0];
			if (
				firstVal &&
				typeof firstVal === 'object' &&
				!Array.isArray(firstVal) &&
				!('type' in firstVal)
			) {
				emitNestedContract(contractName, preset as Record<string, any>);
			} else {
				emitFlatContract(prefix, preset as Record<string, any>);
			}
		}
	});

	// grid (mode-invariant) - gutter/margin from layout tokens, maxWidth from width tokens
	(Object.entries(theme.grid) as [string, Tokens['grid'][keyof Tokens['grid']]][]).forEach(
		([bp, config]) => {
			root.style.setProperty(`--grid-${bp}-columns`, String(config.columns));
			root.style.setProperty(`--grid-${bp}-gutter`, `${theme.layout[config.gutter]}px`);
			root.style.setProperty(`--grid-${bp}-margin`, `${theme.layout[config.margin]}px`);
			root.style.setProperty(`--grid-${bp}-maxWidth`, `${theme.widths[config.maxWidth]}px`);
		}
	);

	// shadows (mode-aware: multi-layer -> joined box-shadow string)
	(Object.entries(theme.shadows) as [string, Tokens['shadows'][keyof Tokens['shadows']]][]).forEach(
		([key, value]) => {
			const lightHex = theme.colors[value.color.light as keyof Tokens['colors']] as string;
			const darkHex = theme.colors[value.color.dark as keyof Tokens['colors']] as string;
			const buildShadow = (hex: string): string =>
				value.layers
					.map(
						(l) =>
							`${l.offsetX}px ${l.offsetY}px ${l.blurRadius}px ${l.spreadRadius}px ${hexToRgba(hex, l.opacity)}`
					)
					.join(', ');
			root.style.setProperty(`--ds-shadow-${key}-default`, buildShadow(lightHex));
			root.style.setProperty(`--ds-shadow-${key}-dark`, buildShadow(darkHex));
			register(`ds-shadow-${key}`);
		}
	);

	// focus rings (mode-aware: color is {light,dark} + optional shadow)
	(
		Object.entries(theme.focusRing) as [string, Tokens['focusRing'][keyof Tokens['focusRing']]][]
	).forEach(([key, fr]) => {
		const buildRing = (mode: 'light' | 'dark'): string => {
			const ringColor = resolveLeaf(mode === 'light' ? fr.color.light : fr.color.dark, theme);
			if (fr.shadow) {
				const sv = theme.shadows[fr.shadow];
				const shadowToken = mode === 'light' ? sv.color.light : sv.color.dark;
				const shadowHex = theme.colors[shadowToken as keyof Tokens['colors']] as string;
				const shadowStr = sv.layers
					.map(
						(l) =>
							`${l.offsetX}px ${l.offsetY}px ${l.blurRadius}px ${l.spreadRadius}px ${hexToRgba(shadowHex, l.opacity)}`
					)
					.join(', ');
				return `${shadowStr}, 0 0 0 3px ${ringColor}`;
			}
			return `0 0 0 3px ${ringColor}`;
		};
		root.style.setProperty(`--focusring-${key}-default`, buildRing('light'));
		root.style.setProperty(`--focusring-${key}-dark`, buildRing('dark'));
		register(`focusring-${key}`);
	});

	// gradients (mode-invariant: linear-gradient of raw palette colors)
	(
		Object.entries(theme.gradients) as [string, Tokens['gradients'][keyof Tokens['gradients']]][]
	).forEach(([key, value]) => {
		if (value === null) {
			root.style.setProperty(`--gradient-${key}`, 'none');
			return;
		}
		const stops = value.stops
			.map((stop) => {
				const hex = theme.colors[stop.color as keyof Tokens['colors']] as string;
				return stop.position != null ? `${hex} ${stop.position}%` : hex;
			})
			.join(', ');
		root.style.setProperty(`--gradient-${key}`, `linear-gradient(${value.angle}deg, ${stops})`);
	});

	// inject the light/dark selection rules (idempotent; stable across themes).
	// Also emit `.ds-invert` rules so any subtree with the `ds-invert` class
	// swaps light↔dark relative to the page — a dark section on a light page
	// (and vice-versa). Reuses the same lightRules/darkRules arrays so the
	// invert set is always in sync with the theme's token set.
	// `.ds-force-dark` and `.ds-force-light` force a specific mode regardless
	// of page mode, affecting all children via CSS variable inheritance.
	// `.ds-unforce` resets to page mode, overriding any inherited forced mode.
	const css =
		`:root{${lightRules.join('')}}:root.dark{${darkRules.join('')}}` +
		`:root .ds-invert{${darkRules.join('')}color-scheme:dark;}` +
		`:root.dark .ds-invert{${lightRules.join('')}color-scheme:light;}` +
		`.ds-force-dark{${darkRules.join('')}color-scheme:dark;}` +
		`.ds-force-light{${lightRules.join('')}color-scheme:light;}` +
		`.ds-unforce{${lightRules.join('')}color-scheme:light;}` +
		`:root.dark .ds-unforce{${darkRules.join('')}color-scheme:dark;}`;
	let styleEl = document.getElementById(MODE_STYLE_ID) as HTMLStyleElement | null;
	if (!styleEl) {
		styleEl = document.createElement('style');
		styleEl.id = MODE_STYLE_ID;
		document.head.appendChild(styleEl);
	}
	if (styleEl.textContent !== css) {
		styleEl.textContent = css;
	}
}
