/**
 * Props shared by the web and React Native Toggle.
 * The label stays platform-side (`ReactNode` + platform style).
 */
export type ToggleSharedProps = {
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	disabled?: boolean;
};
