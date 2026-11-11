"use client";

import { type PropsWithChildren, createContext, isValidElement, useContext } from "react";
import { ToggleButton as AriaToggleButton, ToggleButtonGroup as AriaToggleButtonGroup } from "react-aria-components";
import { cx, sortCx } from "../shared/cx";
import { isReactComponent } from "../shared/is-react-component";
import type { ButtonGroupItemProps, ButtonGroupProps } from "./ButtonGroup.types";
export type { ButtonGroupItemProps, ButtonGroupProps } from "./ButtonGroup.types";

export const styles = sortCx({
    common: {
        root: [
            "group/button-group inline-flex h-max cursor-pointer items-center bg-primary font-semibold whitespace-nowrap text-secondary ring-1 ring-border-primary focus-visible:ring-focus transition duration-100 ease-linear ring-inset",
            // Hover and focus styles
            "hover:bg-primary-hover hover:text-secondary-hover focus-visible:z-10 focus-visible:ring-focus",
            // Disabled styles
            "disabled:cursor-not-allowed disabled:text-secondary/50 disabled:*:opacity-50",
            // Selected styles
            "selected:bg-primary-hover selected:text-secondary-hover",
        ].join(" "),
        icon: "pointer-events-none text-fg-quaternary transition-[inherit] group-hover/button-group:text-fg-quaternary-hover group-selected/button-group:text-fg-quaternary-hover",
    },

    sizes: {
        sm: {
            root: "gap-sm px-xl py-md text-xs not-last:pr-[calc(calc(var(--spacing)*3.5)+1px)] first:rounded-l-sm last:rounded-r-sm data-icon-leading:pl-lg data-icon-only:px-lg",
            icon: "size-5",
        },
        md: {
            root: "gap-sm px-xl py-lg text-xs not-last:pr-[calc(calc(var(--spacing)*4)+1px)] first:rounded-l-sm last:rounded-r-sm data-icon-leading:pl-xl data-icon-only:px-lg",
            icon: "size-5",
        },
        lg: {
            root: "gap-md px-2xl py-lg text-sm not-last:pr-[calc(calc(var(--spacing)*4.5)+1px)] first:rounded-l-sm last:rounded-r-sm data-icon-leading:pl-xl data-icon-only:px-xl",
            icon: "size-5",
        },
    },
});

export type ButtonSize = keyof typeof styles.sizes;

const ButtonGroupContext = createContext<{ size: ButtonSize }>({ size: "md" });


export const ButtonGroupItem = ({
    iconLeading: IconLeading,
    iconTrailing: IconTrailing,
    children,
    className,
    ...otherProps
}: PropsWithChildren<ButtonGroupItemProps>) => {
    const context = useContext(ButtonGroupContext);

    if (!context) {
        throw new Error("ButtonGroupItem must be used within a ButtonGroup component");
    }

    const { size } = context;

    const isIcon = (IconLeading || IconTrailing) && !children;

    return (
        <AriaToggleButton
            {...otherProps}
            data-icon-only={isIcon ? true : undefined}
            data-icon-leading={IconLeading ? true : undefined}
            className={cx(styles.common.root, styles.sizes[size].root, className)}
        >
            {isReactComponent(IconLeading) && <IconLeading className={cx(styles.common.icon, styles.sizes[size].icon)} />}
            {isValidElement(IconLeading) && IconLeading}

            {children}

            {isReactComponent(IconTrailing) && <IconTrailing className={cx(styles.common.icon, styles.sizes[size].icon)} />}
            {isValidElement(IconTrailing) && IconTrailing}
        </AriaToggleButton>
    );
};


export const ButtonGroup = ({ children, size = "md", className, ...otherProps }: ButtonGroupProps) => {
    return (
        <ButtonGroupContext.Provider value={{ size }}>
            <AriaToggleButtonGroup
                selectionMode="single"
                className={cx("relative z-0 inline-flex w-max -space-x-px rounded-md shadow-xs", className)}
                {...otherProps}
            >
                {children}
            </AriaToggleButtonGroup>
        </ButtonGroupContext.Provider>
    );
};
