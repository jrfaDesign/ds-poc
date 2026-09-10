import type { ReactNode } from 'react';
import { Box } from '@repo/ui-web-tailwind';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';

type AppShellProps = {
	children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
	return (
		<Box background="bg-secondary" className="min-h-screen flex flex-col ">
			<AppHeader />
			<Box paddingY="2xl" className="flex-1 bg-components-app-shell">
				{children}
			</Box>
			<AppFooter />
		</Box>
	);
}
