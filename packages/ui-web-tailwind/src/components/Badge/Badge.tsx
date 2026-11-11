"use client";

import { X as CloseX } from "@untitledui/icons";
import { Dot } from "../shared/dot-icon";
import { cx } from "../shared/cx";
import type { BadgeTypes } from "./badge-types";
import { badgeTypes, withPillTypes, withBadgeTypes } from "./badge-types";
import type { BadgeProps, BadgeWithDotProps, BadgeWithIconProps, BadgeWithFlagProps, BadgeWithImageProps, BadgeWithButtonProps, BadgeIconProps } from "./Badge.types";
export type { BadgeColor, BadgeProps, BadgeWithDotProps, BadgeWithIconProps, BadgeWithFlagProps, BadgeWithImageProps, BadgeWithButtonProps, BadgeIconProps } from "./Badge.types";




export const Badge = <T extends BadgeTypes>(props: BadgeProps<T>) => {
    const { type = "pill-color", size = "md", color = "gray", children } = props;
    const colors = withPillTypes[type];

    const pillSizes = {
        sm: "py-xxs px-md text-xxs font-medium",
        md: "py-xxs px-lg text-xs font-medium",
        lg: "py-xs px-lg text-xs font-medium",
    };
    const badgeSizes = {
        sm: "py-xxs px-sm text-xxs font-medium",
        md: "py-xxs px-md text-xs font-medium",
        lg: "py-xs px-lg text-xs font-medium rounded-md",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return <span className={cx(colors.common, sizes[type][size], colors.styles[color].root, props.className)}>{children}</span>;
};


export const BadgeWithDot = <T extends BadgeTypes>(props: BadgeWithDotProps<T>) => {
    const { size = "md", color = "gray", type = "pill-color", className, children } = props;

    const colors = withBadgeTypes[type];

    const pillSizes = {
        sm: "gap-xs py-xxs pl-sm pr-md text-xxs font-medium",
        md: "gap-sm py-xxs pl-md pr-lg text-xs font-medium",
        lg: "gap-sm py-xs pl-lg pr-lg text-xs font-medium",
    };

    const badgeSizes = {
        sm: "gap-xs py-xxs px-sm text-xxs font-medium",
        md: "gap-sm py-xxs px-md text-xs font-medium",
        lg: "gap-sm py-xs px-lg text-xs font-medium rounded-md",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size], colors.styles[color].root, className)}>
            <Dot className={colors.styles[color].addon} size="sm" />
            {children}
        </span>
    );
};


export const BadgeWithIcon = <T extends BadgeTypes>(props: BadgeWithIconProps<T>) => {
    const { size = "md", color = "gray", type = "pill-color", iconLeading: IconLeading, iconTrailing: IconTrailing, children, className } = props;

    const colors = withBadgeTypes[type];

    const icon = IconLeading ? "leading" : "trailing";

    const pillSizes = {
        sm: {
            trailing: "gap-xxs py-xxs pl-md pr-sm text-xxs font-medium",
            leading: "gap-xxs py-xxs pr-md pl-sm text-xxs font-medium",
        },
        md: {
            trailing: "gap-xs py-xxs pl-lg pr-md text-xs font-medium",
            leading: "gap-xs py-xxs pr-lg pl-md text-xs font-medium",
        },
        lg: {
            trailing: "gap-xs py-xs pl-lg pr-lg text-xs font-medium",
            leading: "gap-xs py-xs pr-lg pl-lg text-xs font-medium",
        },
    };
    const badgeSizes = {
        sm: {
            trailing: "gap-xxs py-xxs pl-md pr-sm text-xxs font-medium",
            leading: "gap-xxs py-xxs pr-md pl-sm text-xxs font-medium",
        },
        md: {
            trailing: "gap-xs py-xxs pl-md pr-sm text-xs font-medium",
            leading: "gap-xs py-xxs pr-md pl-sm text-xs font-medium",
        },
        lg: {
            trailing: "gap-xs py-xs pl-lg pr-md text-xs font-medium rounded-md",
            leading: "gap-xs py-xs pr-lg pl-md text-xs font-medium rounded-md",
        },
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size][icon], colors.styles[color].root, className)}>
            {IconLeading && <IconLeading className={cx(colors.styles[color].addon, "size-3 stroke-3")} />}
            {children}
            {IconTrailing && <IconTrailing className={cx(colors.styles[color].addon, "size-3 stroke-3")} />}
        </span>
    );
};


