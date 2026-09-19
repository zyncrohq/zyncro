/**
 * @zyncro/embed — Iframe Factory
 * Creates accessible, responsive iframes with loader, lifecycle & fallback management.
 */

import { InlineEmbedOptions } from "../types";
import { ensureStyles } from "../ui/styles";
import { messageBus } from "./message-bus";
import { buildCleanUrl, buildEmbedUrl } from "./url-builder";

export function createIframe(src: string, title = "Zyncro Booking Calendar"): HTMLIFrameElement {
  const iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.title = title;
  iframe.loading = "lazy";
  iframe.className = "zyncro-iframe";
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allow", "payment; clipboard-write");
  iframe.setAttribute("role", "region");
  iframe.setAttribute("aria-label", title);
  return iframe;
}


export interface LoaderHandle {
  element: HTMLElement;
  clearFallbackTimer: () => void;
}

export function createLoader(fallbackUrl?: string): LoaderHandle {
  const container = document.createElement("div");
  container.className = "zyncro-loader-container";
  container.innerHTML = `
    <div class="zyncro-spinner" aria-hidden="true"></div>
    <span>Loading calendar…</span>
  `;

  let timerId: ReturnType<typeof setTimeout> | null = null;

  // Fallback button if connection is extremely slow (> 8s)
  if (fallbackUrl) {
    timerId = setTimeout(() => {
      if (container.parentNode) {
        const fbLink = document.createElement("a");
        fbLink.href = fallbackUrl;
        fbLink.target = "_blank";
        fbLink.rel = "noopener noreferrer";
        fbLink.textContent = "Taking longer than usual? Open in new tab ↗";
        fbLink.style.cssText = "font-size:12px;color:var(--zyncro-primary, #7c3aed);text-decoration:underline;margin-top:8px;pointer-events:auto;";
        container.appendChild(fbLink);
      }
    }, 8000);
  }

  const clearFallbackTimer = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return { element: container, clearFallbackTimer };
}

/**
 * Mount an inline iframe inside a container element with strict lifecycle cleanup
 */
export function mountInline(
  target: string | HTMLElement,
  options?: InlineEmbedOptions | string
): HTMLElement | null {
  ensureStyles();

  if (!target) {
    console.warn("[Zyncro Embed] Zyncro.inline(): Target container element or selector is required.");
    return null;
  }

  const container = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!container) {
    console.warn(`[Zyncro Embed] Target container '${target}' not found in the DOM.`);
    return null;
  }

  if (!options) {
    console.warn("[Zyncro Embed] Zyncro.inline(): Options object with a booking 'url' is required.");
    return null;
  }

  const opts: InlineEmbedOptions = typeof options === "string" ? { url: options } : options;
  if (!opts.url) {
    console.warn("[Zyncro Embed] Zyncro.inline(): A valid 'url' (e.g. 'prem/30min' or 'https://zyncro.in/prem/30min') is required.");
    return null;
  }

  const embedUrl = buildEmbedUrl(opts.url, opts);
  const cleanFallbackUrl = buildCleanUrl(opts.url, opts);

  if (!embedUrl) {
    console.warn("[Zyncro Embed] Could not construct a valid embed URL from:", opts.url);
    return null;
  }

  // 1. Non-destructive cleanup: Remove only previous Zyncro wrapper & unregister old iframe
  unmountInline(container);

  // 2. Set up new isolated wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "zyncro-inline-wrapper";
  if (opts.minHeight) {
    wrapper.style.minHeight = `${opts.minHeight}px`;
  }

  const loaderHandle = createLoader(cleanFallbackUrl);
  const iframe = createIframe(embedUrl);

  wrapper.appendChild(loaderHandle.element);
  wrapper.appendChild(iframe);
  container.appendChild(wrapper);

  // 3. Fade out loader and cancel timer on iframe load
  iframe.addEventListener("load", () => {
    loaderHandle.clearFallbackTimer();
    loaderHandle.element.style.opacity = "0";
    setTimeout(() => {
      if (loaderHandle.element.parentNode) {
        loaderHandle.element.parentNode.removeChild(loaderHandle.element);
      }
    }, 250);
  });

  // 4. Register with message bus for postMessage sync
  messageBus.registerIframe({
    iframe,
    onBookingSuccessful: opts.onBookingSuccessful,
    onResize: opts.onResize,
  });

  // Attach unmount handle to container
  (container as any).__zyncroUnmount = () => unmountInline(container);

  return container;
}

/**
 * Cleanly unmounts an inline Zyncro embed from a container element
 */
export function unmountInline(target: string | HTMLElement): boolean {
  if (typeof document === "undefined") return false;
  const container = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!container) return false;

  const existingWrapper = container.querySelector<HTMLElement>(":scope > .zyncro-inline-wrapper");
  if (existingWrapper) {
    const oldIframe = existingWrapper.querySelector<HTMLIFrameElement>("iframe");
    if (oldIframe) {
      messageBus.unregisterIframe(oldIframe);
    }
    existingWrapper.remove();
    delete (container as any).__zyncroUnmount;
    return true;
  }
  return false;
}

