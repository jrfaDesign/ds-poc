# Design System Contracts - Implementation Plan

## Overview

Add structured "contracts" (presets) that group related roles into cohesive semantic units. Four contract types: actions, feedback, surfaces, and typography (renamed from typography.roles).

## Files to Modify

| File                                          | Changes                                           |
| --------------------------------------------- | ------------------------------------------------- |
| `foundations/index.ts`                        | Add new roles + 4 contract schemas + TokenNames   |
| `themes/default.ts`                           | Add new role values + contract mappings           |
| `adapters/stylex/createStylexTheme.stylex.ts` | Resolve contracts to CSS vars                     |
| `adapters/stylex/createStylexVars.stylex.ts`  | Export contract StyleX vars                       |
| `themes/caos.ts`                              | Override action/feedback contracts for CAOS brand |
| `themes/cag.ts`                               | Override action contracts for CAG brand           |
| `Button.styles.ts`                            | Migrate to `actions.*`                            |
| `Alert.styles.ts`                             | Migrate to `feedback.*`                           |
| `Badge.styles.ts`                             | Migrate to `feedback.*` + `surfaces.*`            |
| `Card.styles.ts`                              | Migrate to `surfaces.*`                           |

---

## Step 1: `foundations/index.ts` - Add New Roles

Add to `roleKeys` array (after existing action roles):

```typescript
// ACTION - PRIMARY (add focus states)
'actionPrimaryBgFocus',
'actionPrimaryOnFocus',
'actionPrimaryBorderFocus',

// ACTION - SECONDARY (add focus states)
'actionSecondaryBgFocus',
'actionSecondaryOnFocus',
'actionSecondaryBorderFocus',

// ACTION - GHOST (add focus + disabled)
'actionGhostBgFocus',
'actionGhostOnFocus',
'actionGhostBorderFocus',
'actionGhostDisabledBg',
'actionGhostDisabledOn',
'actionGhostDisabledBorder',

// ACTION - LINK (add focus + disabled)
'actionLinkOnFocus',
'actionLinkOnDisabled',
```

## Step 2: `foundations/index.ts` - Add Action Preset Schema

```typescript
const FullActionPresetSchema = z.object({
	bg: z.enum(roleKeys),
	on: z.enum(roleKeys),
	border: z.enum(roleKeys),
	bgHover: z.enum(roleKeys),
	onHover: z.enum(roleKeys),
	bgActive: z.enum(roleKeys),
	onActive: z.enum(roleKeys),
	bgFocus: z.enum(roleKeys),
	onFocus: z.enum(roleKeys),
	borderFocus: z.enum(roleKeys),
	bgDisabled: z.enum(roleKeys),
	onDisabled: z.enum(roleKeys),
	borderDisabled: z.enum(roleKeys),
});

const LinkActionPresetSchema = z.object({
	on: z.enum(roleKeys),
	onHover: z.enum(roleKeys),
	onActive: z.enum(roleKeys),
	onFocus: z.enum(roleKeys),
	onDisabled: z.enum(roleKeys),
});

const ActionsSchema = z
	.object({
		primary: FullActionPresetSchema,
		secondary: FullActionPresetSchema,
		ghost: FullActionPresetSchema,
		link: LinkActionPresetSchema,
	})
	.strict();
```

## Step 3: `foundations/index.ts` - Add Feedback Preset Schema

```typescript
const FeedbackPresetSchema = z.object({
	bg: z.enum(roleKeys),
	on: z.enum(roleKeys),
	border: z.enum(roleKeys),
	bgInverse: z.enum(roleKeys),
	onInverse: z.enum(roleKeys),
});

const FeedbackSchema = z
	.object({
		error: FeedbackPresetSchema,
		success: FeedbackPresetSchema,
		warning: FeedbackPresetSchema,
		info: FeedbackPresetSchema,
	})
	.strict();
```

## Step 4: `foundations/index.ts` - Add Surfaces Preset Schema

