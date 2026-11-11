"use client";

import { createContext, useContext } from "react";
import { Radio as AriaRadio, RadioGroup as AriaRadioGroup } from "react-aria-components";
import { cx } from "../shared/cx";
import type { RadioGroupContextType, RadioButtonBaseProps, RadioButtonProps, RadioGroupProps } from "./Radio.types";
export type { RadioGroupContextType, RadioButtonBaseProps, RadioButtonProps, RadioGroupProps } from "./Radio.types";


const RadioGroupContext = createContext<RadioGroupContextType | null>(null);


export const RadioButtonBase = ({ className, isFocusVisible, isSelected, isDisabled, size = "sm" }: RadioButtonBaseProps) => {
    return (
        <div
            className={cx(
                "flex size-4 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full bg-primary ring-1 ring-border-primary ring-inset",
                size === "md" && "size-5",
                isSelected && "bg-brand-solid ring-bg-brand-solid",
                isDisabled && "cursor-not-allowed opacity-50",
                isDisabled && !isSelected && "bg-tertiary",
                isFocusVisible && "ring-focus",
                className,
            )}
        >
            <div className={cx("size-1.5 rounded-full bg-fg-white opacity-0 transition", size === "md" && "size-2", isSelected && "opacity-100")} />
        </div>
    );
};
RadioButtonBase.displayName = "RadioButtonBase";


export const RadioButton = ({ label, hint, className, size = "sm", ...ariaRadioProps }: RadioButtonProps) => {
    const context = useContext(RadioGroupContext);

    size = context?.size ?? size;

    const sizes = {
        sm: {
            root: "gap-md",
            textWrapper: "",
            label: "text-xs font-medium",
            hint: "text-xs",
        },
        md: {
            root: "gap-lg",
            textWrapper: "gap-xxs",
            label: "text-sm font-medium",
            hint: "text-sm",
        },
    };

    return (
        <AriaRadio
            {...ariaRadioProps}
            className={(state) =>
                cx(
                    "relative flex items-start",
                    state.isDisabled && "cursor-not-allowed",
                    sizes[size].root,
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {({ isSelected, isDisabled, isFocusVisible }) => (
                <>
                    <RadioButtonBase
                        size={size}
                        isSelected={isSelected}
                        isDisabled={isDisabled}
                        isFocusVisible={isFocusVisible}
                        className={label || hint ? "mt-xxs" : ""}
                    />
                    {(label || hint) && (
                        <div className={cx("inline-flex flex-col", sizes[size].textWrapper)}>
                            {label && <p className={cx("text-secondary select-none", sizes[size].label)}>{label}</p>}
                            {hint && (
                                <span className={cx("text-tertiary", sizes[size].hint)} onClick={(event) => event.stopPropagation()}>
                                    {hint}
                                </span>
                            )}
                        </div>
                    )}
                </>
            )}
        </AriaRadio>
    );
};
RadioButton.displayName = "RadioButton";


export const RadioGroup = ({ children, className, size = "sm", ...props }: RadioGroupProps) => {
    return (
        <RadioGroupContext.Provider value={{ size }}>
            <AriaRadioGroup {...props} className={cx("flex flex-col gap-xl", className)}>
                {children}
            </AriaRadioGroup>
        </RadioGroupContext.Provider>
    );
};
