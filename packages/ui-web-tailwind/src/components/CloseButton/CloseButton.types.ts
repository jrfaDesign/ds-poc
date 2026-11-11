import type { ButtonProps as AriaButtonProps } from "react-aria-components";
export interface CloseButtonProps extends AriaButtonProps {
    /** Whether the icon is styled for a light background (`light`) or a dark one (`dark`). */
    theme?: "light" | "dark";
    /** Controls the dimensions of the button and its icon. */
    size?: "xs" | "sm" | "md" | "lg";
    /** The accessible name of the button, applied as `aria-label`. Defaults to "Close". */
    label?: string;
    /**
     * The React Aria slot the button fills. Defaults to `"close"` so it
     * automatically closes a parent `Dialog`/`Modal` without an explicit handler.
     * Pass `null` to opt out (e.g. when used as a `SearchField` clear button it
     * is picked up regardless of slot).
     * @default "close"
     */
    slot?: string | null;
}
