"use client";

import { cx as clx, sortCx } from "../shared/cx";
import type { ProgressBarProps } from "./ProgressCircles.types";
export type { ProgressBarProps } from "./ProgressCircles.types";


const sizes = sortCx({
    xxs: {
        strokeWidth: 6,
        radius: 29,
        valueClass: "text-xs font-semibold text-primary",
        labelClass: "text-xxs font-medium text-tertiary",
        halfCircleTextPosition: "absolute bottom-0.5 text-center",
    },
    xs: {
        strokeWidth: 16,
        radius: 72,
        valueClass: "text-xl font-semibold text-primary",
        labelClass: "text-xxs font-medium text-tertiary",
        halfCircleTextPosition: "absolute bottom-0.5 text-center",
    },
    sm: {
        strokeWidth: 20,
        radius: 90,
        valueClass: "text-2xl font-semibold text-primary",
        labelClass: "text-xxs font-medium text-tertiary",
        halfCircleTextPosition: "absolute bottom-2 text-center",
    },
    md: {
        strokeWidth: 24,
        radius: 108,
        valueClass: "text-3xl font-semibold text-primary",
        labelClass: "text-xs font-medium text-tertiary",
        halfCircleTextPosition: "absolute bottom-1 text-center",
    },
    lg: {
        strokeWidth: 28,
        radius: 126,
        valueClass: "text-4xl font-semibold text-primary",
        labelClass: "text-xs font-medium text-tertiary",
        halfCircleTextPosition: "absolute bottom-0 text-center",
    },
});

export const ProgressBarCircle = ({ value, min = 0, max = 100, size, label, valueFormatter }: ProgressBarProps) => {
    const percentage = Math.round(((value - min) * 100) / (max - min));

    const sizeConfig = sizes[size];

    const { strokeWidth, radius, valueClass, labelClass } = sizeConfig;

    const diameter = 2 * (radius + strokeWidth / 2);
    const width = diameter;
    const height = diameter;
    const viewBox = `0 0 ${width} ${height}`;
    const cx = diameter / 2;
    const cy = diameter / 2;

    const textPosition = label ? "absolute text-center" : "absolute text-primary";
    const strokeDashoffset = 100 - percentage;

    return (
        <div className="flex flex-col items-center gap-xxs">
            <div role="progressbar" aria-valuenow={value} aria-valuemin={min} aria-valuemax={max} className="relative flex w-max items-center justify-center">
                <svg className="-rotate-90" width={width} height={height} viewBox={viewBox}>
                    {/* Background circle */}
                    <circle
                        className="stroke-bg-quaternary"
                        cx={cx}
                        cy={cy}
                        r={radius}
                        fill="none"
                        strokeWidth={strokeWidth}
                        pathLength="100"
                        strokeDasharray="100"
                        strokeLinecap="round"
                    />

                    {/* Foreground circle */}
                    <circle
                        className="stroke-fg-brand-primary"
                        cx={cx}
                        cy={cy}
                        r={radius}
                        fill="none"
                        strokeWidth={strokeWidth}
                        pathLength="100"
                        strokeDasharray="100"
                        strokeLinecap="round"
                        strokeDashoffset={strokeDashoffset}
                    />
                </svg>
                {label && size !== "xxs" ? (
                    <div className="absolute text-center">
                        <div className={labelClass}>{label}</div>
                        <div className={valueClass}>{valueFormatter ? valueFormatter(value, percentage) : `${percentage}%`}</div>
                    </div>
                ) : (
                    <span className={clx(textPosition, valueClass)}>{valueFormatter ? valueFormatter(value, percentage) : `${percentage}%`}</span>
                )}
            </div>

            {label && size === "xxs" && <div className={labelClass}>{label}</div>}
        </div>
    );
};

export const ProgressBarHalfCircle = ({ value, min = 0, max = 100, size, label, valueFormatter }: ProgressBarProps) => {
    const percentage = Math.round(((value - min) * 100) / (max - min));

    const sizeConfig = sizes[size];

    const { strokeWidth, radius, valueClass, labelClass, halfCircleTextPosition } = sizeConfig;

    const width = 2 * (radius + strokeWidth / 2);
    const height = radius + strokeWidth;
    const viewBox = `0 0 ${width} ${height}`;
    const cx = "50%";
    const cy = radius + strokeWidth / 2;

    const strokeDashoffset = -50 - (100 - percentage) / 2;

    return (
        <div className="flex flex-col items-center gap-xxs">
            <div role="progressbar" aria-valuenow={value} aria-valuemin={min} aria-valuemax={max} className="relative flex w-max items-center justify-center">
                <svg width={width} height={height} viewBox={viewBox}>
                    {/* Background half-circle */}
                    <circle
                        className="stroke-bg-quaternary"
                        cx={cx}
                        cy={cy}
                        r={radius}
                        fill="none"
                        strokeWidth={strokeWidth}
                        pathLength="100"
                        strokeDasharray="100"
                        strokeDashoffset="-50"
                        strokeLinecap="round"
                    />

                    {/* Foreground half-circle */}
                    <circle
                        className="origin-center -scale-x-100 stroke-fg-brand-primary"
                        cx={cx}
                        cy={cy}
                        r={radius}
                        fill="none"
                        strokeWidth={strokeWidth}
                        pathLength="100"
                        strokeDasharray="100"
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </svg>

                {label && size !== "xxs" ? (
                    <div className={halfCircleTextPosition}>
                        <div className={labelClass}>{label}</div>
                        <div className={valueClass}>{valueFormatter ? valueFormatter(value, percentage) : `${percentage}%`}</div>
                    </div>
                ) : (
                    <span className={clx(halfCircleTextPosition, valueClass)}>{valueFormatter ? valueFormatter(value, percentage) : `${percentage}%`}</span>
                )}
            </div>

            {label && size === "xxs" && <div className={labelClass}>{label}</div>}
        </div>
    );
};
