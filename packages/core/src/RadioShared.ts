/**
 * Props shared by the web and React Native Radio.
 * `name` (form semantics) and `label` stay platform-side.
 */
export type RadioSharedProps = {
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	disabled?: boolean;
};
