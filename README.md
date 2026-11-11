# Design System: White-Label POC

A monorepo proof of concept for a **unified, white-label design system** that serves a single source of truth across **web** (Tailwind CSS) and **React Native**. Tokens, themes, and contracts are defined once in TypeScript and consumed by platform-specific adapters, with full type safety, zero code duplication, and instant theme switching.

---

## What This POC Proves

| Claim                                     | How it's proven                                                                                                                                                                  |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **One token source, two platforms**       | `packages/foundations/src/index.ts` defines all tokens. Both Tailwind and React Native consume the same definitions via auto-generated codegen and generic adapter loops.        |
| **Type safety without manual type files** | `ResolvedComponents` is auto-derived from the Zod schema. Adding a property to the schema instantly gives you TypeScript autocomplete and compile-time checks on both platforms. |
| **New tokens require zero adapter edits** | Both adapters resolve contract properties generically. Add a property to `ComponentsPresetSchema`, add values to themes, run `yarn generate:tokens`, done.                      |
| **Instant theme switching**               | Dark mode is class-based (`html.dark`). Theme switching updates CSS variables at runtime, no rebuild, no flash.                                                                 |
| **White-label ready**                     | Six themes ship out of the box. Switching brands (Default → BYD → BCA) changes colors, borders, backgrounds, and logos, all from the theme contract, no component code changes. |
| **Validated at runtime**                  | `TokensSchema.parse()` (Zod) validates every theme at load time. Malformed data fails fast. `.strict()` catches stale or unknown properties.                                     |
| **FOUC prevention**                       | `applyTheme()` is called synchronously before React mounts. `ThemeProvider` reads localStorage in `useState` initializer, no flash of unstyled content.                         |
| **SSR compatible**                        | `applyTheme()` has a `typeof document` guard, works in Next.js/SSR without crashing.                                                                                            |

---

## Architecture

```
packages/foundations/src/index.ts          ← SINGLE SOURCE OF TRUTH
    │
    ├──► packages/foundations/src/codegen.js   (auto-generated, never edit)
    │       │
    │       └──► packages/ui-web-tailwind/scripts/generate-theme-css.mjs
    │               │
    │               └──► tailwind-theme.css (auto-generated)
    │
    └──► packages/ui-react-native/src/adapters/rn/applyTheme.ts
            (imports types directly, resolves at runtime)
```

### Package Overview

| Package                 | Role                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| `@repo/foundations`     | `src/tokens/` (schemas, scales, helpers) + `src/theme/` (default theme, theme config) + codegen scripts |
| `@repo/core`            | Types & shared component props: foundation type re-exports, `*Shared` props, global enums               |
| `@repo/ui-web-tailwind` | Web component library + Tailwind adapter + ThemeProvider                                                |
| `@repo/ui-react-native` | React Native component library + RN adapter + AppProvider                                               |

### App Overview

| App                    | Stack                      | Purpose                                                |
| ---------------------- | -------------------------- | ------------------------------------------------------ |
| `apps/tailwind-sample` | React + Vite + Tailwind    | Full MVP web app with dark/light + theme config tester |
| `apps/native`          | React Native + Expo SDK 57 | Same theme config support on mobile                    |
| `apps/storybook`       | Storybook 10 + Vite        | Design-system docs: tokens, stories, theme panel       |

---

## Token System

### Token Categories

| Category         | Type                           | Example                             | Count               |
| ---------------- | ------------------------------ | ----------------------------------- | ------------------- |
| **Colors**       | Raw palette hex values         | `primary_500`, `neutral_900`        | 100+                |
| **Color Tokens** | Semantic light/dark pairs      | `text-primary`, `bg-brand-solid`    | 100+                |
| **Spacing**      | Layout spacing scale           | `sm` (6px), `md` (8px), `lg` (12px) | 18                  |
| **Radii**        | Border radius scale            | `sm`, `md`, `full`                  | 14                  |
| **Typography**   | Font size, weight, line-height | `h1`, `body`, `caption`             | 11 sizes, 7 weights |
| **Contracts**    | Semantic bundles               | `actions.primary`, `surfaces.base`  | 3 contract types    |
| **Shadows**      | Multi-layer box shadows        | `sm`, `md`, `lg`                    | 8                   |
| **Gradients**    | Linear gradient definitions    | `primary_600_500_90`                | 21                  |
| **Breakpoints**  | Responsive viewport thresholds | `mobile` (0), `desktop` (1024)      | 5                   |
| **Grid**         | Per-breakpoint grid config     | columns, gutter, margin             | 5 breakpoints       |

