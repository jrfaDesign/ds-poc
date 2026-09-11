import { mergeTheme } from './mergeTheme';
import bcaTheme from './bca';

const bydTheme = mergeTheme(bcaTheme, {
	contracts: {
		components: {
			saleCardLogoBg: { light: 'black', dark: 'black' },
		},
	},
});

export default bydTheme;
