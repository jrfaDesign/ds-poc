import type { SliderProps as AriaSliderProps } from "react-aria-components";
import type { styles } from "./Slider";
export interface SliderProps extends AriaSliderProps {
	/** Where the value label sits relative to the thumb. `default` hides it, `bottom` places it below, and `top-floating` shows it in a tooltip above. */
	labelPosition?: keyof typeof styles;
	/** Formats the value shown in the label. Called with the raw thumb value. Without it the value is formatted as a percentage. */
	labelFormatter?: (value: number) => string;
}
