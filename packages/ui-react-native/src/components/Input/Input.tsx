import { TextInput, Text, View, type ViewStyle, type TextStyle } from 'react-native';
import type { ColorTokenName } from '@repo/foundations';
import type { InputProps, InputStatus } from './Input.types';
import { resolveMargin } from '../shared/spacing';
import { useTheme } from '../../adapters/rn/useTheme';

// Component formula: input states map directly to semantic color tokens.
const statusBorderColor: Record<InputStatus, ColorTokenName | null> = {
	default: null,
	error: 'border-error',
	success: 'utility-success-500',
};

const statusTextColor: Record<InputStatus, ColorTokenName | null> = {
	default: null,
	error: 'text-error-primary',
	success: 'text-success-primary',
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
	const { spacing, shape, colorTokens: ct } = theme.theme;
	const sizeCfg = sizeConfig[size];

	const borderRadius = shape.input;

	const borderColorKey = statusBorderColor[status];
	const resolvedBorderColor = borderColorKey ? ct[borderColorKey] : ct['border-primary'];

	const resolvedTextColor = disabled
		? ct['text-quaternary']
		: status === 'default'
			? ct['text-primary']
			: ct[statusTextColor[status] ?? 'text-primary'];

	const containerStyle: ViewStyle = {
		gap: spacing.xxs,
	};

	const inputStyle: ViewStyle = {
		backgroundColor: disabled ? ct['bg-tertiary'] : ct['bg-primary'],
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
			{label && (
				<Text style={{ fontSize: 14, fontWeight: '500', color: ct['text-primary'] }}>{label}</Text>
			)}
			<TextInput
				value={value}
				defaultValue={defaultValue}
				onChangeText={onChange}
				placeholder={placeholder}
				placeholderTextColor={ct['text-placeholder']}
				editable={!disabled}
				style={[inputStyle, inputTextStyle, textStyle]}
			/>
		</View>
	);
}
