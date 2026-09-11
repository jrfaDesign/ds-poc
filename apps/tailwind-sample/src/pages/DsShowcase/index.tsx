import { useTheme } from '@repo/ui-web-tailwind';
import { Intro } from './components/Intro/Intro';
import { ComponentShowcase } from './components/ComponentShowcase/ComponentShowcase';
import { ActionsDemo } from './components/ActionsDemo/ActionsDemo';
import { SurfacesDemo } from './components/SurfacesDemo/SurfacesDemo';
import { AlertDemo } from './components/AlertDemo/AlertDemo';
import { TypographyDemo } from './components/TypographyDemo/TypographyDemo';
import { TokensDemo } from './components/TokensDemo/TokensDemo';
import { GridSystemDemo } from './components/GridSystemDemo/GridSystemDemo';
import { TokenShowcase } from './components/TokenShowcase/TokenShowcase';
import { AlphaDemo } from './components/AlphaDemo/AlphaDemo';
import { InvertDemo } from './components/InvertDemo/InvertDemo';

export default function DsShowcase() {
	const { theme } = useTheme();
	return (
		<>
			<Intro />
			<ComponentShowcase />
			<ActionsDemo />
			<SurfacesDemo />
			<AlertDemo />
			<TypographyDemo fontFamily={theme.typography.fontFamilies.body} />
			<TokensDemo theme={theme} />
			<GridSystemDemo />
			<TokenShowcase theme={theme} />
			<AlphaDemo />
			<InvertDemo />
		</>
	);
}
