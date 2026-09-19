/**
 * @zyncro/embed — Message Bus & Event Dispatcher
 * Secure cross-window communication for iframe event handling & analytics.
 * Strictly validates both event.origin AND event.source against registered iframes.
 */
import { BookingSuccessfulEvent, ZyncroEventListener, ZyncroEventMap, ZyncroEventName } from "../types";
export interface IframeRegistryEntry {
    iframe: HTMLIFrameElement;
    onBookingSuccessful?: (event: BookingSuccessfulEvent) => void;
    onResize?: (height: number) => void;
}
declare class MessageBus {
    private listeners;
    private iframeRegistry;
    private isListening;
    constructor();
    private initGlobalListener;
    private handleIncomingMessage;
    /**
     * Register an active iframe for target-specific callback routing
     */
    registerIframe(entry: IframeRegistryEntry): void;
    /**
     * Unregister an iframe when unmounted or destroyed to prevent memory leaks
     */
    unregisterIframe(iframe: HTMLIFrameElement): void;
    /**
     * Add a persistent global event listener
     */
    on<K extends ZyncroEventName>(event: K, listener: ZyncroEventListener<K>): void;
    /**
     * Add a one-time global event listener
     */
    once<K extends ZyncroEventName>(event: K, listener: ZyncroEventListener<K>): void;
    /**
     * Remove a global event listener
     */
    off<K extends ZyncroEventName>(event: K, listener: ZyncroEventListener<K>): void;
    /**
     * Remove all listeners for an event or all events
     */
    removeAllListeners(event?: ZyncroEventName): void;
    /**
     * Emit an event to all global subscribers
     */
    emit<K extends ZyncroEventName>(event: K, payload: ZyncroEventMap[K]): void;
}
export declare const messageBus: MessageBus;
export {};
