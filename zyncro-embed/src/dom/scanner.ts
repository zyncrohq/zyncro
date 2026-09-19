/**
 * @zyncro/embed — DOM Auto-Scanner & SPA Observer
 * Automatically detects and initializes data-zyncro-* attributes across static and dynamic web pages.
 */

import { mountInline } from "../core/iframe";
import { BaseEmbedOptions, EmbedPrefill } from "../types";
import { mountFloatingButton } from "../ui/floating-button";
import { openModal } from "../ui/modal";

interface ScannedElementProps extends BaseEmbedOptions {
  text?: string;
}

export function parseElementAttributes(el: HTMLElement): ScannedElementProps {
  const url =
    el.getAttribute("data-zyncro-url") ||
    el.getAttribute("data-zyncro-inline") ||
    el.getAttribute("data-zyncro-modal") ||
    el.getAttribute("data-zyncro-popup") ||
    el.getAttribute("data-zyncro-float") ||
    el.getAttribute("href") ||
    "";

  const theme = (el.getAttribute("data-zyncro-theme") as any) || undefined;
  const color = el.getAttribute("data-zyncro-color") || undefined;
  const origin = el.getAttribute("data-zyncro-origin") || undefined;
  const text = el.getAttribute("data-zyncro-text") || el.textContent?.trim() || undefined;

  const prefill: EmbedPrefill = {};
  const name = el.getAttribute("data-zyncro-name");
  const email = el.getAttribute("data-zyncro-email");
  const phone = el.getAttribute("data-zyncro-phone") || el.getAttribute("data-zyncro-guest-phone");
  const notes = el.getAttribute("data-zyncro-notes");
  const date = el.getAttribute("data-zyncro-date");

  if (name) prefill.name = name;
  if (email) prefill.email = email;
  if (phone) prefill.phone = phone;
  if (notes) prefill.notes = notes;
  if (date) prefill.date = date;

  // Collect any data-zyncro-prefill-* custom fields
  if (el.attributes) {
    for (let i = 0; i < el.attributes.length; i++) {
      const attr = el.attributes[i];
      if (attr.name.startsWith("data-zyncro-prefill-")) {
        const customKey = attr.name.slice("data-zyncro-prefill-".length);
        if (customKey && !prefill[customKey]) {
          prefill[customKey] = attr.value;
        }
      }
    }
  }

  return {
    url,
    theme,
    color,
    origin,
    text,
    prefill: Object.keys(prefill).length > 0 ? prefill : undefined,
  };
}


/**
 * Scan a document or root element for data-zyncro-* elements
 */
export function scan(root?: HTMLElement | Document): void {
  if (typeof document === "undefined") return;
  const target = root || document;

  // 1. Process Inline Embeds
  const inlineEls = target.querySelectorAll<HTMLElement>("[data-zyncro-inline]");
  inlineEls.forEach((el) => {
    const opts = parseElementAttributes(el);
    if (!opts.url) return;
    if ((el as any).__zyncroMounted) return;
    (el as any).__zyncroMounted = true;
    mountInline(el, opts);
  });

  // If the root element itself is an inline target
  if (target !== document && (target as HTMLElement).hasAttribute && (target as HTMLElement).hasAttribute("data-zyncro-inline")) {
    const el = target as HTMLElement;
    const opts = parseElementAttributes(el);
    if (opts.url && !(el as any).__zyncroMounted) {
      (el as any).__zyncroMounted = true;
      mountInline(el, opts);
    }
  }

  // 2. Process Popup / Modal Triggers
  const modalEls = target.querySelectorAll<HTMLElement>("[data-zyncro-modal], [data-zyncro-popup]");
  modalEls.forEach((el) => {
    const opts = parseElementAttributes(el);
    if (!opts.url) return;
    if ((el as any).__zyncroBound) return;
    (el as any).__zyncroBound = true;

    el.style.cursor = "pointer";
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const currentOpts = parseElementAttributes(el);
      if (currentOpts.url) {
        openModal(currentOpts);
      }
    });
  });

  // 3. Process Floating Button (e.g. from a <script data-zyncro-float>)
  const floatEls = target.querySelectorAll<HTMLElement>("[data-zyncro-float]");
  floatEls.forEach((el) => {
    const opts = parseElementAttributes(el);
    if (!opts.url) return;
    if ((el as any).__zyncroMounted) return;
    (el as any).__zyncroMounted = true;
    mountFloatingButton(opts);
  });
}

/**
 * Initialize MutationObserver to support dynamic single page applications
 */
export function initAutoScanner(): void {
  if (typeof document === "undefined") return;

  const runInitialScan = () => {
    scan(document);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runInitialScan);
  } else {
    runInitialScan();
  }

  // Set up performant MutationObserver with debounced batching for SPA changes
  if (typeof MutationObserver !== "undefined") {
    let scheduledFrame: number | null = null;
    const pendingNodes: HTMLElement[] = [];

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            if (node.nodeType === 1) {
              pendingNodes.push(node as HTMLElement);
            }
          }
        }
      }

      if (pendingNodes.length > 0 && scheduledFrame === null) {
        scheduledFrame = requestAnimationFrame(() => {
          const batch = pendingNodes.splice(0, pendingNodes.length);
          for (const node of batch) {
            scan(node);
          }
          scheduledFrame = null;
        });
      }
    });

    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true,
    });
  }
}

