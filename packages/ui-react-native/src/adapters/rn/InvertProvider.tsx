import { useMemo, type ReactNode } from 'react';
import { ThemeContext, type ThemeContextValue } from './ThemeContext';
import { applyTheme } from './applyTheme';
import { useTheme } from './useTheme';

export type InvertProviderProps = {
	children: ReactNode;
};

/**
 * Flips light ↔ dark for the entire subtree.
 *
 * Re-resolves the current theme with the opposite `isDark` value and
 * provides it via a nested `ThemeContext`. All descendant components
 * calling `useTheme()` will automatically see inverted colors — the
 * same semantic behavior as the `ds-invert` CSS class on web.
 */
export function InvertProvider({ children }: InvertProviderProps) {
	const { isDark, rawTokens } = useTheme();

	const invertedIsDark = !isDark;

	const value = useMemo<ThemeContextValue>(
		() => ({
			theme: applyTheme(rawTokens, invertedIsDark),
			isDark: invertedIsDark,
			rawTokens,
		}),
		[rawTokens, invertedIsDark]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
