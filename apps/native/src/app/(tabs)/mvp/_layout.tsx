import { Stack } from 'expo-router/stack';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useTheme } from '@repo/ui-react-native';

export default function MVPLayout() {
	useTheme();

	return (
		<Stack
			screenOptions={{
				header: ScreenHeader,
				statusBarStyle: 'light',
			}}
		>
			<Stack.Screen name="index" options={{ title: 'MVP' }} />
		</Stack>
	);
}
