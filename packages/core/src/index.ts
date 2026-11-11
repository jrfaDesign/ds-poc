/**
 * @repo/core: the type & shared-props layer of the design system.
 *
 * - `globals.ts`  : foundation type re-exports (type-only) + cross-cutting types
 * - `*Shared.ts`  : component prop shapes identical on web and React Native
 *
 * Rule: core is plain TypeScript only: no React, no React Native types.
 * Platform mechanics (onClick/onPress, className/style, ReactNode children)
 * stay in the platform packages. Runtime values (schemas, themes, resolvers)
 * come from `@repo/foundations`.
 */
export * from './globals';
export * from './ButtonShared';
export * from './AlertShared';
export * from './CardShared';
export * from './InputShared';
export * from './CheckboxShared';
export * from './RadioShared';
export * from './ToggleShared';
export * from './SpacingShared';
