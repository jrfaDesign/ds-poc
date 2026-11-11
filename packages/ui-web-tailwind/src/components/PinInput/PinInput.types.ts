import type { ComponentPropsWithRef } from "react";
import type { PinInputSize } from "./PinInput";
import type { OTPInput } from "input-otp";
export interface RootProps extends ComponentPropsWithRef<"div"> {
    /** Sets the dimensions, corner radius and type scale of every slot, plus the gap between them. Shared with the sub-components through context. */
    size?: PinInputSize;
    /** Whether the pin cannot be edited. Disables the underlying input and dims the slots. */
    disabled?: boolean;
    /** Whether the entered pin failed validation. Renders the slots in the error style and marks each one `aria-invalid`. */
    invalid?: boolean;
}

export type GroupProps = ComponentPropsWithRef<typeof OTPInput> & {
    /** Character width forwarded to the hidden input as its `size` attribute. Named `width` so it does not clash with the pin input's own `size`. */
    width?: number;
    /** Additional classes for the hidden text input that sits behind the slots and receives the typing. */
    inputClassName?: string;
};
