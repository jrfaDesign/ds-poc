import { Stack } from 'expo-router/stack';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useTheme } from '@repo/ui-react-native';

export default function SettingsLayout() {
	const { isDark, theme } = useTheme();

	return (
		<Stack
			screenOptions={{
				header: ScreenHeader,
				statusBarStyle: 'light',
				contentStyle: {
					backgroundColor: '#f00',
				},
			}}
		>
			<Stack.Screen name="index" options={{ title: 'Settings' }} />
		</Stack>
	);
}
