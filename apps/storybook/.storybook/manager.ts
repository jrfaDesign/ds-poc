import { createElement } from 'react';
import { addons, types } from 'storybook/manager-api';
import { ADDON_ID, PANEL_ID, PANEL_TITLE, TOOL_ID } from './addons/theme/constants';
import { ThemePanel } from './addons/theme/ThemePanel';
import { ThemeTool } from './addons/theme/ThemeTool';

/**
 * Manager-side entry: the "Theme" panel (config form, tab next to Controls)
 * plus a top-bar tool that jumps straight to that panel.
 */
addons.register(ADDON_ID, () => {
	addons.add(PANEL_ID, {
		type: types.PANEL,
		title: PANEL_TITLE,
		render: (props: { active?: boolean; key?: string }) =>
			createElement(ThemePanel, { key: props.key, active: props.active }),
	});
	addons.add(TOOL_ID, {
		type: types.TOOL,
		title: PANEL_TITLE,
		render: () => createElement(ThemeTool),
	});
});
