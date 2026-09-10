import type {
	SpacingToken,
	RadiiToken,
	ShadowToken,
	FontFamilyToken,
	ColorTokenName,
} from '@repo/foundations';

// ---------------------------------------------
// SPACING
// ---------------------------------------------
export type SpacingVar<T extends SpacingToken = SpacingToken> = `var(--ds-spacing-${T})`;

/** Typed spacing CSS var reference — `spacingVar('md')` → `var(--ds-spacing-md)` */
export function spacingVar<T extends SpacingToken>(token: T): SpacingVar<T> {
	return `var(--ds-spacing-${token})` as SpacingVar<T>;
}

// ---------------------------------------------
// RADII
// ---------------------------------------------
export type RadiiVar<T extends RadiiToken = RadiiToken> = `var(--radii-${T})`;

/** Typed radii CSS var reference — `radiiVar('md')` → `var(--radii-md)` */
export function radiiVar<T extends RadiiToken>(token: T): RadiiVar<T> {
	return `var(--radii-${token})` as RadiiVar<T>;
}

// ---------------------------------------------
// COLOR TOKENS (semantic color token references)
// ---------------------------------------------
export type ColorTokenVar<T extends ColorTokenName = ColorTokenName> = `var(--ct-${T})`;

/** Typed color token CSS var reference — `colorTokenVar('text-primary')` → `var(--ct-text-primary)` */
export function colorTokenVar<T extends ColorTokenName>(token: T): ColorTokenVar<T> {
	return `var(--ct-${token})` as ColorTokenVar<T>;
}

// ---------------------------------------------
// SHADOWS
// ---------------------------------------------
export function shadowVar(level: ShadowToken): string {
	return `var(--ds-shadow-${level}-default)`;
}

// ---------------------------------------------
// FONT FAMILY (kept for convenience — prefer font-{token} utility)
// ---------------------------------------------
export type FontFamilyVar<T extends FontFamilyToken = FontFamilyToken> =
	`var(--typography-fontFamilies-${T})`;

/** Typed font-family CSS var reference — `fontFamilyVar('mono')` → `var(--typography-fontFamilies-mono)` */
export function fontFamilyVar<T extends FontFamilyToken>(token: T): FontFamilyVar<T> {
	return `var(--typography-fontFamilies-${token})` as FontFamilyVar<T>;
}
