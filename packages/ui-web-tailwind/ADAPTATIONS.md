# UntitledUI → Super Charge DS adaptations

This file records every change made to the UntitledUI source installed into
`packages/ui-web-tailwind`, so the delta between upstream and this repo is
auditable.

- **Source:** `npx untitledui@latest add <component>` (CLI `untitledui@0.1.69`,
  component library v8), installed 2026-11-09.
- **Target:** `packages/ui-web-tailwind/src/components/<Name>/`
- **Canonical design language:** the Super Charge DS Figma system (the source this package adapts; the full extraction lives in the local design reference)
  ("Super Charge DS"). UntitledUI structure and behaviour are kept; only values
  (color, type, spacing, radii, shadows, focus) are rewritten to DS tokens.

---

## 1. What was installed

| Requested                                                                                                                                                                                                                                                                                                           | Status           | Notes                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------- |
| avatar, badge-groups, badges, button-group, button, checkbox, credit-card, dropdown, featured-icon, input, app-store-buttons, progress-indicators, progress-circles, qr-code, radio-buttons, select, slider, social-button, tags, text-editor*, textarea, toggle, tooltip, button-utility, pin-input, video-player* | ✅ installed     | file layout in §2                                                                                        |
| radio-groups*                                                                                                                                                                                                                                                                                                       | ⛔ skipped       | PRO license required (per decision: skip licensed components)                                            |
| text-editor*                                                                                                                                                                                                                                                                                                        | ⛔ skipped       | PRO license required                                                                                     |
| video-player*                                                                                                                                                                                                                                                                                                       | ⛔ skipped       | PRO license required                                                                                     |
| alert                                                                                                                                                                                                                                                                                                               | ➖ not available | no `alert` component exists in the UUI catalog (free or PRO); the existing hand-written `Alert` was kept |

\* PRO-gated by the CLI.

**Runtime dependencies added** to `packages/ui-web-tailwind/package.json`
(the CLI's own `npm install` step fails in this Yarn workspace, so they were
added manually): `tailwind-merge`, `@untitledui/icons`, `react-aria-components`,
`react-aria`, `react-stately`, `@react-stately/utils`, `input-otp`,
`qr-code-styling`. A root `resolutions` entry pins `@types/react` to a single
version, and `@storybook/react` + `@storybook/react-vite` were added to root
devDependencies so Storybook resolves them from the hoisted root.

## 2. Folder structure

Installed files were re-homed from the CLI's `base/ … shared-assets/` tree into
one folder per component, matching the package's neighbours:

```
src/components/<Name>/
├── <Name>.tsx            # the component (primary export)
├── <Name>.types.ts       # props types (moved out of the .tsx, see §6)
└── supporting files       # UUI internals keep their original file names
```

Examples: `Select/` holds `Select.tsx`, `combobox.tsx`, `popover.tsx`,
`select-item.tsx`, `select-shared.tsx`, `tag-select.tsx`; `Avatar/` holds
`Avatar.tsx`, `avatar-label-group.tsx`, `base-components/`. Shared helpers from
the CLI (`utils/cx.ts`, `utils/is-react-component.ts`,
`hooks/use-resize-observer.ts`, `foundations/dot-icon.tsx`,
`foundations/payment-icons/`) landed in `src/components/shared/`.

Dependency files that duplicated an existing DS component were **deleted**
(only one copy of avatar/tooltip survived the staged installs); no second
export was added to the barrel for anything pre-existing.

## 3. Import rewrites

- `@/utils/cx`, `@/utils/is-react-component`, `@/hooks/use-resize-observer` →
  relative `../shared/…`
- `@/packages/ui-web-tailwind/.uui-install/…` and `@/.uui-staging/…` (CLI
  artifacts) → relative paths inside `src/components/`
- Everything is imported relatively inside the package; consumers only see
  `src/index.ts` (barrel).

## 4. Class/token adaptations (source → DS)

All UUI class strings were rewritten by scripted passes + a per-component
review. The systematic rules:

### 4.1 Typography: UUI's scale is shifted one step vs ours

