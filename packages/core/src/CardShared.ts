/** Visual variants shared by the web and React Native Card. */
export type CardVariant = 'surface' | 'raised' | 'alt' | 'brand';

/** Props that are identical on every platform. */
export type CardSharedProps = {
	/** Visual variant: controls background, border, and shadow. */
	variant?: CardVariant;
};
