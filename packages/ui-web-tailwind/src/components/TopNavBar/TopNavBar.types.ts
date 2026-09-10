import type { ReactNode, CSSProperties } from 'react';
import type { ColorTokenName } from '@repo/foundations';

export type NavItem = {
	/** Unique identifier for the nav item. */
	id: string;
	/** Display label. */
	label: string;
	/** Optional icon element rendered before the label. */
	icon?: ReactNode;
	/** Optional badge (e.g. "Live"). */
	badge?: {
		label: string;
		toneToken: ColorTokenName;
		dot?: boolean;
	};
};

export type TopNavBarProps = {
	/** Logo element rendered on the left. */
	logo: ReactNode;
	/** Navigation items. */
	items: NavItem[];
	/** ID of the currently active item. */
	activeItemId: string;
	/** Callback when a nav item is clicked. */
	onItemClick: (id: string) => void;
	/** Placeholder text for the search input. */
	searchPlaceholder: string;
	/** Callback when the search input value changes. */
	onSearchChange: (value: string) => void;
	/** Optional actions rendered on the right (language, toggle, etc.). */
	actions?: ReactNode;
	/** Profile menu trigger button content. */
	profileButton?: ReactNode;
	/** Profile menu dropdown content. */
	profileMenu?: ReactNode;
	/** Additional CSS class names. */
	className?: string;
	/** Inline style overrides. */
	style?: CSSProperties;
};
