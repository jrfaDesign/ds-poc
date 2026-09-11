# Design System — White-Label POC

A monorepo proof of concept for a **unified, white-label design system** that serves a single source of truth across **web** (Tailwind CSS) and **React Native**. Tokens, themes, and contracts are defined once in TypeScript and consumed by platform-specific adapters — with full type safety, zero code duplication, and instant theme switching.

---

## What This POC Proves

| Claim                                     | How it's proven                                                                                                                                                                  |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **One token source, two platforms**       | `packages/foundations/src/index.ts` defines all tokens. Both Tailwind and React Native consume the same definitions via auto-generated codegen and generic adapter loops.        |
| **Type safety without manual type files** | `ResolvedComponents` is auto-derived from the Zod schema. Adding a property to the schema instantly gives you TypeScript autocomplete and compile-time checks on both platforms. |
| **New tokens require zero adapter edits** | Both adapters resolve contract properties generically. Add a property to `ComponentsPresetSchema`, add values to themes, run `yarn generate:tokens` — done.                      |
| **Instant theme switching**               | Dark mode is class-based (`html.dark`). Theme switching updates CSS variables at runtime — no rebuild, no flash.                                                                 |
| **White-label ready**                     | Six themes ship out of the box. Switching brands (Default → BYD → BCA) changes colors, borders, backgrounds, and logos — all from the theme contract, no component code changes. |
| **Validated at runtime**                  | `TokensSchema.parse()` (Zod) validates every theme at load time. Malformed data fails fast. `.strict()` catches stale or unknown properties.                                     |
| **FOUC prevention**                       | `applyTheme()` is called synchronously before React mounts. `ThemeProvider` reads localStorage in `useState` initializer — no flash of unstyled content.                         |
| **SSR compatible**                        | `applyTheme()` has a `typeof document` guard — works in Next.js/SSR without crashing.                                                                                            |

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

| Package                 | Role                                                              |
| ----------------------- | ----------------------------------------------------------------- |
| `@repo/foundations`     | Token definitions, Zod schemas, TypeScript types, codegen scripts |
| `@repo/themes`          | 6 theme definitions (Default, CAG, CAOS, BCA, BYD, BYD Premium)   |
| `@repo/globals`         | Shared types and constants across adapters                        |
| `@repo/ui-web-tailwind` | Web component library + Tailwind adapter + ThemeProvider          |
| `@repo/ui-react-native` | React Native component library + RN adapter + AppProvider         |
| `@repo/ui-web-stylex`   | Web adapter — StyleX components (experimental)                    |

### App Overview

| App                    | Stack                      | Purpose                                        |
| ---------------------- | -------------------------- | ---------------------------------------------- |
| `apps/tailwind-sample` | React + Vite + Tailwind    | Full MVP web app with dark/light + multi-theme |
| `apps/native`          | React Native + Expo SDK 57 | Same multi-theme support on mobile             |
| `apps/web-vite`        | Vite-based web app         | Minimal web shell                              |
| `apps/docs`            | Documentation app          | Design system docs                             |

---

## Token System

### Token Categories

| Category         | Type                           | Example                              | Count               |
| ---------------- | ------------------------------ | ------------------------------------ | ------------------- |
| **Colors**       | Raw palette hex values         | `primary_500`, `neutral_900`         | 100+                |
| **Color Tokens** | Semantic light/dark pairs      | `text-primary`, `bg-brand-solid`     | 100+                |
| **Spacing**      | Layout spacing scale           | `sm` (8px), `md` (16px), `lg` (24px) | 17                  |
| **Radii**        | Border radius scale            | `sm`, `md`, `full`                   | 15                  |
| **Typography**   | Font size, weight, line-height | `h1`, `body`, `caption`              | 11 sizes, 7 weights |
| **Contracts**    | Semantic bundles               | `actions.primary`, `surfaces.base`   | 7 contract types    |
| **Shadows**      | Multi-layer box shadows        | `sm`, `md`, `lg`                     | 8                   |
| **Gradients**    | Linear gradient definitions    | `primary_600_500_90`                 | 21                  |
| **Breakpoints**  | Responsive viewport thresholds | `mobile` (0), `desktop` (1024)       | 5                   |
| **Grid**         | Per-breakpoint grid config     | columns, gutter, margin              | 5 breakpoints       |

