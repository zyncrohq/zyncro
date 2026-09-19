/**
 * @zyncro/embed — Official JavaScript Embed SDK
 * Universal embedding engine for Zyncro scheduling calendars.
 *
 * (c) Zyncro Infotech Private Limited. All rights reserved.
 * https://zyncro.in
 */

import { mountInline, unmountInline } from "./core/iframe";
import { messageBus } from "./core/message-bus";
import {
  buildEmbedUrl,
  getGlobalColor,
  getGlobalOrigin,
  getGlobalTheme,
  setGlobalColor,
  setGlobalOrigin,
  setGlobalTheme,
} from "./core/url-builder";
import { initAutoScanner, scan } from "./dom/scanner";
import {
  FloatingButtonOptions,
  InlineEmbedOptions,
  PopupEmbedOptions,
  ZyncroEventListener,
  ZyncroEventName,
  ZyncroGlobalConfig,
  ZyncroSDK,
} from "./types";
import { mountFloatingButton } from "./ui/floating-button";
import { closeModal, isModalOpen, openModal } from "./ui/modal";

export * from "./types";

const VERSION = "1.0.0";

export const Zyncro: ZyncroSDK = {
  version: VERSION,

  /**
   * Initialize global SDK configuration.
   * Optional: Use to configure default origin, global brand color, or global theme.
   */
  init(config?: ZyncroGlobalConfig): void {
    if (config?.origin) {
      setGlobalOrigin(config.origin);
    }
    if (config?.theme) {
      setGlobalTheme(config.theme);
    }
    if (config?.color) {
      setGlobalColor(config.color);
    }
    scan();
  },

  /**
   * Embed an inline booking calendar into a DOM container element.
   * @param target CSS selector string or HTMLElement
   * @param options InlineEmbedOptions with booking URL, theme, and callbacks
   */
  inline(target: string | HTMLElement, options?: InlineEmbedOptions | string): HTMLElement | null {
    if (!target) {
      console.warn("[Zyncro Embed] Zyncro.inline(): Target container element or selector is required.");
      return null;
    }
    if (!options) {
      console.warn("[Zyncro Embed] Zyncro.inline(): Options object with a booking 'url' is required.");
      return null;
    }
    return mountInline(target, options);
  },

  /**
   * Cleanly unmount an inline booking calendar from a DOM container element.
   * @param target CSS selector string or HTMLElement
   */
  unmount(target: string | HTMLElement): boolean {
    return unmountInline(target);
  },

  /**
   * Open a booking calendar inside an accessible popup modal dialog.
   * @param options PopupEmbedOptions or booking URL string
   */
  popup(options: PopupEmbedOptions | string): void {
    if (!options) {
      console.warn("[Zyncro Embed] Zyncro.popup(): Options object with a booking 'url' is required.");
      return;
    }
    openModal(options);
  },

  /**
   * Alias for Zyncro.popup()
   */
  modal(options: PopupEmbedOptions | string): void {
    this.popup(options);
  },

  /**
   * Programmatically dismiss and close any currently open Zyncro popup modal.
   */
  close(): void {
    closeModal();
  },

  /**
   * Check if a Zyncro popup modal is currently open.
   */
  isModalOpen(): boolean {
    return isModalOpen();
  },

  /**
   * Mount a persistent floating launcher button fixed to the bottom corner.
   */
  floating(options: FloatingButtonOptions | string): HTMLElement | null {
    if (!options) {
      console.warn("[Zyncro Embed] Zyncro.floating(): Options object with a booking 'url' is required.");
      return null;
    }
    return mountFloatingButton(options);
  },

  /**
   * Pre-warm the Zyncro origin and prefetch the booking page for faster popup opening.
   * @param url Booking URL or path to prefetch
   */
  preload(url: string): void {
    if (typeof document === "undefined" || !url) return;
    try {
      const origin = getGlobalOrigin();

      // 1. Preconnect & DNS prefetch to origin if not already added
      if (!document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) {
        const preconnect = document.createElement("link");
        preconnect.rel = "preconnect";
        preconnect.href = origin;
        document.head.appendChild(preconnect);

        const dns = document.createElement("link");
        dns.rel = "dns-prefetch";
        dns.href = origin;
        document.head.appendChild(dns);
      }

      // 2. Prefetch the specific booking URL
      const safeUrl = buildEmbedUrl(url);
      if (!safeUrl) return;

      if (!document.querySelector(`link[rel="prefetch"][href="${safeUrl}"]`)) {
        const prefetch = document.createElement("link");
        prefetch.rel = "prefetch";
        prefetch.href = safeUrl;
        prefetch.as = "document";
        document.head.appendChild(prefetch);
      }
    } catch {
      // Ignore prefetch failures silently
    }
  },

  /**
   * Manually trigger a DOM scan to initialize newly added data-zyncro-* elements.
   * Useful when injecting dynamic HTML via HTMX, Turbo, or AJAX.
   */
  scan(root?: HTMLElement | Document): void {
    scan(root);
  },

  /**
   * Get the global default origin.
   */
  getOrigin(): string {
    return getGlobalOrigin();
  },

  /**
   * Set the global default origin.
   */
  setOrigin(origin: string): void {
    setGlobalOrigin(origin);
  },

  /**
   * Subscribe to a scheduling or UI lifecycle event.
   */
  on<K extends ZyncroEventName>(event: K, listener: ZyncroEventListener<K>): void {
    messageBus.on(event, listener);
  },

  /**
   * Subscribe to a scheduling event for a single occurrence.
   */
  once<K extends ZyncroEventName>(event: K, listener: ZyncroEventListener<K>): void {
    messageBus.once(event, listener);
  },

  /**
   * Unsubscribe a listener from an event.
   */
  off<K extends ZyncroEventName>(event: K, listener: ZyncroEventListener<K>): void {
    messageBus.off(event, listener);
  },
};

// Export standalone named functions for flexibility
export { closeModal, getGlobalOrigin, isModalOpen, mountFloatingButton, mountInline, openModal, setGlobalOrigin, unmountInline };

// Global Browser Attachment
if (typeof window !== "undefined") {
  (window as any).Zyncro = (window as any).Zyncro || Zyncro;
  initAutoScanner();
}

export default Zyncro;

