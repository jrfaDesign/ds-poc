---
name: ds-monorepo
description: Context for the ds-poc2 white-label design-system monorepo - package roles, token/theme pipeline, folder conventions, dos and don'ts, legacy list, and target architecture. Load for any coding task in this repo.
---

# ds-poc2: Design System Monorepo

## What this repo is

A Turborepo + Yarn 4 monorepo (`apps/*`, `packages/*`) that builds a **white-label design system**: tokens, themes, and contracts are defined **once in TypeScript**, validated with Zod, and consumed by platform-specific adapters. One source of truth → many platforms, full type safety, zero duplication.

**Governing principles (in order):**

1. **Technology-agnostic foundations first.** `@repo/foundations` (tokens + theme) and `@repo/core` (types + shared props) must work anywhere: no React, no DOM, no React Native, no styling-library imports. Only TypeScript (+ `zod` in foundations). Platforms are adapters built _on top_, never baked in.
2. **Adapters are pluggable.** Web (Tailwind), React Native, and any future stack (StyleX, styled-components, …) are replaceable consumers. Requirements change; adapters get added/removed without touching foundations.
3. **Clear over clever.** Any developer, junior or senior, must understand the code at a glance. If code is complicated, the solution is not well thought: simplify the design instead of documenting the complexity.
4. **Reuse and organization.** Shared behavior lives in one place; platform packages only add what is genuinely platform-specific. Folder structure mirrors responsibility.
5. **Design foundation is mandatory.** The canonical visual language lives in `.github/reference/untitledUI/DESIGN.md` (palette, type, spacing, radii, shadows, states): load the **`ds-design` skill** for its condensed rules before any UI/visual/token work.

## Package map

| Package                                                 | Role                                                                                                                                                                                                                                                                                                                                                                                                           | Status |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `@repo/foundations`                                     | **Single source of truth.** Two folders under `src/`: `tokens/`: Zod schemas (`TokensSchema`), token types (`Tokens`, `SpacingToken`, `RadiiToken`, `ColorTokenName`, …), contract metadata (`CONTRACT_PREFIX`, …), helpers (`hexToRgba`, `deriveColorScale`, `SHAPE_PRESETS`); `theme/`: `defaultTheme`, `themeConfigSchema` + `resolveThemeConfig` (the white-label API), `mergeTheme`; plus codegen scripts | Active |
| `@repo/core`                                            | **Type & shared-props layer.** `src/globals.ts` re-exports every foundation _type_ (type-only, runtime stays in foundations) plus `BreakpointKey`/`TypographyColor`; `src/*Shared.ts` hold component prop shapes identical on web and RN (`ButtonSharedProps`, `AlertSharedProps`, `CardSharedProps`, `InputSharedProps`, `Checkbox/Radio/ToggleSharedProps`, `MarginProps`/`PaddingProps`)                    | Active |
| `@repo/ui-web-tailwind`                                 | **Primary web package.** 17 components, `ThemeProvider` (localStorage + FOUC prevention), `applyTheme` → CSS variables, generated `tailwind-theme.css`                                                                                                                                                                                                                                                         | Active |
| `@repo/ui-react-native`                                 | **Primary native package.** 10 components, `AppProvider` (props-driven `theme` + `isDark`), `applyTheme` → `ResolvedTheme` JS object                                                                                                                                                                                                                                                                           | Active |
| `apps/tailwind-sample`                                  | Primary web consumer (Vite + Tailwind 4); theme config tester (basic/medium/enterprise, mock API) in the profile menu                                                                                                                                                                                                                                                                                          | Active |
| `apps/native`                                           | Primary mobile consumer (Expo 57); theme config editor on the Settings screen (mock API + AsyncStorage)                                                                                                                                                                                                                                                                                                        | Active |
| `apps/storybook`                                        | **Design-system docs** (Storybook 10): intro/ways-of-working MDX, token stories, web + React Native component stories (via react-native-web), and the manager-side Theme panel that edits theme globals live                                                                                                                                                                                                   | Active |
| `eslint-config`, `typescript-config`, `prettier-config` | Shared tooling configs                                                                                                                                                                                                                                                                                                                                                                                         | Active |

**Dependency direction (never reverse it):**

```
@repo/core          (leaf: types + shared props; type-only dep on foundations)
@repo/foundations   (leaf: only zod; src/tokens + src/theme)
ui-web-tailwind   ───► @repo/foundations + @repo/core   (resolved theme injected by the app)
ui-react-native   ───► @repo/foundations + @repo/core   (resolved theme injected by the app)
apps/*            ───► @repo/foundations + @repo/core + the platform ui package
```

UI packages do **not** own theme config: the consuming app fetches the `ThemeConfig`, resolves it with `resolveThemeConfig`, and passes the `Tokens` in.

## Token & theme pipeline

**Build-time (codegen):**

