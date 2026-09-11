import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
	defaultTheme,
	cagTheme,
	caosTheme,
	bcaTheme,
	bydTheme,
	bydPremiumTheme,
} from '@repo/themes';
import { applyTheme, ThemeProvider } from '@repo/ui-web-tailwind';
import './index.css';
import App from './App.tsx';

const themes = {
	default: defaultTheme,
	cag: cagTheme,
	caos: caosTheme,
	bca: bcaTheme,
	byd: bydTheme,
	byd_premium: bydPremiumTheme,
};

applyTheme(defaultTheme);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider themes={themes} defaultKey="default">
			<App />
		</ThemeProvider>
	</StrictMode>
);
