import { View, StyleSheet, type ViewStyle } from 'react-native';
import type { CardProps } from './Card.types';
import type { CardVariant } from '@repo/globals';
import type { SurfaceKey } from '../../adapters/rn/applyTheme';
import { resolveMargin } from '../shared/spacing';
import { useTheme } from '../../adapters/rn/useTheme';

const variantToSurface: Record<CardVariant, SurfaceKey> = {
	surface: 'base',
	raised: 'raised',
	alt: 'alt',
	brand: 'brand',
};

export function Card({ variant = 'surface', children, style, ...margin }: CardProps) {
	const theme = useTheme();
	const { spacing, radii, contracts } = theme.theme;

	const surfaceKey = variantToSurface[variant];
	const surface = contracts.surfaces[surfaceKey];

	return (
		<View
			style={[
				styles.base,
				{
					backgroundColor: surface.bg,
					borderColor: surface.border,
				},
				resolveMargin(margin, spacing),
				style,
			]}
		>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	base: {
		borderRadius: 12,
		padding: 16,
	},
});
