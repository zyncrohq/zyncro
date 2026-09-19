/**
 * @zyncro/embed — DOM Auto-Scanner & SPA Observer
 * Automatically detects and initializes data-zyncro-* attributes across static and dynamic web pages.
 */
import { BaseEmbedOptions } from "../types";
interface ScannedElementProps extends BaseEmbedOptions {
    text?: string;
}
export declare function parseElementAttributes(el: HTMLElement): ScannedElementProps;
/**
 * Scan a document or root element for data-zyncro-* elements
 */
export declare function scan(root?: HTMLElement | Document): void;
/**
 * Initialize MutationObserver to support dynamic single page applications
 */
export declare function initAutoScanner(): void;
export {};
