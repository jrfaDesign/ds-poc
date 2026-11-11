"use client";

import { isValidElement } from "react";
import { ArrowRight } from "@untitledui/icons";
import { cx, sortCx } from "../shared/cx";
import { isReactComponent } from "../shared/is-react-component";
import type { BadgeGroupProps } from "./Badge.types";
export type { BadgeGroupProps } from "./Badge.types";

export type Size = "md" | "lg";
export type Color = "brand" | "warning" | "error" | "gray" | "success";
export type Theme = "light" | "modern";
export type Align = "leading" | "trailing";

const baseClasses: Record<Theme, { root?: string; addon?: string; icon?: string }> = {
    light: {
        root: "rounded-full ring-1 ring-inset",
        addon: "rounded-full ring-1 ring-inset",
    },
    modern: {
        root: "rounded-card bg-primary text-secondary shadow-xs ring-1 ring-inset ring-border-primary hover:bg-secondary",
        addon: "flex items-center rounded-sm bg-primary shadow-xs ring-1 ring-inset ring-border-primary",
        icon: "text-utility-neutral-500",
    },
};

const getSizeClasses = (
    theme?: Theme,
    text?: boolean,
    icon?: boolean,
): Record<Align, Record<Size, { root?: string; addon?: string; icon?: string; dot?: string }>> => ({
    leading: {
        md: {
            root: cx("py-xs pr-md pl-xs text-xxs font-medium", !text && !icon && "pr-xs"),
            addon: cx("px-md py-xxs", theme === "modern" && "gap-xs px-sm", text && "mr-md"),
            icon: "ml-xs size-4",
        },
        lg: {
            root: cx("py-xs pr-md pl-xs text-xs font-medium", !text && !icon && "pr-xs"),
            addon: cx("px-lg py-xxs", theme === "modern" && "gap-sm px-md", text && "mr-md"),
            icon: "ml-xs size-4",
        },
    },
    trailing: {
        md: {
            root: cx("py-xs pr-xs pl-lg text-xxs font-medium", theme === "modern" && "pl-lg"),
            addon: cx("py-xxs pr-sm pl-md", theme === "modern" && "pr-sm pl-md", text && "ml-md"),
            icon: "ml-xxs size-3 stroke-[3px]",
            dot: "mr-sm",
        },
        lg: {
            root: "py-xs pr-xs pl-lg text-xs font-medium",
            addon: cx("py-xxs pr-md pl-lg", theme === "modern" && "pr-sm pl-md", text && "ml-md"),
            icon: "ml-xs size-3 stroke-[3px]",
            dot: "mr-md",
        },
    },
});

const colorClasses: Record<Theme, Record<Color, { root?: string; addon?: string; icon?: string; dot?: string }>> = sortCx({
    light: {
        brand: {
            root: "bg-utility-primary-50 text-utility-primary-700 ring-utility-primary-200 hover:bg-utility-primary-100",
            addon: "bg-primary text-current ring-utility-primary-200",
            icon: "text-utility-primary-500",
        },
        gray: {
            root: "bg-utility-neutral-50 text-utility-neutral-700 ring-utility-neutral-200 hover:bg-utility-neutral-100",
            addon: "bg-primary text-current ring-utility-neutral-200",
            icon: "text-utility-neutral-500",
        },
        error: {
            root: "bg-utility-error-50 text-utility-error-700 ring-utility-error-200 hover:bg-utility-error-100",
            addon: "bg-primary text-current ring-utility-error-200",
            icon: "text-utility-error-500",
        },
        warning: {
            root: "bg-utility-warning-50 text-utility-warning-700 ring-utility-warning-200 hover:bg-utility-warning-100",
            addon: "bg-primary text-current ring-utility-warning-200",
            icon: "text-utility-warning-500",
        },
        success: {
            root: "bg-utility-success-50 text-utility-success-700 ring-utility-success-200 hover:bg-utility-success-100",
            addon: "bg-primary text-current ring-utility-success-200",
            icon: "text-utility-success-500",
        },
    },
    modern: {
        brand: {
            dot: "bg-utility-primary-500 outline-3 -outline-offset-1 outline-utility-primary-100",
        },
        gray: {
            dot: "bg-utility-neutral-500 outline-3 -outline-offset-1 outline-utility-neutral-100",
        },
        error: {
            dot: "bg-utility-error-500 outline-3 -outline-offset-1 outline-utility-error-100",
        },
        warning: {
            dot: "bg-utility-warning-500 outline-3 -outline-offset-1 outline-utility-warning-100",
        },
        success: {
            dot: "bg-utility-success-500 outline-3 -outline-offset-1 outline-utility-success-100",
        },
    },
});


export const BadgeGroup = ({
    children,
    addonText,
    size = "md",
    color = "brand",
    theme = "light",
    align = "leading",
    className,
    iconTrailing: IconTrailing = ArrowRight,
}: BadgeGroupProps) => {
    const colors = colorClasses[theme][color];
    const sizes = getSizeClasses(theme, !!children, !!IconTrailing)[align][size];

    const rootClasses = cx(
        "inline-flex w-max cursor-pointer items-center transition duration-100 ease-linear",
        baseClasses[theme].root,
        sizes.root,
        colors.root,
        className,
    );
    const addonClasses = cx("inline-flex items-center", baseClasses[theme].addon, sizes.addon, colors.addon);
    const dotClasses = cx("inline-block size-2 shrink-0 rounded-full", sizes.dot, colors.dot);
    const iconClasses = cx(baseClasses[theme].icon, sizes.icon, colors.icon);

    if (align === "trailing") {
        return (
            <div className={rootClasses}>
                {theme === "modern" && <span className={dotClasses} />}

                {children}

                <span className={addonClasses}>
                    {addonText}

                    {/* Trailing icon */}
                    {isReactComponent(IconTrailing) && <IconTrailing className={iconClasses} />}
                    {isValidElement(IconTrailing) && IconTrailing}
                </span>
            </div>
        );
    }

    return (
        <div className={rootClasses}>
            <span className={addonClasses}>
                {theme === "modern" && <span className={dotClasses} />}
                {addonText}
            </span>

            {children}

            {/* Trailing icon */}
            {isReactComponent(IconTrailing) && <IconTrailing className={iconClasses} />}
            {isValidElement(IconTrailing) && IconTrailing}
        </div>
    );
};
