import type { Options as QRCodeStylingOptions } from "qr-code-styling";
export interface QRCodeProps {
    /**
     * The value to encode in the QR code.
     */
    value: string;
    /**
     * Additional options to customize the QR code.
     */
    options?: QRCodeStylingOptions;
    /**
     * The size of the QR code.
     *
     * @default "md"
     */
    size?: "md" | "lg";
    /**
     * The class name to apply to the QR code.
     */
    className?: string;
}
