import { useThemeConfig } from '../theme/ThemeConfigContext';
import defaultLogo from '../assets/brandLogos/default.svg';

type BrandLogoProps = {
	className?: string;
	onClick?: () => void;
};

/** Renders the brand logo from the theme config (`config.logo`), falling back to the default asset. */
export function BrandLogo({ className, onClick }: BrandLogoProps) {
	const { config } = useThemeConfig();
	return (
		<img src={config.logo ?? defaultLogo} alt="Logo" className={className} onClick={onClick} />
	);
}
