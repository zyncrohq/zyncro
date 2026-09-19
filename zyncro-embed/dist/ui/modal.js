"use strict";
/**
 * @zyncro/embed — Popup Modal Dialog
 * Accessible, animated modal dialog styled to 100% match Zyncro design language.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.openModal = openModal;
exports.closeModal = closeModal;
const iframe_1 = require("../core/iframe");
const message_bus_1 = require("../core/message-bus");
const url_builder_1 = require("../core/url-builder");
const styles_1 = require("./styles");
let activeModalOverlay = null;
function openModal(options) {
    (0, styles_1.ensureStyles)();
    // If a modal is already open, do not open another
    if (activeModalOverlay) {
        return;
    }
    const opts = typeof options === "string" ? { url: options } : options;
    const embedUrl = (0, url_builder_1.buildEmbedUrl)(opts.url, opts);
    if (!embedUrl) {
        console.warn("[Zyncro Embed] Invalid booking URL for modal:", opts.url);
        return;
    }
    // Preserve host page focus & scroll state
    const prevActiveElement = document.activeElement;
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
    if (opts.color && /^#[0-9a-fA-F]{3,8}$/.test(opts.color)) {
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
    const loader = (0, iframe_1.createLoader)();
    const iframe = (0, iframe_1.createIframe)(embedUrl, "Zyncro Booking Modal");
    body.appendChild(loader);
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
        loader.style.opacity = "0";
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 200);
    });
    // Destroy / Close modal function
    let isDestroyed = false;
    const destroy = () => {
        if (isDestroyed)
            return;
        isDestroyed = true;
        overlay.classList.remove("zyncro-visible");
        document.body.style.overflow = prevOverflow;
        document.removeEventListener("keydown", handleKeydown, true);
        message_bus_1.messageBus.unregisterIframe(iframe);
        message_bus_1.messageBus.emit("modalClose", { type: "zyncro:modalClose" });
        if (opts.onClose) {
            try {
                opts.onClose();
            }
            catch (err) {
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
                }
                catch { }
            }
        }, 280);
    };
    const handleKeydown = (e) => {
        if (e.key === "Escape") {
            e.stopPropagation();
            destroy();
        }
    };
    closeBtn.addEventListener("click", destroy);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            destroy();
        }
    });
    document.addEventListener("keydown", handleKeydown, true);
    // Register with MessageBus
    message_bus_1.messageBus.registerIframe({
        iframe,
        onBookingSuccessful: (event) => {
            if (opts.onBookingSuccessful) {
                try {
                    opts.onBookingSuccessful(event);
                }
                catch (err) {
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
    message_bus_1.messageBus.emit("modalOpen", { type: "zyncro:modalOpen" });
}
function closeModal() {
    if (activeModalOverlay) {
        const closeBtn = activeModalOverlay.querySelector(".zyncro-modal-close");
        if (closeBtn) {
            closeBtn.click();
        }
    }
}
