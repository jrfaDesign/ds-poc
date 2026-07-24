import type { ReactNode } from 'react';

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

export type TypographyProps = {
	role?: TypographyRole;
	color?: TypographyColor;
	weight?: string;
	children: ReactNode;
};
