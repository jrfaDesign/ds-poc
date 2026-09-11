import { Tabs } from 'expo-router/tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { ColorValue } from 'react-native';
import { useTheme } from '@repo/ui-react-native';

const TABS = [
	{ name: 'ds', title: 'DS', icon: 'color-palette-outline' as const },
	{ name: 'mvp', title: 'MVP', icon: 'rocket-outline' as const },
	{ name: 'settings', title: 'Settings', icon: 'settings-outline' as const },
];

type TabBarIconProps = {
	focused: boolean;
	color: ColorValue;
	size: number;
};

export function TabBar() {
	const { theme } = useTheme();

	const active = theme.contracts.components.activeTabIndicator;
	const inactive = theme.colorTokens['text-tertiary'];

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: theme.contracts.components.footerBg,
				},
				tabBarActiveTintColor: active,
				tabBarInactiveTintColor: inactive,
			}}
		>
			{TABS.map((tab) => (
				<Tabs.Screen
					key={tab.name}
					name={tab.name}
					options={{
						title: tab.title,
						tabBarLabel: tab.title,
						tabBarIcon: ({ size, focused, color }: TabBarIconProps) => (
							<Ionicons name={tab.icon} size={size} color={focused ? active : (color as string)} />
						),
					}}
				/>
			))}
		</Tabs>
	);
}
