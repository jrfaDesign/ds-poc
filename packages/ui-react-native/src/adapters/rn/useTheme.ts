import { useContext } from 'react';
import { ThemeContext, type ThemeContextValue } from './ThemeContext';

/**
 * Access the resolved design-system theme.
 *
 * Must be called inside an `<AppProvider>`. Returns the resolved token
 * values (colors, spacing, radii, contracts, etc.) for the current mode.
 */
export function useTheme(): ThemeContextValue {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error('useTheme must be used within an <AppProvider>.');
	}
	return ctx;
}