```typescript
const SurfacePresetSchema = z.object({
	bg: z.enum(roleKeys),
	on: z.enum(roleKeys),
	border: z.enum(roleKeys),
});

const SurfacesSchema = z
	.object({
		base: SurfacePresetSchema,
		alt: SurfacePresetSchema,
		raised: SurfacePresetSchema,
		sunken: SurfacePresetSchema,
		inverse: SurfacePresetSchema,
		brand: SurfacePresetSchema,
	})
	.strict();
```

## Step 5: `foundations/index.ts` - Rename typography.roles → typography.contracts

Change `TypographyRolesSchema` to `TypographyContractsSchema`:

- Rename variable: `typographyRoleKeys` → `typographyContractKeys`
- Rename type: `TypographyRoleToken` → `TypographyContractToken`
- Rename schema property: `roles` → `contracts`
- Update `TypographySchema` to use `contracts` instead of `roles`

## Step 6: `foundations/index.ts` - Add Contracts to TokensSchema

```typescript
export const TokensSchema = z
	.object({
		spacing: SpacingSchema,
		radii: RadiiSchema,
		colors: ColorsSchema,
		typography: TypographySchema,
		roles: RolesSchema,
		actions: ActionsSchema, // NEW
		feedback: FeedbackSchema, // NEW
		surfaces: SurfacesSchema, // NEW
		shadows: ShadowsSchema,
		gradients: GradientsSchema,
		breakpoints: BreakpointsSchema,
		grid: GridSchema,
		components: ComponentsSchema,
	})
	.strict();
```

## Step 7: `foundations/index.ts` - Update TokenNames

```typescript
export type TokenNames = {
	spacing: keyof Tokens['spacing'];
	radii: keyof Tokens['radii'];
	colors: keyof Tokens['colors'];
	roles: keyof Tokens['roles'];
	actions: keyof Tokens['actions'];
	actionPreset: keyof Tokens['actions']['primary'];
	feedback: keyof Tokens['feedback'];
	feedbackPreset: keyof Tokens['feedback']['error'];
	surfaces: keyof Tokens['surfaces'];
	surfacePreset: keyof Tokens['surfaces']['base'];
	shadows: keyof Tokens['shadows'];
	gradients: keyof Tokens['gradients'];
	breakpoints: keyof Tokens['breakpoints'];
	grid: keyof Tokens['grid'];
	gridBreakpoint: keyof Tokens['grid']['mobile'];
	components: keyof Tokens['components'];
	typography: keyof Tokens['typography'];
	typographyContract: keyof Tokens['typography']['contracts'];
	fontSize: keyof Tokens['typography']['fontSize'];
	fontWeight: keyof Tokens['typography']['fontWeight'];
	lineHeight: keyof Tokens['typography']['lineHeight'];
	letterSpacing: keyof Tokens['typography']['letterSpacing'];
};
```

---

## Step 8: `themes/default.ts` - Add New Focus/Disabled Role Values

Add to `roles`:

```typescript
// ACTION - PRIMARY (focus)
actionPrimaryBgFocus: { light: 'primary_500', dark: 'primary_400' },
actionPrimaryOnFocus: { light: 'white', dark: 'white' },
actionPrimaryBorderFocus: { light: 'primary_500', dark: 'primary_400' },

// ACTION - SECONDARY (focus)
actionSecondaryBgFocus: { light: 'neutral_100', dark: 'neutral_800' },
actionSecondaryOnFocus: { light: 'neutral_900', dark: 'neutral_100' },
actionSecondaryBorderFocus: { light: 'neutral_400', dark: 'neutral_600' },

// ACTION - GHOST (focus + disabled)
actionGhostBgFocus: { light: 'neutral_100', dark: 'neutral_800' },
actionGhostOnFocus: { light: 'neutral_900', dark: 'neutral_100' },
actionGhostBorderFocus: { light: 'neutral_300', dark: 'neutral_700' },
actionGhostDisabledBg: { light: 'transparent', dark: 'transparent' },
actionGhostDisabledOn: { light: 'neutral_400', dark: 'neutral_600' },
actionGhostDisabledBorder: { light: 'transparent', dark: 'transparent' },

// ACTION - LINK (focus + disabled)
actionLinkOnFocus: { light: 'primary_700', dark: 'primary_200' },
actionLinkOnDisabled: { light: 'neutral_400', dark: 'neutral_600' },
```

