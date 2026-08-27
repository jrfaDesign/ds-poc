import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useColorScheme, StyleSheet } from 'react-native';
import { defaultTheme } from '@repo/themes';
import type { Tokens } from '@repo/foundations';

type ThemeContextValue = {
	theme: Tokens;
	darkMode: boolean;
	toggleDarkMode: () => void;
	setTheme: (theme: Tokens) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
	const systemScheme = useColorScheme();
	const [darkMode, setDarkMode] = useState(systemScheme === 'dark');
	const [theme, setTheme] = useState(defaultTheme);

	useEffect(() => {
		setDarkMode(systemScheme === 'dark');
	}, [systemScheme]);

	const value = useMemo(
		() => ({
			theme,
			darkMode,
			toggleDarkMode: () => setDarkMode((prev) => !prev),
			setTheme,
		}),
		[theme, darkMode]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error('useAppTheme must be used within AppProvider');
	return ctx;
}

/**
 * Creates a StyleSheet from the current theme tokens.
 * Call this inside a component wrapped by `AppProvider`.
 *
 * ```ts
 * const styles = useThemeStyles((theme) => StyleSheet.create({
 *   container: {
 *     backgroundColor: theme.colors.primary_500,
 *     padding: theme.spacing.md,
 *   },
 * }));
 * ```
 */
export function useThemeStyles<T extends ReturnType<typeof StyleSheet.create>>(
	factory: (theme: Tokens) => T
): T {
	const { theme } = useAppTheme();
	return useMemo(() => factory(theme), [theme, factory]);
}
