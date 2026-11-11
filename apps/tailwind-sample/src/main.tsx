import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { resolveThemeConfig, type ThemeConfig } from '@repo/foundations';
import { applyTheme } from '@repo/ui-web-tailwind';
import { loadConfigSync, fetchThemeConfig } from './theme/themeConfig';
import { ThemeConfigProvider } from './theme/ThemeConfigProvider';
import { AppThemeBridge } from './theme/AppThemeBridge';
import './index.css';
import App from './App.tsx';

async function boot() {
	// Sync-load the persisted config (or fetch the mock) and apply before first paint: FOUC-safe.
	const initialConfig: ThemeConfig = loadConfigSync() ?? (await fetchThemeConfig('basic'));
	applyTheme(resolveThemeConfig(initialConfig));

	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<ThemeConfigProvider initialConfig={initialConfig}>
				<AppThemeBridge>
					<App />
				</AppThemeBridge>
			</ThemeConfigProvider>
		</StrictMode>
	);
}

void boot();
