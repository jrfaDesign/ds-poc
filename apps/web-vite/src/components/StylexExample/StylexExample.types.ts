import type { StyleXStyles } from '@stylexjs/stylex';

export type StylexExampleProps = {
	cardSX?: StyleXStyles;
	buttonSX?: StyleXStyles<{ backgroundColor?: '#4F46E5' | 'red' }>;
	showError?: boolean;
	showSuccess?: boolean;
};
