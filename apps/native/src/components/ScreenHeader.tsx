import { Text, View, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@repo/ui-react-native';

type ScreenHeaderProps = {
	navigation: { goBack: () => void };
	options: { title?: string };
	back?: object;
};

export function ScreenHeader({ navigation, options, back }: ScreenHeaderProps) {
	const { theme } = useTheme();
	const insets = useSafeAreaInsets();

	return (
		<View
			style={[
				styles.container,
				{
					paddingTop: insets.top,
					backgroundColor: theme.contracts.components.headerBg,
					borderBottomWidth: 1,
					borderBottomColor: theme.colorTokens['border-primary'],
				},
				theme.shadows.sm,
			]}
		>
			<View style={styles.content}>
				{back ? (
					<Pressable onPress={() => navigation.goBack()} style={styles.side}>
						<Ionicons name="chevron-back" size={28} color={theme.colors.white} />
					</Pressable>
				) : (
					<View style={styles.side} />
				)}
				<Text style={[styles.title, { color: theme.colors.white }]}>{options.title ?? ''}</Text>
				<View style={styles.side} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: 1,
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 44,
		paddingHorizontal: 4,
	},
	side: {
		width: 44,
		height: 44,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		flex: 1,
		textAlign: 'center',
		fontSize: 17,
		fontWeight: '600',
	},
});
