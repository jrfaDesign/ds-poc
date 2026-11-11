import { hexToRgba, type ShadowToken, type Tokens } from '@repo/foundations';

/** Build a CSS `box-shadow` value from a theme shadow token (mode-aware color). */
export function buildBoxShadow(
	theme: Tokens,
	token: ShadowToken,
	mode: 'light' | 'dark' = 'light'
): string {
	const shadow = theme.shadows[token];
	const colorToken = mode === 'light' ? shadow.color.light : shadow.color.dark;
	const hex = theme.colors[colorToken];

	return shadow.layers
		.map(
			(layer) =>
				`${layer.offsetX}px ${layer.offsetY}px ${layer.blurRadius}px ${layer.spreadRadius}px ${hexToRgba(
					hex,
					layer.opacity
				)}`
		)
		.join(', ');
}
