import type { FC, MouseEventHandler, ReactNode } from "react";
import type { Align, Color, Size, Theme } from "./BadgeGroups";
import type { BadgeTypeToColorMap, BadgeTypes, FlagTypes, IconComponentType, Sizes, withBadgeTypes, withPillTypes } from "./badge-types";
export type BadgeColor<T extends BadgeTypes> = BadgeTypeToColorMap<typeof withPillTypes>[T];

export interface BadgeProps<T extends BadgeTypes> {
    /** The shape and treatment of the badge: `pill-color` is fully rounded, `color` is a rounded rectangle, and `modern` is a white badge with a border and a subtle shadow. */
    type?: T;
    /** Controls the padding and font size of the badge. */
    size?: Sizes;
    /** The color palette used for the badge background, text, and ring. The `modern` type only supports `gray`. */
    color?: BadgeColor<T>;
    /** The content of the badge, usually a short text label. */
    children: ReactNode;
    /** Additional CSS classes merged onto the badge element. */
    className?: string;
}

export interface BadgeWithDotProps<T extends BadgeTypes> {
    /** The shape and treatment of the badge: `pill-color` is fully rounded, `color` is a rounded rectangle, and `modern` is a white badge with a border and a subtle shadow. */
    type?: T;
    /** Controls the gap, padding, and font size of the badge. */
    size?: Sizes;
    /** The color palette used for the badge background, text, ring, and the leading dot. With the `modern` type only the dot is colored. */
    color?: BadgeTypeToColorMap<typeof withBadgeTypes>[T];
    /** Additional CSS classes merged onto the badge element. */
    className?: string;
    /** The content shown after the dot, usually a short status label. */
    children: ReactNode;
}

export interface BadgeWithIconProps<T extends BadgeTypes> {
    /** The shape and treatment of the badge: `pill-color` is fully rounded, `color` is a rounded rectangle, and `modern` is a white badge with a border and a subtle shadow. */
    type?: T;
    /** Controls the gap, padding, and font size of the badge. */
    size?: Sizes;
    /** The color palette used for the badge background, text, ring, and icons. With the `modern` type only the icons are colored. */
    color?: BadgeTypeToColorMap<typeof withBadgeTypes>[T];
    /** An icon component rendered before the label. Providing it also switches the badge to the tighter leading padding. */
    iconLeading?: IconComponentType;
    /** An icon component rendered after the label. */
    iconTrailing?: IconComponentType;
    /** The content shown between the icons, usually a short text label. */
    children: ReactNode;
    /** Additional CSS classes merged onto the badge element. */
    className?: string;
}

export interface BadgeWithFlagProps<T extends BadgeTypes> {
    /** The shape and treatment of the badge: `pill-color` is fully rounded, `color` is a rounded rectangle, and `modern` is a white badge with a border and a subtle shadow. */
    type?: T;
    /** Controls the gap, padding, and font size of the badge. */
    size?: Sizes;
    /** The ISO country code of the flag shown before the label. It is loaded as a circular SVG from the Untitled UI flag CDN and also used for the image alt text. */
    flag?: FlagTypes;
    /** The color palette used for the badge background, text, and ring. The `modern` type only supports `gray`. */
    color?: BadgeTypeToColorMap<typeof withPillTypes>[T];
    /** The content shown after the flag, usually a country or region name. */
    children: ReactNode;
}

export interface BadgeWithImageProps<T extends BadgeTypes> {
    /** The shape and treatment of the badge: `pill-color` is fully rounded, `color` is a rounded rectangle, and `modern` is a white badge with a border and a subtle shadow. */
    type?: T;
    /** Controls the gap, padding, and font size of the badge. */
    size?: Sizes;
    /** The source URL of the circular image rendered before the label, such as an avatar or a logo. */
    imgSrc: string;
    /** The color palette used for the badge background, text, and ring. The `modern` type only supports `gray`. */
    color?: BadgeTypeToColorMap<typeof withPillTypes>[T];
    /** The content shown after the image, usually a name or a short label. */
    children: ReactNode;
}

export interface BadgeWithButtonProps<T extends BadgeTypes> {
    /** The shape and treatment of the badge: `pill-color` is fully rounded, `color` is a rounded rectangle, and `modern` is a white badge with a border and a subtle shadow. */
    type?: T;
    /** Controls the gap, padding, and font size of the badge. */
    size?: Sizes;
    /** The icon component rendered inside the trailing button, typically a dismiss icon. */
    icon?: IconComponentType;
    /** The color palette used for the badge background, text, ring, and the trailing button's hover state. The `modern` type only supports `gray`. */
    color?: BadgeTypeToColorMap<typeof withPillTypes>[T];
    /** The content shown before the button, usually a short text label. */
    children: ReactNode;
    /**
     * The label for the button.
     */
    buttonLabel?: string;
    /**
     * The click event handler for the button.
     */
    onButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface BadgeIconProps<T extends BadgeTypes> {
    /** The shape and treatment of the badge: `pill-color` is fully rounded, `color` is a rounded rectangle, and `modern` is a white badge with a border and a subtle shadow. */
    type?: T;
    /** Controls the padding around the icon, which sets the overall size of the badge. */
    size?: Sizes;
    /** The icon component rendered as the sole content of the badge. */
    icon: IconComponentType;
    /** The color palette used for the badge background, ring, and icon. The `modern` type only supports `gray`. */
    color?: BadgeTypeToColorMap<typeof withPillTypes>[T];
    /** Accepted for consistency with the other badges but not rendered: this badge shows only the icon. */
    children?: ReactNode;
}

export interface BadgeGroupProps {
    /** The main text of the group, shown next to the addon. When omitted the group tightens its padding and the addon drops its margin. */
    children?: string | ReactNode;
    /** The text of the pill-shaped addon, which is placed at the start or the end of the group depending on `align`. */
    addonText: string;
    /** Controls the padding and font size of the group, its addon, and the trailing icon. */
    size?: Size;
    /** The color palette of the group. In the `light` theme it drives the background, text, ring, and icon colors; in the `modern` theme it only colors the status dot. */
    color: Color;
    /** `light` fills the group with a tinted background and gives the addon its own ring, while `modern` renders a white, shadowed group with a colored status dot. */
    theme?: Theme;
    /**
     * Alignment of the badge addon element.
     */
    align?: Align;
    /** An icon component or element rendered at the end of the group. With `align="trailing"` it sits inside the addon, otherwise it follows the group's text. */
    iconTrailing?: FC<{ className?: string }> | ReactNode;
    /** Additional CSS classes merged onto the group's root element. */
    className?: string;
}
