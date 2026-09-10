import { Stack } from 'expo-router/stack';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useTheme } from '@repo/ui-react-native';

export default function DSLayout() {
	const { theme, isDark } = useTheme();
	return (
		<Stack
			initialRouteName="index"
			screenOptions={{
				header: ScreenHeader,
				headerShown: true,
				contentStyle: {},
				statusBarStyle: isDark ? 'light' : 'dark',
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: 'index',
					headerShown: false,
					contentStyle: {
						paddingTop: theme.spacing['6xl'],
						backgroundColor: theme.colorTokens['bg-primary'],
					},
				}}
			/>
			<Stack.Screen name="color-palette" options={{ title: 'Color Palette' }} />
			<Stack.Screen name="color-tokens" options={{ title: 'Color Tokens' }} />
			<Stack.Screen name="contracts" options={{ title: 'Contracts' }} />
			<Stack.Screen name="spacing" options={{ title: 'Spacing' }} />
			<Stack.Screen name="radii" options={{ title: 'Radii' }} />
			<Stack.Screen name="typography" options={{ title: 'Typography' }} />
			<Stack.Screen name="shadows" options={{ title: 'Shadows' }} />
		</Stack>
	);
}