export const BadgeWithFlag = <T extends BadgeTypes>(props: BadgeWithFlagProps<T>) => {
    const { size = "md", color = "gray", flag = "AU", type = "pill-color", children } = props;

    const colors = withPillTypes[type];

    const pillSizes = {
        sm: "gap-xs py-xxs pl-xs pr-md text-xxs font-medium",
        md: "gap-sm py-xxs pl-xs pr-lg text-xs font-medium",
        lg: "gap-sm py-xs pl-sm pr-lg text-xs font-medium",
    };
    const badgeSizes = {
        sm: "gap-xs py-xxs pl-xs pr-sm text-xxs font-medium",
        md: "gap-sm py-xxs pl-sm pr-md text-xs font-medium",
        lg: "gap-sm py-xs pl-md pr-lg text-xs font-medium rounded-md",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size], colors.styles[color].root)}>
            <img src={`https://www.untitledui.com/images/flags/${flag}.svg`} className="size-4 max-w-none rounded-full" alt={`${flag} flag`} />
            {children}
        </span>
    );
};


export const BadgeWithImage = <T extends BadgeTypes>(props: BadgeWithImageProps<T>) => {
    const { size = "md", color = "gray", type = "pill-color", imgSrc, children } = props;

    const colors = withPillTypes[type];

    const pillSizes = {
        sm: "gap-xs py-xxs pl-xs pr-md text-xxs font-medium",
        md: "gap-sm py-xxs pl-xs pr-lg text-xs font-medium",
        lg: "gap-sm py-xs pl-sm pr-lg text-xs font-medium",
    };
    const badgeSizes = {
        sm: "gap-xs py-xxs pl-xs pr-sm text-xxs font-medium",
        md: "gap-sm py-xxs pl-sm pr-md text-xs font-medium",
        lg: "gap-sm py-xs pl-md pr-lg text-xs font-medium rounded-md",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size], colors.styles[color].root)}>
            <img src={imgSrc} className="size-4 max-w-none rounded-full" alt="Badge image" />
            {children}
        </span>
    );
};


export const BadgeWithButton = <T extends BadgeTypes>(props: BadgeWithButtonProps<T>) => {
    const { size = "md", color = "gray", type = "pill-color", icon: Icon = CloseX, buttonLabel, children } = props;

    const colors = withPillTypes[type];

    const pillSizes = {
        sm: "gap-xxs py-xxs pl-md pr-xs text-xxs font-medium",
        md: "gap-xxs py-xxs pl-lg pr-xs text-xs font-medium",
        lg: "gap-xxs py-xs pl-lg pr-sm text-xs font-medium",
    };
    const badgeSizes = {
        sm: "gap-xxs py-xxs pl-sm pr-xs text-xxs font-medium",
        md: "gap-xxs py-xxs pl-md pr-xs text-xs font-medium",
        lg: "gap-xxs py-xs pl-lg pr-sm text-xs font-medium rounded-md",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size], colors.styles[color].root)}>
            {children}
            <button
                type="button"
                aria-label={buttonLabel}
                onClick={props.onButtonClick}
                className={cx(
                    "flex cursor-pointer items-center justify-center p-xxs focus-visible:ring-focus transition duration-100 ease-linear",
                    colors.styles[color].addonButton,
                    type === "pill-color" ? "rounded-full" : "rounded-xs",
                )}
            >
                <Icon className="size-3 stroke-[3px] transition" />
            </button>
        </span>
    );
};


export const BadgeIcon = <T extends BadgeTypes>(props: BadgeIconProps<T>) => {
    const { size = "md", color = "gray", type = "pill-color", icon: Icon } = props;

    const colors = withPillTypes[type];

    const pillSizes = {
        sm: "p-sm",
        md: "p-sm",
        lg: "p-md",
    };

    const badgeSizes = {
        sm: "p-sm",
        md: "p-sm",
        lg: "p-md rounded-md",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size], colors.styles[color].root)}>
            <Icon className={cx("size-3 stroke-[3px]", colors.styles[color].addon)} />
        </span>
    );
};
