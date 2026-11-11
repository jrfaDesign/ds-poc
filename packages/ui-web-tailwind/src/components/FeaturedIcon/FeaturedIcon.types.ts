import type { FC, ReactNode, Ref } from "react";
export interface FeaturedIconProps {
    /** A ref to the wrapper element. */
    ref?: Ref<HTMLDivElement>;
    /** Extra content rendered inside the wrapper, alongside the icon. */
    children?: ReactNode;
    /** The class name applied to the wrapper. */
    className?: string;
    /** The icon to display. Accepts a component reference or a rendered element. */
    icon?: FC<{ className?: string }> | ReactNode;
    /** Controls the dimensions of the wrapper and the icon inside it. */
    size?: "sm" | "md" | "lg" | "xl";
    /** The semantic color used for the background, icon and border of the current theme. The `modern` and `modern-neue` themes are only styled for `gray`. */
    color: "brand" | "gray" | "success" | "warning" | "error";
    /** The visual treatment of the icon container, from a subtle tinted circle to a solid, outlined or skeuomorphic surface. */
    theme?: "light" | "gradient" | "dark" | "outline" | "modern" | "modern-neue";
}
