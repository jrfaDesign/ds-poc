import type { RefAttributes } from "react";
import type { TagGroupProps as AriaTagGroupProps, TagProps as AriaTagProps } from "react-aria-components";
export interface TagItem {
    /** A unique identifier for the tag, passed back to `onClose` and used for selection. */
    id: string;
    /** The text displayed inside the tag. */
    label: string;
    /** A number shown in a rounded counter at the end of the tag. */
    count?: number;
    /** The URL of an avatar image shown before the label. Takes precedence over `dot`. */
    avatarSrc?: string;
    /** Whether to draw a subtle dark outline around the avatar so it stays visible on light images. */
    avatarContrastBorder?: boolean;
    /** Whether to show a small colored dot before the label. Ignored when `avatarSrc` is set. */
    dot?: boolean;
    /** Additional classes for the leading dot, typically used to change its color. */
    dotClassName?: string;
    /** Whether the tag is dimmed and cannot be selected or removed. */
    isDisabled?: boolean;
    /** Handler called with the tag's `id` when its close button is pressed. Providing it renders the close button. */
    onClose?: (id: string) => void;
}

export interface TagGroupProps extends AriaTagGroupProps, RefAttributes<HTMLDivElement> {
    /** An accessible name for the group of tags, applied as `aria-label`. */
    label: string;
    /** Controls the padding, text size and spacing of every tag in the group. */
    size?: "sm" | "md" | "lg";
}

export interface TagProps extends AriaTagProps, RefAttributes<object>, Omit<TagItem, "label" | "id"> {}
