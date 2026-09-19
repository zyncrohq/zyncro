/**
 * @zyncro/embed — Iframe Factory
 * Creates accessible, responsive iframes with loader, lifecycle & fallback management.
 */
import { InlineEmbedOptions } from "../types";
export declare function createIframe(src: string, title?: string): HTMLIFrameElement;
export interface LoaderHandle {
    element: HTMLElement;
    clearFallbackTimer: () => void;
}
export declare function createLoader(fallbackUrl?: string): LoaderHandle;
/**
 * Mount an inline iframe inside a container element with strict lifecycle cleanup
 */
export declare function mountInline(target: string | HTMLElement, options?: InlineEmbedOptions | string): HTMLElement | null;
/**
 * Cleanly unmounts an inline Zyncro embed from a container element
 */
export declare function unmountInline(target: string | HTMLElement): boolean;
