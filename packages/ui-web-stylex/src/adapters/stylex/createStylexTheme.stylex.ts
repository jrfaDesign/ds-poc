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

	// typography
	root.style.setProperty('--typography-fontFamily', theme.typography.fontFamily);
	root.style.setProperty('--typography-monospaceFont', theme.typography.monospaceFont);
	Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
		root.style.setProperty(`--typography-fontSize-${key}`, `${value}px`);
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

	// typography — contracts
	Object.entries(theme.contracts.typography).forEach(([contractName, contractValue]) => {
		const fs = theme.typography.fontSize[contractValue.fontSize as FontSizeToken];
		const fw = theme.typography.fontWeight[contractValue.fontWeight as FontWeightToken];
		const lh = theme.typography.lineHeight[contractValue.lineHeight as LineHeightToken];

		root.style.setProperty(`--typography-contract-${contractName}-fontSize`, `${fs}px`);
		root.style.setProperty(`--typography-contract-${contractName}-fontWeight`, String(fw));
		root.style.setProperty(`--typography-contract-${contractName}-lineHeight`, String(lh));

		if (contractValue.letterSpacing) {
			const ls = theme.typography.letterSpacing[contractValue.letterSpacing as LetterSpacingToken];
			root.style.setProperty(`--typography-contract-${contractName}-letterSpacing`, `${ls}em`);
		}

		if (contractValue.color) {
			root.style.setProperty(
				`--typography-contract-${contractName}-color`,
				colorRefVar(contractValue.color as string, ctMap)
			);
		}
	});

	// components (literal color OR colorToken-ref OR non-color)
	Object.entries(theme.components).forEach(([comp, token]) => {
		// CASE 1: literal color override { light, dark }
		if ('light' in token && 'dark' in token) {
			const lightColor = resolveLeaf(token.light as ColorTokenLeaf, theme);
			const darkColor = resolveLeaf(token.dark as ColorTokenLeaf, theme);
			root.style.setProperty(`--component-${comp}-default`, lightColor);
			root.style.setProperty(`--component-${comp}-dark`, darkColor);
			root.style.setProperty(`--component-${comp}`, darkMode ? darkColor : lightColor);
			return;
		}

		// CASE 2: color-token reference { type: 'colorTokens', value }
		if (token.type === 'colorTokens') {
			const ref = token.value as string;
			const pair = ctMap[ref];
			if (pair) {
				const lightColor = resolveLeaf(pair.light, theme);
				const darkColor = resolveLeaf(pair.dark, theme);
				root.style.setProperty(`--component-${comp}-default`, lightColor);
				root.style.setProperty(`--component-${comp}-dark`, darkColor);
				root.style.setProperty(`--component-${comp}`, darkMode ? darkColor : lightColor);
			} else {
				const hex = theme.colors[ref as keyof Tokens['colors']];
				const color = hex === 'transparent' ? 'rgba(0,0,0,0)' : (hex as string);
				root.style.setProperty(`--component-${comp}`, color);
			}
			return;
		}

		// CASE 3: non-color token { type: 'spacing', value }
		if (token.type === 'spacing') {
			const px = theme.spacing[token.value as SpacingToken];
			root.style.setProperty(`--component-${comp}`, `${px}px`);
			return;
		}

		// CASE 4: non-color token { type: 'radii', value }
		if (token.type === 'radii') {
			const px = theme.radii[token.value as RadiiToken];
			root.style.setProperty(`--component-${comp}`, `${px}px`);
			return;
		}

		throw new Error(`Invalid component token for "${comp}"`);
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
		Object.entries(preset as Record<string, string>).forEach(([prop, value]) => {
			const lightColor = resolveContractValue(value, false);
			const darkColor = resolveContractValue(value, true);
			root.style.setProperty(`--action-${variant}-${prop}-default`, lightColor);
			root.style.setProperty(`--action-${variant}-${prop}-dark`, darkColor);
			root.style.setProperty(`--action-${variant}-${prop}`, darkMode ? darkColor : lightColor);
		});
	});

	// feedback (resolve each preset property to CSS vars)
	Object.entries(theme.contracts.feedback).forEach(([intent, preset]) => {
		Object.entries(preset as Record<string, string>).forEach(([prop, value]) => {
			const lightColor = resolveContractValue(value, false);
			const darkColor = resolveContractValue(value, true);
			root.style.setProperty(`--feedback-${intent}-${prop}-default`, lightColor);
			root.style.setProperty(`--feedback-${intent}-${prop}-dark`, darkColor);
			root.style.setProperty(`--feedback-${intent}-${prop}`, darkMode ? darkColor : lightColor);
		});
	});

	// surfaces (resolve each preset property to CSS vars)
	Object.entries(theme.contracts.surfaces).forEach(([surface, preset]) => {
		Object.entries(preset as Record<string, string>).forEach(([prop, value]) => {
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
		root.style.setProperty(`--grid-${bp}-gutter`, `${theme.spacing[config.gutter]}px`);
		root.style.setProperty(`--grid-${bp}-margin`, `${theme.spacing[config.margin]}px`);
		root.style.setProperty(
			`--grid-${bp}-maxWidth`,
			typeof config.maxWidth === 'number' ? `${config.maxWidth}px` : config.maxWidth
		);
	});

	// shadows (mode-aware)
	Object.entries(theme.shadows).forEach(([key, value]) => {
		const lightHex = theme.colors[value.color.light as keyof Tokens['colors']] as string;
		const darkHex = theme.colors[value.color.dark as keyof Tokens['colors']] as string;
		const lightRgba = hexToRgba(lightHex, value.opacity);
		const darkRgba = hexToRgba(darkHex, value.opacity);
		const base = `${value.offsetX}px ${value.offsetY}px ${value.blurRadius}px ${value.spreadRadius}px`;

		root.style.setProperty(`--shadow-${key}-default`, `${base} ${lightRgba}`);
		root.style.setProperty(`--shadow-${key}-dark`, `${base} ${darkRgba}`);
		root.style.setProperty(
			`--shadow-${key}`,
			darkMode ? `${base} ${darkRgba}` : `${base} ${lightRgba}`
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
			const shadowRgba = hexToRgba(shadowHex, shadowVal.opacity);
			const shadowBase = `${shadowVal.offsetX}px ${shadowVal.offsetY}px ${shadowVal.blurRadius}px ${shadowVal.spreadRadius}px`;
			boxShadow = `${shadowBase} ${shadowRgba}, 0 0 0 3px ${color}`;
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
