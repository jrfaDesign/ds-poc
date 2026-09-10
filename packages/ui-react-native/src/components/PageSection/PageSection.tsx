import { View, StyleSheet, type ViewStyle } from 'react-native';
import type { PageSectionProps } from './PageSection.types';
import { InvertProvider } from '../../adapters/rn/InvertProvider';
import { useTheme } from '../../adapters/rn/useTheme';

export function PageSection({
	children,
	padding = 'xl',
	maxWidth,
	inset,
	fluid,
	background,
	invert = false,
	style,
}: PageSectionProps) {
	const theme = useTheme();
	const { spacing, widths, layout } = theme.theme;

	const verticalPad = spacing[padding] ?? 32;
	const horizontalPad = inset ? (layout[inset] ?? 0) : 0;
	const maxW = maxWidth && !fluid ? (widths[maxWidth] ?? undefined) : undefined;

	const outerStyle: ViewStyle = {
		paddingVertical: verticalPad,
		paddingHorizontal: horizontalPad,
	};
	if (background) outerStyle.backgroundColor = background;

	const innerStyle: ViewStyle = {
		alignSelf: 'center',
	};
	if (maxW) {
		innerStyle.width = Math.min(maxW, 1024);
	} else {
		innerStyle.width = '100%';
	}

	const section = (
		<View style={[styles.outer, outerStyle, style]}>
			<View style={innerStyle}>{children}</View>
		</View>
	);

	if (invert) {
		return <InvertProvider>{section}</InvertProvider>;
	}

	return section;
}

const styles = StyleSheet.create({
	outer: {
		alignSelf: 'stretch',
	},
});
