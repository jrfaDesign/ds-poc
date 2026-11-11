/**
 * Props shared by the web and React Native Checkbox.
 * The label stays platform-side (`ReactNode` on web, `ReactNode` + style on RN).
 */
export type CheckboxSharedProps = {
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	disabled?: boolean;
};
