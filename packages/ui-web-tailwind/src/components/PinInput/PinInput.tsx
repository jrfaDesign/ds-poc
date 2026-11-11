"use client";

import type { ComponentPropsWithRef } from "react";
import { createContext, useContext, useId } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { HintText } from "../Input/hint-text";
import { Label as LabelBase } from "../Input/label";
import { cx } from "../shared/cx";
import type { RootProps, GroupProps } from "./PinInput.types";
export type { RootProps, GroupProps } from "./PinInput.types";

export type PinInputSize = "xxxs" | "xxs" | "xs" | "sm" | "md" | "lg";

type PinInputContextType = {
    /** The size the root was rendered with, used by the slots and the caret to pick their dimensions and type scale. */
    size: PinInputSize;
    /** Whether the root marked the input as disabled. */
    disabled: boolean;
    /** Generated id shared by the input, its label and its description so they stay wired together. */
    id: string;
    /** Whether the root marked the entered code as invalid. */
    invalid: boolean;
};

const PinInputContext = createContext<PinInputContextType>({
    size: "sm",
    id: "",
    disabled: false,
    invalid: false,
});

export const usePinInputContext = () => {
    const context = useContext(PinInputContext);

    if (!context) {
        throw new Error("The 'usePinInputContext' hook must be used within a '<PinInput />'");
    }

    return context;
};


const Root = ({ className, size = "md", disabled = false, invalid = false, ...props }: RootProps) => {
    const id = useId();

    return (
        <PinInputContext.Provider value={{ size, disabled, id, invalid }}>
            <div role="group" className={cx("flex h-max flex-col gap-sm", className)} {...props} />
        </PinInputContext.Provider>
    );
};
Root.displayName = "Root";

const styles = {
    xxxs: { group: "gap-sm h-9", slot: "size-9 px-lg py-md text-xs rounded-input font-medium text-placeholder/50", caret: "text-xs font-medium" },
    xxs: { group: "gap-md h-10", slot: "size-10 px-lg py-md text-sm rounded-input font-medium text-placeholder/50", caret: "text-sm font-medium" },
    xs: { group: "gap-md h-11", slot: "size-11 px-xl py-lg text-sm rounded-input font-medium text-placeholder/50", caret: "text-sm font-medium" },
    sm: { group: "gap-md h-16.5", slot: "size-16 px-md py-xxs text-4xl font-medium", caret: "text-4xl font-medium" },
    md: { group: "gap-lg h-20.5", slot: "size-20 px-md py-lg text-4xl font-medium", caret: "text-4xl font-medium" },
    lg: { group: "gap-lg h-24.5", slot: "size-24 px-md py-lg text-5xl font-medium", caret: "text-5xl font-medium" },
};


const Group = ({ inputClassName, containerClassName, width, maxLength = 4, ...props }: GroupProps) => {
    const { id, size, disabled } = usePinInputContext();

    return (
        <OTPInput
            {...props}
            size={width}
            maxLength={maxLength}
            disabled={disabled}
            id={"pin-input-" + id}
            aria-label="Enter your pin"
            aria-labelledby={"pin-input-label-" + id}
            aria-describedby={"pin-input-description-" + id}
            containerClassName={cx("flex flex-row", styles[size].group, containerClassName)}
            className={cx("disabled:cursor-not-allowed", inputClassName)}
        />
    );
};
Group.displayName = "Group";

const Slot = ({
    index,
    className,
    ...props
}: ComponentPropsWithRef<"div"> & {
    /** Zero-based position of the slot in the group. Selects which character of the entered value it displays, whether it shows the caret, and what its `aria-label` announces. */
    index: number;
}) => {
    const { size, disabled, invalid } = usePinInputContext();
    const { slots, isFocused } = useContext(OTPInputContext);

    const slot = slots[index];

    return (
        <div
            {...props}
            aria-invalid={invalid}
            aria-label={"Enter digit " + (index + 1) + " of " + slots.length}
            className={cx(
                "relative flex items-center justify-center rounded-lg bg-primary text-center text-placeholder/40 shadow-xs transition-[box-shadow,background-color] duration-100 ease-linear ring-inset",
                styles[size].slot,
                // UntitledUI: active slot = 2px brand ring + outline; filled = 2px brand ring; invalid = subtle error ring
                invalid
                    ? "ring-1 ring-border-error-subtle"
                    : isFocused && slot?.isActive
                      ? "ring-2 ring-border-brand outline-2 outline-offset-2 outline-border-brand"
                      : slot?.char
                        ? "ring-2 ring-border-brand"
                        : "ring-1 ring-border-primary",
                slot?.char && "text-brand-tertiary-alt",
                disabled && "opacity-50",
                invalid && "text-error-primary",
                className,
            )}
        >
            {slot?.char ? slot.char : slot?.hasFakeCaret ? <FakeCaret size={size} /> : 0}
        </div>
    );
};
Slot.displayName = "Slot";

const FakeCaret = ({ size = "md" }: { size?: PinInputSize }) => {
    return <div className={cx("pointer-events-none h-[1em] w-0.5 animate-caret-blink bg-fg-brand-primary", styles[size].caret)} />;
};

const Separator = (props: ComponentPropsWithRef<"div">) => {
    return (
        <div role="separator" {...props} className={cx("text-center text-5xl font-medium text-utility-neutral-300", props.className)}>
            -
        </div>
    );
};
Separator.displayName = "Separator";

const Label = (props: ComponentPropsWithRef<typeof LabelBase>) => {
    const { id } = usePinInputContext();

    return <LabelBase {...props} htmlFor={"pin-input-" + id} id={"pin-input-label-" + id} />;
};
Label.displayName = "Label";

const Description = (props: ComponentPropsWithRef<typeof HintText>) => {
    const { id, size } = usePinInputContext();

    return <HintText {...props} id={"pin-input-description-" + id} role="description" className={cx(size === "xxxs" && "text-xxs")} />;
};
Description.displayName = "Description";

const PinInput = Root as typeof Root & {
    Slot: typeof Slot;
    Label: typeof Label;
    Group: typeof Group;
    Separator: typeof Separator;
    Description: typeof Description;
};
PinInput.Slot = Slot;
PinInput.Label = Label;
PinInput.Group = Group;
PinInput.Separator = Separator;
PinInput.Description = Description;

export { PinInput };
