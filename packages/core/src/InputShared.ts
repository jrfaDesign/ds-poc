/** Validation/status state shared by the web and React Native Input. */
export type InputStatus = 'default' | 'error' | 'success';

/** Size preset shared by both platforms. */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Props that are identical on every platform. The change handler stays
 * platform-native (web `ChangeEvent`, RN text string).
 */
export type InputSharedProps = {
	label?: string;
	placeholder?: string;
	size?: InputSize;
	status?: InputStatus;
	value?: string;
	defaultValue?: string;
	disabled?: boolean;
	id?: string;
};
