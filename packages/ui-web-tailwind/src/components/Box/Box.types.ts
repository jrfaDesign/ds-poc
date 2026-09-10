import type { CSSProperties, ReactNode } from 'react';
import type { SpacingToken, RadiiToken, ShadowToken, ColorTokenName } from '@repo/foundations';
import type { MarginProps, PaddingProps } from '../shared/spacing';
import type { BorderProp } from '../shared/border';

export type BoxTag =
	'div' | 'section' | 'article' | 'main' | 'header' | 'footer' | 'aside' | 'nav' | 'span';

/**
 * Background token value, optionally with a `/alpha` suffix (0-100) to apply
 * opacity via `color-mix()` - e.g. `"bg-secondary/60"` resolves to
 * `color-mix(in oklab, var(--ct-bg-secondary) 60%, transparent)`, the same
 * CSS Tailwind v4 generates for its `/alpha` color modifiers.
 */
export type BackgroundProp = ColorTokenName | `${ColorTokenName}/${number}`;

export type BoxProps = MarginProps &
	PaddingProps & {
		/** Content to render inside the box. */
		children?: ReactNode;
		/** HTML element to render (default `div`). */
		as?: BoxTag;
		/** CSS display value (e.g. `'flex'`, `'grid'`, `'block'`). */
		display?: CSSProperties['display'];
		/** Flex shorthand — sets `flex-basis`, `flex-grow`, and `flex-shrink`. */
		flex?: CSSProperties['flex'];
		/** Initial main-axis size of a flex item. */
		flexBasis?: CSSProperties['flexBasis'];
		/** How much the item grows relative to siblings to fill leftover space. */
		flexGrow?: CSSProperties['flexGrow'];
		/** How much the item shrinks relative to siblings when space is limited. */
		flexShrink?: CSSProperties['flexShrink'];
		/** Direction of flex items (e.g. `'row'`, `'column'`). */
		flexDirection?: CSSProperties['flexDirection'];
		/** Whether flex items wrap onto multiple lines. */
		flexWrap?: CSSProperties['flexWrap'];
		/** Cross-axis alignment of flex items (e.g. `'center'`, `'stretch'`). */
		alignItems?: CSSProperties['alignItems'];
		/** Cross-axis alignment of flex lines (multi-line flex). */
		alignContent?: CSSProperties['alignContent'];
		/** Override alignment for a single flex item. */
		alignSelf?: CSSProperties['alignSelf'];
		/** Main-axis alignment of flex items (e.g. `'center'`, `'space-between'`). */
		justifyContent?: CSSProperties['justifyContent'];
		/** Override main-axis alignment for a single grid item. */
		justifySelf?: CSSProperties['justifySelf'];
		/** Main-axis alignment of all grid items. */
		justifyItems?: CSSProperties['justifyItems'];
		/** Gap between flex/grid children (spacing token). */
		gap?: SpacingToken;
		/** CSS width value. */
		width?: CSSProperties['width'];
		/** CSS height value. */
		height?: CSSProperties['height'];
		/** Minimum width constraint. */
		minWidth?: CSSProperties['minWidth'];
		/** Maximum width constraint. */
		maxWidth?: CSSProperties['maxWidth'];
		/** Minimum height constraint. */
		minHeight?: CSSProperties['minHeight'];
		/** Maximum height constraint. */
		maxHeight?: CSSProperties['maxHeight'];
		/** CSS position value (e.g. `'relative'`, `'absolute'`, `'sticky'`). */
		position?: CSSProperties['position'];
		/** Offset from the top edge (requires non-static position). */
		top?: CSSProperties['top'];
		/** Offset from the right edge. */
		right?: CSSProperties['right'];
		/** Offset from the bottom edge. */
		bottom?: CSSProperties['bottom'];
		/** Offset from the left edge. */
		left?: CSSProperties['left'];
		/** Shorthand for all inset offsets (top, right, bottom, left). */
		inset?: CSSProperties['inset'];
		/** CSS overflow behavior (e.g. `'hidden'`, `'auto'`, `'visible'`). */
		overflow?: CSSProperties['overflow'];
		/** Horizontal overflow behavior. */
		overflowX?: CSSProperties['overflowX'];
		/** Vertical overflow behavior. */
		overflowY?: CSSProperties['overflowY'];
		/** Background color token. Supports `/alpha` suffix (e.g. `'bg-secondary/60'`). */
		background?: BackgroundProp;
		/** Apply a backdrop blur effect (8px). Useful for translucent overlays. */
		backdropBlur?: boolean;
		/** Corner radius (radii token). */
		borderRadius?: RadiiToken;
		/** Elevation shadow (shadow token). */
		shadow?: ShadowToken;
		/** Border shorthand — `{width}-{colorToken}-{style}` (e.g. `'1px-border-primary-solid'`). */
		border?: BorderProp;
		/** Flip light/dark values for this subtree — a dark section on a light page (or vice-versa). */
		invert?: boolean;
		/** Force light or dark mode colors. Bypasses invert when provided. */
		mode?: 'light' | 'dark';
		/** Additional CSS class names. */
		className?: string;
		/** Inline style overrides. Applied after token-resolved styles. */
		style?: CSSProperties;
		/** HTML `title` attribute — shown as tooltip on hover. */
		title?: string;
	};
