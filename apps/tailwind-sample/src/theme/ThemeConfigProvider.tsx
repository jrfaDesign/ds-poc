import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { themeConfigSchema, type ThemeConfig } from '@repo/foundations';
import { ThemeConfigContext, type ThemeConfigContextValue } from './ThemeConfigContext';
import { MOCK_THEME_CONFIGS, saveConfig } from './themeConfig';

/**
 * Owns the app's theme config state: merges patches, validates via the schema,
 * persists to localStorage, and re-resolves through the ThemeProvider upstream.
 */
export function ThemeConfigProvider({
	initialConfig,
	children,
}: {
	initialConfig: ThemeConfig;
	children: ReactNode;
}) {
	const [config, setConfigState] = useState<ThemeConfig>(initialConfig);

	// Persist every config change (and the initial fetch on mount).
	useEffect(() => {
		saveConfig(config);
	}, [config]);

	const setConfig = useCallback((patch: Partial<ThemeConfig>) => {
		setConfigState((prev) => {
			// Shallow merge keeps untouched fields (e.g. medium overrides while on basic).
			return themeConfigSchema.parse({ ...prev, ...patch });
		});
	}, []);

	const resetConfig = useCallback(() => {
		setConfigState(themeConfigSchema.parse(MOCK_THEME_CONFIGS.basic));
	}, []);

	const value: ThemeConfigContextValue = { config, setConfig, resetConfig };

	return <ThemeConfigContext.Provider value={value}>{children}</ThemeConfigContext.Provider>;
}
