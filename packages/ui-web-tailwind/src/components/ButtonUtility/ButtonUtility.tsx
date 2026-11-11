"use client";

import type { ReactElement } from "react";
import { isValidElement } from "react";
import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import { Button as AriaButton, Link as AriaLink } from "react-aria-components";
import { Tooltip } from "../Tooltip/Tooltip";
import { cx } from "../shared/cx";
import { isReactComponent } from "../shared/is-react-component";
import type { LinkProps, ButtonProps } from "./ButtonUtility.types";
export type { CommonProps, LinkProps, ButtonProps, Props } from "./ButtonUtility.types";

export const styles = {
    secondary:
        "bg-primary text-fg-quaternary shadow-xs ring-1 ring-border-primary ring-inset hover:bg-primary-hover hover:text-fg-quaternary-hover disabled:shadow-xs",
    tertiary: "text-fg-quaternary hover:bg-primary-hover hover:text-fg-quaternary-hover",
};





export const ButtonUtility: {
    (props: LinkProps): ReactElement<LinkProps>;
    (props: ButtonProps): ReactElement<ButtonProps>;
} = ({ tooltip, className, isDisabled, icon: Icon, size = "sm", color = "secondary", tooltipPlacement = "top", ...props }) => {
    const commonProps = {
        "aria-label": tooltip,
        ...props,
        isDisabled,
        className: cx(
            "group relative inline-flex h-max cursor-pointer items-center justify-center rounded-button p-sm focus-visible:ring-focus transition duration-100 ease-linear disabled:cursor-not-allowed disabled:opacity-50",
            styles[color],

            // Icon styles
            "*:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition",
            size === "xs" ? "*:data-icon:size-4" : "*:data-icon:size-5",

            className,
        ),
        children: (
            <>
                {isReactComponent(Icon) && <Icon data-icon />}
                {isValidElement(Icon) && Icon}
            </>
        ),
    };

    let content: ReactElement;

    if ("href" in commonProps) {
        const { href: linkHref, ...rest } = commonProps;

        // An explicitly `undefined` href (e.g. a disabled prev/next control) renders a
        // real <button> rather than React Aria's link fallback <span>.
        content = linkHref ? (
            <AriaLink {...commonProps} href={isDisabled ? undefined : linkHref} />
        ) : (
            <AriaButton {...(rest as AriaButtonProps)} type="button" />
        );
    } else {
        content = <AriaButton {...commonProps} type={commonProps.type || "button"} />;
    }

    if (tooltip) {
        return (
            <Tooltip title={tooltip} placement={tooltipPlacement} isDisabled={isDisabled} offset={size === "xs" ? 4 : 6}>
                {content}
            </Tooltip>
        );
    }

    return content;
};