```
packages/foundations/src/tokens/index.ts   ← EDIT THIS (schemas + key arrays)
        │  yarn workspace @repo/foundations generate:codegen   (TS AST extraction)
        ▼
packages/foundations/src/codegen.js      ← AUTO-GENERATED, never hand-edit
        │  (imported as @repo/foundations/codegen)
        ▼
ui-web-tailwind/scripts/generate-theme-css.mjs
        │  yarn workspace @repo/foundations generate:tokens
        ▼
ui-web-tailwind/src/adapters/tailwind/tailwind-theme.css   ← AUTO-GENERATED (@theme/@utility)
```

**Runtime:**

```
ThemeConfig (API) ──resolveThemeConfig──► Tokens ──TokensSchema.parse──► platform applyTheme()
    web:  applyTheme(theme)  → CSS custom properties on :root (+ .dark class selection rules)
    rn:   applyTheme(theme, isDark) → ResolvedTheme object
                                              │
                     ┌────────────────────────┴───────────────────────┐
     ThemeProvider (web, React Context)            AppProvider (RN, React Context)
     config/resolve, localStorage,                 props: theme + isDark,
     FOUC prevention, Zod safe-parse               memoized resolution
                     └────────────────────────┬───────────────────────┘
                                              ▼
                    components read contracts + shape/colorTokens
```

**Contracts** bundle related tokens into semantic units (`actions.primary`, `feedback.error`, `surfaces.base`): the cross-platform consistency layer. Everything else is owned by each platform's **component formula**: input/selection/toggle state colors come from semantic color tokens directly, chrome surfaces from `colorTokens.bg` (`bg-header`, `bg-footer`, …), border radius from the **shape preset** (`theme.style` → `SHAPE_PRESETS` → `theme.shape.{button,input,card}` / `--shape-*` CSS vars), and typography roles (`h1…overline` web / `display…caption` mobile) are mapped inside each platform's `Typography` component. Adding a contract property to the schema automatically flows to codegen, CSS utilities, and both adapters' generic resolution loops.

## Folder & code conventions

- **Component files:** `Component.tsx` + `Component.types.ts` (+ optional `Component.styles.ts` for long class/style maps). Props types live in `*.types.ts`, never inline in the `.tsx`.
- **Barrel exports:** each UI package exposes everything through `src/index.ts` only. Consumers never deep-import internals (except the documented `theme.css` / `vars.stylex` subpaths).
- **ColorToken name vs class:** token names keep underscores (`bg-footer_secondary`): use them raw for RN `colorTokens[...]` lookups and `colorTokenVar()` (CSS `--ct-*`). In web **class names**, replace `_` with `-` (`bg-footer-secondary`): utilities are generated hyphenated. A wrong-spelled class silently emits no CSS.
- **Where types live:**
  - Foundation types (`Tokens`, `SpacingToken`, `RadiiToken`, `ColorTokenName`, `StylePreset`, `ThemeConfig`, …) → `@repo/foundations` (canonical); `@repo/core` re-exports them **type-only** so app/component code can import everything from core.
  - Shared component props + cross-platform enums (`ButtonSharedProps`, `ButtonVariant`, `AlertIntent`, `TypographyColor`, `MarginProps`, …) → `@repo/core`, re-exported by each UI package. Web-only `TypographyRole` lives in `ui-web-tailwind`; mobile-only `TypographyVariant` lives in `ui-react-native`.
  - Platform component props (`ButtonProps`) → the platform package's `Button.types.ts`.
- **Shared props pattern:** platform-agnostic props are defined once in `@repo/core` (`SpacingShared.ts` for `MarginProps`/`PaddingProps`, `<Name>Shared.ts` per component) and intersected: `ButtonProps = MarginProps & ButtonSharedProps & { … }`. Plain TS only: handlers (`onClick`/`onPress`), `ReactNode`, and platform `style` types stay in the platform package. Enums are `import type { ButtonVariant } from '@repo/core'` + re-export: never re-declare a union.
- **Naming:** providers are `ThemeProvider` (web) / `AppProvider` (RN); both expose `useTheme()`. Keep platform names stable; do not invent parallel names.
- **Validation:** every theme passes `TokensSchema.parse()` (`.strict()`) at load: malformed or stale data fails fast.

## Workflows

**Add a token (new design variable):**

1. Add the property to the relevant schema in `packages/foundations/src/tokens/index.ts` (e.g. a `colorTokens` key array, `.strict()`).
2. Add its value to `packages/foundations/src/theme/defaultTheme.ts`.
3. Run `yarn workspace @repo/foundations generate:tokens` (regenerates `codegen.js` **and** `tailwind-theme.css`).
4. Use it: web `className="bg-myToken"` / RN `theme.colorTokens['myToken']`. No adapter code changes.
5. Run `yarn workspace @repo/foundations verify:codegen` + `yarn check-types`.

**Theme config (the white-label API):**

