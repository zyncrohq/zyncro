"use strict";
/**
 * @zyncro/embed — Message Bus & Event Dispatcher
 * Secure cross-window communication for iframe event handling & analytics.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageBus = void 0;
const url_builder_1 = require("./url-builder");
class MessageBus {
    constructor() {
        this.listeners = new Map();
        this.iframeRegistry = [];
        this.isListening = false;
        this.initGlobalListener();
    }
    initGlobalListener() {
        if (typeof window === "undefined" || this.isListening)
            return;
        this.isListening = true;
        window.addEventListener("message", (event) => {
            this.handleIncomingMessage(event);
        });
    }
    handleIncomingMessage(event) {
        const expectedOrigin = (0, url_builder_1.getGlobalOrigin)();
        // Security check: Ignore messages from untrusted origins
        if (event.origin !== expectedOrigin) {
            return;
        }
        const data = event.data;
        if (!data)
            return;
        // 1. Handle resize event
        if (data.type === "zyncro:resize" && typeof data.height === "number") {
            const height = Math.min(3200, Math.max(280, data.height));
            // Find matching iframe from registry
            for (const entry of this.iframeRegistry) {
                if (entry.iframe && entry.iframe.contentWindow === event.source) {
                    entry.iframe.style.height = `${height}px`;
                    if (entry.onResize) {
                        entry.onResize(height);
                    }
                }
            }
            this.emit("resize", { type: "zyncro:resize", height });
            return;
        }
        // 2. Handle booking confirmed / successful
        if (data === "zyncro:booking-confirmed" ||
            data.type === "zyncro:booking-confirmed" ||
            data.type === "zyncro:bookingSuccessful") {
            const structuredEvent = {
                type: "zyncro:bookingSuccessful",
                data: data.data || {},
            };
            for (const entry of this.iframeRegistry) {
                if (entry.iframe && entry.iframe.contentWindow === event.source) {
                    if (entry.onBookingSuccessful) {
                        try {
                            entry.onBookingSuccessful(structuredEvent);
                        }
                        catch (err) {
                            console.error("[Zyncro Embed] Error in onBookingSuccessful callback:", err);
                        }
                    }
                }
            }
            this.emit("bookingSuccessful", structuredEvent);
            return;
        }
        // 3. Handle booking rescheduled
        if (data.type === "zyncro:bookingRescheduled") {
            this.emit("bookingRescheduled", data);
            return;
        }
        // 4. Handle booking cancelled
        if (data.type === "zyncro:bookingCancelled") {
            this.emit("bookingCancelled", data);
            return;
        }
    }
    /**
     * Register an active iframe for target-specific callback routing
     */
    registerIframe(entry) {
        this.iframeRegistry.push(entry);
    }
    /**
     * Unregister an iframe when unmounted or destroyed
     */
    unregisterIframe(iframe) {
        this.iframeRegistry = this.iframeRegistry.filter((e) => e.iframe !== iframe);
    }
    /**
     * Add a global event listener
     */
    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(listener);
    }
    /**
     * Remove a global event listener
     */
    off(event, listener) {
        const set = this.listeners.get(event);
        if (set) {
            set.delete(listener);
        }
    }
    /**
     * Emit an event to all global subscribers
     */
    emit(event, payload) {
        const set = this.listeners.get(event);
        if (set) {
            for (const listener of set) {
                try {
                    listener(payload);
                }
                catch (err) {
                    console.error(`[Zyncro Embed] Error in event listener for '${event}':`, err);
                }
            }
        }
    }
}
exports.messageBus = new MessageBus();
