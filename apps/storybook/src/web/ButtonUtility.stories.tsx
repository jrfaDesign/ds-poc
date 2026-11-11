import type { FC } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ButtonUtility } from '@repo/ui-web-tailwind';

const UndoIcon: FC<{ className?: string }> = ({ className }) => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		className={className}
		aria-hidden="true"
	>
		<path d="M9 14L4 9l5-5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M4 9h10a6 6 0 0 1 0 12h-3" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const meta = {
	title: 'Web/Base/ButtonUtility',
	component: ButtonUtility,
	tags: ['autodocs'],
	args: {
		icon: UndoIcon,
		tooltip: 'Undo',
		color: 'secondary',
		size: 'sm',
		isDisabled: false,
		onClick: fn(),
	},
	argTypes: {
		tooltip: { control: 'text', description: 'Tooltip shown when hovering the button' },
		tooltipPlacement: {
			control: 'select',
			options: ['top', 'bottom', 'left', 'right'],
			description: 'Preferred side of the tooltip',
		},
		color: {
			control: 'select',
			options: ['secondary', 'tertiary'],
			description: 'Color variant of the utility button',
		},
		size: {
			control: 'select',
			options: ['xs', 'sm'],
			description: 'Size preset',
		},
		isDisabled: { control: 'boolean', description: 'Muted, non-interactive state' },
		icon: { control: false, description: 'Icon component or element displayed in the button' },
	},
} satisfies Meta<typeof ButtonUtility>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
