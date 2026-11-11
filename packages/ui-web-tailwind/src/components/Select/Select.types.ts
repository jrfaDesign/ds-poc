import type { FC, ReactNode, RefAttributes } from "react";
import type { SelectProps as AriaSelectProps } from "react-aria-components";
import type { CommonProps, SelectItemType } from "./select-shared";
export interface SelectProps extends Omit<AriaSelectProps<SelectItemType>, "children" | "items">, RefAttributes<HTMLDivElement>, CommonProps {
    /** The options to render in the dropdown. When `children` is a function it is called once per item to render it. */
    items?: SelectItemType[];
    /** Additional classes merged onto the dropdown popover. */
    popoverClassName?: string;
    /** Leading icon shown in the trigger, used as a fallback when the selected item has no icon of its own. Accepts a component reference or a rendered element. */
    icon?: FC | ReactNode;
    /** The dropdown contents: either `Select.Item` elements, or a render function called with each entry of `items`. */
    children: ReactNode | ((item: SelectItemType) => ReactNode);
}
