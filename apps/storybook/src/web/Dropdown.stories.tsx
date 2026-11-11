import type { StoryObj } from '@storybook/react-vite';
import { Button, Dropdown } from '@repo/ui-web-tailwind';

const meta = {
	title: 'Web/Base/Dropdown',
	tags: ['autodocs'],
	args: {
		triggerLabel: 'Open menu',
		itemLabel: 'Edit',
		addonText: '⌘E',
	},
	argTypes: {
		triggerLabel: { control: 'text', description: 'Label of the menu trigger button' },
		itemLabel: { control: 'text', description: 'Label of the first menu item' },
		addonText: { control: 'text', description: 'Addon text shown on the right of the first item' },
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { triggerLabel: 'Open menu', itemLabel: 'Edit', addonText: '⌘E' },
	render: (rawArgs) => {
		const args = rawArgs as typeof meta.args;
		return (
			<Dropdown.Root>
				<Button color="secondary" size="sm">
					{args.triggerLabel}
				</Button>
				<Dropdown.Popover>
					<Dropdown.Menu aria-label="Item actions">
						<Dropdown.Item id="edit" label={args.itemLabel} addon={args.addonText} />
						<Dropdown.Item id="duplicate" label="Duplicate" />
						<Dropdown.Item id="archive" label="Archive" />
						<Dropdown.Separator />
						<Dropdown.Item id="delete" label="Delete" />
					</Dropdown.Menu>
				</Dropdown.Popover>
			</Dropdown.Root>
		);
	},
};
