import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell/AppShell';
import DsShowcase from './pages/DsShowcase';
import PublicSales from './pages/PublicSales';

export default function App() {
	return (
		<BrowserRouter>
			<AppShell>
				<Routes>
					<Route path="/" element={<DsShowcase />} />
					<Route path="/public-sales" element={<PublicSales />} />
				</Routes>
			</AppShell>
		</BrowserRouter>
	);
}
