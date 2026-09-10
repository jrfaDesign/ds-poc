import { Tabs } from 'expo-router/tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppProvider } from '@repo/ui-react-native';
import { useThemeSettings } from '@/contexts/ThemeSettingsContext';
import { TabBar } from '@/components/TabBar';

export default function TabLayout() {
	const { theme, darkMode } = useThemeSettings();

	return (
		<AppProvider theme={theme} isDark={darkMode}>
			<TabBar />
		</AppProvider>
	);
}
