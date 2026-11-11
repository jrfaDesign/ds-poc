import { View, StyleSheet } from 'react-native';
import type { CardProps } from './Card.types';
import type { CardVariant } from '@repo/core';
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
	const { spacing, shape, contracts } = theme.theme;

	const surfaceKey = variantToSurface[variant];
	const surface = contracts.surfaces[surfaceKey];

	return (
		<View
			style={[
				styles.base,
				{
					backgroundColor: surface.bg,
					borderColor: surface.border,
					borderRadius: shape.card,
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
		padding: 16,
	},
});
