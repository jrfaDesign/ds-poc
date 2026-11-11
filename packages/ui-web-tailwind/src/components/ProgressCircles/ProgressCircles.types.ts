export interface ProgressBarProps {
    /** How far along the progress is. Its position between `min` and `max` sets the length of the filled arc and the percentage shown in the middle. */
    value: number;
    /** Lower bound of the range `value` is measured against. */
    min?: number;
    /** Upper bound of the range `value` is measured against. */
    max?: number;
    /** Sets the radius and stroke width of the circle, and the type scale of the value and label inside it. */
    size: "xxs" | "xs" | "sm" | "md" | "lg";
    /** Caption for the progress, shown above the value inside the circle: or below the circle at the `xxs` size, where there is no room for it. */
    label?: string;
    /** Formats the text shown in the middle of the circle. Receives the raw `value` and the percentage it works out to. Without it the percentage is shown with a `%` suffix. */
    valueFormatter?: (value: number, valueInPercentage: number) => string | number;
}
