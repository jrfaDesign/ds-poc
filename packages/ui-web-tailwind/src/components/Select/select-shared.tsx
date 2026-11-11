"use client";

import type { FC, ReactNode } from "react";
import { createContext } from "react";

export type SelectItemType = {
    /** Unique identifier for the item. */
    id: string | number;
    /** The primary display text. */
    label?: string;
    /** Avatar image URL. */
    avatarUrl?: string;
    /** Whether the item is disabled. */
    isDisabled?: boolean;
    /** Secondary text displayed alongside the label. */
    supportingText?: string;
    /** Leading icon component or element. */
    icon?: FC | ReactNode;
};

export interface CommonProps {
    /** Helper text displayed below the input. */
    hint?: string;
    /** Field label displayed above the input. */
    label?: string;
    /** Tooltip text for the help icon next to the label. */
    tooltip?: string;
    /**
     * The size of the component.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";
    /** Placeholder text when no value is selected. */
    placeholder?: string;
    /** Whether to hide the required indicator from the label. */
    hideRequiredIndicator?: boolean;
}

export const sizes = {
    sm: {
        root: "py-md pl-lg pr-lg gap-md *:data-icon:size-4 *:data-icon:stroke-[2.25px]",
        withIcon: "",
        text: "text-xs",
        textContainer: "gap-x-sm",
        shortcut: "pr-lg",
    },
    md: { root: "py-md px-lg gap-md *:data-icon:size-5", withIcon: "", text: "text-sm", textContainer: "gap-x-sm", shortcut: "pr-lg" },
    lg: { root: "py-lg px-xl gap-md *:data-icon:size-5", withIcon: "", text: "text-sm", textContainer: "gap-x-sm", shortcut: "pr-lg" },
};

export const SelectContext = createContext<{ size: "sm" | "md" | "lg" }>({ size: "md" });