UUI defines `text-sm = 14px` etc. (verified from the CLI's bundled
`config/styles/typography.css`); our scale stores 14px as `text-xs`. Every
font-size class was shifted one step:

| UUI class                         | px    | DS class               |
| --------------------------------- | ----- | ---------------------- |
| `text-xs`                         | 12    | `text-xxs`             |
| `text-sm`                         | 14    | `text-xs`              |
| `text-md`                         | 16    | `text-sm`              |
| `text-lg`                         | 18    | `text-md`              |
| `text-xl`                         | 20    | `text-lg`              |
| `text-2xl` … `text-6xl`           | 24…60 | `text-xl` … `text-5xl` |
| `text-display-xs` … `display-2xl` | 24…72 | `text-xl` … `text-6xl` |

### 4.2 Spacing: Tailwind numeric scale → DS spacing tokens

UUI uses Tailwind's default numeric scale on a 4px base; DS spacing tokens are
named (`xxs=2, xs=4, sm=6, md=8, lg=12, xl=16, 2xl=20, 3xl=24, 4xl=32 …`).
Padding/margin/gap classes were mapped to the nearest token (ties round **up**):
`p-1→p-xs`, `p-1.5→p-sm`, `p-2→p-md`, `p-2.5→p-lg`, `p-3→p-lg`, `p-3.5→p-xl`,
`p-4→p-xl`, `p-4.5→p-2xl`, `p-6→p-3xl`, `p-8→p-4xl`, `p-10→p-5xl`,
`p-12→p-6xl`, `p-16→p-7xl` … (575 replacements). Component geometry
(`w-62`, `max-h-68`, icon `size-*`, `inset-*`) intentionally keeps Tailwind's
numeric values: it is layout, not spacing rhythm.

### 4.3 Radii: value-mapped to the DS radii scale, then shape presets

UUI radii (`sm=4, md=6, lg=8, xl=12, 2xl=16, 3xl=24`) were re-mapped **by
value** onto DS radii (`xs=4, sm=6, md=8, lg=12, 3xl=20`), e.g.
`rounded-lg`(8px) → `rounded-md`, `rounded-xl`(12px) → `rounded-lg`,
`rounded-[7px]` → `rounded-md`. Bucket roles then moved to the white-label
shape preset:

- buttons → `rounded-button` (Button, ButtonUtility, SocialButton,
  AppStoreButtons, ButtonGroup items)
- inputs → `rounded-input` (Input, Textarea, Select trigger, combobox,
  PinInput slots, native select)
- floating surfaces/cards → `rounded-card` (Dropdown panel, Select popover,
  Tooltip, Slider tooltip, BadgeGroups container)

### 4.4 Focus: two treatments (matching UntitledUI exactly)

Verified against the original sources fetched from UntitledUI's component API:

- **Text fields** (Input, Textarea, Select, combobox/multi-select/tag-select
  triggers, PinInput slots, Select list items) focus by **thickening the inset
  ring to 2px in the brand color** (`ring-2 ring-border-brand`; invalid:
  `ring-2 ring-border-error`): there is no outline on these. The wrappers use
  exclusive state branches so the ring width/color never depends on CSS rule
  order. There is **no hover border change** in any UUI original (only icon
  hovers).
- **Buttons, links, the Toggle track, input-number** focus with the outline:
  `ring-focus` / `focus-visible:ring-focus` (2px outline + 2px offset from the
  focus-ring tokens). The Toggle's outline is drawn **state-driven**
  (`isFocusVisible && "outline-2 outline-offset-2"` + `outline-border-brand`)
  because react-aria's Switch focuses a hidden input, not the track. The
  pre-fix code put `focus-visible:` CSS on the track div, so the focus ring
  never rendered.

Decorative `outline-utility-*` (badge dots) were kept.

### 4.5 Shadows

`shadow-xs-skeuomorphic` → `shadow-xs`; standalone `shadow-skeuomorphic`
dropped (its inset effect is already covered by `ring-1 ring-inset`). Our
shadow tokens have no skeuomorphic variants.

