---
name: storybook-mdx
description: Style guide for Storybook Markdown/MDX documentation - load when creating or editing any *.mdx file under apps/storybook (docs pages, getting-started guides, architecture pages, component documentation).
---

# Markdown Text Editor vs Storybook Markdown Documentation

## The Core Difference

Think about it this way:

### Standard Markdown

The content is the product.

```md
# User Profile

This user can:

- Create projects
- Edit projects
- Delete projects
```

The purpose is to communicate information directly to the reader.

The Markdown file itself is the final deliverable.

---

### Storybook Markdown

The component is the product.

The Markdown is documentation that explains the component to developers.

```text
Component
    ↓
Documentation
    ↓
Developer
```

The purpose is to teach developers:

- What the component does
- Why it exists
- When to use it
- When not to use it
- How to use it correctly

---

# Bad Storybook Documentation

This is technically documentation, but it provides almost no value.

```md
# Button

A button component.

## Variants

- Primary
- Secondary
- Danger
```

Problems:

- No purpose explained
- No usage guidelines
- No accessibility notes
- No examples
- No business context

A developer still won't know which variant to use.

---

# Better Storybook Documentation

```md
# Button

Buttons allow users to trigger actions or submit information.

Use buttons when users can immediately perform an action.

Avoid using buttons for navigation. Use links instead.

## Variants

### Primary

Use for the most important action on a page.

Examples:

- Save Changes
- Create Account
- Continue

### Secondary

Use for supporting actions when a primary action already exists.

Examples:

- Cancel
- Back
- Close

### Danger

Use for destructive actions.

Examples:

- Delete Project
- Remove User
- Permanently Delete
```

Why it's better:

- Explains intent
- Gives context
- Shows examples
- Explains decision making

---

# How To Write Good Storybook Documentation

When writing Storybook documentation, always assume:

> The developer has never seen this component before.

Your documentation should answer these questions:

1. What is this component?
2. Why does it exist?
3. When should I use it?
4. When should I avoid it?
5. What variants exist?
6. What props are available?
7. What accessibility requirements exist?
8. Can I see a working example?

If all eight questions are answered, the documentation is usually good.

---

# Recommended Storybook Documentation Structure

```md
# Component Name

Short one-sentence description.

## Purpose

Explain why the component exists.

## When to Use

- Use case 1
- Use case 2
- Use case 3

## When Not to Use

- Situation 1
- Situation 2
- Situation 3

## Variants

### Default

Description.

### Variant A

Description.

### Variant B

Description.

## Props

- `size` (string): controls component size.
- `disabled` (boolean): prevents interaction.

## Accessibility

- Keyboard support
- Screen reader behavior
- Focus behavior
- ARIA requirements

## Examples

Include realistic examples.

## Design Notes

Additional implementation guidance.
```

---

# Example: Excellent Storybook Documentation

```md
# Button

Buttons allow users to initiate actions and submit data.

## Purpose

The Button component provides a consistent way for users to perform actions throughout the application.

## When to Use

- Saving changes
- Submitting forms
- Confirming actions
- Starting workflows

## When Not to Use

- Navigation between pages
- Opening external websites
- Contextual text links

Use a Link component instead.

## Variants

### Primary

Use when the action is the most important action on the page.

Examples:

- Save Changes
- Create User
- Continue

### Secondary

Use for supporting actions.

Examples:

- Back
- Cancel
- Close

### Danger

Use only for destructive actions.

Examples:

- Delete User
- Remove Project
- Reset Settings

## Props

- `label` (string, required): button text.
- `disabled` (boolean): prevents interaction.
- `variant` (string): visual style of button.
- `loading` (boolean): displays loading state.

## Accessibility

- Must contain accessible text.
- Must be reachable via keyboard.
- Must display visible focus styles.
- Must not rely only on color to convey meaning.
- Icon-only buttons must have an accessible label.

## Examples

### Save Action

Primary button used to save form changes.

### Cancel Action

Secondary button used to dismiss changes.

### Delete Action

Danger button used for destructive actions.

## Design Notes

Only one primary button should appear within a local action group.

If multiple primary actions exist, reconsider the user flow.
```

---

