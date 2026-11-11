"use client";

import { type ReactNode, type Ref, createContext, useContext } from "react";
import { ChevronDown, ChevronUp, Minus, Plus } from "@untitledui/icons";
import {
    Button as AriaButton,
    type DateFieldProps as AriaDateFieldProps,
    Group as AriaGroup,
    Input as AriaInput,
    type InputProps as AriaInputProps,
    NumberField as AriaNumberField,
    type NumberFieldProps as AriaNumberFieldProps,
    type DateValue,
} from "react-aria-components";
import { cx } from "../shared/cx";
import { Button } from "../Button/Button";
import { HintText } from "./hint-text";
import { Label } from "./label";

const NumberFieldContext = createContext<{
    size?: "sm" | "md" | "lg";
    wrapperClassName?: string;
    iconClassName?: string;
    tooltipClassName?: string;
    inputClassName?: string;
}>({});

const styles = {
    sm: "px-lg py-md text-xs",
    md: "px-lg py-md text-sm",
    lg: "px-xl py-lg text-sm",
};

export interface InputNumberBaseProps extends AriaNumberFieldProps {
    /**
     * Input size.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";
    /** Placeholder text. */
    placeholder?: string;
    /** Class name for the input. */
    inputClassName?: string;
    /** Class name for the input wrapper. */
    wrapperClassName?: string;
    /** Ref for the underlying input element. */
    ref?: Ref<HTMLInputElement>;
    /** Ref for the group element that wraps the input and its stepper buttons. */
    groupRef?: Ref<HTMLDivElement>;
    /** Orientation of buttons. */
    orientation?: "horizontal" | "vertical";
}

export const InputNumberBase = ({
    ref,
    groupRef,
    size = "md",
    isInvalid,
    isDisabled,
    placeholder,
    wrapperClassName,
    inputClassName,
    orientation = "vertical",
    // Omit this prop to avoid invalid HTML attribute warning
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isRequired: _isRequired,
    ...inputProps
}: Omit<InputNumberBaseProps, "label" | "hint">) => {
    // If the input is inside a `TextFieldContext`, use its context to simplify applying styles
    const context = useContext(NumberFieldContext);

    const inputSize = context?.size || size;

    return (
        <AriaGroup
            {...{ isDisabled, isInvalid }}
            ref={groupRef}
            className={({ isFocusWithin, isDisabled, isInvalid }) =>
                cx(
                    "relative flex w-full flex-row items-stretch rounded-input bg-primary shadow-xs outline-1 -outline-offset-1 outline-border-primary transition-all duration-100 ease-linear",

                    isFocusWithin && !isDisabled && "ring-focus",

                    // Disabled state styles
                    isDisabled && "cursor-not-allowed opacity-50 in-data-input-wrapper:opacity-100",
                    "group-disabled:cursor-not-allowed group-disabled:opacity-50 in-data-input-wrapper:group-disabled:opacity-100",

                    // Invalid state styles
                    isInvalid && "outline-border-error-subtle",
                    "group-invalid:outline-border-error-subtle",

                    // Invalid state with focus-within styles
                    isInvalid && isFocusWithin && "ring-focus-error",
                    isFocusWithin && "group-invalid:ring-focus-error",

                    context?.wrapperClassName,
                    wrapperClassName,
                )
            }
        >
            {orientation === "horizontal" && (
                <Button size={size} iconLeading={Minus} slot="decrement" color="tertiary" className="static h-full rounded-r-none" />
            )}

            {/* Input field */}
            <AriaInput
                {...(inputProps as AriaInputProps)}
                ref={ref}
                placeholder={placeholder}
                className={cx(
                    "m-0 w-full bg-transparent text-primary ring-0 outline-hidden placeholder:text-placeholder autofill:rounded-input autofill:text-primary disabled:cursor-not-allowed",
                    orientation === "horizontal" && "text-center",
                    styles[inputSize],
                    context?.inputClassName,
                    inputClassName,
                )}
            />

            {orientation === "horizontal" && (
                <Button size={size} iconLeading={Plus} slot="increment" color="tertiary" className="static h-full rounded-l-none" />
            )}

            {orientation === "vertical" && (
                <div className={cx("flex w-7 shrink-0 flex-col border-l border-primary", size === "lg" && "w-7.5")}>
                    <AriaButton
                        slot="increment"
                        className="flex flex-1 cursor-pointer items-center justify-center text-fg-quaternary focus-visible:ring-focus transition duration-100 ease-linear hover:bg-primary-hover hover:text-fg-quaternary-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronUp className={cx("size-3 stroke-3", size === "lg" && "size-3.5 stroke-[2.57px]")} />
                    </AriaButton>
                    <AriaButton
                        slot="decrement"
                        className="flex flex-1 cursor-pointer items-center justify-center border-t border-primary text-fg-quaternary focus-visible:ring-focus transition duration-100 ease-linear hover:bg-primary-hover hover:text-fg-quaternary-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronDown className={cx("size-3 stroke-3", size === "lg" && "size-3.5 stroke-[2.57px]")} />
                    </AriaButton>
                </div>
            )}
        </AriaGroup>
    );
};

interface InputProps extends InputNumberBaseProps, Pick<AriaDateFieldProps<DateValue>, "granularity"> {
    /** Label text for the input */
    label?: string;
    /** Helper text displayed below the input */
    hint?: ReactNode;
    /** Whether to hide the required indicator from the label. */
    hideRequiredIndicator?: boolean;
}

export const InputNumber = ({
    size = "md",
    placeholder,
    label,
    hint,
    hideRequiredIndicator,
    className,
    ref,
    groupRef,
    inputClassName,
    wrapperClassName,
    orientation = "vertical",
    ...props
}: InputProps) => {
    return (
        <AriaNumberField
            {...props}
            className={(state) =>
                cx("group flex h-max w-full flex-col items-start justify-start gap-sm", typeof className === "function" ? className(state) : className)
            }
        >
            {({ isInvalid, isRequired }) => (
                <>
                    {label && (
                        <Label isRequired={hideRequiredIndicator ? !hideRequiredIndicator : isRequired} isInvalid={isInvalid}>
                            {label}
                        </Label>
                    )}

                    <InputNumberBase
                        {...{
                            ref,
                            groupRef,
                            size,
                            placeholder,
                            inputClassName,
                            wrapperClassName,
                            orientation,
                        }}
                    />

                    {hint && (
                        <HintText isInvalid={isInvalid} className={cx(size === "sm" && "text-xxs")}>
                            {hint}
                        </HintText>
                    )}
                </>
            )}
        </AriaNumberField>
    );
};
