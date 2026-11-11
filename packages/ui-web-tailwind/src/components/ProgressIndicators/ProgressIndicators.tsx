"use client";

import { cx } from "../shared/cx";
import type { ProgressBarProps, ProgressIndicatorWithTextProps } from "./ProgressIndicators.types";
export type { ProgressBarProps, ProgressIndicatorWithTextProps } from "./ProgressIndicators.types";


/**
 * A basic progress bar component.
 */
export const ProgressBarBase = ({ value, min = 0, max = 100, className, progressClassName }: ProgressBarProps) => {
    const percentage = ((value - min) * 100) / (max - min);

    return (
        <div
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={max}
            className={cx("h-2 w-full overflow-hidden rounded-sm bg-quaternary", className)}
        >
            <div
                // Use transform instead of width to avoid layout thrashing (and for smoother animation)
                style={{ transform: `translateX(-${100 - percentage}%)` }}
                className={cx("size-full rounded-sm bg-fg-brand-primary transition duration-75 ease-linear", progressClassName)}
            />
        </div>
    );
};

export type ProgressBarLabelPosition = "right" | "bottom" | "top-floating" | "bottom-floating";


/**
 * A progress bar component that displays the value text in various configurable layouts.
 */
export const ProgressBar = ({ value, min = 0, max = 100, valueFormatter, labelPosition, className, progressClassName }: ProgressIndicatorWithTextProps) => {
    const percentage = ((value - min) * 100) / (max - min);
    const formattedValue = valueFormatter ? valueFormatter(value, percentage) : `${percentage.toFixed(0)}%`; // Default to rounded percentage

    const baseProgressBar = <ProgressBarBase min={min} max={max} value={value} className={className} progressClassName={progressClassName} />;

    switch (labelPosition) {
        case "right":
            return (
                <div className="flex items-center gap-lg">
                    {baseProgressBar}
                    <span className="shrink-0 text-xs font-medium text-secondary tabular-nums">{formattedValue}</span>
                </div>
            );
        case "bottom":
            return (
                <div className="flex flex-col items-end gap-md">
                    {baseProgressBar}
                    <span className="text-xs font-medium text-secondary tabular-nums">{formattedValue}</span>
                </div>
            );
        case "top-floating":
            return (
                <div className="relative flex flex-col items-end gap-md">
                    {baseProgressBar}
                    <div
                        style={{ left: `${percentage}%` }}
                        className="absolute -top-2 -translate-x-1/2 -translate-y-full rounded-md bg-primary-alt px-lg py-md shadow-lg ring-1 ring-border-secondary-alt"
                    >
                        <div className="text-xxs font-semibold text-secondary tabular-nums">{formattedValue}</div>
                    </div>
                </div>
            );
        case "bottom-floating":
            return (
                <div className="relative flex flex-col items-end gap-md">
                    {baseProgressBar}
                    <div
                        style={{ left: `${percentage}%` }}
                        className="absolute -bottom-2 -translate-x-1/2 translate-y-full rounded-md bg-primary-alt px-lg py-md shadow-lg ring-1 ring-border-secondary-alt"
                    >
                        <div className="text-xxs font-semibold text-secondary">{formattedValue}</div>
                    </div>
                </div>
            );
        default:
            // Fallback or default case, could render the basic progress bar or throw an error
            return baseProgressBar;
    }
};
