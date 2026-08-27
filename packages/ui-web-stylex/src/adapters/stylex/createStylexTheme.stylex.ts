import type {
	Tokens,
	SpacingToken,
	RadiiToken,
	FontSizeToken,
	FontWeightToken,
	LineHeightToken,
	LetterSpacingToken,
} from '@repo/foundations';

function hexToRgba(hex: string, alpha: number): string {
	if (hex === 'transparent') return `rgba(0,0,0,0)`;
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r},${g},${b},${alpha})`;
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

	// typography — contracts (resolve each contract's composition to CSS variables)
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
				`var(--role-${contractValue.color})`
			);
		}
	});

	// colors
	Object.entries(theme.colors).forEach(([key, value]) => {
		root.style.setProperty(`--${key}`, value as string);
	});

	// roles (always color mode tokens)
	Object.entries(theme.roles).forEach(([role, { light, dark }]) => {
		const lightColor = theme.colors[light as keyof Tokens['colors']] as string;
		const darkColor = theme.colors[dark as keyof Tokens['colors']] as string;

		root.style.setProperty(`--role-${role}-default`, lightColor);
		root.style.setProperty(`--role-${role}-dark`, darkColor);

		root.style.setProperty(`--role-${role}`, darkMode ? darkColor : lightColor);
	});

	// components (can be color OR non-color OR role-ref)
	Object.entries(theme.components).forEach(([comp, token]) => {
		// CASE 1: literal color override { light, dark }
		if ('light' in token && 'dark' in token) {
			const lightColor = theme.colors[token.light as keyof Tokens['colors']] as string;
			const darkColor = theme.colors[token.dark as keyof Tokens['colors']] as string;

			root.style.setProperty(`--component-${comp}-default`, lightColor);
			root.style.setProperty(`--component-${comp}-dark`, darkColor);

			root.style.setProperty(`--component-${comp}`, darkMode ? darkColor : lightColor);
			return;
		}

		// CASE 2: role reference { type: 'roles', value: RoleName }
		if (token.type === 'roles') {
			const roleName = token.value;
			const role = theme.roles[roleName];

			const lightColor = theme.colors[role.light as keyof Tokens['colors']] as string;
			const darkColor = theme.colors[role.dark as keyof Tokens['colors']] as string;

			root.style.setProperty(`--component-${comp}-default`, lightColor);
			root.style.setProperty(`--component-${comp}-dark`, darkColor);

			root.style.setProperty(`--component-${comp}`, darkMode ? darkColor : lightColor);
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

	// breakpoints
	Object.entries(theme.breakpoints).forEach(([bp, px]) => {
		root.style.setProperty(`--breakpoint-${bp}`, `${px}px`);
	});

	// actions (resolve each preset property to CSS vars)
	Object.entries(theme.contracts.actions).forEach(([variant, preset]) => {
		Object.entries(preset).forEach(([prop, roleName]) => {
			const role = theme.roles[roleName as keyof typeof theme.roles];
			const lightColor = theme.colors[role.light as keyof typeof theme.colors] as string;
			const darkColor = theme.colors[role.dark as keyof typeof theme.colors] as string;
			root.style.setProperty(`--action-${variant}-${prop}-default`, lightColor);
			root.style.setProperty(`--action-${variant}-${prop}-dark`, darkColor);
			root.style.setProperty(`--action-${variant}-${prop}`, darkMode ? darkColor : lightColor);
		});
	});

	// feedback (resolve each preset property to CSS vars)
	Object.entries(theme.contracts.feedback).forEach(([intent, preset]) => {
		Object.entries(preset).forEach(([prop, roleName]) => {
			const role = theme.roles[roleName as keyof typeof theme.roles];
			const lightColor = theme.colors[role.light as keyof typeof theme.colors] as string;
			const darkColor = theme.colors[role.dark as keyof typeof theme.colors] as string;
			root.style.setProperty(`--feedback-${intent}-${prop}-default`, lightColor);
			root.style.setProperty(`--feedback-${intent}-${prop}-dark`, darkColor);
			root.style.setProperty(`--feedback-${intent}-${prop}`, darkMode ? darkColor : lightColor);
		});
	});

	// surfaces (resolve each preset property to CSS vars)
	Object.entries(theme.contracts.surfaces).forEach(([surface, preset]) => {
		Object.entries(preset).forEach(([prop, roleName]) => {
			const role = theme.roles[roleName as keyof typeof theme.roles];
			const lightColor = theme.colors[role.light as keyof typeof theme.colors] as string;
			const darkColor = theme.colors[role.dark as keyof typeof theme.colors] as string;
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

	// shadows (mode-aware: resolves {light,dark} color references)
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
