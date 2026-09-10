import { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme, Typography, Box, Card, Button, Checkbox } from '@repo/ui-react-native';
import type { FilterSectionData } from '@/data/mockFilters';

type FilterPanelProps = {
	sections: FilterSectionData[];
	onSectionToggle: (sectionId: string, optionId: string) => void;
	onClearAll: () => void;
	onApply: () => void;
};

export function FilterPanel({ sections, onSectionToggle, onClearAll, onApply }: FilterPanelProps) {
	const { theme } = useTheme();

	return (
		<Card variant="raised" style={styles.card}>
			{sections.map((section) => (
				<FilterSection
					key={section.id}
					section={section}
					onToggle={(optionId) => onSectionToggle(section.id, optionId)}
				/>
			))}

			<Box flexDirection="row" gap="sm" padding="md">
				<Box flex={1}>
					<Button variant="secondary" onPress={onClearAll}>
						Clear All
					</Button>
				</Box>
				<Box flex={1}>
					<Button variant="primary" onPress={onApply}>
						Apply Filter
					</Button>
				</Box>
			</Box>
		</Card>
	);
}

type FilterSectionProps = {
	section: FilterSectionData;
	onToggle: (optionId: string) => void;
};

function FilterSection({ section, onToggle }: FilterSectionProps) {
	const [isExpanded, setExpanded] = useState(false);
	const { theme } = useTheme();

	const selectedCount = section.options.filter((o) => o.checked).length;
	const selectedLabels = section.options.filter((o) => o.checked).map((o) => o.label);

	const summary =
		selectedCount === 0
			? 'All'
			: selectedCount <= 2
				? selectedLabels.join(', ')
				: `${selectedLabels[0]}, ${selectedLabels[1]} +${selectedCount - 2}`;

	return (
		<View style={[styles.section, { borderBottomColor: theme.colorTokens['border-primary'] }]}>
			<Pressable onPress={() => setExpanded(!isExpanded)} style={styles.sectionHeader}>
				<Box flex={1} gap="xxs">
					<Typography role="label" color="text-primary">
						{section.label}
					</Typography>
					{!isExpanded && (
						<Typography role="caption" color="text-secondary">
							{summary}
						</Typography>
					)}
				</Box>
				<Typography role="caption" color="text-tertiary">
					{isExpanded ? '\u25B2' : '\u25BC'}
				</Typography>
			</Pressable>

			{isExpanded && (
				<Box gap="xs" padding="md" paddingTop="none">
					{section.options.map((option) => (
						<Checkbox
							key={option.id}
							checked={option.checked}
							onChange={() => onToggle(option.id)}
							label={option.label}
						/>
					))}
				</Box>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 0,
		overflow: 'hidden',
	},
	section: {
		borderBottomWidth: 1,
	},
	sectionHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
	},
});