### 4.6 Colors

- **Underscore tokens → hyphenated DS spelling** (the class-name gotcha):
  `bg-primary_hover` → `bg-primary-hover`, `ring-secondary_alt` → …,
  `text-fg-quaternary_hover` → … (88 replacements).
- **UUI ring colors don't resolve here** (no plain `--color-primary/brand/
error`): `ring-primary` → `ring-border-primary`, `ring-secondary` →
  `ring-border-secondary`, `ring-error_subtle` → `ring-border-error-subtle`,
  `ring-brand`/`ring-focus-ring` (focus) → `ring-border-brand`, `ring-2 ring-error` → `ring-2 ring-border-error`,
  `ring-app-store-badge-border` → `ring-white/12`,
  `ring-slider-handle-border` → `ring-border-secondary`.
- **UUI utility ramps collapsed onto the six DS semantic ramps** (122 class
  replacements): `utility-yellow→warning`, `utility-orange→warning`,
  `utility-red→error`, `utility-pink→error`, `utility-green→success`,
  `utility-blue→info`, `utility-sky→info`, `utility-indigo→info`,
  `utility-purple→info`, `utility-slate→neutral`, `utility-brand→primary`.
  Consequence: the `Badge`/`BadgeGroups`/`FeaturedIcon` `color` prop still
  accepts all UUI colour names, but they render from the DS palette.
- **Default-TW palette in artwork** (CreditCard gradients, Avatar company
  badge) re-pointed at `utility-*` tokens; `bg-blue-500` → `bg-utility-info-500`
  etc.
- **Missing hover token:** `text-error-primary-hover` →
  `text-utility-error-600` (DS has no error-hover text token).

### 4.7 Component-specific tokens

| UUI class                       | DS                                                 |
| ------------------------------- | -------------------------------------------------- |
| `transition-inherit-all`        | `transition`                                       |
| `text-tooltip-supporting-text`  | `text-tertiary`                                    |
| `text-featured-icon-light-fg-*` | `text-fg-*-primary` / `text-fg-quaternary`         |
| `bg-slider-handle-bg`           | `bg-surface-base-bg`                               |
| `caret-alpha-black`             | `caret-black`                                      |
| `text/stroke-fg-disabled`       | `text/stroke-fg-tertiary`                          |
| `text-fg-brand-secondary-hover` | `text-fg-brand-secondary` (no hover variant token) |

Tailwind built-ins that UUI relies on are kept as-is: `bg-linear-to-*`,
`outline-hidden`, `mask-b-from-0%`, `border-l/t`, data-attribute variants.

### 4.8 Intentional non-token colors

Illustrative artwork keeps its source colors because they are brand/logo assets,
not UI chrome: App Store / Google Play logo SVG gradients, CreditCard
decorative card-art gradients, QR-code mask gradients, the avatar online
indicator's glass highlights, and the flag images loaded from UUI's CDN
(`BadgeWithFlag`).

### 4.9 Removed hard-coded hex

The source `TextArea` painted its resize handle from a data-URL SVG with
hard-coded hexes (`#D5D7DA`/`#373A41`). CSS variables cannot resolve inside a
data URL, so the custom handle was dropped and the native resize affordance is
used instead.

## 5. Replaced components & consumer updates

Existing components were **verified as hand-written (no prior UUI origin)**. Fingerprint scan found no `react-aria`/`sortCx`/`@untitledui` usage anywhere in
the repo, so per direction they were replaced (except **Card** and **Box**,
which remain ours):

`Badge`, `Button`, `Checkbox`, `Radio`→`RadioButton`, `Select`, `Tag`,
`Textarea`→`TextArea`, `Input`, `Toggle`.

API ripples updated in consumers:

- **`TopNavBar`** (internal): `<Badge variant="success" label size>` →
  `<Badge color="success" size>…</Badge>`; search `Input` now uses react-aria's
  `onChange(value)` instead of a DOM event.
