"use strict";
/**
 * @zyncro/embed — DOM Auto-Scanner & SPA Observer
 * Automatically detects and initializes data-zyncro-* attributes across static and dynamic web pages.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseElementAttributes = parseElementAttributes;
exports.scan = scan;
exports.initAutoScanner = initAutoScanner;
const iframe_1 = require("../core/iframe");
const floating_button_1 = require("../ui/floating-button");
const modal_1 = require("../ui/modal");
function parseElementAttributes(el) {
    const url = el.getAttribute("data-zyncro-url") ||
        el.getAttribute("data-zyncro-inline") ||
        el.getAttribute("data-zyncro-modal") ||
        el.getAttribute("data-zyncro-popup") ||
        el.getAttribute("data-zyncro-float") ||
        el.getAttribute("href") ||
        "";
    const theme = el.getAttribute("data-zyncro-theme") || undefined;
    const color = el.getAttribute("data-zyncro-color") || undefined;
    const text = el.getAttribute("data-zyncro-text") || el.textContent?.trim() || undefined;
    const prefill = {};
    const name = el.getAttribute("data-zyncro-name");
    const email = el.getAttribute("data-zyncro-email");
    const phone = el.getAttribute("data-zyncro-phone");
    const notes = el.getAttribute("data-zyncro-notes");
    const date = el.getAttribute("data-zyncro-date");
    if (name)
        prefill.name = name;
    if (email)
        prefill.email = email;
    if (phone)
        prefill.phone = phone;
    if (notes)
        prefill.notes = notes;
    if (date)
        prefill.date = date;
    return {
        url,
        theme,
        color,
        text,
        prefill: Object.keys(prefill).length > 0 ? prefill : undefined,
    };
}
/**
 * Scan a document or root element for data-zyncro-* elements
 */
function scan(root) {
    if (typeof document === "undefined")
        return;
    const target = root || document;
    // 1. Process Inline Embeds
    const inlineEls = target.querySelectorAll("[data-zyncro-inline]");
    inlineEls.forEach((el) => {
        if (el.__zyncroMounted)
            return;
        el.__zyncroMounted = true;
        const opts = parseElementAttributes(el);
        if (opts.url) {
            (0, iframe_1.mountInline)(el, opts);
        }
    });
    // 2. Process Popup / Modal Triggers
    const modalEls = target.querySelectorAll("[data-zyncro-modal], [data-zyncro-popup]");
    modalEls.forEach((el) => {
        if (el.__zyncroBound)
            return;
        el.__zyncroBound = true;
        el.style.cursor = "pointer";
        el.addEventListener("click", (e) => {
            e.preventDefault();
            const opts = parseElementAttributes(el);
            if (opts.url) {
                (0, modal_1.openModal)(opts);
            }
        });
    });
    // 3. Process Floating Button (e.g. from a <script data-zyncro-float>)
    const floatEls = target.querySelectorAll("[data-zyncro-float]");
    floatEls.forEach((el) => {
        if (el.__zyncroMounted)
            return;
        el.__zyncroMounted = true;
        const opts = parseElementAttributes(el);
        if (opts.url) {
            (0, floating_button_1.mountFloatingButton)(opts);
        }
    });
}
/**
 * Initialize MutationObserver to support dynamic single page applications
 */
function initAutoScanner() {
    if (typeof document === "undefined")
        return;
    const runInitialScan = () => {
        scan(document);
    };
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", runInitialScan);
    }
    else {
        runInitialScan();
    }
    // Set up MutationObserver for SPA changes
    if (typeof MutationObserver !== "undefined") {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.addedNodes.length > 0) {
                    scan(document);
                    break;
                }
            }
        });
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });
    }
}
