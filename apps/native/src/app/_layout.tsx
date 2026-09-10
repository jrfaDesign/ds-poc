import { useEffect } from 'react';
import { Stack } from 'expo-router/stack';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeSettingsProvider } from '@/contexts/ThemeSettingsContext';

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
	useEffect(() => {
		SplashScreen.hideAsync();
	}, []);

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}

export default function RootLayout() {
	return (
		<ThemeSettingsProvider>
			<RootNavigator />
		</ThemeSettingsProvider>
	);
}
