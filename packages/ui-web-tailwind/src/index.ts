export { applyTheme } from './adapters/tailwind/applyTheme';
export type {
	Tokens,
	ColorToken,
	ColorTokenName,
	ColorTokenLeaf,
	SpacingToken,
	RadiiToken,
	ShadowToken,
	WidthToken,
	LayoutToken,
	BreakpointToken,
	SurfaceKey,
	FontSizeToken,
	FontWeightToken,
	LineHeightToken,
	LetterSpacingToken,
	FontFamilyToken,
} from '@repo/foundations';

// Shared variant types from @repo/globals
export type {
	ButtonVariant,
	CardVariant,
	AlertIntent,
	TypographyRole,
	TypographyColor,
} from '@repo/globals';

// Layout
export { Box } from './components/Box/Box';
export type { BoxProps, BoxTag, BackgroundProp } from './components/Box/Box.types';

// Border
export type { BorderProp, BorderToken, BorderStyle } from './components/shared/border';

// Feedback
export { Alert } from './components/Alert/Alert';
export type { AlertProps } from './components/Alert/Alert.types';

// Tags / Badges
export { Tag } from './components/Tag/Tag';
export type { TagProps, TagVariant } from './components/Tag/Tag.types';
export { Badge } from './components/Badge/Badge';
export type {
	BadgeProps,
	BadgeVariant,
	BadgeSurface,
	BadgeSize,
	BadgeRadii,
} from './components/Badge/Badge.types';

// Navigation
export { TopNavBar } from './components/TopNavBar/TopNavBar';
export type { TopNavBarProps, NavItem } from './components/TopNavBar/TopNavBar.types';

// Actions
export { Button } from './components/Button/Button';
export type { ButtonProps } from './components/Button/Button.types';

// Selection Controls
export { Checkbox } from './components/Checkbox/Checkbox';
export type { CheckboxProps } from './components/Checkbox/Checkbox.types';
export { Radio } from './components/Radio/Radio';
export type { RadioProps } from './components/Radio/Radio.types';
export { Toggle } from './components/Toggle/Toggle';
export type { ToggleProps } from './components/Toggle/Toggle.types';

// Surfaces
export { Card } from './components/Card/Card';
export type { CardProps } from './components/Card/Card.types';

// Typography
export { Typography } from './components/Typography/Typography';
export type { TypographyProps, TypographyTag } from './components/Typography/Typography.types';

// Form
export { Select } from './components/Select/Select';
export type { SelectProps } from './components/Select/Select.types';

export { Input } from './components/Input/Input';
export type { InputProps, InputStatus } from './components/Input/Input.types';

export { Textarea } from './components/Textarea/Textarea';
export type { TextareaProps } from './components/Textarea/Textarea.types';

// Layout - Grid system
export { Grid } from './components/Grid/Grid';
export { Column } from './components/Grid/Column';
export type { GridProps, ColumnProps, AutoLayout } from './components/Grid/Grid.types';

// Layout - Container / PageSection
export { Container } from './components/Container/Container';
export type { ContainerProps } from './components/Container/Container.types';
export { PageSection } from './components/PageSection/PageSection';
export type { PageSectionProps } from './components/PageSection/PageSection.types';

// Layout - shared responsive helper type
export type { Responsive } from './components/shared/responsive';

// Type-safe CSS variable helpers
export {
	spacingVar,
	radiiVar,
	colorTokenVar,
	shadowVar,
	fontFamilyVar,
} from './components/shared/cssVars';
export type {
	SpacingVar,
	RadiiVar,
	ColorTokenVar,
	FontFamilyVar,
} from './components/shared/cssVars';
