import type { FC, ReactNode, RefAttributes } from "react";
import type { Placement } from "react-aria";
import type { ButtonProps as AriaButtonProps, LinkProps as AriaLinkProps } from "react-aria-components";
/**
 * Common props shared between button and anchor variants
 */
export interface CommonProps {
    /** Disables the button and shows a disabled state */
    isDisabled?: boolean;
    /** The size variant of the button */
    size?: "xs" | "sm";
    /** The color variant of the button */
    color?: "secondary" | "tertiary";
    /** The icon to display in the button */
    icon?: FC<{ className?: string }> | ReactNode;
    /** The tooltip to display when hovering over the button */
    tooltip?: string;
    /** The placement of the tooltip */
    tooltipPlacement?: Placement;

    /** The class name applied to the button. */
    className?: string;
}

/**
 * Props for the button variant (non-link)
 */
export interface ButtonProps extends CommonProps, Omit<AriaButtonProps, "children" | "className">, RefAttributes<HTMLButtonElement> {}

/**
 * Props for the link variant (anchor tag)
 */
export interface LinkProps extends CommonProps, Omit<AriaLinkProps, "children" | "className">, RefAttributes<HTMLAnchorElement> {
    /** The link target. Required as a key to select the link variant, but may be `undefined` (e.g. a disabled nav button). */
    href: AriaLinkProps["href"];
}

/** Union type of button and link props */
export type Props = ButtonProps | LinkProps;
