"use client";

import type { RefAttributes } from "react";
import { XClose } from "@untitledui/icons";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { cx } from "../../shared/cx";

interface TagCloseXProps extends AriaButtonProps, RefAttributes<HTMLButtonElement> {
    size?: "sm" | "md" | "lg";
    className?: string;
}

const styles = {
    sm: { root: "p-xxs", icon: "size-2.5 stroke-[3.6px]" },
    md: { root: "p-xxs", icon: "size-3 stroke-[2.86px]" },
    lg: { root: "p-xs", icon: "size-3.5 stroke-3" },
};

export const TagCloseX = ({ size = "md", className, ...otherProps }: TagCloseXProps) => {
    return (
        <AriaButton
            slot="remove"
            aria-label="Remove this tag"
            className={cx(
                "flex cursor-pointer rounded-xs text-fg-quaternary outline-transparent transition duration-100 ease-linear hover:bg-primary-hover hover:text-fg-quaternary-hover focus-visible:ring-focus disabled:cursor-not-allowed",
                styles[size].root,
                className,
            )}
            {...otherProps}
        >
            <XClose className={cx("transition", styles[size].icon)} />
        </AriaButton>
    );
};
