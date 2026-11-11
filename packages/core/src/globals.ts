/**
 * Global, cross-cutting types shared by every package.
 *
 * Foundation types are re-exported here (type-only: the runtime source of
 * truth stays `@repo/foundations`) so consumers can get every type from
 * `@repo/core`. Component-specific types live in the `*Shared.ts` files.
 */
export type * from '@repo/foundations';

/** Responsive breakpoint keys (matches `breakpoints` in `@repo/foundations`). */
export type BreakpointKey = 'mobile' | 'tablet' | 'desktop' | 'wide' | 'ultra';

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
