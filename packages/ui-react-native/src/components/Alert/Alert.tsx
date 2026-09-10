import { Pressable, Text, StyleSheet, type ViewStyle } from 'react-native';
import type { AlertProps, AlertIntent } from './Alert.types';
import { resolveMargin } from '../shared/spacing';
import { useTheme } from '../../adapters/rn/useTheme';

const intentToFeedback: Record<AlertIntent, 'error' | 'success' | 'warning' | 'info'> = {
	error: 'error',
	success: 'success',
	warning: 'warning',
	info: 'info',
};

export function Alert({ intent, title, children, onPress, style, ...margin }: AlertProps) {
	const theme = useTheme();
	const { spacing, contracts } = theme.theme;

	const feedback = contracts.feedback[intentToFeedback[intent]];

	const containerStyle: ViewStyle = {
		backgroundColor: feedback.bg,
		borderColor: feedback.border,
		borderWidth: feedback.borderWidth,
		borderRadius: feedback.borderRadius,
		padding: spacing.lg,
		gap: spacing.xs,
	};

	return (
		<Pressable
			onPress={onPress}
			style={[styles.base, containerStyle, resolveMargin(margin, spacing), style]}
		>
			{title && <Text style={[styles.title, { color: feedback.on }]}>{title}</Text>}
			<Text style={[styles.message, { color: feedback.on }]}>{children}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	base: {
		alignItems: 'stretch',
	},
	title: {
		fontSize: 14,
		fontWeight: '600',
	},
	message: {
		fontSize: 14,
		fontWeight: '400',
	},
});
