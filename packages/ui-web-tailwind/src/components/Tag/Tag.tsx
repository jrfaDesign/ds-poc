"use client";

import { type ImgHTMLAttributes, type PropsWithChildren, createContext, useContext, useState } from "react";
import { User01 } from "@untitledui/icons";
import { Tag as AriaTag, TagGroup as AriaTagGroup, TagList as AriaTagList } from "react-aria-components";
import { Dot } from "../shared/dot-icon";
import { cx } from "../shared/cx";
import { TagCheckbox } from "./base-components/tag-checkbox";
import { TagCloseX } from "./base-components/tag-close-x";
import type { TagGroupProps, TagProps } from "./Tag.types";
export type { TagItem, TagGroupProps, TagProps } from "./Tag.types";

export const TagAvatar = ({
    src,
    alt,
    contrastBorder = true,
    className,
}: ImgHTMLAttributes<HTMLImageElement> & {
    /** Whether to draw a subtle dark outline around the avatar so it stays visible on light images. */
    contrastBorder?: boolean;
}) => {
    const [isFailed, setIsFailed] = useState(false);

    return (
        <div
            className={cx(
                "relative inline-flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full bg-tertiary",
                contrastBorder && "outline-[0.5px] -outline-offset-[0.5px] outline-black/16",
                className,
            )}
        >
            {src && !isFailed ? (
                <img data-avatar-img className="size-full object-cover" src={src} alt={alt} onError={() => setIsFailed(true)} />
            ) : (
                <User01 className="size-3 stroke-[2.25px] text-fg-quaternary" />
            )}
        </div>
    );
};


const TagGroupContext = createContext<{
    selectionMode: "none" | "single" | "multiple";
    size: "sm" | "md" | "lg";
}>({
    selectionMode: "none",
    size: "sm",
});


export const TagGroup = ({ label, selectionMode = "none", size = "sm", children, ...otherProps }: TagGroupProps) => {
    return (
        <TagGroupContext.Provider value={{ selectionMode, size }}>
            <AriaTagGroup aria-label={label} selectionMode={selectionMode} disallowEmptySelection={selectionMode === "single"} {...otherProps}>
                {children}
            </AriaTagGroup>
        </TagGroupContext.Provider>
    );
};

export const TagList = AriaTagList;

const styles = {
    sm: {
        root: {
            base: "px-md py-xs text-xxs font-medium",
            withCheckbox: "pl-sm",
            withAvatar: "pl-xs",
            withDot: "pl-sm",
            withCount: "pr-xs",
            withClose: "pr-xs",
        },
        content: "gap-xs",
        count: "px-xs text-xxs font-medium",
    },
    md: {
        root: {
            base: "px-md py-xxs text-xs font-medium",
            withCheckbox: "pl-xs",
            withAvatar: "pl-sm",
            withDot: "pl-md",
            withCount: "pr-xs",
            withClose: "pr-xs",
        },
        content: "gap-sm",
        count: "px-sm text-xxs font-medium",
    },
    lg: {
        root: {
            base: "px-lg py-xs text-xs font-medium",
            withCheckbox: "pl-sm",
            withAvatar: "pl-md",
            withDot: "pl-md",
            withCount: "pr-xs",
            withClose: "pr-xs",
        },
        content: "gap-sm",
        count: "px-sm text-xs font-medium",
    },
};


export const Tag = ({
    id,
    avatarSrc,
    avatarContrastBorder = true,
    dot,
    dotClassName,
    isDisabled,
    count,
    className,
    children,
    onClose,
}: PropsWithChildren<TagProps>) => {
    const context = useContext(TagGroupContext);

    const leadingContent = avatarSrc ? (
        <TagAvatar src={avatarSrc} alt="Avatar" contrastBorder={avatarContrastBorder} />
    ) : dot ? (
        <Dot className={cx("text-fg-success-secondary", dotClassName)} size="sm" />
    ) : null;

    return (
        <AriaTag
            id={id}
            isDisabled={isDisabled}
            textValue={typeof children === "string" ? children : undefined}
            className={(state) =>
                cx(
                    "flex cursor-default items-center gap-xs rounded-sm bg-primary text-secondary ring-1 ring-border-primary focus-visible:ring-focus transition duration-50 ease-linear ring-inset",
                    styles[context.size].root.base,

                    // With avatar
                    avatarSrc && styles[context.size].root.withAvatar,
                    // With X button
                    (onClose || state.allowsRemoving) && styles[context.size].root.withClose,
                    // With dot
                    dot && styles[context.size].root.withDot,
                    // With count
                    typeof count === "number" && styles[context.size].root.withCount,
                    // With checkbox
                    context.selectionMode !== "none" && styles[context.size].root.withCheckbox,
                    // Disabled
                    isDisabled && "cursor-not-allowed",

                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {({ isSelected, isDisabled, allowsRemoving }) => (
                <>
                    <div className={cx("flex items-center gap-xs", styles[context.size].content)}>
                        {context.selectionMode !== "none" && <TagCheckbox size={context.size} isSelected={isSelected} isDisabled={isDisabled} />}

                        {leadingContent}

                        {children}

                        {typeof count === "number" && (
                            <span className={cx("flex items-center justify-center rounded-xs bg-tertiary text-center", styles[context.size].count)}>
                                {count}
                            </span>
                        )}
                    </div>

                    {(onClose || allowsRemoving) && (
                        <TagCloseX size={context.size} excludeFromTabOrder={allowsRemoving} onPress={() => id && onClose?.(id.toString())} />
                    )}
                </>
            )}
        </AriaTag>
    );
};