### Contract Types

Contracts bundle related tokens into semantic units: the cross-platform consistency layer. Everything else is owned by each platform's component formula: input/selection/toggle state colors come from semantic color tokens directly, chrome surfaces from `colorTokens.bg` (`bg-header`, `bg-footer`, …), border radius from the shape preset (`theme.style`), and typography roles live inside each platform's `Typography` component.

| Contract     | Structure         | What it bundles           | Example properties                                        |
| ------------ | ----------------- | ------------------------- | --------------------------------------------------------- |
| **actions**  | Nested (variants) | Button/link states        | `bg`, `on`, `border`, `bgHover`, `bgDisabled` per variant |
| **feedback** | Nested (variants) | Alert/notification states | `bg`, `on`, `border`, `bgInverse` per intent              |
| **surfaces** | Nested (variants) | Card/section backgrounds  | `bg`, `on`, `border` per surface type                     |

### How Tokens Flow

```
tokens/index.ts (schema) → codegen.js (auto) → generate-theme-css.mjs → tailwind-theme.css
                         ↓
                    applyTheme.ts (Tailwind)  →  CSS variables on :root
                         ↓
                    ThemeProvider (React Context)  →  all components get theme

tokens/index.ts (schema) → applyTheme.ts (RN)  →  ResolvedTheme object
                         ↓
                    AppProvider (React Context)  →  all components get theme
```

---

## Theme System

### Config-driven themes (white-label tiers)

There are no per-brand theme files. The app fetches a `ThemeConfig` from the theme API at startup and resolves it with `resolveThemeConfig` (`packages/foundations/src/theme/themeConfig.ts`):

| Tier         | Behavior                                                                                                    |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| `basic`      | No overrides: the default theme as-is (logo-only brands)                                                   |
| `medium`     | Derived 50–950 color ramps from the picked 600 hexes, shape preset (`sharp`/`soft`/`rounded`/`full`), fonts |
| `enterprise` | Full custom theme: returns default for now (TODO)                                                          |

```typescript
import { resolveThemeConfig, type ThemeConfig } from '@repo/foundations';

const config: ThemeConfig = { tier: 'medium', colors: { primary600: '#7C3AED' }, style: 'rounded' };
const tokens = resolveThemeConfig(config); // → validated Tokens
```

Both apps ship a config tester built on this (web: profile menu; native: Settings screen), with a mock `fetchThemeConfig` standing in for the real endpoint.

### Theme Edge Cases: Mode-Aware Colors

Some values differ between light and dark mode. Shadows and chrome color tokens carry explicit pairs:

```typescript
// packages/foundations/src/theme/defaultTheme.ts
shadows: {
  sm: { color: { light: 'neutral_900', dark: 'white' }, layers: [...] },
},
colorTokens: {
  bg: { 'bg-app-shell': { light: 'white', dark: 'neutral_950' } },
}
```

| Schema Type           | When to use                                 | Resolves to    |
| --------------------- | ------------------------------------------- | -------------- |
| `ShadowColorSchema`   | Different color per light/dark mode         | `string` (hex) |
| `ColorTokenRefSchema` | Single color, mode-aware via semantic token | `string` (hex) |
| `RadiiRefSchema`      | Border radius reference                     | `number` (px)  |
| `z.number()`          | Raw numeric value                           | `number`       |

---

## Dark Mode

Dark mode is **class-based** on `<html>`. No JavaScript re-run needed.

```css
/* Generated by applyTheme.ts */
:root {
	--action-primary-bg: var(--action-primary-bg-default);
}
:root.dark {
	--action-primary-bg: var(--action-primary-bg-dark);
}
```

Switching mode:

- **Web**: Toggle `.dark` class on `document.documentElement`
- **Native**: Pass `isDark` boolean to `AppProvider`

Every mode-aware token has `-default` and `-dark` CSS variable variants. The selection rules swap them based on the `.dark` class.

---

## Developer Workflow

### Add a New Token

```bash
# 1. Edit the single source of truth
vim packages/foundations/src/tokens/index.ts

# 2. Add to the relevant Zod schema / key list
const bgColorTokenKeys = [
  // ... existing
  'bg-my-new-token',  // ← ADD
] as const;

# 3. Add the value to the default theme
vim packages/foundations/src/theme/defaultTheme.ts

# 4. Regenerate everything
yarn generate:tokens

# 5. Use in components
# Web: bg-my-new-token   (colorToken names: underscores → hyphens in classes)
# Native: theme.colorTokens['bg-my-new-token']
```

