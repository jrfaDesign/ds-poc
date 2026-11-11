"use client";

import { X as CloseIcon } from "@untitledui/icons";
import { Button as AriaButton } from "react-aria-components";
import { cx } from "../shared/cx";
import type { CloseButtonProps } from "./CloseButton.types";
export type { CloseButtonProps } from "./CloseButton.types";

const sizes = {
    xs: { root: "size-7", icon: "size-4" },
    sm: { root: "size-9", icon: "size-5" },
    md: { root: "size-10", icon: "size-5" },
    lg: { root: "size-11", icon: "size-6" },
};

const themes = {
    light: "text-fg-quaternary hover:bg-primary-hover hover:text-fg-quaternary-hover focus-visible:ring-focus",
    dark: "text-fg-white/70 hover:text-fg-white hover:bg-white/20 focus-visible:ring-focus",
};


export const CloseButton = ({ label, className, size = "sm", theme = "light", slot = "close", ...otherProps }: CloseButtonProps) => {
    return (
        <AriaButton
            {...otherProps}
            slot={slot}
            aria-label={label || "Close"}
            className={(state) =>
                cx(
                    "flex cursor-pointer items-center justify-center rounded-md p-md transition duration-100 ease-linear focus:outline-hidden",
                    sizes[size].root,
                    themes[theme],
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            <CloseIcon aria-hidden="true" className={cx("shrink-0 transition", sizes[size].icon)} />
        </AriaButton>
    );
};
