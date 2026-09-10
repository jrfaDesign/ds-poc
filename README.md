# Design System POC

A monorepo proof of concept for a unified design system that serves a single source of truth across **web** (Tailwind CSS, StyleX) and **React Native** platforms. Tokens, themes, and contracts are defined once and consumed by platform-specific adapters.

---

## Architecture

```
packages/foundations       Design tokens (typography, spacing, radii, colors, contracts)
packages/themes            Theme definitions built on top of foundations
packages/globals           Shared types and constants
packages/ui-web-tailwind   Web adapter — Tailwind CSS components
packages/ui-web-stylex     Web adapter — StyleX components
packages/ui-react-native   Native adapter — React Native components
packages/ui-mobile         Legacy mobile components (deprecated, use ui-react-native)
apps/tailwind-sample       Web app — full MVP with dark/light + multi-theme support
apps/native                React Native app — Expo SDK 57 with same multi-theme support
apps/web-vite              Vite-based web app
apps/docs                  Documentation app
```

### Single Source of Truth

The token system flows like this:

```
packages/foundations/src/tokens/    Primitive tokens (raw palette, scale values)
        |
packages/themes/src/                Theme contracts (semantic mappings per brand)
        |
packages/ui-*/src/adapters/         Platform adapters (resolve tokens to CSS vars, RN styles, etc.)
        |
apps/*/src/                         Consumer apps (use components, never raw tokens)
```

A brand change (e.g. switching from "Default" to "BYD") updates the **theme contract** — no component code changes needed.

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **Yarn** 4 (managed via `corepack`)
- **Android Studio** + JDK 17 (for React Native dev build)

### Install

```bash
yarn install
```

### Run Web (Tailwind)

```bash
cd apps/tailwind-sample
yarn dev
```

### Run React Native

The native app requires a **development build** (Expo Go does not support all native modules used here).

```bash
cd apps/native

# Build and install on Android emulator
npx expo run:android

# Or for iOS
npx expo run:ios
```

First build takes 5-10 minutes. Subsequent builds are fast (incremental).

---

## Scripts

| Command | Description |
|---------|-------------|
| `yarn install` | Install all dependencies (run from root) |
| `yarn fresh` | Re-run install — use when you need a clean state |
| `yarn clean` | Remove all `node_modules` across the monorepo |
| `yarn dev` | Start all apps in dev mode via Turborepo |
| `yarn build` | Build all packages and apps |
| `yarn lint` | Lint all packages |
| `yarn check-types` | Type-check all packages |

---

## Troubleshooting

### EPERM / file lock errors during `yarn install`

On Windows, Metro bundler or Gradle may hold file locks on `node_modules`. If `yarn install` fails with `EPERM: operation not permitted`:

1. Close any running Metro bundler terminals (Ctrl+C)
2. Close any running Gradle build terminals (Ctrl+C)
3. Close any running `expo start` terminals
4. Wait 5 seconds for processes to fully terminate
5. Run `yarn install`

> **Never** run `taskkill /F /IM node.exe` to kill stale processes — it will also kill your editor, terminal sessions, and any tools running on Node.js.

### Expo Go cannot load the native app

The native app uses modules that require a custom dev client. Either update Expo Go from the Play Store, or use a development build:

```bash
cd apps/native
npx expo run:android
```

### Duplicate route errors (Expo Router v57)

Expo Router v57 auto-registers routes from the filesystem. Do not explicitly register screens that have corresponding `.tsx` files in your route directory — Expo Router handles them automatically.

---

## Theme System

Six themes are available, each defining a complete set of color tokens, contracts, and overrides:

| Key | Name | Description |
|-----|------|-------------|
| `default` | Default | Neutral palette with blue primary accent |
| `cag` | CAG | Gold/amber primary accent |
| `caos` | CAOS | Warm terracotta accent |
| `bca` | BCA | Corporate blue-grey |
| `byd` | BYD | Electric green primary accent |
| `byd_premium` | BYD Premium | Dark teal primary accent |

Switch themes in the app Settings tab. Changes apply instantly — all color tokens, borders, backgrounds, and text colors update via the design system contracts.

---

## Packages

### `@repo/foundations`

Design token definitions: typography scale, font weights, line heights, letter spacing, spacing scale, radii, color palette, and semantic contracts (surfaces, actions, feedback, selection controls, etc.).

### `@repo/themes`

Six theme definitions built on foundations. Each theme extends a base and overrides specific tokens. Uses `mergeTheme` for deep composition.

### `@repo/globals`

Shared TypeScript types (`ColorToken`, `ColorTokenName`, `SpacingToken`, etc.) used across all adapters.

### `@repo/ui-web-tailwind`

Web component library using Tailwind CSS. Exports: `Box`, `Button`, `Card`, `Typography`, `Container`, `Grid`, `PageSection`, `Alert`, `Checkbox`, `Radio`, `Toggle`, `Input`.

### `@repo/ui-react-native`

React Native component library. Same component API as the web adapter but renders native views with `StyleSheet`. Includes a theme adapter (`AppProvider` + `useTheme`) that resolves tokens at runtime.

---

## Tech Stack

- **Build**: Turborepo
- **Package Manager**: Yarn 4 (Berry)
- **Web**: React, Vite, Tailwind CSS
- **Native**: React Native 0.86, Expo SDK 57
- **Type Safety**: TypeScript 5.9+
