import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag, TagGroup, TagList, type TagItem } from '@repo/ui-web-tailwind';

const items: TagItem[] = [
	{ id: 'active', label: 'Active', dot: true },
	{ id: 'draft', label: 'Draft', count: 3 },
	{ id: 'archived', label: 'Archived', isDisabled: true },
];

const meta = {
	title: 'Web/Base/Tag',
	component: TagGroup,
	tags: ['autodocs'],
	args: {
		label: 'Tags',
		size: 'sm',
		selectionMode: 'none',
	},
	argTypes: {
		label: { control: 'text', description: 'Accessible name for the group of tags' },
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Padding, text size and spacing of every tag',
		},
		selectionMode: {
			control: 'select',
			options: ['none', 'single', 'multiple'],
			description: 'Whether tags can be selected',
		},
	},
} satisfies Meta<typeof TagGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { label: 'Tags', size: 'sm', selectionMode: 'none' },
	render: (args) => (
		<TagGroup {...args}>
			<TagList items={items}>
				{(item) => (
					<Tag id={item.id} dot={item.dot} count={item.count} isDisabled={item.isDisabled}>
						{item.label}
					</Tag>
				)}
			</TagList>
		</TagGroup>
	),
};
