import { useEffect, useState } from 'react';
import { StylexExample } from './components/StylexExample/StylexExample';
import { AppStyles } from './App.styles';

import * as stylex from '@stylexjs/stylex';
import { applyTheme } from './design-system/adapters/stylex/createStylexTheme.stylex';
import defaultTheme from './design-system/themes/default';
import cagTheme from './design-system/themes/cag';
import ThemeVariables from './components/ThemeVariables/ThemeVariables';
import { Example } from './components/Example/Example';
import caosTheme from './design-system/themes/caos';

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
		<div {...stylex.props(AppStyles.container)}>
			<div {...stylex.props(AppStyles.toolbar)}>
				<button onClick={toggleDarkMode}>Toggle {darkMode ? 'Light' : 'Dark'} Mode</button>

				<div {...stylex.props(AppStyles.controls)}>
					<button onClick={() => setTheme(defaultTheme)}>BCA theme</button>
					<button onClick={() => setTheme(cagTheme)}>CAG theme</button>
					<button onClick={() => setTheme(caosTheme)}>CAOS theme</button>
				</div>
			</div>

			{/* <StylexExample />
			<div style={{ display: 'flex', gap: 20 }}>
				<StylexExample showError />
				<StylexExample showSuccess />
			</div> */}

			<Example />

			<ThemeVariables />
		</div>
	);
}

export default App;

export function toggleDarkMode() {
	const root = document.documentElement;
	const current = root.style.colorScheme;
	root.style.colorScheme = current === 'dark' ? 'light' : 'dark';
}
