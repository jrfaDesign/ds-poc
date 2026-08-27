export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';

export type BadgeVariant = 'brand' | 'alt' | 'outline' | 'error' | 'success' | 'warning' | 'info';

export type AlertType = 'error' | 'success' | 'warning' | 'info';

export type CardVariant = 'surface' | 'raised' | 'alt' | 'brand';

export type BreakpointKey = 'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultra';

export const typographyRoleKeys = [
	'heading1',
	'heading2',
	'heading3',
	'heading4',
	'body',
	'bodySm',
	'caption',
	'label',
	'overline',
] as const;

export type TypographyRole = (typeof typographyRoleKeys)[number];

export const typographyColorKeys = [
	'text',
	'textSecondary',
	'textTertiary',
	'textInverse',
	'textBrand',
	'primary',
	'secondary',
	'errorFg',
	'successFg',
	'warningFg',
	'infoFg',
	'inherit',
] as const;

export type TypographyColor = (typeof typographyColorKeys)[number];
