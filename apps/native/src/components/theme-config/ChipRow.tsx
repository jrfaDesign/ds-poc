import { Pressable } from 'react-native';
import { useTheme, Typography, Box } from '@repo/ui-react-native';

type ChipRowProps = {
	options: readonly string[];
	value: string;
	onSelect: (value: string) => void;
};

/** Row of selectable chips (style preset, fonts, …). */
export function ChipRow({ options, value, onSelect }: ChipRowProps) {
	const { theme } = useTheme();
	return (
		<Box flexDirection="row" gap="xs" flexWrap="wrap">
			{options.map((option) => {
				const selected = value === option;
				return (
					<Pressable
						key={option}
						onPress={() => onSelect(option)}
						style={{
							paddingHorizontal: theme.spacing.sm,
							paddingVertical: theme.spacing.xxs,
							borderRadius: theme.radii.xl,
							borderWidth: 1,
							borderColor: selected
								? theme.colorTokens['border-brand']
								: theme.colorTokens['border-secondary'],
						}}
					>
						<Typography variant="caption" color={selected ? 'text-primary' : 'text-secondary'}>
							{option}
						</Typography>
					</Pressable>
				);
			})}
		</Box>
	);
}