### Contract Types

Contracts bundle related tokens into semantic units. Components never reference raw tokens — they use contracts.

| Contract             | Structure         | What it bundles             | Example properties                                          |
| -------------------- | ----------------- | --------------------------- | ----------------------------------------------------------- |
| **actions**          | Nested (variants) | Button/link states          | `bg`, `on`, `border`, `bgHover`, `bgDisabled` per variant   |
| **feedback**         | Nested (variants) | Alert/notification states   | `bg`, `on`, `border`, `bgInverse` per intent                |
| **surfaces**         | Nested (variants) | Card/section backgrounds    | `bg`, `on`, `border` per surface type                       |
| **inputField**       | Flat              | Form input states           | `bg`, `border`, `placeholder`, `borderFocus`, `borderError` |
| **selectionControl** | Flat              | Checkbox/radio states       | `bg`, `border`, `bgChecked`, `borderChecked`                |
| **toggle**           | Flat              | Toggle switch states        | `trackBg`, `thumbColor`, `trackBgChecked`                   |
| **components**       | Flat              | Structural component tokens | `buttonBorderRadii`, `headerBg`, `footerBg`, `appShellBg`   |

### How Tokens Flow

```
index.ts (schema)  →  codegen.js (auto)  →  generate-theme-css.mjs  →  tailwind-theme.css
                         ↓
                    applyTheme.ts (Tailwind)  →  CSS variables on :root
                         ↓
                    ThemeProvider (React Context)  →  all components get theme

index.ts (schema)  →  applyTheme.ts (RN)  →  ResolvedTheme object
                         ↓
                    AppProvider (React Context)  →  all components get theme
```

---

## Theme System

### 6 Built-in Themes

| Key           | Name        | Primary Accent      | Dark Mode    |
| ------------- | ----------- | ------------------- | ------------ |
| `default`     | Default     | Blue                | Neutral dark |
| `cag`         | CAG         | Gold/amber          | Neutral dark |
| `caos`        | CAOS        | Warm terracotta     | Neutral dark |
| `bca`         | BCA         | Corporate blue-grey | Neutral dark |
| `byd`         | BYD         | Electric green      | Neutral dark |
| `byd_premium` | BYD Premium | Dark teal           | Dark teal    |

### Adding a New Theme

```typescript
// packages/themes/src/myBrand.ts
import { createTheme, defaultTheme } from './createTheme';

export default createTheme(defaultTheme, {
  colors: { primary_500: '#FF6B00', primary_600: '#CC5500', ... },
  contracts: {
    actions: {
      primary: { bg: 'primary_500', on: 'white', ... },
    },
  },
});
```

Only override what differs from the base theme. `mergeTheme` deep-merges with defaults.

### Theme Edge Cases: Mode-Aware Colors

Some component backgrounds differ between light and dark mode (e.g., app shell is white in light, dark in dark). Use `ShadowColorSchema`:

```typescript
// In theme file:
contracts: {
  components: {
    appShellBg: { light: 'white', dark: 'neutral_950' },  // different per mode
    headerBg: { light: 'primary_950', dark: 'primary_950' }, // same in both modes
  },
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
vim packages/foundations/src/index.ts

# 2. Add to the Zod schema
const ComponentsPresetSchema = z.object({
  // ... existing
  myNewToken: ColorTokenRefSchema,  // ← ADD
}).strict();

# 3. Add values to theme files
vim packages/themes/src/default.ts

# 4. Regenerate everything
yarn generate:tokens

# 5. Use in components
# Web: bg-myNewToken
# Native: theme.contracts.components.myNewToken
```

