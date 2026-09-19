/**
 * @zyncro/embed — Popup Modal Dialog
 * Accessible, animated modal dialog styled to 100% match Zyncro design language.
 */

import { createIframe, createLoader } from "../core/iframe";
import { messageBus } from "../core/message-bus";
import { buildCleanUrl, buildEmbedUrl } from "../core/url-builder";
import { BookingSuccessfulEvent, PopupEmbedOptions } from "../types";
import { ensureStyles } from "./styles";

let activeModalOverlay: HTMLElement | null = null;

export function isModalOpen(): boolean {
  return activeModalOverlay !== null;
}

export function openModal(options: PopupEmbedOptions | string): void {
  ensureStyles();

  // If a modal is already open, do not open another
  if (activeModalOverlay) {
    return;
  }

  if (!options) {
    console.warn("[Zyncro Embed] Zyncro.popup(): Options object with a booking 'url' is required.");
    return;
  }

  const opts: PopupEmbedOptions = typeof options === "string" ? { url: options } : options;
  if (!opts.url) {
    console.warn("[Zyncro Embed] Zyncro.popup(): A valid 'url' (e.g. 'prem/30min' or 'https://zyncro.in/prem/30min') is required.");
    return;
  }

  const embedUrl = buildEmbedUrl(opts.url, opts);
  const cleanFallbackUrl = buildCleanUrl(opts.url, opts);

  if (!embedUrl) {
    console.warn("[Zyncro Embed] Invalid booking URL provided for modal:", opts.url);
    return;
  }

  // Preserve host page focus & scroll state
  const prevActiveElement = document.activeElement as HTMLElement | null;
  const prevOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  // Overlay container
  const overlay = document.createElement("div");
  overlay.className = "zyncro-modal-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Zyncro Booking Calendar");

  // Determine theme class ('dark', 'light', or 'auto')
  const themeMode = opts.theme || "auto";
  const themeClass = `zyncro-theme-${themeMode}`;

  // Modal Panel
  const panel = document.createElement("div");
  panel.className = `zyncro-modal-panel ${themeClass}`;

  // Custom brand color overrides
  if (opts.color && /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(opts.color)) {
    panel.style.setProperty("--zyncro-primary", opts.color);
    panel.style.setProperty("--zyncro-primary-glow", `${opts.color}55`);
  }

  // Close Button
  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "zyncro-modal-close";
  closeBtn.setAttribute("aria-label", "Close modal");
  closeBtn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `;

  // Modal Body
  const body = document.createElement("div");
  body.className = "zyncro-modal-body";

  const loaderHandle = createLoader(cleanFallbackUrl);
  const iframe = createIframe(embedUrl, "Zyncro Booking Modal");

  body.appendChild(loaderHandle.element);
  body.appendChild(iframe);
  panel.appendChild(closeBtn);
  panel.appendChild(body);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  activeModalOverlay = overlay;

  // Trigger animation in next frame
  requestAnimationFrame(() => {
    overlay.classList.add("zyncro-visible");
    closeBtn.focus();
  });

  // Fade out loader once iframe loads
  iframe.addEventListener("load", () => {
    loaderHandle.clearFallbackTimer();
    loaderHandle.element.style.opacity = "0";
    setTimeout(() => {
      if (loaderHandle.element.parentNode) {
        loaderHandle.element.parentNode.removeChild(loaderHandle.element);
      }
    }, 250);
  });

  // Destroy / Close modal function
  let isDestroyed = false;
  const destroy = () => {
    if (isDestroyed) return;
    isDestroyed = true;

    loaderHandle.clearFallbackTimer();
    overlay.classList.remove("zyncro-visible");
    document.body.style.overflow = prevOverflow;
    document.removeEventListener("keydown", handleKeydown, true);
    overlay.removeEventListener("touchmove", handleTouchMove);

    messageBus.unregisterIframe(iframe);
    messageBus.emit("modalClose", { type: "zyncro:modalClose" });

    if (opts.onClose) {
      try {
        opts.onClose();
      } catch (err) {
        console.error("[Zyncro Embed] Error in onClose callback:", err);
      }
    }

    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      activeModalOverlay = null;
      if (prevActiveElement && typeof prevActiveElement.focus === "function") {
        try {
          prevActiveElement.focus();
        } catch {}
      }
    }, 280);
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      destroy();
      return;
    }

    // Keyboard focus trap inside modal panel
    if (e.key === "Tab") {
      const focusable = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        lastEl.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        firstEl.focus();
        e.preventDefault();
      }
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.target === overlay) {
      e.preventDefault();
    }
  };

  closeBtn.addEventListener("click", destroy);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      destroy();
    }
  });
  overlay.addEventListener("touchmove", handleTouchMove, { passive: false });
  document.addEventListener("keydown", handleKeydown, true);

  // Register with MessageBus
  messageBus.registerIframe({
    iframe,
    onBookingSuccessful: (event: BookingSuccessfulEvent) => {
      if (opts.onBookingSuccessful) {
        try {
          opts.onBookingSuccessful(event);
        } catch (err) {
          console.error("[Zyncro Embed] Error in onBookingSuccessful callback:", err);
        }
      }

      // Display friendly success badge inside modal matching Zyncro success screen
      body.innerHTML = `
        <div class="zyncro-success-box">
          <div class="zyncro-success-icon">✨</div>
          <div class="zyncro-success-title">Booking Confirmed!</div>
          <div class="zyncro-success-desc">A calendar invitation with meeting details has been sent to your email.</div>
        </div>
      `;

      setTimeout(destroy, 2400);
    },
  });

  messageBus.emit("modalOpen", { type: "zyncro:modalOpen" });
}

export function closeModal(): void {
  if (activeModalOverlay) {
    const closeBtn = activeModalOverlay.querySelector<HTMLButtonElement>(".zyncro-modal-close");
    if (closeBtn) {
      closeBtn.click();
    }
  }
}

