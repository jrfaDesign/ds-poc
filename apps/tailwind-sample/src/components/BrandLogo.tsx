import defaultLogo from '../assets/brandLogos/default.svg';
import bydLogo from '../assets/brandLogos/byd.svg';

export type ThemeKey = 'default' | 'cag' | 'caos' | 'bca' | 'byd' | 'byd_premium';

const logoMap: Partial<Record<ThemeKey, string>> = {
	default: defaultLogo,
	byd: bydLogo,
	byd_premium: bydLogo,
};

type BrandLogoProps = {
	themeKey: ThemeKey | string;
	className?: string;
	onClick?: () => void;
};

export function BrandLogo({ themeKey, className, onClick }: BrandLogoProps) {
	const src = logoMap[themeKey as ThemeKey] ?? defaultLogo;
	return <img src={src} alt="Logo" className={className} onClick={onClick} />;
}
