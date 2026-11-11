type SwatchProps = {
	/** Token or value name. */
	name: string;
	/** Resolved CSS color shown in the preview box. */
	value: string;
};

/** Color swatch with a caption: used across the token stories. */
export function Swatch({ name, value }: SwatchProps) {
	return (
		<figure className="w-44 shrink-0">
			<div
				className="h-12 rounded-md border border-solid border-black/10"
				style={{ backgroundColor: value }}
			/>
			<figcaption className="mt-xxs text-xs leading-4">
				<span className="block font-medium">{name}</span>
				<span className="opacity-60">{value}</span>
			</figcaption>
		</figure>
	);
}
