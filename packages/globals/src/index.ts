export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link' | 'tertiary';

export type BadgeVariant = 'brand' | 'alt' | 'outline' | 'error' | 'success' | 'warning' | 'info';

export type AlertType = 'error' | 'success' | 'warning' | 'info';

export type AlertIntent = AlertType;

export type CardVariant = 'surface' | 'raised' | 'alt' | 'brand';

export type BreakpointKey = 'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultra';

export const typographyRoleKeys = [
	'h1',
	'h2',
	'h3',
	'h4',
	'p',
	'caption',
	'label',
	'overline',
] as const;

export type TypographyRole = (typeof typographyRoleKeys)[number];

export const typographyColorKeys = [
	'text-primary',
	'text-secondary',
	'text-tertiary',
	'text-quaternary',
	'text-white',
	'text-placeholder',
	'text-brand-primary',
	'text-brand-secondary',
	'text-brand-tertiary',
	'text-error-primary',
	'text-warning-primary',
	'text-success-primary',
	'text-info-primary',
	'inherit',
] as const;

export type TypographyColor = (typeof typographyColorKeys)[number];
