import type { SpacingToken } from '@repo/foundations';

/** Margin props using design-system spacing tokens: identical on both platforms. */
export type MarginProps = {
	/** Margin on all sides (spacing token). */
	margin?: SpacingToken;
	/** Horizontal margin: left and right (spacing token). */
	marginX?: SpacingToken;
	/** Vertical margin: top and bottom (spacing token). */
	marginY?: SpacingToken;
	/** Top margin (spacing token). Overrides `marginY`. */
	marginTop?: SpacingToken;
	/** Bottom margin (spacing token). Overrides `marginY`. */
	marginBottom?: SpacingToken;
	/** Left margin (spacing token). Overrides `marginX`. */
	marginLeft?: SpacingToken;
	/** Right margin (spacing token). Overrides `marginX`. */
	marginRight?: SpacingToken;
};

/** Padding props using design-system spacing tokens: identical on both platforms. */
export type PaddingProps = {
	/** Padding on all sides (spacing token). */
	padding?: SpacingToken;
	/** Horizontal padding: left and right (spacing token). */
	paddingX?: SpacingToken;
	/** Vertical padding: top and bottom (spacing token). */
	paddingY?: SpacingToken;
	/** Top padding (spacing token). Overrides `paddingY`. */
	paddingTop?: SpacingToken;
	/** Bottom padding (spacing token). Overrides `paddingY`. */
	paddingBottom?: SpacingToken;
	/** Left padding (spacing token). Overrides `paddingX`. */
	paddingLeft?: SpacingToken;
	/** Right padding (spacing token). Overrides `paddingX`. */
	paddingRight?: SpacingToken;
};