## Step 9: `themes/default.ts` - Add Action Contract Mappings

```typescript
actions: {
  primary: {
    bg: 'actionPrimaryBg',
    on: 'actionPrimaryFg',
    border: 'actionPrimaryBorder',
    bgHover: 'actionPrimaryBgHover',
    onHover: 'actionPrimaryFg',
    bgActive: 'actionPrimaryBgActive',
    onActive: 'actionPrimaryFg',
    bgFocus: 'actionPrimaryBgFocus',
    onFocus: 'actionPrimaryOnFocus',
    borderFocus: 'actionPrimaryBorderFocus',
    bgDisabled: 'actionPrimaryDisabledBg',
    onDisabled: 'actionPrimaryDisabledFg',
    borderDisabled: 'actionPrimaryDisabledBorder',
  },
  secondary: {
    bg: 'actionSecondaryBg',
    on: 'actionSecondaryFg',
    border: 'actionSecondaryBorder',
    bgHover: 'actionSecondaryBgHover',
    onHover: 'actionSecondaryFg',
    bgActive: 'actionSecondaryBgActive',
    onActive: 'actionSecondaryFg',
    bgFocus: 'actionSecondaryBgFocus',
    onFocus: 'actionSecondaryOnFocus',
    borderFocus: 'actionSecondaryBorderFocus',
    bgDisabled: 'actionSecondaryDisabledBg',
    onDisabled: 'actionSecondaryDisabledFg',
    borderDisabled: 'actionSecondaryDisabledBorder',
  },
  ghost: {
    bg: 'actionGhostBg',
    on: 'actionGhostFg',
    border: 'actionGhostBorder',
    bgHover: 'actionGhostBgHover',
    onHover: 'actionGhostFg',
    bgActive: 'actionGhostBgActive',
    onActive: 'actionGhostFg',
    bgFocus: 'actionGhostBgFocus',
    onFocus: 'actionGhostOnFocus',
    borderFocus: 'actionGhostBorderFocus',
    bgDisabled: 'actionGhostDisabledBg',
    onDisabled: 'actionGhostDisabledOn',
    borderDisabled: 'actionGhostDisabledBorder',
  },
  link: {
    on: 'actionLinkFg',
    onHover: 'actionLinkFgHover',
    onActive: 'actionLinkFgActive',
    onFocus: 'actionLinkOnFocus',
    onDisabled: 'actionLinkOnDisabled',
  },
},
```

## Step 10: `themes/default.ts` - Add Feedback Contract Mappings

```typescript
feedback: {
  error: {
    bg: 'errorBg',
    on: 'errorFg',
    border: 'errorBorder',
    bgInverse: 'errorBgInverse',
    onInverse: 'errorFgInverse',
  },
  success: {
    bg: 'successBg',
    on: 'successFg',
    border: 'successBorder',
    bgInverse: 'successBgInverse',
    onInverse: 'successFgInverse',
  },
  warning: {
    bg: 'warningBg',
    on: 'warningFg',
    border: 'warningBorder',
    bgInverse: 'warningBgInverse',
    onInverse: 'warningFgInverse',
  },
  info: {
    bg: 'infoBg',
    on: 'infoFg',
    border: 'infoBorder',
    bgInverse: 'infoBgInverse',
    onInverse: 'infoFgInverse',
  },
},
```

## Step 11: `themes/default.ts` - Add Surfaces Contract Mappings

