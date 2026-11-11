/** Visual variants shared by the web and React Native Button. */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link' | 'tertiary';

/** Size preset shared by both platforms. */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props that are identical on every platform. The activate handler stays
 * platform-native (web `onClick`, RN `onPress`): platform mechanics never
 * enter core.
 */
export type ButtonSharedProps = {
	/** Visual style variant. */
	variant?: ButtonVariant;
	/** Button size preset. */
	size?: ButtonSize;
	/** Disables the button and applies muted styling. */
	disabled?: boolean;
};
