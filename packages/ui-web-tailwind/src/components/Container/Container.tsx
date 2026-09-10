import { createElement } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { LayoutToken, WidthToken } from '@repo/foundations';
import type { Responsive } from '../shared/responsive';
import { resolveResponsive, tokenVar } from '../shared/responsive';

export type ContainerProps = {
	children?: ReactNode;
	/** `fixed` (default) caps max-width per breakpoint from the grid's maxWidth token. `fluid` removes the cap so content fills the viewport (margins still apply). */
	fluid?: boolean;
	/** Override the container max-width with a width token. Single value or per-breakpoint. Falls back to the grid config. */
	maxWidth?: Responsive<WidthToken>;
	/** Inline padding (container inset) as a layout token. Controls `padding-inline`. Falls back to the grid config. */
	inset?: Responsive<LayoutToken>;
	/** Render as a different element (default `div`). */
	as?: 'div' | 'section' | 'main' | 'article' | 'header' | 'footer' | 'aside' | 'nav';
	/** Additional CSS class names. */
	className?: string;
	/** Inline style overrides. */
	style?: CSSProperties;
	/** HTML `id` attribute. */
	id?: string;
};

/**
 * `<Container>` - centers content and applies the correct max-width, margins,
 * and padding per breakpoint.
 *
 * In `fixed` mode (default) the max-width is capped at each breakpoint using
 * the grid's `maxWidth` width-token, so content never stretches beyond a
 * readable measure. In `fluid` mode the cap is removed but the inline margins
 * (padding) still apply, giving full-bleed backgrounds with padded content.
 *
 * All sizes are tokens; raw px is rejected by the type system. Responsive
 * overrides set per-breakpoint CSS vars inline; the static grid stylesheet
 * resolves the active value per media query (no JS).
 *
 * @example
 * <Container>…</Container>
 * @example
 * <Container fluid maxWidth={{ desktop: '4xl' }}>…</Container>
 */
export function Container({
	children,
	fluid = false,
	maxWidth,
	inset,
	as: Tag = 'div',
	className,
	style,
	id,
}: ContainerProps) {
	const maxVars = resolveResponsive('--ds-container-max', maxWidth, (v) => tokenVar('ds-width', v));
	const insetVars = resolveResponsive('--ds-inset', inset, (v) => tokenVar('ds-layout', v));

	return createElement(
		Tag,
		{
			id,
			className:
				['ds-container', fluid && 'ds-container-fluid', className].filter(Boolean).join(' ') ||
				undefined,
			style: {
				...maxVars,
				...insetVars,
				...style,
			} as CSSProperties,
		},
		children
	);
}
