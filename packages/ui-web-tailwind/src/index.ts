export { applyTheme } from './adapters/tailwind/applyTheme';
export { ThemeProvider, useTheme, safeParseTheme } from './components/ThemeProvider';
export type {
	ThemeProviderProps,
	StaticThemeResolver,
	AsyncThemeResolver,
	ConfigThemeMode,
	WebThemeContextValue,
} from './components/ThemeProvider';
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

// Shared variant types from @repo/core
export type { ButtonVariant, CardVariant, AlertIntent, TypographyColor } from '@repo/core';

// Layout
export { Box } from './components/Box/Box';
export type { BoxProps, BoxTag, BackgroundProp } from './components/Box/Box.types';

// Border
export type { BorderProp, BorderToken, BorderStyle } from './components/shared/border';

// Feedback
export { Alert } from './components/Alert/Alert';
export type { AlertProps } from './components/Alert/Alert.types';

// Tags / Badges (UntitledUI family)
export {
	Badge,
	BadgeWithDot,
	BadgeWithIcon,
	BadgeWithFlag,
	BadgeWithImage,
	BadgeWithButton,
	BadgeIcon,
} from './components/Badge/Badge';
export { BadgeGroup } from './components/Badge/BadgeGroups';
export type {
	BadgeProps,
	BadgeWithDotProps,
	BadgeWithIconProps,
	BadgeWithFlagProps,
	BadgeWithImageProps,
	BadgeWithButtonProps,
	BadgeIconProps,
	BadgeGroupProps,
	BadgeColor,
} from './components/Badge/Badge.types';
export type {
	BadgeColors,
	BadgeTypes,
	FlagTypes,
	IconComponentType,
	Sizes as BadgeSizes,
} from './components/Badge/badge-types';
export { Tag, TagGroup, TagList, TagAvatar } from './components/Tag/Tag';
export type { TagProps, TagItem, TagGroupProps } from './components/Tag/Tag.types';

// Navigation
export { TopNavBar } from './components/TopNavBar/TopNavBar';
export type { TopNavBarProps, NavItem } from './components/TopNavBar/TopNavBar.types';

// Actions
export { Button } from './components/Button/Button';
export type {
	ButtonProps,
	CommonProps as ButtonCommonProps,
	LinkProps as ButtonLinkProps,
	Props as ButtonUnionProps,
} from './components/Button/Button.types';
export { ButtonUtility } from './components/ButtonUtility/ButtonUtility';
export type {
	ButtonProps as ButtonUtilityProps,
	CommonProps as ButtonUtilityCommonProps,
} from './components/ButtonUtility/ButtonUtility.types';
export { ButtonGroup, ButtonGroupItem } from './components/ButtonGroup/ButtonGroup';
export type {
	ButtonGroupProps,
	ButtonGroupItemProps,
} from './components/ButtonGroup/ButtonGroup.types';
export { SocialButton } from './components/SocialButton/SocialButton';
export type { SocialButtonProps } from './components/SocialButton/SocialButton.types';
export { CloseButton } from './components/CloseButton/CloseButton';
export type { CloseButtonProps } from './components/CloseButton/CloseButton.types';
export {
	GooglePlayButton,
	GooglePlayWhiteButton,
	AppStoreButton,
	GalaxyStoreButton,
	AppGalleryButton,
} from './components/AppStoreButtons/AppStoreButtons';
export * as AppStoreButtonsOutline from './components/AppStoreButtons/AppStoreButtonsOutline';

// Selection Controls
export { Checkbox, CheckboxBase } from './components/Checkbox/Checkbox';
export type { CheckboxProps, CheckboxBaseProps } from './components/Checkbox/Checkbox.types';
export { RadioButton, RadioGroup, RadioButtonBase } from './components/Radio/Radio';
export type {
	RadioButtonProps,
	RadioGroupProps,
	RadioButtonBaseProps,
	RadioGroupContextType,
} from './components/Radio/Radio.types';
export { Toggle, ToggleBase } from './components/Toggle/Toggle';
export type { ToggleProps, ToggleBaseProps } from './components/Toggle/Toggle.types';

// Surfaces
export { Card } from './components/Card/Card';
export type { CardProps } from './components/Card/Card.types';

// Typography
export { Typography } from './components/Typography/Typography';
export type {
	TypographyProps,
	TypographyRole,
	TypographyTag,
} from './components/Typography/Typography.types';

// Form
export { Select } from './components/Select/Select';
export type { SelectProps } from './components/Select/Select.types';
export type {
	SelectItemType,
	CommonProps as SelectCommonProps,
} from './components/Select/select-shared';

export { Input, InputBase, TextField } from './components/Input/Input';
export type { InputProps, InputBaseProps, TextFieldProps } from './components/Input/Input.types';
export { InputGroup, InputPrefix } from './components/Input/input-group';
export { Label } from './components/Input/label';
export { HintText } from './components/Input/hint-text';
export { InputDate, InputDateBase } from './components/Input/input-date';
export { InputNumber, InputNumberBase } from './components/Input/input-number';
export { InputFile } from './components/Input/input-file';
export { PaymentInput } from './components/Input/input-payment';
export { InputTags } from './components/Input/input-tags';
export { InputTagsOuter } from './components/Input/input-tags-outer';
export { PinInput } from './components/PinInput/PinInput';
export type { RootProps as PinInputProps } from './components/PinInput/PinInput.types';

export { TextArea, TextAreaBase } from './components/Textarea/Textarea';
export type {
	TextFieldProps as TextAreaProps,
	TextAreaBaseProps,
} from './components/Textarea/Textarea.types';

// Progress
export { ProgressBar, ProgressBarBase } from './components/ProgressIndicators/ProgressIndicators';
export type {
	ProgressBarProps,
	ProgressIndicatorWithTextProps,
} from './components/ProgressIndicators/ProgressIndicators.types';
export {
	ProgressBarCircle,
	ProgressBarHalfCircle,
} from './components/ProgressCircles/ProgressCircles';
export type { ProgressBarProps as CircleProgressBarProps } from './components/ProgressCircles/ProgressCircles.types';

// Overlay / display
export { Dropdown } from './components/Dropdown/Dropdown';
export type {
	DropdownItemProps,
	DropdownMenuProps,
	DropdownPopoverProps,
} from './components/Dropdown/Dropdown.types';
export { Tooltip, TooltipTrigger } from './components/Tooltip/Tooltip';
export type { TooltipProps, TooltipTriggerProps } from './components/Tooltip/Tooltip.types';
export { Avatar } from './components/Avatar/Avatar';
export { AvatarLabelGroup } from './components/Avatar/avatar-label-group';
export { AvatarProfilePhoto } from './components/Avatar/avatar-profile-photo';
export type {
	AvatarProps,
	AvatarLabelGroupProps,
	AvatarProfilePhotoProps,
} from './components/Avatar/Avatar.types';
export { FeaturedIcon } from './components/FeaturedIcon/FeaturedIcon';
export type { FeaturedIconProps } from './components/FeaturedIcon/FeaturedIcon.types';
export { Slider } from './components/Slider/Slider';
export type { SliderProps } from './components/Slider/Slider.types';
export { CreditCard } from './components/CreditCard/CreditCard';
export type { CreditCardProps } from './components/CreditCard/CreditCard.types';
export { QRCode } from './components/QrCode/QrCode';
export type { QRCodeProps } from './components/QrCode/QrCode.types';

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
