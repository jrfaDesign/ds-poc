import type { Meta, StoryObj } from '@storybook/react-vite';
import { defaultTheme, type ShadowToken } from '@repo/foundations';
import { buildBoxShadow } from './functions/buildBoxShadow';

const meta = {
	title: 'Design system/Shadows & focus',
	tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const shadowTokens = Object.keys(defaultTheme.shadows) as ShadowToken[];

/** Every elevation of the shadow scale, rendered on cards. */
export const Elevation: Story = {
	render: () => (
		<div className="flex flex-wrap gap-lg">
			{shadowTokens.map((token) => (
				<div
					key={token}
					className="w-40 h-24 rounded-md bg-surface-alt-bg border border-solid border-surface-base-border flex items-end p-sm"
					style={{ boxShadow: buildBoxShadow(defaultTheme, token) }}
				>
					<span className="text-sm font-mono">{token}</span>
				</div>
			))}
		</div>
	),
};

/** Focus rings render the UntitledUI outline (2px brand, 2px offset) from the focus-ring tokens. */
export const FocusRings: Story = {
	render: () => (
		<div className="flex flex-col gap-md">
			<div className="flex gap-md">
				<div className="rounded-md bg-primary border border-solid border-primary px-md py-sm text-sm ring-focus">
					Default focus ring
				</div>
				<div className="rounded-md bg-primary border border-solid border-primary px-md py-sm text-sm ring-focus-error">
					Error focus ring
				</div>
			</div>
			<p className="text-sm opacity-60">
				Rings are driven by the focus-ring tokens: 2px outline + 2px offset in brand-500 (error: red-500), identical in light and dark, per UntitledUI.
			</p>
		</div>
	),
};
