import type { ReactNode, RefAttributes } from "react";
import type { styles } from "./SocialButton";
import type { ButtonProps as AriaButtonProps, LinkProps as AriaLinkProps } from "react-aria-components";
export interface CommonProps {
    /** The provider the button signs in with, which selects both the logo and the brand color. */
    social: "google" | "facebook" | "apple" | "twitter" | "figma" | "dribble";
    /** Disables the button and shows a disabled state */
    isDisabled?: boolean;
    /**
     * Disables the button and shows a disabled state.
     * @deprecated Use `isDisabled` instead, for consistency with `Button` and React Aria.
     */
    disabled?: boolean;
    /**
     * How the provider branding is applied. `brand` fills the button with the provider's color,
     * `color` keeps a neutral button with a full-color logo, and `gray` keeps both neutral.
     */
    theme?: "brand" | "color" | "gray";
    /** Controls the padding, text size and logo size of the button. */
    size?: keyof typeof styles.sizes;

    /** The button label. Omitting it renders a square, icon-only button. */
    children?: ReactNode;
    /** The class name applied to the button. */
    className?: string;
}

export interface ButtonProps extends CommonProps, Omit<AriaButtonProps, "children" | "className">, RefAttributes<HTMLButtonElement> {}

export interface LinkProps extends CommonProps, Omit<AriaLinkProps, "children" | "className">, RefAttributes<HTMLAnchorElement> {
    /** The link target. Required as a key to select the link variant, but may be `undefined` (e.g. a disabled nav button). */
    href: AriaLinkProps["href"];
}

export type SocialButtonProps = ButtonProps | LinkProps;
