"use strict";
/**
 * @zyncro/embed — Floating Action Button (FAB)
 * Corner launcher button with customizable text, positioning, and theme colors.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountFloatingButton = mountFloatingButton;
const url_builder_1 = require("../core/url-builder");
const modal_1 = require("./modal");
const styles_1 = require("./styles");
const FLOATING_BTN_ID = "zyncro-floating-launcher";
function mountFloatingButton(options) {
    if (typeof document === "undefined" || !document.body) {
        return null;
    }
    (0, styles_1.ensureStyles)();
    // Remove existing floating button if already present to prevent duplicate stacks
    const existingBtn = document.getElementById(FLOATING_BTN_ID);
    if (existingBtn && existingBtn.parentNode) {
        existingBtn.parentNode.removeChild(existingBtn);
    }
    const opts = typeof options === "string" ? { url: options } : options;
    const embedUrl = (0, url_builder_1.buildEmbedUrl)(opts.url, opts);
    if (!embedUrl) {
        console.warn("[Zyncro Embed] Invalid URL for floating button:", opts.url);
        return null;
    }
    const btn = document.createElement("button");
    btn.id = FLOATING_BTN_ID;
    btn.type = "button";
    btn.className = `zyncro-floating-btn zyncro-pos-${opts.position === "bottom-left" ? "left" : "right"}`;
    btn.setAttribute("aria-label", opts.text || "Book a call with Zyncro");
    // Custom brand color
    if (opts.color && /^#[0-9a-fA-F]{3,8}$/.test(opts.color)) {
        btn.style.backgroundColor = opts.color;
        btn.style.boxShadow = `0 10px 25px -4px ${opts.color}66, 0 4px 6px -2px rgba(0, 0, 0, 0.2)`;
    }
    btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
    <span>${opts.text || "Book a call"}</span>
  `;
    btn.addEventListener("click", () => {
        (0, modal_1.openModal)(opts);
    });
    document.body.appendChild(btn);
    return btn;
}