```typescript
surfaces: {
  base: {
    bg: 'surface',
    on: 'text',
    border: 'border',
  },
  alt: {
    bg: 'surfaceAlt',
    on: 'text',
    border: 'border',
  },
  raised: {
    bg: 'surfaceRaised',
    on: 'text',
    border: 'border',
  },
  sunken: {
    bg: 'surfaceSunken',
    on: 'text',
    border: 'border',
  },
  inverse: {
    bg: 'surfaceInverse',
    on: 'textInverse',
    border: 'borderInverse',
  },
  brand: {
    bg: 'surfaceBrand',
    on: 'textBrand',
    border: 'border',
  },
},
```

## Step 12: `themes/default.ts` - Rename typography.roles → typography.contracts

Change all references from `roles` to `contracts` in the typography section.

---

## Step 13: `adapters/stylex/createStylexTheme.stylex.ts` - Resolve Contracts

Add after the roles resolution block:

```typescript
// actions
Object.entries(theme.actions).forEach(([variant, preset]) => {
	Object.entries(preset).forEach(([prop, roleName]) => {
		const role = theme.roles[roleName as keyof typeof theme.roles];
		const lightColor = theme.colors[role.light as keyof typeof theme.colors] as string;
		const darkColor = theme.colors[role.dark as keyof typeof theme.colors] as string;
		root.style.setProperty(`--action-${variant}-${prop}-default`, lightColor);
		root.style.setProperty(`--action-${variant}-${prop}-dark`, darkColor);
		root.style.setProperty(`--action-${variant}-${prop}`, darkMode ? darkColor : lightColor);
	});
});

// feedback
Object.entries(theme.feedback).forEach(([intent, preset]) => {
	Object.entries(preset).forEach(([prop, roleName]) => {
		const role = theme.roles[roleName as keyof typeof theme.roles];
		const lightColor = theme.colors[role.light as keyof typeof theme.colors] as string;
		const darkColor = theme.colors[role.dark as keyof typeof theme.colors] as string;
		root.style.setProperty(`--feedback-${intent}-${prop}-default`, lightColor);
		root.style.setProperty(`--feedback-${intent}-${prop}-dark`, darkColor);
		root.style.setProperty(`--feedback-${intent}-${prop}`, darkMode ? darkColor : lightColor);
	});
});

// surfaces
Object.entries(theme.surfaces).forEach(([surface, preset]) => {
	Object.entries(preset).forEach(([prop, roleName]) => {
		const role = theme.roles[roleName as keyof typeof theme.roles];
		const lightColor = theme.colors[role.light as keyof typeof theme.colors] as string;
		const darkColor = theme.colors[role.dark as keyof typeof theme.colors] as string;
		root.style.setProperty(`--surface-${surface}-${prop}-default`, lightColor);
		root.style.setProperty(`--surface-${surface}-${prop}-dark`, darkColor);
		root.style.setProperty(`--surface-${surface}-${prop}`, darkMode ? darkColor : lightColor);
	});
});
```

Also update typography roles → contracts references (rename `--typography-role-` to `--typography-contract-`).

## Step 14: `adapters/stylex/createStylexVars.stylex.ts` - Export Contract Vars

```typescript
// actions
const actionContractTokens = {
	primaryBg: 'var(--action-primary-bg)',
	primaryOn: 'var(--action-primary-on)',
	primaryBorder: 'var(--action-primary-border)',
	primaryBgHover: 'var(--action-primary-bgHover)',
	primaryOnHover: 'var(--action-primary-onHover)',
	primaryBgActive: 'var(--action-primary-bgActive)',
	primaryOnActive: 'var(--action-primary-onActive)',
	primaryBgFocus: 'var(--action-primary-bgFocus)',
	primaryOnFocus: 'var(--action-primary-onFocus)',
	primaryBorderFocus: 'var(--action-primary-borderFocus)',
	primaryBgDisabled: 'var(--action-primary-bgDisabled)',
	primaryOnDisabled: 'var(--action-primary-onDisabled)',
	primaryBorderDisabled: 'var(--action-primary-borderDisabled)',
	// secondary, ghost, link...
} as const;
export const actionContracts = defineVars(actionContractTokens);

// feedback
const feedbackContractTokens = {
	errorBg: 'var(--feedback-error-bg)',
	errorOn: 'var(--feedback-error-on)',
	errorBorder: 'var(--feedback-error-border)',
	errorBgInverse: 'var(--feedback-error-bgInverse)',
	errorOnInverse: 'var(--feedback-error-onInverse)',
	// success, warning, info...
} as const;
export const feedbackContracts = defineVars(feedbackContractTokens);

// surfaces
const surfaceContractTokens = {
	baseBg: 'var(--surface-base-bg)',
	baseOn: 'var(--surface-base-on)',
	baseBorder: 'var(--surface-base-border)',
	// alt, raised, sunken, inverse, brand...
} as const;
export const surfaceContracts = defineVars(surfaceContractTokens);
```

