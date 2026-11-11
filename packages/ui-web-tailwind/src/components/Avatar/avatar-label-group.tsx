"use client";

import { cx } from "../shared/cx";
import { Avatar } from "./Avatar";
import type { AvatarLabelGroupProps } from "./Avatar.types";
export type { AvatarLabelGroupProps } from "./Avatar.types";

const styles = {
    sm: { title: "text-xs ", subtitle: "text-xxs" },
    md: { title: "text-xs ", subtitle: "text-xs" },
    lg: { title: "text-sm ", subtitle: "text-sm" },
};


export const AvatarLabelGroup = ({ title, subtitle, className, rounded, avatarClassName, ...props }: AvatarLabelGroupProps) => {
    return (
        <figure className={cx("group flex min-w-0 flex-1 items-center gap-md", className)}>
            <Avatar border rounded={rounded} className={avatarClassName} {...props} />
            <figcaption className="min-w-0 flex-1">
                <p className={cx("font-semibold text-primary", styles[props.size].title)}>{title}</p>
                <p className={cx("truncate text-tertiary", styles[props.size].subtitle)}>{subtitle}</p>
            </figcaption>
        </figure>
    );
};
