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
	const { spacing, shape, colorTokens: ct } = theme.theme;

	const [uncontrolled, setUncontrolled] = useState(defaultChecked);
	const isChecked = controlled ?? uncontrolled;

	const handlePress = useCallback(() => {
		if (disabled) return;
		const next = !isChecked;
		setUncontrolled(next);
		onChange?.(next);
	}, [isChecked, disabled, onChange]);

	// Component formula: selection-control states map directly to semantic color tokens.
	const bgColor = disabled
		? ct['bg-tertiary']
		: isChecked
			? ct['bg-brand-solid']
			: ct['bg-primary'];

	const borderColor = disabled
		? ct['border-secondary']
		: isChecked
			? ct['border-brand']
			: ct['border-primary'];

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
						borderRadius: shape.input,
					},
				]}
			>
				{isChecked && <Text style={[styles.check, { color: ct['text-white'] }]}>✓</Text>}
			</View>
			{label && <Text style={{ color: ct['text-primary'], fontSize: 14 }}>{label}</Text>}
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