1. Brands are configured at runtime by `ThemeConfig` (`tier: basic | medium | enterprise`, optional `logo`, `colors.primary600/secondary600`, `style`, `fonts`): validated by `themeConfigSchema` and resolved by `resolveThemeConfig` in `@repo/foundations` (`src/theme/`).
2. `basic` → default theme as-is; `medium` → derived 50–950 ramps from the picked 600 hexes (`deriveColorScale`), shape preset, fonts, secondary accents; `enterprise` → default for now (TODO).
3. Apps fetch the config at startup (mock today: `apps/*/src/theme/themeConfig.ts`), persist it, and pass it to the provider in config mode (web `ThemeProvider config+resolve`) or resolve it in context (native `ThemeSettingsContext`).
4. Config editors live in the apps (web: profile-menu `ThemeConfigPanel`; native: Settings screen): tier, logo, colors (presets + hex), style, fonts.

**Add a component:** create `X.tsx` + `X.types.ts` in the platform package(s), take shared props from `@repo/core` (`*Shared.ts` + `SpacingShared.ts`), read contracts via `useTheme()`, export from `src/index.ts`. Mirror across platforms when the component is meant to exist everywhere: shared shape in `@repo/core`, platform-specific props in each package.

**Add a platform adapter (future styled-components / …):** new package depending only on `@repo/foundations` + `@repo/core`; implement `applyTheme(theme, …)` walking `CONTRACT_PREFIX` / `NESTED_CONTRACT_PROPERTIES` generically (copy the pattern from the existing adapters); add a provider that puts the resolved theme in context. Foundations must not change.

## Target architecture (roadmap)

End state: a small set of packages, any of which can be swapped as requirements change:

```
foundations       ← tokens + theme (schema, default values, white-label config)   (exists)
core              ← types + shared component props (type-only on foundations)     (exists)
webUiTailwind     ← web components + ThemeProvider + Tailwind adapter             (exists: ui-web-tailwind)
reactNative       ← RN components + AppProvider + RN adapter                      (exists: ui-react-native)
+ future adapters (styled-components, …) built on foundations + core only
```

Rule of thumb for every new prop/type: **if both web and RN need it, it belongs in `@repo/core`** (plain TS only: no React/RN types); **only platform mechanics** (`onClick` vs `onPress`, `className` vs `style`, `ReactNode` children) go in platform packages. Optional future: fold `foundations` into `core` if the package count ever needs to shrink.

## Dos

- Keep `foundations` and `core` platform-agnostic (plain TS; only `zod` in foundations).
- Single-source every enum/type: import and re-export, never copy-paste a union.
- Use contracts (`actions.*`, `feedback.*`, `surfaces.*`) in components; state colors from `colorTokens`, radius from `theme.shape`/`--shape-*`, roles inside the platform Typography: raw tokens only inside themes/schemas.
- Regenerate after schema/theme edits: `yarn workspace @repo/foundations generate:tokens`.
- Run `yarn check-types` and `yarn lint` before considering a change done.
- Write flat, obvious code with clear names; prefer deleting code over adding abstraction.
- Follow the `X.tsx` + `X.types.ts` + barrel structure when adding files.

## Don'ts

- **Never hand-edit** `packages/foundations/src/codegen.js` or `tailwind-theme.css`: regenerate.
- **Never invent token names** (e.g. `btnBg`): use the schema; Zod `.strict()` will reject drift.
- **Never put React/DOM/React-Native/style-library imports in `@repo/foundations` or `@repo/core`.**
- **Never grow `@repo/core` with platform-specific props**: React/RN types (`ReactNode`, `ViewStyle`, `CSSProperties`, handlers) stay in the platform packages; core is plain TS only.
- **Never bypass the provider** (no ad-hoc `applyTheme` calls inside components).
- **Never duplicate the token pipeline by hand** (manual CSS vars, manual RN style maps): the adapters' generic loops exist for this.

## Commands

| Command                                            | Purpose                                                                       |
| -------------------------------------------------- | ----------------------------------------------------------------------------- |
| `yarn install`                                     | Install workspace deps                                                        |
| `yarn storybook`                                   | Start the design-system Storybook (port 6006)                                 |
| `yarn tailwind-sample`                             | Start the web sample app                                                      |
| `yarn native-sample`                               | Start the native sample app (Expo)                                            |
| `yarn workspace @repo/foundations generate:tokens` | Regenerate `codegen.js` + `tailwind-theme.css` (run after schema/theme edits) |
| `yarn workspace @repo/foundations verify:codegen`  | Fail if codegen is out of sync (CI guard)                                     |
| `yarn check-types`                                 | Type-check all packages (turbo)                                               |
| `yarn lint`                                        | Lint all packages (turbo)                                                     |
| `yarn dev`                                         | Start all apps                                                                |
| `yarn format`                                      | Prettier write                                                                |

## Gotchas

- `codegen.js` drifts from `src/tokens/index.ts` until `generate:tokens` runs: `verify:codegen` catches it.
- Theme config changes touch three places: the schema/resolver (`foundations/src/theme/`) **and both config editors** (web `ThemeConfigPanel`, native Settings screen): update all three.
- `apps/native` still contains Expo-template theming leftovers (`hooks/use-theme.ts`, `constants/theme.ts`, `themed-*`) that run in parallel with the DS path but are not used by it; don't build on them.
