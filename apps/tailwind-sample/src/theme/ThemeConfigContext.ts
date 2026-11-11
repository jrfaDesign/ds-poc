import { createContext, useContext } from 'react';
import type { ThemeConfig } from '@repo/core';

/** Context shape for the app's theme config (owned by ThemeConfigProvider). */
export type ThemeConfigContextValue = {
	config: ThemeConfig;
	/** Shallow-merge a patch into the config, validate, persist, and re-resolve. */
	setConfig: (patch: Partial<ThemeConfig>) => void;
	/** Back to the basic mock config (logo-only). */
	resetConfig: () => void;
};

export const ThemeConfigContext = createContext<ThemeConfigContextValue | null>(null);

/** Read the current theme config. Must be used inside a ThemeConfigProvider. */
export function useThemeConfig(): ThemeConfigContextValue {
	const ctx = useContext(ThemeConfigContext);
	if (!ctx) {
		throw new Error('useThemeConfig must be used within a ThemeConfigProvider');
	}
	return ctx;
}
