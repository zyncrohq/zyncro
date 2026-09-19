"use strict";
/**
 * @zyncro/embed — Official Embed SDK
 * Universal embedding engine for Zyncro scheduling calendars.
 *
 * (c) Zyncro Infotech Private Limited. All rights reserved.
 * https://zyncro.in
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openModal = exports.closeModal = exports.Zyncro = void 0;
const iframe_1 = require("./core/iframe");
const message_bus_1 = require("./core/message-bus");
const url_builder_1 = require("./core/url-builder");
const scanner_1 = require("./dom/scanner");
const floating_button_1 = require("./ui/floating-button");
const modal_1 = require("./ui/modal");
Object.defineProperty(exports, "closeModal", { enumerable: true, get: function () { return modal_1.closeModal; } });
Object.defineProperty(exports, "openModal", { enumerable: true, get: function () { return modal_1.openModal; } });
__exportStar(require("./types"), exports);
const VERSION = "1.0.0";
exports.Zyncro = {
    version: VERSION,
    init(config) {
        if (config?.origin) {
            (0, url_builder_1.setGlobalOrigin)(config.origin);
        }
        (0, scanner_1.scan)();
    },
    inline(target, options) {
        if (!options)
            return null;
        return (0, iframe_1.mountInline)(target, options);
    },
    popup(options) {
        (0, modal_1.openModal)(options);
    },
    modal(options) {
        (0, modal_1.openModal)(options);
    },
    floating(options) {
        return (0, floating_button_1.mountFloatingButton)(options);
    },
    preload(url) {
        if (typeof document === "undefined" || !url)
            return;
        try {
            const safeUrl = (0, url_builder_1.buildEmbedUrl)(url);
            if (!safeUrl)
                return;
            // Check if already preloaded
            const existing = document.querySelector(`link[rel="prefetch"][href="${safeUrl}"]`);
            if (existing)
                return;
            const link = document.createElement("link");
            link.rel = "prefetch";
            link.href = safeUrl;
            link.as = "document";
            document.head.appendChild(link);
        }
        catch {
            // Ignore prefetch failures
        }
    },
    scan(root) {
        (0, scanner_1.scan)(root);
    },
    on(event, listener) {
        message_bus_1.messageBus.on(event, listener);
    },
    off(event, listener) {
        message_bus_1.messageBus.off(event, listener);
    },
};
// Global Browser Attachment
if (typeof window !== "undefined") {
    window.Zyncro = window.Zyncro || exports.Zyncro;
    (0, scanner_1.initAutoScanner)();
}
exports.default = exports.Zyncro;
