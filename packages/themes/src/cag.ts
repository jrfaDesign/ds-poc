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

	contracts: {
		feedback: {
			error: {
				borderRadius: { type: 'radii' as const, value: 'none' },
			},
			success: {
				borderRadius: { type: 'radii' as const, value: 'none' },
			},
			warning: {
				borderRadius: { type: 'radii' as const, value: 'none' },
			},
			info: {
				borderRadius: { type: 'radii' as const, value: 'none' },
			},
		},
		components: {
			buttonBorderRadii: { type: 'radii' as const, value: 'none' },
			cardBorderRadii: { type: 'radii' as const, value: 'none' },
			inputBorderRadii: { type: 'radii' as const, value: 'none' },
		},
	},
});

export default cagTheme;
