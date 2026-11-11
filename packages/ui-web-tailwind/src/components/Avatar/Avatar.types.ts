import type { FC, ReactNode } from "react";
export interface AvatarProps {
    /**
     * The dimensions of the avatar, which also scale the initials, placeholder icon and status indicator.
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    /**
     * The class name for the outer wrapper of the avatar.
     */
    className?: string;
    /**
     * The class name for the main child of the avatar.
     */
    contentClassName?: string;
    /**
     * The URL of the avatar image. Falls back to the initials, placeholder icon or placeholder if it is missing or fails to load.
     */
    src?: string | null;
    /**
     * The alternative text for the avatar image.
     */
    alt?: string;
    /**
     * Display an inner contrast border around the avatar image.
     */
    contrastBorder?: boolean;
    /**
     * Whether the avatar should be rounded.
     * @default true
     */
    rounded?: boolean;
    /**
     * Display an outer border around the avatar.
     */
    border?: boolean;
    /**
     * Display a badge (i.e. company logo).
     */
    badge?: ReactNode;
    /**
     * Display a status indicator.
     */
    status?: "online" | "offline";
    /**
     * Display a verified tick icon.
     *
     * @default false
     */
    verified?: boolean;
    /**
     * Display a count badge.
     */
    count?: number;
    /**
     * The initials of the user to display if no image is available.
     */
    initials?: string;
    /**
     * An icon to display if no image is available.
     */
    placeholderIcon?: FC<{ className?: string }>;
    /**
     * A placeholder to display if no image is available.
     */
    placeholder?: ReactNode;

    /**
     * Whether the avatar should show a focus ring when the parent group is in focus.
     * For example, when the avatar is wrapped inside a link.
     *
     * @default false
     */
    focusable?: boolean;
}

export interface AvatarLabelGroupProps extends AvatarProps {
    /** The dimensions of the avatar, which also set the text size of the title and subtitle. */
    size: "sm" | "md" | "lg";
    /** Whether the avatar is a circle rather than a rounded square. */
    rounded?: boolean;
    /** The primary line of text shown next to the avatar, such as a person's name. */
    title: string | ReactNode;
    /** The secondary line of text shown below the title. Truncates when it overflows. */
    subtitle: string | ReactNode;
    /** The class name applied to the avatar, while `className` styles the whole group. */
    avatarClassName?: string;
}

export interface AvatarProfilePhotoProps extends AvatarProps {
    /** The dimensions of the photo, which also scale the surrounding ring, initials and status indicator. */
    size: "sm" | "md" | "lg";
}
