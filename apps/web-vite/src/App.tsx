import { useEffect, useState } from 'react';
import { AppStyles } from './App.styles';

import * as stylex from '@stylexjs/stylex';
import { applyTheme, Button, Stack } from '@repo/ui-web-stylex';
import { defaultTheme, cagTheme, caosTheme } from '@repo/themes';
import ThemeVariables from './components/ThemeVariables/ThemeVariables';
import { Example } from './components/Example/Example';

function App() {
	const [darkMode, setDarkMode] = useState(false);

	const [theme, setTheme] = useState(defaultTheme);

	useEffect(() => {
		applyTheme(theme, darkMode);
	}, [darkMode, theme]);

	const toggleDarkMode = () => {
		setDarkMode((prev) => !prev);
	};

	return (
		<Stack
			gap="lg"
			style={{ minHeight: '100vh', width: '100%', backgroundColor: 'var(--ct-bg-primary)' }}
		>
			<div {...stylex.props(AppStyles.toolbar)}>
				<Button variant="secondary" onClick={toggleDarkMode}>
					Toggle {darkMode ? 'Light' : 'Dark'} Mode
				</Button>

				<div {...stylex.props(AppStyles.controls)}>
					<Button variant="primary" onClick={() => setTheme(defaultTheme)}>
						BCA theme
					</Button>
					<Button variant="primary" onClick={() => setTheme(cagTheme)}>
						CAG theme
					</Button>
					<Button variant="primary" onClick={() => setTheme(caosTheme)}>
						CAOS theme
					</Button>
				</div>
			</div>

			<Example />

			<ThemeVariables />
		</Stack>
	);
}

export default App;

export function toggleDarkMode() {
	const root = document.documentElement;
	const current = root.style.colorScheme;
	root.style.colorScheme = current === 'dark' ? 'light' : 'dark';
}
