import type { CreditCardType } from "./CreditCard";
export interface CreditCardProps {
    /** The issuer name printed in the top left corner of the card. */
    company?: string;
    /** The card number printed along the bottom of the card. */
    cardNumber?: string;
    /** The cardholder name printed above the card number. Rendered in uppercase. */
    cardHolder?: string;
    /** The expiry date printed to the right of the cardholder name. */
    cardExpiration?: string;
    /** The visual style of the card, which sets its background, text colors and any decorative strip. */
    type?: CreditCardType;
    /** The class name applied to the outer wrapper of the card. */
    className?: string;
    /** The rendered width of the card in pixels. The card is scaled proportionally from its intrinsic 316×190 size. */
    width?: number;
}
