// The manager bundler compiles JSX with the classic runtime (React.createElement),
// so React must be in scope here, unlike the preview, which uses the automatic runtime.
import React from 'react';
import { useStorybookApi } from 'storybook/manager-api';
import { useTheme } from 'storybook/theming';
import { PANEL_ID } from './constants';
import { createToolStyle } from './styles';

/**
 * Top-bar shortcut to the theme config: opens the Addons panel (if hidden)
 * and selects the Theme tab: the config form lives there, next to Controls.
 */
export function ThemeTool() {
	const api = useStorybookApi();
	const style = createToolStyle(useTheme());

	const openThemePanel = () => {
		if (!api.getIsPanelShown()) {
			api.togglePanel(true);
		}
		api.setSelectedPanel(PANEL_ID);
	};

	return (
		<button
			type="button"
			style={style}
			title="Open the theme config panel"
			onClick={openThemePanel}
		>
			Theme
		</button>
	);
}
