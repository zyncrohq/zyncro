/**
 * @zyncro/embed — URL Builder
 * Safely normalizes, validates, and builds embed iframe URLs with prefill & theme parameters.
 */
import { BaseEmbedOptions, EmbedTheme } from "../types";
export declare const DEFAULT_ORIGIN = "https://zyncro.in";
export declare function setGlobalOrigin(origin: string): void;
export declare function getGlobalOrigin(): string;
export declare function setGlobalTheme(theme?: EmbedTheme): void;
export declare function getGlobalTheme(): EmbedTheme | undefined;
export declare function setGlobalColor(color?: string): void;
export declare function getGlobalColor(): string | undefined;
export declare function resetGlobalOrigin(): void;
/**
 * Normalizes input URL and creates a safe embed URL pointing to Zyncro with ?embed=1.
 */
export declare function buildEmbedUrl(rawUrl: string, options?: Partial<BaseEmbedOptions>): string | null;
/**
 * Builds clean public URL without embed parameter (for fallback / open in new tab).
 */
export declare function buildCleanUrl(rawUrl: string, options?: Partial<BaseEmbedOptions>): string;
