import type { ReactNode, Ref } from "react";
import type { CheckboxProps as AriaCheckboxProps } from "react-aria-components";
export interface CheckboxBaseProps {
    /** Controls the size and corner radius of the box, and the size of the tick and dash icons inside it. */
    size?: "sm" | "md";
    /** Additional classes merged onto the box element. */
    className?: string;
    /** Whether to draw the keyboard focus ring around the box. Normally passed down by `Checkbox` from React Aria's render state rather than set by hand. */
    isFocusVisible?: boolean;
    /** Whether to render the checked appearance: brand-filled box with the tick faded in. Normally passed down by `Checkbox` rather than set by hand. */
    isSelected?: boolean;
    /** Whether to render the dimmed, not-allowed appearance. Normally passed down by `Checkbox` rather than set by hand. */
    isDisabled?: boolean;
    /** Whether to render the mixed appearance: brand-filled box showing a dash, which is drawn instead of the tick even when `isSelected` is set. Normally passed down by `Checkbox` rather than set by hand. */
    isIndeterminate?: boolean;
}

export interface CheckboxProps extends AriaCheckboxProps {
    /** Ref to the underlying label element that wraps the box and the text. */
    ref?: Ref<HTMLLabelElement>;
    /** Controls the box size, the gap between it and the text, and the label and hint typography. */
    size?: "sm" | "md";
    /** Content rendered beside the box. It sits inside the checkbox's label element, so it also acts as the accessible name and toggles the checkbox when clicked. */
    label?: ReactNode;
    /** Supporting text rendered under the label. Clicks on it are stopped so reading the hint does not toggle the checkbox. */
    hint?: ReactNode;
}
