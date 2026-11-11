import type { CSSProperties } from 'react';
import type { Theme } from 'storybook/theming';

/**
 * Manager-side styles, derived from the Storybook theme so the panel reads
 * correctly in both light and dark managers. Plain functions (no React):
 * components call them per render with `useTheme()`.
 */

/** Whether the manager is rendering its dark palette (from the panel background). */
export function isDarkTheme(theme: Theme): boolean {
	const hex = theme.bgColor.default;
	if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return false;
	const luminance =
		0.2126 * parseInt(hex.slice(1, 3), 16) +
		0.7152 * parseInt(hex.slice(3, 5), 16) +
		0.0722 * parseInt(hex.slice(5, 7), 16);
	return luminance / 255 < 0.4;
}

/** Uppercase field label: shared by the panel and the color fields. */
export function createLabelStyle(theme: Theme): CSSProperties {
	return {
		display: 'block',
		fontSize: 11,
		fontWeight: 600,
		letterSpacing: '0.02em',
		textTransform: 'uppercase',
		color: theme.fgColor.muted,
		marginBottom: 6,
	};
}

/** The Theme panel: scrollable root + rows + tier select + reset. */
export function createPanelStyles(theme: Theme): {
	root: CSSProperties;
	row: CSSProperties;
	rowLast: CSSProperties;
	label: CSSProperties;
	note: CSSProperties;
	select: CSSProperties;
	reset: CSSProperties;
} {
	const dark = isDarkTheme(theme);
	return {
		root: {
			height: '100%',
			overflowY: 'auto',
			boxSizing: 'border-box',
			fontSize: 13,
			color: theme.fgColor.default,
			colorScheme: dark ? 'dark' : 'light',
		},
		row: {
			display: 'flex',
			flexDirection: 'column',
			gap: 8,
			padding: '12px 16px',
			borderBottom: `1px solid ${theme.borderColor.muted}`,
		},
		rowLast: {
			display: 'flex',
			flexDirection: 'column',
			gap: 8,
			padding: '12px 16px',
		},
		label: createLabelStyle(theme),
		note: {
			fontSize: 12,
			lineHeight: 1.5,
			color: theme.fgColor.muted,
			margin: 0,
		},
		select: {
			padding: '6px 8px',
			fontSize: 13,
			borderRadius: theme.input.borderRadius,
			border: `1px solid ${theme.input.border}`,
			background: theme.input.background,
			color: theme.input.color,
		},
		reset: {
			alignSelf: 'flex-start',
			padding: '6px 12px',
			fontSize: 12,
			borderRadius: theme.appBorderRadius,
			border: `1px solid ${theme.borderColor.default}`,
			background: 'transparent',
			color: theme.fgColor.default,
			cursor: 'pointer',
		},
	};
}

/**
 * Native select popups don't follow inline styles: options need an explicit
 * rule (rendered next to the select) to match the themed input colors.
 */
export function optionRule(theme: Theme): string {
	return `.theme-config-select option { background: ${theme.input.background}; color: ${theme.input.color}; }`;
}

/** Preset/hex color field: chips, swatches, inputs, error text. */
export function createColorFieldStyles(theme: Theme): {
	label: CSSProperties;
	chip: CSSProperties;
	chipSelected: CSSProperties;
	swatch: CSSProperties;
	picker: CSSProperties;
	hexInput: CSSProperties;
	error: CSSProperties;
} {
	return {
		label: createLabelStyle(theme),
		chip: {
			display: 'inline-flex',
			alignItems: 'center',
			gap: 6,
			padding: '4px 8px',
			fontSize: 12,
			borderRadius: 6,
			border: `1px solid ${theme.borderColor.muted}`,
			background: 'transparent',
			color: theme.fgColor.default,
			cursor: 'pointer',
		},
		// Accent ring keeps the selection visible on dark backgrounds too.
		chipSelected: {
			display: 'inline-flex',
			alignItems: 'center',
			gap: 6,
			padding: '4px 8px',
			fontSize: 12,
			borderRadius: 6,
			border: `1px solid ${theme.fgColor.accent}`,
			boxShadow: `0 0 0 1px ${theme.fgColor.accent}`,
			background: 'transparent',
			color: theme.fgColor.default,
			cursor: 'pointer',
		},
		swatch: {
			width: 12,
			height: 12,
			borderRadius: 6,
			border: `1px solid ${theme.borderColor.muted}`,
		},
		picker: {
			width: 32,
			height: 28,
			padding: 0,
			border: 'none',
			background: 'none',
		},
		hexInput: {
			width: 110,
			padding: '5px 8px',
			fontSize: 12,
			fontFamily: 'monospace',
			borderRadius: theme.input.borderRadius,
			borderWidth: 1,
			borderStyle: 'solid',
			borderColor: theme.input.border,
			background: theme.input.background,
			color: theme.input.color,
		},
		error: {
			fontSize: 12,
			color: theme.fgColor.negative,
		},
	};
}

/** Chip rows (style preset, fonts): outline chip, accent outline when selected. */
export function createChipRowStyles(theme: Theme): {
	chip: CSSProperties;
	chipSelected: CSSProperties;
} {
	return {
		chip: {
			padding: '4px 10px',
			fontSize: 12,
			borderRadius: 6,
			border: `1px solid ${theme.borderColor.muted}`,
			background: 'transparent',
			color: theme.fgColor.default,
			cursor: 'pointer',
		},
		// Accent outline (theme-native contrast) instead of a dark fill, which
		// would disappear into a dark manager.
		chipSelected: {
			padding: '4px 10px',
			fontSize: 12,
			borderRadius: 6,
			border: `1px solid ${theme.fgColor.accent}`,
			boxShadow: `0 0 0 1px ${theme.fgColor.accent}`,
			background: 'transparent',
			color: theme.fgColor.default,
			cursor: 'pointer',
		},
	};
}

/** Top-bar Theme shortcut button. */
export function createToolStyle(theme: Theme): CSSProperties {
	return {
		padding: '4px 10px',
		fontSize: 12,
		fontWeight: 600,
		borderRadius: 6,
		border: `1px solid ${theme.borderColor.default}`,
		background: 'transparent',
		color: theme.fgColor.default,
		cursor: 'pointer',
	};
}
