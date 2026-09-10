import type {
	Tokens,
	SpacingToken,
	RadiiToken,
	FontSizeToken,
	FontWeightToken,
	LineHeightToken,
	LetterSpacingToken,
	ColorTokenLeaf,
} from '@repo/foundations';

function hexToRgba(hex: string, alpha: number): string {
	if (hex === 'transparent') return `rgba(0,0,0,0)`;
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r},${g},${b},${alpha})`;
}

/** Resolve a color-token leaf (raw token string OR { base, alpha }) to a CSS color string. */
function resolveLeaf(leaf: ColorTokenLeaf, theme: Tokens): string {
	const token = typeof leaf === 'string' ? leaf : leaf.base;
	const hex = theme.colors[token as keyof Tokens['colors']];
	if (hex === 'transparent') return 'rgba(0,0,0,0)';
	if (typeof leaf === 'string') return hex as string;
	return hexToRgba(hex as string, leaf.alpha);
}

/** Reference a color-token name OR a raw palette token as a CSS var() string. */
function colorRefVar(color: string, ctMap: Record<string, unknown>): string {
	return ctMap[color] ? `var(--ct-${color})` : `var(--${color})`;
}

export function applyTheme(theme: Tokens, darkMode?: boolean) {
	const root = document.documentElement;

	// spacing
	Object.entries(theme.spacing).forEach(([key, value]) => {
		root.style.setProperty(`--spacing-${key}`, `${value}px`);
	});

	// radii
	Object.entries(theme.radii).forEach(([key, value]) => {
		root.style.setProperty(`--radii-${key}`, `${value}px`);
	});

	// widths (container max-widths)
	Object.entries(theme.widths).forEach(([key, value]) => {
		root.style.setProperty(`--ds-width-${key}`, `${value}px`);
	});

	// layout (grid gutter/margin scale)
	Object.entries(theme.layout).forEach(([key, value]) => {
		root.style.setProperty(`--ds-layout-${key}`, `${value}px`);
	});

	// typography
	Object.entries(theme.typography.fontFamilies).forEach(([key, value]) => {
		root.style.setProperty(`--typography-fontFamilies-${key}`, value);
	});
	Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
		root.style.setProperty(`--typography-fontSize-${key}`, `${value.fontSizePx}px`);
		root.style.setProperty(`--typography-fontSize-${key}-rem`, `${value.fontSizeRem}rem`);
		if (value.letterSpacing !== undefined) {
			root.style.setProperty(`--typography-letterSpacing-${key}`, `${value.letterSpacing}em`);
		}
	});
	Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
		root.style.setProperty(`--typography-fontWeight-${key}`, String(value));
	});
	Object.entries(theme.typography.lineHeight).forEach(([key, value]) => {
		root.style.setProperty(`--typography-lineHeight-${key}`, String(value));
	});
	Object.entries(theme.typography.letterSpacing).forEach(([key, value]) => {
		root.style.setProperty(`--typography-letterSpacing-${key}`, `${value}em`);
	});

	// colors (raw palette)
	Object.entries(theme.colors).forEach(([key, value]) => {
		root.style.setProperty(`--${key}`, value as string);
	});

	// color tokens (semantic light/dark pairs -> --ct-<name>{-default,-dark})
	const ctMap: Record<string, { light: ColorTokenLeaf; dark: ColorTokenLeaf }> = {};
	Object.entries(theme.colorTokens).forEach(([, tokens]) => {
		Object.entries(
			tokens as Record<string, { light: ColorTokenLeaf; dark: ColorTokenLeaf }>
		).forEach(([name, pair]) => {
			ctMap[name] = pair;
			const lightColor = resolveLeaf(pair.light, theme);
			const darkColor = resolveLeaf(pair.dark, theme);
			root.style.setProperty(`--ct-${name}-default`, lightColor);
			root.style.setProperty(`--ct-${name}-dark`, darkColor);
			root.style.setProperty(`--ct-${name}`, darkMode ? darkColor : lightColor);
		});
	});

	// typography - contracts
	Object.entries(theme.contracts.typography).forEach(([contractName, contractValue]) => {
		const scale = theme.typography.fontSize[contractValue.fontSize as FontSizeToken];
		const fw = theme.typography.fontWeight[contractValue.fontWeight as FontWeightToken];
		const lh = theme.typography.lineHeight[contractValue.lineHeight as LineHeightToken];

		root.style.setProperty(
			`--typography-contract-${contractName}-fontSize`,
			`${scale.fontSizePx}px`
		);
		root.style.setProperty(`--typography-contract-${contractName}-fontWeight`, String(fw));
		root.style.setProperty(`--typography-contract-${contractName}-lineHeight`, String(lh));

		if (contractValue.letterSpacing) {
			const ls = theme.typography.letterSpacing[contractValue.letterSpacing as LetterSpacingToken];
			root.style.setProperty(`--typography-contract-${contractName}-letterSpacing`, `${ls}em`);
		}

		if (contractValue.fontFamily) {
			const ff =
				theme.typography.fontFamilies[
					contractValue.fontFamily as keyof typeof theme.typography.fontFamilies
				];
			if (ff) {
				root.style.setProperty(`--typography-contract-${contractName}-fontFamily`, ff);
			}
		}

		if (contractValue.color) {
			root.style.setProperty(
				`--typography-contract-${contractName}-color`,
				colorRefVar(contractValue.color as string, ctMap)
			);
		}
	});

	// components contracts (radii -> px CSS vars)
	Object.entries(theme.contracts.components).forEach(([key, radiiRef]) => {
		const kebab = key.replace(/([A-Z])/g, '-$1').toLowerCase();
		const radiiToken =
			typeof radiiRef === 'object' && radiiRef !== null && 'value' in radiiRef
				? radiiRef.value
				: radiiRef;
		const px = theme.radii[radiiToken as RadiiToken];
		root.style.setProperty(`--components-${kebab}`, `${px}px`);
	});

	// helper: resolve a contract field value (color-token name OR raw palette token) to a CSS color
	const resolveContractValue = (value: string, dm: boolean): string => {
		const pair = ctMap[value];
		if (pair) {
			return resolveLeaf(dm ? pair.dark : pair.light, theme);
		}
		const hex = theme.colors[value as keyof Tokens['colors']];
		return hex === 'transparent' ? 'rgba(0,0,0,0)' : (hex as string);
	};

	// breakpoints
	Object.entries(theme.breakpoints).forEach(([bp, px]) => {
		root.style.setProperty(`--breakpoint-${bp}`, `${px}px`);
	});

	// actions (resolve each preset property to CSS vars)
	Object.entries(theme.contracts.actions).forEach(([variant, preset]) => {
		Object.entries(preset as unknown as Record<string, string>).forEach(([prop, value]) => {
			const lightColor = resolveContractValue(value, false);
			const darkColor = resolveContractValue(value, true);
			root.style.setProperty(`--action-${variant}-${prop}-default`, lightColor);
			root.style.setProperty(`--action-${variant}-${prop}-dark`, darkColor);
			root.style.setProperty(`--action-${variant}-${prop}`, darkMode ? darkColor : lightColor);
		});
	});

	// feedback (resolve each preset property to CSS vars)
	Object.entries(theme.contracts.feedback).forEach(([intent, preset]) => {
		Object.entries(preset as unknown as Record<string, string>).forEach(([prop, value]) => {
			const lightColor = resolveContractValue(value, false);
			const darkColor = resolveContractValue(value, true);
			root.style.setProperty(`--feedback-${intent}-${prop}-default`, lightColor);
			root.style.setProperty(`--feedback-${intent}-${prop}-dark`, darkColor);
			root.style.setProperty(`--feedback-${intent}-${prop}`, darkMode ? darkColor : lightColor);
		});
	});

	// surfaces (resolve each preset property to CSS vars)
	Object.entries(theme.contracts.surfaces).forEach(([surface, preset]) => {
		Object.entries(preset as unknown as Record<string, string>).forEach(([prop, value]) => {
			const lightColor = resolveContractValue(value, false);
			const darkColor = resolveContractValue(value, true);
			root.style.setProperty(`--surface-${surface}-${prop}-default`, lightColor);
			root.style.setProperty(`--surface-${surface}-${prop}-dark`, darkColor);
			root.style.setProperty(`--surface-${surface}-${prop}`, darkMode ? darkColor : lightColor);
		});
	});

	// grid
	Object.entries(theme.grid).forEach(([bp, config]) => {
		root.style.setProperty(`--grid-${bp}-columns`, String(config.columns));
		root.style.setProperty(`--grid-${bp}-gutter`, `${theme.layout[config.gutter]}px`);
		root.style.setProperty(`--grid-${bp}-margin`, `${theme.layout[config.margin]}px`);
		root.style.setProperty(`--grid-${bp}-maxWidth`, `${theme.widths[config.maxWidth]}px`);
	});

	// shadows (mode-aware, multi-layer)
	Object.entries(theme.shadows).forEach(([key, value]) => {
		const lightHex = theme.colors[value.color.light as keyof Tokens['colors']] as string;
		const darkHex = theme.colors[value.color.dark as keyof Tokens['colors']] as string;
		const buildShadow = (hex: string): string =>
			value.layers
				.map(
					(l) =>
						`${l.offsetX}px ${l.offsetY}px ${l.blurRadius}px ${l.spreadRadius}px ${hexToRgba(hex, l.opacity)}`
				)
				.join(', ');

		root.style.setProperty(`--shadow-${key}-default`, buildShadow(lightHex));
		root.style.setProperty(`--shadow-${key}-dark`, buildShadow(darkHex));
		root.style.setProperty(
			`--shadow-${key}`,
			darkMode ? buildShadow(darkHex) : buildShadow(lightHex)
		);
	});

	// focus rings (resolve color + optional shadow -> box-shadow string)
	Object.entries(theme.focusRing).forEach(([key, fr]) => {
		const color = resolveLeaf(darkMode ? fr.color.dark : fr.color.light, theme);
		let boxShadow: string;
		if (fr.shadow) {
			const shadowVal = theme.shadows[fr.shadow];
			const shadowHex = theme.colors[
				(darkMode ? shadowVal.color.dark : shadowVal.color.light) as keyof Tokens['colors']
			] as string;
			const shadowStr = shadowVal.layers
				.map(
					(l) =>
						`${l.offsetX}px ${l.offsetY}px ${l.blurRadius}px ${l.spreadRadius}px ${hexToRgba(shadowHex, l.opacity)}`
				)
				.join(', ');
			boxShadow = `${shadowStr}, 0 0 0 3px ${color}`;
		} else {
			boxShadow = `0 0 0 3px ${color}`;
		}
		root.style.setProperty(`--focusring-${key}`, boxShadow);
	});

	// gradients (resolves color token references)
	Object.entries(theme.gradients).forEach(([key, value]) => {
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
}
