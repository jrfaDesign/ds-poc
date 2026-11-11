import type { FC, ReactNode, RefAttributes } from "react";
import type { ButtonSize } from "./ButtonGroup";
import type { ToggleButtonGroupProps, ToggleButtonProps } from "react-aria-components";
export interface ButtonGroupItemProps extends ToggleButtonProps, RefAttributes<HTMLButtonElement> {
    /** An icon rendered before the label. Passing only an icon with no children renders an icon-only button. */
    iconLeading?: FC<{ className?: string }> | ReactNode;
    /** An icon rendered after the label. */
    iconTrailing?: FC<{ className?: string }> | ReactNode;
    /** Handler called when the button is clicked. */
    onClick?: () => void;
    /** The class name applied to the button. */
    className?: string;
}

export interface ButtonGroupProps extends Omit<ToggleButtonGroupProps, "orientation">, RefAttributes<HTMLDivElement> {
    /** Controls the padding, text size and icon size of every item in the group. */
    size?: ButtonSize;
    /** The class name applied to the group wrapper. */
    className?: string;
}
