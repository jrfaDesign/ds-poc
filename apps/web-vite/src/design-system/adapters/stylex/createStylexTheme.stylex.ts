import type { Tokens } from '../../foundations';

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

		// CASE 3: non-color token { type: 'spacing' | 'radii', value }
		if (token.type === 'spacing' || token.type === 'radii') {
			const px = token.type === 'spacing' ? theme.spacing[token.value] : theme.radii[token.value];

			root.style.setProperty(`--component-${comp}`, `${px}px`);
			return;
		}

		throw new Error(`Invalid component token for "${comp}"`);
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
