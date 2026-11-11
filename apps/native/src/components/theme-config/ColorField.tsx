import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { useTheme, Typography, Box } from '@repo/ui-react-native';
import { themeColorPresets, hexColorRegex } from '@repo/foundations';

type ColorFieldProps = {
	label: string;
	value: string | undefined;
	onChange: (hex: string) => void;
};

/** Preset swatches + hex input for a 600-step theme color. */
export function ColorField({ label, value, onChange }: ColorFieldProps) {
	const { theme } = useTheme();
	const [draft, setDraft] = useState(value ?? '');
	const [prevValue, setPrevValue] = useState(value ?? '');
	// Sync the draft when the value changes externally (preset click, reset, tier switch).
	if ((value ?? '') !== prevValue) {
		setPrevValue(value ?? '');
		setDraft(value ?? '');
	}
	const invalid = draft.length > 0 && !hexColorRegex.test(draft);

	return (
		<Box gap="xxs">
			<Typography variant="caption" color="text-secondary">
				{label} (600)
			</Typography>
			<Box flexDirection="row" gap="xs" flexWrap="wrap">
				{themeColorPresets.map((preset) => {
					const selected = (value ?? '').toLowerCase() === preset.hex.toLowerCase();
					return (
						<Pressable
							key={preset.hex}
							onPress={() => {
								setDraft(preset.hex);
								onChange(preset.hex);
							}}
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								gap: theme.spacing.xxs,
								paddingHorizontal: theme.spacing.xs,
								paddingVertical: theme.spacing.xxs,
								borderRadius: theme.radii.xl,
								borderWidth: 1,
								borderColor: selected
									? theme.colorTokens['border-brand']
									: theme.colorTokens['border-secondary'],
							}}
						>
							<View
								style={{
									width: theme.spacing.lg,
									height: theme.spacing.lg,
									borderRadius: theme.radii.sm,
									backgroundColor: preset.hex,
									borderWidth: 1,
									borderColor: theme.colorTokens['border-secondary'],
								}}
							/>
							<Typography variant="caption" color={selected ? 'text-primary' : 'text-secondary'}>
								{preset.label}
							</Typography>
						</Pressable>
					);
				})}
			</Box>
			<TextInput
				value={draft}
				onChangeText={(next) => {
					setDraft(next);
					if (hexColorRegex.test(next)) onChange(next);
				}}
				placeholder="#7f56d9"
				autoCapitalize="none"
				autoCorrect={false}
				style={{
					borderWidth: 1,
					borderRadius: theme.radii.md,
					paddingHorizontal: theme.spacing.sm,
					paddingVertical: theme.spacing.xxs,
					fontSize: 14,
					borderColor: invalid
						? theme.colorTokens['border-error']
						: theme.colorTokens['border-secondary'],
				}}
			/>
			{invalid && (
				<Typography variant="caption" color="text-error-primary">
					Invalid hex: expected #RRGGBB
				</Typography>
			)}
		</Box>
	);
}
