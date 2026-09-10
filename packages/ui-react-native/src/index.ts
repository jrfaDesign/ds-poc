// Adapter
export { AppProvider, ThemeContext } from './adapters/rn/ThemeContext';
export type { AppProviderProps, ThemeContextValue } from './adapters/rn/ThemeContext';
export { useTheme } from './adapters/rn/useTheme';
export { applyTheme } from './adapters/rn/applyTheme';
export type {
	ResolvedTheme,
	ResolvedTypography,
	ResolvedShadow,
	ResolvedActions,
	ResolvedFeedback,
	ResolvedSurfaces,
	SurfaceKey,
	ResolvedInputField,
	ResolvedSelectionControl,
	ResolvedToggle,
} from './adapters/rn/applyTheme';
export { InvertProvider } from './adapters/rn/InvertProvider';

// Components
export { Box } from './components/Box/Box';
export { Button } from './components/Button/Button';
export { Card } from './components/Card/Card';
export { Typography } from './components/Typography/Typography';
export { PageSection } from './components/PageSection/PageSection';
export { Alert } from './components/Alert/Alert';
export { Checkbox } from './components/Checkbox/Checkbox';
export { Radio } from './components/Radio/Radio';
export { Toggle } from './components/Toggle/Toggle';
export { Input } from './components/Input/Input';

// Types
export type { BoxProps } from './components/Box/Box.types';
export type { ButtonProps } from './components/Button/Button.types';
export type { CardProps } from './components/Card/Card.types';
export type { TypographyProps } from './components/Typography/Typography.types';
export type { PageSectionProps } from './components/PageSection/PageSection.types';
export type { AlertProps } from './components/Alert/Alert.types';
export type { CheckboxProps } from './components/Checkbox/Checkbox.types';
export type { RadioProps } from './components/Radio/Radio.types';
export type { ToggleProps } from './components/Toggle/Toggle.types';
export type { InputProps } from './components/Input/Input.types';

// Shared
export type { MarginProps, PaddingProps } from './components/shared/spacing';

// Foundation re-exports
export type {
	Tokens,
	SpacingToken,
	RadiiToken,
	WidthToken,
	LayoutToken,
	ColorToken,
	ColorTokenName,
	ShadowToken,
	FontSizeToken,
	FontWeightToken,
	LineHeightToken,
	LetterSpacingToken,
	FontFamilyToken,
} from '@repo/foundations';
export type {
	ButtonVariant,
	CardVariant,
	AlertIntent,
	TypographyRole,
	TypographyColor,
} from '@repo/globals';
