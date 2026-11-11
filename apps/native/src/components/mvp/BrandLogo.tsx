import { Image, type ImageStyle, type StyleProp } from 'react-native';
import { useThemeSettings } from '@/contexts/ThemeSettingsContext';

const defaultLogo = require('@/assets/images/brandLogos/default.png');

type BrandLogoProps = {
	style?: StyleProp<ImageStyle>;
};

/**
 * Renders the brand logo from the theme config (`config.logo` URL),
 * falling back to the bundled default asset.
 */
export function BrandLogo({ style }: BrandLogoProps) {
	const { config } = useThemeSettings();

	const source = config.logo ? { uri: config.logo } : defaultLogo;

	return (
		<Image source={source} style={[{ height: 20, width: 50, resizeMode: 'contain' }, style]} />
	);
}
