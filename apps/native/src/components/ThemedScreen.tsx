import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, type ViewStyle, type ScrollViewProps } from 'react-native';
import { useTheme } from '@repo/ui-react-native';

type ThemedScreenProps = ScrollViewProps & {
	children: ReactNode;
};

export function ThemedScreen({ children, contentContainerStyle, ...props }: ThemedScreenProps) {
	const { theme } = useTheme();

	const defaultContentStyle: ViewStyle = {
		paddingBottom: theme.spacing['4xl'],
		paddingHorizontal: theme.spacing.xl,
	};

	return (
		<ScrollView
			style={[
				styles.screen,
				{
					backgroundColor: theme.contracts.components.appShellBg,
				},
			]}
			contentContainerStyle={[defaultContentStyle, contentContainerStyle]}
			{...props}
		>
			{children}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