---

## Step 15: Migrate Components

### Button.styles.ts

```typescript
import { actionContracts as actions, spacing, components } from '...';

primary: {
  backgroundColor: actions.primaryBg,
  color: actions.primaryOn,
  borderColor: actions.primaryBorder,
  ':hover': { backgroundColor: actions.primaryBgHover },
  ':active': { backgroundColor: actions.primaryBgActive },
},
primaryDisabled: {
  backgroundColor: actions.primaryBgDisabled,
  color: actions.primaryOnDisabled,
  borderColor: actions.primaryBorderDisabled,
},
```

### Alert.styles.ts

```typescript
import { feedbackContracts as feedback, spacing, components } from '...';

error: {
  backgroundColor: feedback.errorBg,
  color: feedback.errorOn,
  borderColor: feedback.errorBorder,
},
```

### Badge.styles.ts

```typescript
import { feedbackContracts as feedback, surfaceContracts as surfaces, ... } from '...';

error: {
  backgroundColor: feedback.errorBg,
  color: feedback.errorOn,
  borderColor: feedback.errorBorder,
},
brand: {
  backgroundColor: surfaces.brandBg,
  color: surfaces.brandOn,
},
```

### Card.styles.ts

```typescript
import { surfaceContracts as surfaces, spacing, components } from '...';

surface: {
  backgroundColor: surfaces.baseBg,
  borderColor: surfaces.baseBorder,
},
raised: {
  backgroundColor: surfaces.raisedBg,
  borderColor: surfaces.raisedBorder,
},
```

---

## Step 16: Update Brand Themes

### caos.ts

```typescript
actions: {
  primary: {
    ...defaultTheme.actions.primary,
    bg: 'actionSecondaryBg',
    on: 'actionSecondaryFg',
    border: 'actionSecondaryBorder',
    bgHover: 'actionSecondaryBgHover',
    onHover: 'actionSecondaryFg',
    bgActive: 'actionSecondaryBgActive',
    onActive: 'actionSecondaryFg',
    bgDisabled: 'actionSecondaryDisabledBg',
    onDisabled: 'actionSecondaryDisabledFg',
    borderDisabled: 'actionSecondaryDisabledBorder',
  },
},
```

### cag.ts

No action/feedback/surface changes needed (only overrides colors/radii).

---

## Consumer API Summary

```typescript
import {
	actionContracts,
	feedbackContracts,
	surfaceContracts,
	typographyContracts,
} from '...createStylexVars.stylex';

// Actions
actionContracts.primaryBg;
actionContracts.primaryOn;
actionContracts.primaryBorder;
actionContracts.primaryBgHover;
// ... 13 properties per variant

// Feedback
feedbackContracts.errorBg;
feedbackContracts.errorOn;
feedbackContracts.errorBorder;
feedbackContracts.errorBgInverse;
feedbackContracts.errorOnInverse;
// ... 5 properties per intent

// Surfaces
surfaceContracts.baseBg;
surfaceContracts.baseOn;
surfaceContracts.baseBorder;
// ... 3 properties per surface

// Typography (renamed from typographyRoles)
typographyContracts.heading1FontSize;
typographyContracts.heading1FontWeight;
typographyContracts.heading1Color;
// ... same as before
```
