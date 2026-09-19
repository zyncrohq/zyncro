"use strict";
/**
 * @zyncro/embed — Iframe Factory
 * Creates sandboxed, accessible, responsive iframes with loader management.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIframe = createIframe;
exports.createLoader = createLoader;
exports.mountInline = mountInline;
const styles_1 = require("../ui/styles");
const message_bus_1 = require("./message-bus");
const url_builder_1 = require("./url-builder");
function createIframe(src, title = "Zyncro Booking Calendar") {
    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = title;
    iframe.loading = "lazy";
    iframe.className = "zyncro-iframe";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "camera; microphone; payment; autoplay; clipboard-write");
    iframe.setAttribute("role", "region");
    iframe.setAttribute("aria-label", title);
    return iframe;
}
function createLoader() {
    const container = document.createElement("div");
    container.className = "zyncro-loader-container";
    container.innerHTML = `
    <div class="zyncro-spinner" aria-hidden="true"></div>
    <span>Loading calendar…</span>
  `;
    return container;
}
/**
 * Mount an inline iframe inside a container element
 */
function mountInline(target, options) {
    (0, styles_1.ensureStyles)();
    const container = typeof target === "string" ? document.querySelector(target) : target;
    if (!container) {
        console.warn(`[Zyncro Embed] Target container '${target}' not found.`);
        return null;
    }
    const opts = typeof options === "string" ? { url: options } : options;
    const embedUrl = (0, url_builder_1.buildEmbedUrl)(opts.url, opts);
    if (!embedUrl) {
        console.warn("[Zyncro Embed] Invalid booking URL provided:", opts.url);
        return null;
    }
    // Clear previous content and set up wrapper
    container.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.className = "zyncro-inline-wrapper";
    if (opts.minHeight) {
        wrapper.style.minHeight = `${opts.minHeight}px`;
    }
    const loader = createLoader();
    const iframe = createIframe(embedUrl);
    wrapper.appendChild(loader);
    wrapper.appendChild(iframe);
    container.appendChild(wrapper);
    // Fade out loader on iframe load
    iframe.addEventListener("load", () => {
        loader.style.opacity = "0";
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 200);
    });
    // Register with message bus for postMessage sync
    message_bus_1.messageBus.registerIframe({
        iframe,
        onBookingSuccessful: opts.onBookingSuccessful,
        onResize: opts.onResize,
    });
    return container;
}
