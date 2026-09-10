import { useState, useCallback } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import type { CheckboxProps } from './Checkbox.types';
import { useTheme } from '../../adapters/rn/useTheme';

export function Checkbox({
	checked: controlled,
	defaultChecked = false,
	onChange,
	disabled = false,
	label,
	style,
}: CheckboxProps) {
	const theme = useTheme();
	const { spacing, contracts } = theme.theme;
	const sc = contracts.selectionControl;
	const labelColor = theme.theme.colorTokens['text-primary'];

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
					styles.box,
					{
						backgroundColor: bgColor,
						borderColor: borderColor,
						borderWidth: 2,
						borderRadius: 4,
					},
				]}
			>
				{isChecked && <Text style={[styles.check, { color: sc.onChecked }]}>✓</Text>}
			</View>
			{label && <Text style={{ color: labelColor, fontSize: 14 }}>{label}</Text>}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	box: {
		width: 20,
		height: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	check: {
		fontSize: 12,
		fontWeight: '700',
	},
});
