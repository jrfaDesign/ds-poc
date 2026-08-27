import { mergeTheme } from './mergeTheme';
import defaultTheme from './default';

const cagTheme = mergeTheme(defaultTheme, {
	colors: {
		primary_50: '#FFF5F8',
		primary_100: '#FEF1F5',
		primary_200: '#FFE0E9',
		primary_300: '#FF8EAF',
		primary_400: '#FF004B',
		primary_500: '#E22059',
		primary_600: '#BE0F43',
		primary_700: '#A00130',
		primary_800: '#7E1C49',
		primary_900: '#332755',
		primary_950: '#1F1535',
	},
	components: {
		buttonBg: { type: 'colorTokens', value: 'bg-brand-solid' },
		buttonBorderRadii: { type: 'radii', value: 'none' },
		cardBorderRadii: { type: 'radii', value: 'none' },
	},
});

export default cagTheme;
