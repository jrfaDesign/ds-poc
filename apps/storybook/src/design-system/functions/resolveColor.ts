import { hexToRgba, type ColorTokenLeaf, type Tokens } from '@repo/foundations';

/** A light/dark color-token pair (the shape every semantic token uses). */
export type ColorPair = {
	light: ColorTokenLeaf;
	dark: ColorTokenLeaf;
};

/** Resolve a color-token leaf (name or `{ base, alpha }`) to a CSS color. */
export function resolveColor(theme: Tokens, leaf: ColorTokenLeaf): string {
	if (typeof leaf === 'string') return theme.colors[leaf];
	return hexToRgba(theme.colors[leaf.base], leaf.alpha);
}

/** Resolve one side of a light/dark pair. */
export function resolvePair(theme: Tokens, pair: ColorPair, mode: 'light' | 'dark'): string {
	return resolveColor(theme, mode === 'light' ? pair.light : pair.dark);
}
