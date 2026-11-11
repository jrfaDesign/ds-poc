"use client";

import type { ReactElement } from "react";
import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import { Button as AriaButton, Link as AriaLink } from "react-aria-components";
import { cx, sortCx } from "../shared/cx";
import { AppleLogo, DribbleLogo, FacebookLogo, FigmaLogo, FigmaLogoOutlined, GoogleLogo, TwitterLogo } from "./social-logos";
import type { ButtonProps, LinkProps } from "./SocialButton.types";
export type { CommonProps, ButtonProps, LinkProps, SocialButtonProps } from "./SocialButton.types";

export const styles = sortCx({
    common: {
        root: "group disabled:stroke-fg-tertiary disabled:text-fg-tertiary disabled:*:text-fg-tertiary relative inline-flex h-max cursor-pointer items-center justify-center font-semibold whitespace-nowrap focus-visible:ring-focus transition duration-100 ease-linear before:absolute disabled:cursor-not-allowed",
        icon: "pointer-events-none shrink-0 transition",
    },

    sizes: {
        md: {
            root: "gap-md rounded-button px-xl py-lg text-xs before:rounded-button data-icon-only:p-lg",
            icon: "size-4",
        },
        lg: {
            root: "gap-lg rounded-button px-xl py-lg text-sm before:rounded-button data-icon-only:p-lg",
            icon: "size-5",
        },
    },

    colors: {
        gray: {
            root: "bg-primary text-secondary shadow-xs ring-1 ring-border-primary ring-inset hover:bg-primary-hover hover:text-secondary-hover",
            icon: "text-fg-quaternary group-hover:text-fg-quaternary-hover",
        },
        black: {
            root: "bg-black text-white shadow-xs ring-1 ring-transparent ring-inset before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0%",
            icon: "",
        },

        facebook: {
            root: "bg-[#1877F2] text-white shadow-xs ring-1 ring-transparent ring-inset before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0% hover:bg-[#0C63D4]",
            icon: "",
        },

        dribble: {
            root: "bg-[#EA4C89] text-white shadow-xs ring-1 ring-transparent ring-inset before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0% hover:bg-[#E62872]",
            icon: "",
        },
    },
});





export const SocialButton: {
    (props: LinkProps): ReactElement<LinkProps>;
    (props: ButtonProps): ReactElement<ButtonProps>;
} = ({ size = "lg", theme = "brand", social, className, children, isDisabled, disabled, ...props }) => {
    // `disabled` is the deprecated alias of `isDisabled`.
    const isButtonDisabled = isDisabled ?? disabled;

    const isIconOnly = !children;

    const socialToColor = {
        google: "gray",
        facebook: "facebook",
        apple: "black",
        twitter: "black",
        figma: "black",
        dribble: "dribble",
    } as const;

    const colorStyles = theme === "brand" ? styles.colors[socialToColor[social]] : styles.colors.gray;

    const logos = {
        google: GoogleLogo,
        facebook: FacebookLogo,
        apple: AppleLogo,
        twitter: TwitterLogo,
        figma: theme === "gray" ? FigmaLogoOutlined : FigmaLogo,
        dribble: DribbleLogo,
    };

    const Logo = logos[social];

    const commonChildren = (
        <>
            <Logo
                className={cx(
                    styles.common.icon,
                    styles.sizes[size].icon,
                    theme === "gray"
                        ? colorStyles.icon
                        : theme === "brand" && (social === "facebook" || social === "apple" || social === "twitter")
                          ? "text-white"
                          : theme === "color" && (social === "apple" || social === "twitter")
                            ? "text-alpha-black"
                            : "",
                )}
                colorful={
                    (theme === "brand" && (social === "google" || social === "figma")) ||
                    (theme === "color" && (social === "google" || social === "facebook" || social === "figma" || social === "dribble")) ||
                    undefined
                }
            />

            {children}
        </>
    );

    const commonProps = {
        "data-icon-only": isIconOnly ? true : undefined,
        ...props,
        isDisabled: isButtonDisabled,
        className: cx(styles.common.root, styles.sizes[size].root, colorStyles.root, className),
        children: commonChildren,
    };

    if ("href" in commonProps) {
        const { href: linkHref, ...rest } = commonProps;

        // An explicitly `undefined` href renders a real <button> rather than React Aria's
        // link fallback <span>.
        return linkHref ? (
            <AriaLink {...commonProps} href={isButtonDisabled ? undefined : linkHref} />
        ) : (
            <AriaButton {...(rest as AriaButtonProps)} type="button" />
        );
    }

    return <AriaButton {...commonProps} type={commonProps.type || "button"} />;
};