- **`apps/tailwind-sample`**: `Button variant→color` (ghost→tertiary,
  link→link-gray), `disabled→isDisabled`; `Input status/surface` →
  `isInvalid` (surface prop dropped); `Select value/onChange(e)/Select.Item
value+children` → `selectedKey/onChange(key)/Select.Item id+label`
  (AlphaDemo's `<optgroup>` flattened: UUI Select has no sections);
  `Toggle checked/onChange` → `isSelected/onChange`;
  `Checkbox defaultChecked/disabled` → `defaultSelected/isDisabled`;
  `Radio` → `RadioGroup` + `RadioButton` (`defaultSelected`); filter chips
  `Badge variant/icon/onClick` → `Badge` / `BadgeWithButton`
  (`color`/`icon` component/`onButtonClick`).
- **`apps/storybook`**: Button/Input/Toggle stories rewritten for the new
  APIs; Alert/Card retagged.

## 6. Types & barrel

- Props interfaces were moved out of each `.tsx` into `<Name>.types.ts`
  (component files re-export them so intra-package imports stay stable). Badge's
  runtime colour maps (`filledColors`, `withPillTypes`, …) moved into
  `badge-types.ts` so the types file stays import-safe.
- `src/index.ts` now exports the UUI family (Badge + BadgeWith* + BadgeGroup,
  Tag/TagGroup/TagList, Button/ButtonUtility/ButtonGroup, SocialButton,
  CloseButton, AppStore buttons, Checkbox/RadioButton/Toggle + bases,
  Input family, TextArea, PinInput, Select (+ `SelectItemType`), Progress
  bars, Dropdown, Tooltip, Avatar, FeaturedIcon, Slider, CreditCard, QRCode)
  alongside the untouched DS exports. Old-only types (`InputStatus`,
  `BadgeVariant`, `TagVariant`, `TextareaProps`, …) are gone; `ButtonVariant`
  etc. still come from `@repo/core`.

## 7. Stories

One control-driven story per component under **`Web/Base/<Component>`** in
`apps/storybook/src/web/` (27 entries: the 23 requested components +
Alert, Card, CloseButton; single `Default` export, `argTypes` with
descriptions for every control). PRO-gated components have no story.

## 8. Verification

- `yarn check-types` → 5/5 tasks pass (core, foundations, ui-web-tailwind,
  ui-react-native, storybook); `tsc -b` in tailwind-sample also passes.
- `yarn lint` → 7/7 tasks pass. (Pre-existing gaps fixed along the way:
  `core`/`foundations`/`ui-react-native` had lint scripts but no eslint
  dependency/config: added `eslint.config.mjs` + `eslint`; `eslint-plugin-react`
  crashes under ESLint 10, so RN lints with the shared base config like the web
  package; native app's pre-existing warnings cleaned up.)
- `yarn workspace storybook build` → succeeds; `storybook-static/index.json`
  shows exactly one story per `Web/Base/*` entry.

## 9. Known deviations from upstream

1. `AppStoreButtons` keeps its inline (anonymous) prop types from the source:
   no `<Name>.types.ts` was created for it.
2. Badge/FeaturedIcon colour options are API-compatible with UUI but render
   from the six DS ramps (§4.6).
3. The custom TextArea resize handle was removed (§4.9).
4. `Alert` is still the hand-written DS component (no UUI counterpart).
5. Supporting exports such as `InputDate`, `InputNumber`, `PaymentInput`,
   `Label`, `HintText`, `ComboBox`, `MultiSelect`, `TagSelect`, `NativeSelect`
   are available from the barrel but do not have their own stories; stories
   cover the requested component list only.
6. Spacing ties (10/14/18/28/36 px…) round up to the larger DS token (§4.2);
   this shifts some paddings by 1–2 px versus the UUI original.

---

## 10. Foundation aligned to UntitledUI defaults (v2.0)

UntitledUI is the source of truth for the foundation. Three deltas were
re-based on UUI's shipped config (`untitledui` CLI `config/styles/theme.css`):

### 10.1 Focus ring → UUI outline spec (outline for buttons; brand ring for text fields)

| | before (Super Charge DS v1.1) | now (UUI spec) |
| --- | --- | --- |
| shape | `box-shadow: 0 0 0 4px <color>, 0 0 0 2px #fff` | `outline: 2px solid <color>; outline-offset: 2px` |
| color | slate `primary_900` light / `primary_400` dark (flips) | `primary_500` (**#9E77ED**) **identical in light and dark** |
| error | `error_500` / `error_400` (flips) | `error_500` (**#EF4444**) identical in both modes |

- `focusRing` tokens: the three unused `*-shadow-*` variants were **removed**
  (schema + defaults); `applyTheme` now emits a color only.
- `ring-focus` / `ring-focus-error` utilities (emitted by
  `generate-theme-css.mjs`) render the outline; **the utility names are
  unchanged**, so all component call sites kept working.
- **Text fields keep UUI's ring focus, not the outline** (corrected after
  fetching the original sources from UUI's component API): Input, Textarea,
  Select/combobox/multi-select/tag-select, PinInput and Select items render a
  2px `ring-border-brand` inset ring on focus (invalid: `ring-border-error` /
  `ring-border-error-subtle`). The `ring-focus` outline remains for buttons,
  links, the Toggle track and input-number: exactly UUI's split.
- **Toggle focus restored:** the track now draws `outline-2 outline-offset-2`
  with `outline-border-brand` from the `isFocusVisible` render state (the
  original used a state-driven outline; an earlier pass had left dead
  `focus-visible:` CSS on a div that never receives focus, so the Toggle showed
  no focus ring and looked unfocusable).
- **`tailwindcss-react-aria-components` plugin added** (the same `@plugin`
  UntitledUI ships): react-aria's `group-invalid:`/`group-disabled:` variants
  target `[data-invalid]`/`[data-disabled]`: without it they compiled to
  `:invalid`/`:disabled` on the wrapper div and never matched.
- Component sweep: every `outline-hidden` co-located with `ring-focus` was
  removed (it would suppress the outline), duplicate `ring-focus` tokens were
  deduped, `PinInput`'s filled slots no longer draw an unconditional ring,
  `Select` items use the outline ring instead of `ring-2 … ring-inset`, and
  `TopNavBar`'s legacy `ring-2 ring-text-brand-tertiary-alt` now uses
  `ring-focus`.

### 10.2 Brand ramp + primary button resolution

- `defaultTheme.colors.primary_*` (the brand family) replaced slate with
  UUI's exact brand ramp: **600 = `#7F56D9`** (50 `#F9F5FF` … 950 `#2C1C5F`).
  `neutral_*` keeps the slate values, so surfaces/text are unchanged.
- `bg-brand-solid` is now **mode-invariant** (`primary_600` light = dark):
  the primary button is `#7F56D9` in both modes, like UUI; hover is
  `primary_700` light / `primary_500` dark (lighter in dark, like UUI).
- `border-brand` steps follow UUI (brand-500 light / brand-400 dark).
- Collateral pairs re-pointed so the hue swap doesn't leak into non-brand
  chrome: `bg-header`/`bg-footer`/`bg-footer_secondary`/
  `bg-footer-button_hover` → `neutral_*` (value-identical: no visual change),
  `bg-overlay` dark → `neutral_800` (UUI's dark overlay).
- White-label flow is untouched: `resolveThemeConfig` still derives the whole
  ramp from a brand's `colors.primary600` override.

### 10.3 Dark-mode variant

- The generated CSS now declares
  `@custom-variant dark (&:where(.dark, .dark *))` so `dark:` utilities follow
  the `dark` class that `ThemeProvider` toggles on `<html>` (Tailwind v4's
  default follows `prefers-color-scheme`, which would ignore the toggle).
  UUI ships the same construct for its `.dark-mode` class.

### 10.4 Docs

- The design language reference bumped to **v2.0**: §3 records the brand re-base (accent =
  `#7F56D9`), §6 documents the outline focus spec (old 4px ring rows and
  `*-shadow-*` focus variants removed), §9 rule updated.
- Mock theme configs (sample + native) now default to `primary600: '#7F56D9'`.
