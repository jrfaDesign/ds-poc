import { useState, useCallback } from 'react';
import { Pressable, View, Text, StyleSheet, type ViewStyle } from 'react-native';
import type { ToggleProps } from './Toggle.types';
import { useTheme } from '../../adapters/rn/useTheme';

export function Toggle({
	checked: controlled,
	defaultChecked = false,
	onChange,
	disabled = false,
	label,
	style,
}: ToggleProps) {
	const theme = useTheme();
	const { spacing, contracts } = theme.theme;
	const tg = contracts.toggle;

	const [uncontrolled, setUncontrolled] = useState(defaultChecked);
	const isChecked = controlled ?? uncontrolled;

	const handlePress = useCallback(() => {
		if (disabled) return;
		const next = !isChecked;
		setUncontrolled(next);
		onChange?.(next);
	}, [isChecked, disabled, onChange]);

	const trackBg = disabled ? tg.trackBgDisabled : isChecked ? tg.trackBgChecked : tg.trackBg;

	const thumbBg = disabled ? tg.thumbDisabled : isChecked ? tg.thumbColorChecked : tg.thumbColor;

	const thumbX = isChecked ? spacing['2xl'] : 2;

	const containerStyle: ViewStyle = {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.sm,
		opacity: disabled ? 0.5 : 1,
	};

	return (
		<Pressable onPress={handlePress} style={[containerStyle, style]}>
			<View
				style={[
					styles.track,
					{
						backgroundColor: trackBg,
						borderColor: tg.trackBorder,
						borderWidth: 1,
					},
				]}
			>
				<View
					style={[
						styles.thumb,
						{
							backgroundColor: thumbBg,
							transform: [{ translateX: thumbX }],
						},
					]}
				/>
			</View>
			{label && (
				<Text style={{ color: theme.theme.colorTokens['text-primary'], fontSize: 14 }}>
					{label}
				</Text>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	track: {
		width: 48,
		height: 26,
		borderRadius: 13,
		justifyContent: 'center',
		paddingHorizontal: 2,
	},
	thumb: {
		width: 22,
		height: 22,
		borderRadius: 11,
	},
});