Full details: `packages/foundations/CREATE_NEW_VARS.md`

### Add a New Theme

1. Create `packages/themes/src/myBrand.ts`
2. Extend `defaultTheme` with overrides
3. Export from `packages/themes/src/index.ts`
4. Add to `ThemeProvider` in `apps/tailwind-sample/src/main.tsx` and `AppProvider` in `apps/native`

### Remove a Token

1. Remove from `ComponentsPresetSchema` (or relevant schema)
2. Remove from all theme files
3. Run `yarn generate:tokens`
4. Zod `.strict()` will catch any stale references at runtime

---

## Platform Comparison

| Feature                 | Tailwind (Web)                                 | React Native                              |
| ----------------------- | ---------------------------------------------- | ----------------------------------------- |
| **Token resolution**    | CSS variables via `applyTheme()`               | JS object via `applyTheme(theme, isDark)` |
| **Utility classes**     | Auto-generated from `FLAT_CONTRACT_PROPERTIES` | N/A (inline styles)                       |
| **Dark mode**           | Class-based (`html.dark`)                      | `isDark` prop on `AppProvider`            |
| **Type safety**         | `ResolvedComponents` from Zod schema           | Same `ResolvedComponents` type            |
| **Contract resolution** | Generic loop over flat contracts               | Generic loop over flat contracts          |
| **ThemeProvider**       | `ThemeProvider` (React Context)                | `AppProvider` (React Context)             |
| **FOUC prevention**     | `applyTheme()` before React mount              | N/A (no DOM)                              |
| **SSR support**         | `typeof document` guard                        | N/A                                       |

---

## Developer Experience

### What's Automatic

| Task                                     | Automatic? | How                                                            |
| ---------------------------------------- | ---------- | -------------------------------------------------------------- |
| Add property to `ComponentsPresetSchema` | ✅         | `FLAT_CONTRACT_PROPERTIES.components` auto-derived from schema |
| Generate CSS bridge variables            | ✅         | `generate-theme-css.mjs` reads `FLAT_CONTRACT_PROPERTIES`      |
| Generate Tailwind utility classes        | ✅         | `bg-{propertyName}` / `rounded-{propertyName}` auto-generated  |
| Resolve new property on web              | ✅         | `applyTheme.ts` generic flat contract loop                     |
| Resolve new property on native           | ✅         | `applyTheme.ts` generic flat contract loop                     |
| TypeScript types for new property        | ✅         | `ResolvedComponents` derived from Zod schema                   |
| Catch stale properties after removal     | ✅         | Zod `.strict()` rejects unknown properties                     |

### What Requires Manual Work

| Task                       | Manual? | What to edit                                     |
| -------------------------- | ------- | ------------------------------------------------ |
| Add property to schema     | Yes     | `packages/foundations/src/index.ts`              |
| Add values to themes       | Yes     | `packages/themes/src/*.ts`                       |
| Add a new theme            | Yes     | Create theme file + register in apps             |
| Add a new contract type    | Yes     | Schema + `CONTRACT_STRUCTURE` + adapter metadata |
| Add a new platform adapter | Yes     | New adapter package with generic contract loop   |

---

## Scripts

| Command                 | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `yarn install`          | Install all dependencies                        |
| `yarn generate:tokens`  | Regenerate `codegen.js` + `tailwind-theme.css`  |
| `yarn generate:codegen` | Regenerate `codegen.js` only                    |
| `yarn verify:codegen`   | CI check — fails if `codegen.js` is out of sync |
| `yarn check-types`      | Type-check all packages                         |
| `yarn lint`             | Lint all packages                               |
| `yarn dev`              | Start all apps in dev mode                      |

---

## Tech Stack

- **Build**: Turborepo
- **Package Manager**: Yarn 4 (Berry)
- **Web**: React, Vite, Tailwind CSS v4
- **Native**: React Native 0.86, Expo SDK 57
- **Validation**: Zod
- **Type Safety**: TypeScript 5.9+
