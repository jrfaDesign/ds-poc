import { Box } from '@repo/ui-web-tailwind';
import { AppHeader } from '../AppHeader/AppHeader';
import { AppFooter } from '../AppFooter/AppFooter';
import type { AppShellProps } from './AppShell.types';

export function AppShell({ children }: AppShellProps) {
	return (
		<Box background="bg-secondary" className="min-h-screen flex flex-col ">
			<AppHeader />
			<Box paddingY="2xl" className="flex-1 bg-appShellBg">
				{children}
			</Box>
			<AppFooter />
		</Box>
	);
}
