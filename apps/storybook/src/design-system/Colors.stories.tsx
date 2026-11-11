import type { Meta, StoryObj } from '@storybook/react-vite';
import { defaultTheme, type ColorScale, type ColorToken } from '@repo/foundations';
import { Swatch } from './components/Swatch';
import { resolvePair, type ColorPair } from './functions/resolveColor';

const meta = {
	title: 'Design system/Colors',
	tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const STEPS: ColorScale[] = [
	'50',
	'100',
	'200',
	'300',
	'400',
	'500',
	'600',
	'700',
	'800',
	'900',
	'950',
];
const FAMILIES = [
	'primary',
	'secondary',
	'neutral',
	'error',
	'warning',
	'success',
	'info',
] as const;
const TOKEN_GROUPS = ['white', 'black', 'transparent'] as const;

/** Raw palette: every family across the 50–950 scale, plus the base values. */
export const Palette: Story = {
	render: () => (
		<div className="flex flex-col gap-lg">
			{FAMILIES.map((family) => (
				<div key={family}>
					<h3 className="text-md font-semibold mb-sm">{family}</h3>
					<div className="flex flex-wrap gap-xs">
						{STEPS.map((step) => {
							const token = `${family}_${step}` as ColorToken;
							return <Swatch key={token} name={token} value={defaultTheme.colors[token]} />;
						})}
					</div>
				</div>
			))}
			<div>
				<h3 className="text-md font-semibold mb-sm">base</h3>
				<div className="flex flex-wrap gap-xs">
					{TOKEN_GROUPS.map((token) => (
						<Swatch key={token} name={token} value={defaultTheme.colors[token]} />
					))}
				</div>
			</div>
		</div>
	),
};

/** Semantic tokens: every color token resolved in light and dark mode. */
export const SemanticTokens: Story = {
	render: () => (
		<div className="flex flex-col gap-lg">
			{Object.entries(defaultTheme.colorTokens).map(([group, tokens]) => (
				<div key={group}>
					<h3 className="text-md font-semibold mb-sm">{group}</h3>
					<div className="flex flex-wrap gap-xs">
						{Object.entries(tokens as Record<string, ColorPair>).map(([name, pair]) => (
							<div key={name} className="flex gap-xxs">
								<Swatch name={`${name} · light`} value={resolvePair(defaultTheme, pair, 'light')} />
								<Swatch name={`${name} · dark`} value={resolvePair(defaultTheme, pair, 'dark')} />
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	),
};
