import { Image, type ImageStyle, type StyleProp } from 'react-native';
import { useThemeSettings, type ThemeKey } from '@/contexts/ThemeSettingsContext';

const defaultLogo = require('@/assets/images/brandLogos/default.png');
const bydLogo = require('@/assets/images/brandLogos/byd.png');
const bydDarkLogo = require('@/assets/images/brandLogos/byd-dark.png');

const logoMap: Record<ThemeKey, number> = {
	default: defaultLogo,
	cag: defaultLogo,
	caos: defaultLogo,
	bca: defaultLogo,
	byd: bydLogo,
	byd_premium: bydLogo,
};

const logoDarkMap: Record<ThemeKey, number> = {
	default: defaultLogo,
	cag: defaultLogo,
	caos: defaultLogo,
	bca: defaultLogo,
	byd: bydDarkLogo,
	byd_premium: bydDarkLogo,
};

type BrandLogoProps = {
	style?: StyleProp<ImageStyle>;
	variant?: 'default' | 'onImage';
};

export function BrandLogo({ style, variant = 'default' }: BrandLogoProps) {
	const { themeKey, darkMode } = useThemeSettings();
	const map = variant === 'onImage' ? logoDarkMap : logoMap;
	const source = map[themeKey] ?? defaultLogo;

	return (
		<Image source={source} style={[{ height: 20, width: 50, resizeMode: 'contain' }, style]} />
	);
}
