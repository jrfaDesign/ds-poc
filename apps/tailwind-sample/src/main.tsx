import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { defaultTheme } from '@repo/themes';
import { applyTheme } from '@repo/ui-web-tailwind';
import './index.css';
import App from './App.tsx';

applyTheme(defaultTheme);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
