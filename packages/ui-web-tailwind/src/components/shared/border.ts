import type { CSSProperties } from 'react';
import type { ColorTokenName } from '@repo/foundations';
import { colorTokenVar } from './cssVars';

/**
 * Known border color tokens. Each maps to a mode-aware `--ct-border-*` CSS
 * variable resolved by `applyTheme`.
 */
const BORDER_TOKENS = [
	'border-primary',
	'border-secondary',
	'border-secondary_alt',
	'border-tertiary',
	'border-brand',
	'border-brand_alt',
	'border-error',
	'border-error_subtle',
] as const;

export type BorderToken = (typeof BORDER_TOKENS)[number];

/** Any valid CSS `border-style` value. */
export type BorderStyle = 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'none';

/**
 * Shorthand border prop — `{width}-{colorToken}-{style}`.
 *
 * - **width**: any CSS width value (e.g. `'1px'`, `'2px'`, `'0.5rem'`).
 * - **colorToken**: one of the 8 `border-*` design tokens.
 * - **style**: any CSS border-style (`'solid'`, `'dashed'`, etc.).
 *
 * @example `"1px-border-primary-solid"`
 * @example `"2px-border-brand-dashed"`
 */
export type BorderProp = `${string}-${BorderToken}-${BorderStyle}`;

export interface ParsedBorder {
	width: string;
	colorVar: string;
	style: string;
}

/**
 * Parse a `BorderProp` string into its three components.
 *
 * The parser scans the dash-separated parts for a known `border-*` token.
 * Everything before the token is treated as the width; everything after as the
 * style. If the input doesn't match the expected format, a safe fallback is
 * returned (1px solid currentColor).
 */
export function parseBorder(value: BorderProp): ParsedBorder {
	const parts = value.split('-');

	// Find where the token starts: look for a segment equal to "border" that,
	// together with the next segment(s), forms a known token.
	let tokenStart = -1;
	let tokenEnd = -1;

	for (let i = 0; i < parts.length; i++) {
		if (parts[i] === 'border') {
			// Try single-segment token: border-{name}
			if (i + 1 < parts.length) {
				const single = `border-${parts[i + 1]}` as BorderToken;
				if ((BORDER_TOKENS as readonly string[]).includes(single)) {
					tokenStart = i;
					tokenEnd = i + 1;
					break;
				}
			}
		}
	}

	if (tokenStart === -1) {
		// Fallback — couldn't parse
		return { width: '1px', colorVar: 'currentColor', style: 'solid' };
	}

	const width = parts.slice(0, tokenStart).join('-') || '1px';
	const token = parts.slice(tokenStart, tokenEnd + 1).join('-') as BorderToken;
	const style = parts.slice(tokenEnd + 1).join('-') || 'solid';

	return {
		width,
		colorVar: colorTokenVar(token as ColorTokenName),
		style,
	};
}

/**
 * Resolve a `BorderProp` to CSS properties for inline styling.
 */
export function resolveBorder(
	value: BorderProp
): Pick<CSSProperties, 'borderWidth' | 'borderColor' | 'borderStyle'> {
	const parsed = parseBorder(value);
	return {
		borderWidth: parsed.width,
		borderColor: parsed.colorVar,
		borderStyle: parsed.style as CSSProperties['borderStyle'],
	};
}
