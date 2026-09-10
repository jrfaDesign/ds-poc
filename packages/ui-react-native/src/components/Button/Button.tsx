import { Pressable, Text, StyleSheet, type ViewStyle } from 'react-native';
import type { ButtonProps } from './Button.types';
import { resolveMargin } from '../shared/spacing';
import { useTheme } from '../../adapters/rn/useTheme';

const sizeStyles = StyleSheet.create({
	sm: { paddingVertical: 2, paddingHorizontal: 12, minHeight: 28, fontSize: 12 },
	md: { paddingVertical: 4, paddingHorizontal: 16, minHeight: 36, fontSize: 14 },
	lg: { paddingVertical: 8, paddingHorizontal: 24, minHeight: 44, fontSize: 16 },
});

export function Button({
	variant = 'primary',
	disabled = false,
	size = 'md',
	children,
	onPress,
	style,
	textStyle,
	...margin
}: ButtonProps) {
	const theme = useTheme();
	const { spacing, contracts } = theme.theme;
	const sizeConfig = sizeStyles[size];

	const borderRadius = contracts.components.buttonBorderRadii;

	const isLink = variant === 'link';
	const actions = contracts.actions;

	let bg: string | undefined;
	let onColor: string;
	let borderColor: string | undefined;
	const hasBorder = variant === 'secondary' || variant === 'ghost';

	if (isLink) {
		const link = actions.link;
		onColor = disabled ? link.onDisabled : link.on;
	} else {
		const full =
			variant === 'primary'
				? actions.primary
				: variant === 'secondary'
					? actions.secondary
					: actions.ghost;
		bg = disabled ? full.bgDisabled : full.bg;
		onColor = disabled ? full.onDisabled : full.on;
		borderColor = full.border;
	}

	const pressableStyle = ({ pressed }: { pressed: boolean }): ViewStyle[] =>
		[
			styles.base,
			{
				backgroundColor: bg,
				borderColor,
				borderWidth: hasBorder ? 1 : 0,
				borderRadius,
				paddingVertical: sizeConfig.paddingVertical,
				paddingHorizontal: sizeConfig.paddingHorizontal,
				minHeight: sizeConfig.minHeight,
				opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
			},
			resolveMargin(margin, spacing),
			style,
		].filter(Boolean) as ViewStyle[];

	return (
		<Pressable onPress={disabled ? undefined : onPress} style={pressableStyle}>
			{typeof children === 'string' ? (
				<Text
					style={[
						styles.label,
						{
							color: onColor,
							fontSize: sizeConfig.fontSize,
							textDecorationLine: isLink ? 'underline' : 'none',
						},
						textStyle,
					]}
				>
					{children}
				</Text>
			) : (
				children
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	base: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	label: {
		fontWeight: '500',
	},
});