### Add Theme Config Behavior

1. Extend `themeConfigSchema` + `resolveThemeConfig` in `packages/foundations/src/theme/themeConfig.ts`
2. Handle the new field in both config editors (`apps/*/src/components/theme-config/`)
3. Validate with a quick `resolveThemeConfig` assertion + `yarn check-types`

### Remove a Token

1. Remove from the relevant schema in `packages/foundations/src/tokens/index.ts`
2. Remove its value from `packages/foundations/src/theme/defaultTheme.ts`
3. Run `yarn generate:tokens`
4. Zod `.strict()` will catch any stale references at runtime

---

## Platform Comparison

| Feature                 | Tailwind (Web)                                 | React Native                                |
| ----------------------- | ---------------------------------------------- | ------------------------------------------- |
| **Token resolution**    | CSS variables via `applyTheme()`               | JS object via `applyTheme(theme, isDark)`   |
| **Utility classes**     | Auto-generated from token + contract key lists | N/A (inline styles / `colorTokens` lookups) |
| **Dark mode**           | Class-based (`html.dark`)                      | `isDark` prop on `AppProvider`              |
| **Type safety**         | `Tokens` / `ResolvedTheme` derived from Zod    | Same `ResolvedTheme` type                   |
| **Contract resolution** | Generic loop over nested contracts             | Generic loop over nested contracts          |
| **ThemeProvider**       | `ThemeProvider` (React Context)                | `AppProvider` (React Context)               |
| **FOUC prevention**     | `applyTheme()` before React mount              | N/A (no DOM)                                |
| **SSR support**         | `typeof document` guard                        | N/A                                         |

---

## Developer Experience

### What's Automatic

| Task                                 | Automatic? | How                                                                 |
| ------------------------------------ | ---------- | ------------------------------------------------------------------- |
| Add a color-token key                | ✅         | `generate-theme-css.mjs` emits `bg-*`/`text-*`/`border-*` utilities |
| Add a contract property              | ✅         | Schema → `CONTRACT_*` metadata → CSS vars + both adapters' loops    |
| Generate CSS bridge variables        | ✅         | `generate-theme-css.mjs` reads the codegen key lists                |
| Generate Tailwind shape utilities    | ✅         | `rounded-button`/`rounded-input`/`rounded-card` from `theme.style`  |
| Catch stale properties after removal | ✅         | Zod `.strict()` rejects unknown properties                          |

### What Requires Manual Work

| Task                       | Manual? | What to edit                                            |
| -------------------------- | ------- | ------------------------------------------------------- |
| Add property to schema     | Yes     | `packages/foundations/src/tokens/index.ts`              |
| Add values to the theme    | Yes     | `packages/foundations/src/theme/defaultTheme.ts`        |
| Add theme-config behavior  | Yes     | `theme/config` schema + resolver + both config editors  |
| Add a new contract type    | Yes     | Schema + `CONTRACT_PREFIX`/`NESTED_CONTRACT_PROPERTIES` |
| Add a new platform adapter | Yes     | New adapter package with generic contract loop          |

---

## Scripts

| Command                                            | Description                                     |
| -------------------------------------------------- | ----------------------------------------------- |
| `yarn install`                                     | Install all dependencies                        |
| `yarn storybook`                                   | Start the design-system Storybook (port 6006)   |
| `yarn tailwind-sample`                             | Start the web sample app                        |
| `yarn native-sample`                               | Start the native sample app (Expo)              |
| `yarn workspace @repo/foundations generate:tokens` | Regenerate `codegen.js` + `tailwind-theme.css`  |
| `yarn workspace @repo/foundations verify:codegen`  | CI check: fails if `codegen.js` is out of sync |
| `yarn check-types`                                 | Type-check all packages                         |
| `yarn lint`                                        | Lint all packages                               |
| `yarn dev`                                         | Start all apps in dev mode                      |

---

## Tech Stack

- **Build**: Turborepo
- **Package Manager**: Yarn 4 (Berry)
- **Web**: React, Vite, Tailwind CSS v4
- **Native**: React Native 0.86, Expo SDK 57
- **Validation**: Zod
- **Type Safety**: TypeScript 5.9+
