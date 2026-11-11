import type { FC } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeaturedIcon } from '@repo/ui-web-tailwind';

const Sparkle: FC<{ className?: string }> = ({ className }) => (
	<svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
		<path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
	</svg>
);

const meta = {
	title: 'Web/Base/FeaturedIcon',
	component: FeaturedIcon,
	tags: ['autodocs'],
	args: {
		color: 'brand',
		theme: 'light',
		size: 'md',
		icon: Sparkle,
	},
	argTypes: {
		color: {
			control: 'select',
			options: ['brand', 'gray', 'success', 'warning', 'error'],
			description: 'Semantic color of the background, icon and border',
		},
		theme: {
			control: 'select',
			options: ['light', 'gradient', 'dark', 'outline', 'modern', 'modern-neue'],
			description: 'Visual treatment of the icon container',
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'xl'],
			description: 'Dimensions of the wrapper and icon',
		},
		icon: { control: false, description: 'Icon component or element displayed inside' },
	},
} satisfies Meta<typeof FeaturedIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
