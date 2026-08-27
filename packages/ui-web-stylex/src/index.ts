// Re-export shared types from @repo/globals
export type {
	ButtonVariant,
	BadgeVariant,
	AlertType,
	CardVariant,
	BreakpointKey,
	TypographyRole,
	TypographyColor,
} from '@repo/globals';

// Stylex adapter
export { applyTheme } from './adapters/stylex/createStylexTheme.stylex';

// Re-export StyleX vars through .stylex.ts file (required by StyleX tooling)
export {
	spacing,
	radii,
	colors,
	roles,
	fontFamily,
	fontSize,
	fontWeight,
	lineHeight,
	letterSpacing,
	typographyContracts,
	actionContracts,
	feedbackContracts,
	surfaceContracts,
	shadows,
	breakpoints,
	grid,
	gradients,
	components,
} from './adapters/stylex/createStylexVars.stylex';

// Layout components
export { Box } from './components/Box/Box';
export type { BoxProps } from './components/Box/Box.types';
export { Stack } from './components/Stack/Stack';
export type { StackProps } from './components/Stack/Stack.types';
export { Inline } from './components/Inline/Inline';
export type { InlineProps } from './components/Inline/Inline.types';
export { Grid } from './components/Grid/Grid';
export type { GridProps } from './components/Grid/Grid.types';

// Typography
export { Typography } from './components/Typography/Typography';
export type { TypographyProps } from './components/Typography/Typography.types';

// Action components
export { Button } from './components/Button/Button';
export type { ButtonProps } from './components/Button/Button.types';

// Feedback components
export { Alert } from './components/Alert/Alert';
export type { AlertProps } from './components/Alert/Alert.types';

// Surface components
export { Badge } from './components/Badge/Badge';
export type { BadgeProps } from './components/Badge/Badge.types';
export { Card } from './components/Card/Card';
export type { CardProps } from './components/Card/Card.types';
export { Section } from './components/Section/Section';
export type { SectionProps } from './components/Section/Section.types';

// Form components
export { Input } from './components/Input/Input';
export type { InputProps } from './components/Input/Input.types';
export { Select } from './components/Select/Select';
export type { SelectProps } from './components/Select/Select.types';
export { Textarea } from './components/Textarea/Textarea';
export type { TextareaProps } from './components/Textarea/Textarea.types';
