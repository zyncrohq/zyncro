/**
 * @zyncro/embed — Message Bus & Event Dispatcher
 * Secure cross-window communication for iframe event handling & analytics.
 * Strictly validates both event.origin AND event.source against registered iframes.
 */

import {
  BookingCancelledEvent,
  BookingRescheduledEvent,
  BookingSuccessfulEvent,
  ZyncroEventListener,
  ZyncroEventMap,
  ZyncroEventName,
} from "../types";
import { getGlobalOrigin } from "./url-builder";

export interface IframeRegistryEntry {
  iframe: HTMLIFrameElement;
  onBookingSuccessful?: (event: BookingSuccessfulEvent) => void;
  onResize?: (height: number) => void;
}

class MessageBus {
  private listeners: Map<ZyncroEventName, Set<ZyncroEventListener<any>>> = new Map();
  private iframeRegistry: IframeRegistryEntry[] = [];
  private isListening = false;

  constructor() {
    this.initGlobalListener();
  }

  private initGlobalListener(): void {
    if (typeof window === "undefined" || this.isListening) return;
    this.isListening = true;

    window.addEventListener("message", (event: MessageEvent) => {
      this.handleIncomingMessage(event);
    });
  }

  private handleIncomingMessage(event: MessageEvent): void {
    const expectedOrigin = getGlobalOrigin();

    // 1. Strict Origin Validation
    if (event.origin !== expectedOrigin) {
      return;
    }

    // 2. Strict Source Window Validation: Message MUST originate from a registered Zyncro iframe
    const matchedEntry = this.iframeRegistry.find(
      (entry) => entry.iframe && entry.iframe.contentWindow === event.source
    );

    if (!matchedEntry) {
      return;
    }

    const data = event.data;
    if (!data) return;

    // 3. Handle resize event
    if (data.type === "zyncro:resize" && typeof data.height === "number") {
      const height = Math.min(3200, Math.max(280, data.height));
      matchedEntry.iframe.style.height = `${height}px`;

      if (matchedEntry.onResize) {
        try {
          matchedEntry.onResize(height);
        } catch (err) {
          console.error("[Zyncro Embed] Error in onResize callback:", err);
        }
      }

      this.emit("resize", { type: "zyncro:resize", height });
      return;
    }

    // 4. Handle booking confirmed / successful
    if (
      data === "zyncro:booking-confirmed" ||
      (typeof data === "object" && data !== null && (data.type === "zyncro:booking-confirmed" || data.type === "zyncro:bookingSuccessful"))
    ) {
      const payloadData =
        typeof data === "object" && data !== null && typeof data.data === "object" && data.data !== null
          ? data.data
          : {};

      const structuredEvent: BookingSuccessfulEvent = {
        type: "zyncro:bookingSuccessful",
        data: {
          bookingId: typeof payloadData.bookingId === "string" ? payloadData.bookingId : "",
          bookingRef: typeof payloadData.bookingRef === "string" ? payloadData.bookingRef : undefined,
          eventTitle: typeof payloadData.eventTitle === "string" ? payloadData.eventTitle : undefined,
          guestName: typeof payloadData.guestName === "string" ? payloadData.guestName : undefined,
          date: typeof payloadData.date === "string" ? payloadData.date : undefined,
          time: typeof payloadData.time === "string" ? payloadData.time : undefined,
          duration: typeof payloadData.duration === "number" ? payloadData.duration : undefined,
          meetLink: typeof payloadData.meetLink === "string" ? payloadData.meetLink : undefined,
          locationType: typeof payloadData.locationType === "string" ? payloadData.locationType : undefined,
          provider: typeof payloadData.provider === "string" ? payloadData.provider : undefined,
        },
      };

      if (matchedEntry.onBookingSuccessful) {
        try {
          matchedEntry.onBookingSuccessful(structuredEvent);
        } catch (err) {
          console.error("[Zyncro Embed] Error in onBookingSuccessful callback:", err);
        }
      }

      this.emit("bookingSuccessful", structuredEvent);
      return;
    }

    // 5. Handle booking rescheduled
    if (typeof data === "object" && data !== null && data.type === "zyncro:bookingRescheduled") {
      const rawPayload = typeof data.data === "object" && data.data !== null ? data.data : {};
      const rescheduledEvent: BookingRescheduledEvent = {
        type: "zyncro:bookingRescheduled",
        data: {
          bookingId: typeof rawPayload.bookingId === "string" ? rawPayload.bookingId : "",
          newStart: typeof rawPayload.newStart === "string" ? rawPayload.newStart : undefined,
        },
      };
      this.emit("bookingRescheduled", rescheduledEvent);
      return;
    }

    // 6. Handle booking cancelled
    if (typeof data === "object" && data !== null && data.type === "zyncro:bookingCancelled") {
      const rawPayload = typeof data.data === "object" && data.data !== null ? data.data : {};
      const cancelledEvent: BookingCancelledEvent = {
        type: "zyncro:bookingCancelled",
        data: {
          bookingId: typeof rawPayload.bookingId === "string" ? rawPayload.bookingId : "",
          refundStatus: typeof rawPayload.refundStatus === "string" ? rawPayload.refundStatus : undefined,
        },
      };
      this.emit("bookingCancelled", cancelledEvent);
      return;
    }

  }

  /**
   * Register an active iframe for target-specific callback routing
   */
  public registerIframe(entry: IframeRegistryEntry): void {
    this.iframeRegistry.push(entry);
  }

  /**
   * Unregister an iframe when unmounted or destroyed to prevent memory leaks
   */
  public unregisterIframe(iframe: HTMLIFrameElement): void {
    this.iframeRegistry = this.iframeRegistry.filter((e) => e.iframe !== iframe);
  }

  /**
   * Add a persistent global event listener
   */
  public on<K extends ZyncroEventName>(event: K, listener: ZyncroEventListener<K>): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
  }

  /**
   * Add a one-time global event listener
   */
  public once<K extends ZyncroEventName>(event: K, listener: ZyncroEventListener<K>): void {
    const onceWrapper = (payload: ZyncroEventMap[K]) => {
      this.off(event, onceWrapper);
      listener(payload);
    };
    this.on(event, onceWrapper);
  }

  /**
   * Remove a global event listener
   */
  public off<K extends ZyncroEventName>(event: K, listener: ZyncroEventListener<K>): void {
    const set = this.listeners.get(event);
    if (set) {
      set.delete(listener);
    }
  }

  /**
   * Remove all listeners for an event or all events
   */
  public removeAllListeners(event?: ZyncroEventName): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }

  /**
   * Emit an event to all global subscribers
   */
  public emit<K extends ZyncroEventName>(event: K, payload: ZyncroEventMap[K]): void {
    const set = this.listeners.get(event);
    if (set) {
      for (const listener of Array.from(set)) {
        try {
          listener(payload);
        } catch (err) {
          console.error(`[Zyncro Embed] Error in event listener for '${event}':`, err);
        }
      }
    }
  }
}

export const messageBus = new MessageBus();
