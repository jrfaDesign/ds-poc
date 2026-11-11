/**
 * @repo/foundations: the single source of truth for the design system.
 *
 * - `tokens/`: token schemas, scales, and helpers (the design-token system)
 * - `theme/` : the default theme values plus the theme-config API/resolver
 */
export * from './tokens/index';

export { default as defaultTheme } from './theme/defaultTheme';
export * from './theme/mergeTheme';
export * from './theme/themeConfig';
