import { useState, useCallback } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import type { RadioProps } from './Radio.types';
import { useTheme } from '../../adapters/rn/useTheme';

export function Radio({
	checked: controlled,
	defaultChecked = false,
	onChange,
	disabled = false,
	label,
	style,
}: RadioProps) {
	const theme = useTheme();
	const { spacing, contracts } = theme.theme;
	const sc = contracts.selectionControl;

	const [uncontrolled, setUncontrolled] = useState(defaultChecked);
	const isChecked = controlled ?? uncontrolled;

	const handlePress = useCallback(() => {
		if (disabled) return;
		const next = !isChecked;
		setUncontrolled(next);
		onChange?.(next);
	}, [isChecked, disabled, onChange]);

	const bgColor = disabled ? sc.bgDisabled : isChecked ? sc.bgChecked : sc.bg;

	const borderColor = disabled ? sc.borderDisabled : isChecked ? sc.borderChecked : sc.border;

	return (
		<Pressable
			onPress={handlePress}
			style={[styles.container, { gap: spacing.sm, opacity: disabled ? 0.5 : 1 }, style]}
		>
			<View
				style={[
					styles.circle,
					{
						backgroundColor: bgColor,
						borderColor: borderColor,
						borderWidth: 2,
					},
				]}
			>
				{isChecked && <View style={[styles.dot, { backgroundColor: sc.onChecked }]} />}
			</View>
			{label && <Text style={{ color: sc.onChecked, fontSize: 14 }}>{label}</Text>}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	circle: {
		width: 20,
		height: 20,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 5,
	},
});
