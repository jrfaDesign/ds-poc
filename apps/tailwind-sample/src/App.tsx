import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { Intro } from './components/Intro';
import { ActionsDemo } from './components/ActionsDemo';
import { SurfacesDemo } from './components/SurfacesDemo';
import { TypographyDemo } from './components/TypographyDemo';
import { TokensDemo } from './components/TokensDemo';
import { GridSystemDemo } from './components/GridSystemDemo';
import { TokenShowcase } from './components/TokenShowcase';
import { AlphaDemo } from './components/AlphaDemo';
import { InvertDemo } from './components/InvertDemo';
import { AlertDemo } from './components/AlertDemo';
import { ComponentShowcase } from './components/ComponentShowcase';
import { MvpView } from './components/MvpView';
import { Box } from '@repo/ui-web-tailwind';
import { AppShell } from './components/AppShell';

function DsShowcase() {
	const { theme } = useTheme();
	return (
		<>
			<Intro />
			<ComponentShowcase />
			<ActionsDemo />
			<SurfacesDemo />
			<AlertDemo />
			<TypographyDemo fontFamily={theme.typography.fontFamilies.body} />
			<TokensDemo theme={theme} />
			<GridSystemDemo />
			<TokenShowcase theme={theme} />
			<AlphaDemo />
			<InvertDemo />
		</>
	);
}

export default function App() {
	return (
		<BrowserRouter>
			<AppShell>
				<Routes>
					<Route path="/" element={<DsShowcase />} />
					<Route path="/public-sales" element={<MvpView />} />
				</Routes>
			</AppShell>
		</BrowserRouter>
	);
}
