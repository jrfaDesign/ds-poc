import { useEffect, type ReactNode } from 'react';
import { AppProvider } from '@repo/ui-react-native';
import { useTheme } from '@repo/ui-web-tailwind';

type PreviewChromeProps = {
	/** Whether the preview should render in dark mode (from the Mode toolbar). */
	isDark: boolean;
	children: ReactNode;
};

/**
 * Everything the preview wraps around a story, without Storybook preview
 * hooks: those may only run inside the decorator body (see preview.tsx).
 * Child components stick to plain React hooks and context.
 */
export function PreviewChrome({ isDark, children }: PreviewChromeProps) {
	return (
		<>
			<DarkClassSync isDark={isDark} />
			<RnThemeBridge isDark={isDark}>{children}</RnThemeBridge>
		</>
	);
}

/** Keeps the `dark` class on <html> in sync with the Mode toolbar. */
function DarkClassSync({ isDark }: { isDark: boolean }) {
	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDark);
	}, [isDark]);
	return null;
}

/** Feeds the resolved raw theme + dark flag to React Native stories. */
function RnThemeBridge({ isDark, children }: { isDark: boolean; children: ReactNode }) {
	const { theme } = useTheme();
	return (
		<AppProvider theme={theme} isDark={isDark}>
			{children}
		</AppProvider>
	);
}
