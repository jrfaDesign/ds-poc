import { Stack } from 'expo-router/stack';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useTheme } from '@repo/ui-react-native';

export default function MVPLayout() {
	const { isDark } = useTheme();

	return (
		<Stack
			screenOptions={{
				header: ScreenHeader,
				statusBarStyle: isDark ? 'light' : 'dark',
			}}
		>
			<Stack.Screen name="index" options={{ title: 'MVP' }} />
		</Stack>
	);
}
