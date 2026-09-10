import { TextInput, Text, View, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import type { InputProps, InputStatus } from './Input.types';
import { resolveMargin } from '../shared/spacing';
import { useTheme } from '../../adapters/rn/useTheme';

const statusBorderColor: Record<InputStatus, string | null> = {
	default: null,
	error: 'error',
	success: 'success',
};

const statusTextColor: Record<InputStatus, string | null> = {
	default: null,
	error: 'onError',
	success: 'onSuccess',
};

const sizeConfig = {
	sm: { fontSize: 14, paddingV: 2, paddingH: 12, minHeight: 28 },
	md: { fontSize: 16, paddingV: 4, paddingH: 16, minHeight: 36 },
	lg: { fontSize: 18, paddingV: 8, paddingH: 24, minHeight: 44 },
};

export function Input({
	label,
	placeholder,
	size = 'md',
	status = 'default',
	value,
	defaultValue,
	onChange,
	disabled,
	style,
	textStyle,
	...margin
}: InputProps) {
	const theme = useTheme();
	const { spacing, contracts } = theme.theme;
	const if_ = contracts.inputField;
	const sizeCfg = sizeConfig[size];

	const borderRadius = contracts.components.inputBorderRadii;

	const borderColorKey = statusBorderColor[status];
	const resolvedBorderColor = borderColorKey ? if_[borderColorKey as keyof typeof if_] : if_.border;

	const resolvedTextColor = disabled
		? if_.onDisabled
		: status === 'default'
			? if_.on
			: if_[statusTextColor[status] as keyof typeof if_];

	const containerStyle: ViewStyle = {
		gap: spacing.xxs,
	};

	const inputStyle: ViewStyle = {
		backgroundColor: disabled ? if_.bgDisabled : if_.bg,
		borderColor: resolvedBorderColor,
		borderWidth: 1,
		borderRadius,
		paddingVertical: sizeCfg.paddingV,
		paddingHorizontal: sizeCfg.paddingH,
		minHeight: sizeCfg.minHeight,
		opacity: disabled ? 0.5 : 1,
	};

	const inputTextStyle: TextStyle = {
		fontSize: sizeCfg.fontSize,
		color: resolvedTextColor,
	};

	return (
		<View style={[containerStyle, resolveMargin(margin, spacing), style]}>
			{label && <Text style={{ fontSize: 14, fontWeight: '500', color: if_.on }}>{label}</Text>}
			<TextInput
				value={value}
				defaultValue={defaultValue}
				onChangeText={onChange}
				placeholder={placeholder}
				placeholderTextColor={if_.placeholder}
				editable={!disabled}
				style={[inputStyle, inputTextStyle, textStyle]}
			/>
		</View>
	);
}