# MDX Storybook Documentation

Modern Storybook usually uses MDX (Markdown + React Components).

Example:

```mdx
import { Meta, Canvas } from '@storybook/blocks';

<Meta title="Components/Button" />

# Button

Buttons allow users to trigger actions.

## Usage

Use buttons whenever users need to perform an action.

## Primary Example

<Canvas of={ButtonStories.Primary} />

## Secondary Example

<Canvas of={ButtonStories.Secondary} />
```

MDX allows you to combine:

- Documentation
- Live component examples
- Controls
- Code snippets
- Props lists

in a single file.

---

# Quick AI Checklist For Storybook Docs

Before submitting your Storybook documentation, verify:

- [ ] Component purpose is explained
- [ ] Usage guidelines are provided
- [ ] Non-usage guidelines are provided
- [ ] Variants are documented
- [ ] Props are documented
- [ ] Accessibility requirements are documented
- [ ] Real-world examples are included
- [ ] No markdown tables are used
- [ ] Design rationale is explained
- [ ] Documentation helps a new developer make decisions
- [ ] Documentation is not merely describing appearance

## Golden Rule

Bad Storybook docs describe what a component looks like.

```md
The primary button is blue.
```

Good Storybook docs explain why and when it should be used.

```md
Use the primary button for the single most important action within a workflow.
```

Focus on decisions, not appearances.

---

# No Markdown Tables

Never use markdown tables in this repo's Storybook docs. They render poorly in
the docs pane (wide, cramped columns) and prettier pads the source to the
widest cell, so even short tables become unreadable files.

The canonical bad example (a table that looked broken in review):

```md
| Package                 | What it gives you                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `@repo/foundations`     | Token schemas, the default theme, the white-label `ThemeConfig` resolver (`resolveThemeConfig`), validation…  |
```

Use one of these instead:

- **Definition bullets** for label/explanation pairs:

  ```md
  - **Config (white-label)**: pass `config` + `resolve` + `fallback`. Use
    when your API returns a `ThemeConfig`.
  - **Static**: pass a `themes` map. Use when every theme is bundled.
  ```

- **Paired bullets** for web vs mobile or before vs after comparisons:

  ```md
  - **Provider**: web `ThemeProvider` (config/static/async); mobile
    `AppProvider` (`theme` + `isDark`).
  ```

- **Numbered steps** for ordered recipes, **bold-lead bullets** for
  "if you want X, do Y" mappings, and fenced code blocks for anything
  reference-shaped (command lists, type signatures).

If content seems to demand a table, split it into bullets or `###`
subsections instead. There are no exceptions in this repo.

---

# In This Repo: File Conventions

Apply the style guide above to every MDX file in this repository, plus these
repo-specific mechanics:

- **No em dashes, ever.** In docs, comments, story descriptions and JSDoc,
  never use the em dash. Use `:` for definitions and labels, `-` for a light
  separator, or restructure into two sentences when neither reads well.
- **Where docs live:** `apps/storybook/src/**/*.mdx`. Storybook discovers them
  automatically (`.storybook/main.ts` globs `../src/**/*.mdx`), so no
  registration is needed. Existing pages: `src/intro/*` (guides),
  `src/design-system/ThemeTiers.mdx`.
- **Title convention:** every page sets `<Meta title="Section/Page" />`.
  Sections in use: `Intro/…` (guides), `Design system/…` (token docs),
  `Web/…` and `React Native/…` (component stories use `Web/Base/<Component>`).
  The sidebar orders pages alphabetically inside a section.
- **Imports that work here:**

  ```mdx
  import { Meta, Canvas } from '@storybook/addon-docs/blocks';
  import * as ButtonStories from '../web/Button.stories';
  ```

- **Embedding live examples:** `<Canvas of={ButtonStories.Default} />`. Every
  component story exports exactly one `Default` story with `argTypes`; point
  Canvases at `Default`, not invented story names.
- **Code blocks:** use fenced blocks (```tsx). They render as highlighted code
  and are never executed, so they are safe for setup recipes that must not run
  in the preview.
- **Audience:** every guide assumes the reader has never seen this repo before.
  Explain _why_ a package/step exists, not just _what_ to paste.
