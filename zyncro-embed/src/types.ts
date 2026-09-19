/**
 * @zyncro/embed — Type Definitions
 * Enterprise-grade scheduling and calendar embed SDK.
 * (c) Zyncro Infotech Private Limited. All rights reserved.
 */

export type EmbedTheme = "light" | "dark" | "auto";

export interface EmbedPrefill {
  /** Guest full name */
  name?: string;
  /** Guest email address */
  email?: string;
  /** Guest phone number */
  phone?: string;
  /** Meeting notes or agenda */
  notes?: string;
  /** Pre-selected booking date in YYYY-MM-DD format */
  date?: string;
  /** Custom booking questions and answers */
  [customField: string]: any;
}

export interface BaseEmbedOptions {
  /**
   * Booking URL, username, or event slug
   * Examples: "https://zyncro.in/prem/30min", "prem/30min", "/o/acme/sales/demo"
   */
  url: string;
  /** Force light or dark mode inside the embed. Default is "auto" (matches host site / OS) */
  theme?: EmbedTheme;
  /** Primary brand color in hex format (e.g. "#7c3aed") */
  color?: string;
  /** Pre-populate guest details in the booking form */
  prefill?: EmbedPrefill;
  /** Custom Zyncro server origin (defaults to "https://zyncro.in") */
  origin?: string;
}

export interface InlineEmbedOptions extends BaseEmbedOptions {
  /** Optional minimum height in pixels (default: 580) */
  minHeight?: number;
  /** Callback fired when a booking is confirmed */
  onBookingSuccessful?: (event: BookingSuccessfulEvent) => void;
  /** Callback fired when the iframe resizes dynamically */
  onResize?: (height: number) => void;
}

export interface PopupEmbedOptions extends BaseEmbedOptions {
  /** Callback fired when booking is successfully confirmed */
  onBookingSuccessful?: (event: BookingSuccessfulEvent) => void;
  /** Callback fired when the popup modal is closed by the user */
  onClose?: () => void;
}

export interface FloatingButtonOptions extends BaseEmbedOptions {
  /** Button label text (default: "Book a call") */
  text?: string;
  /** Screen position of the floating button (default: "bottom-right") */
  position?: "bottom-right" | "bottom-left";
  /** Callback fired when booking is confirmed */
  onBookingSuccessful?: (event: BookingSuccessfulEvent) => void;
}

export interface BookingDetails {
  bookingId?: string;
  bookingRef?: string;
  eventTitle?: string;
  guestName?: string;
  date?: string;
  time?: string;
  duration?: number;
  meetLink?: string;
  locationType?: string;
  provider?: string;
}

export interface BookingSuccessfulEvent {
  type: "zyncro:bookingSuccessful";
  data: BookingDetails;
}

export interface BookingRescheduledEvent {
  type: "zyncro:bookingRescheduled";
  data: {
    bookingId: string;
    newStart?: string;
  };
}

export interface BookingCancelledEvent {
  type: "zyncro:bookingCancelled";
  data: {
    bookingId: string;
    refundStatus?: string;
  };
}

export interface ModalOpenEvent {
  type: "zyncro:modalOpen";
}

export interface ModalCloseEvent {
  type: "zyncro:modalClose";
}

export interface ResizeEvent {
  type: "zyncro:resize";
  height: number;
}

export type ZyncroEventMap = {
  bookingSuccessful: BookingSuccessfulEvent;
  bookingRescheduled: BookingRescheduledEvent;
  bookingCancelled: BookingCancelledEvent;
  modalOpen: ModalOpenEvent;
  modalClose: ModalCloseEvent;
  resize: ResizeEvent;
};

export type ZyncroEventName = keyof ZyncroEventMap;
export type ZyncroEventListener<K extends ZyncroEventName> = (event: ZyncroEventMap[K]) => void;

export interface ZyncroGlobalConfig {
  /** Global default origin (default: "https://zyncro.in") */
  origin?: string;
  /** Global default theme ('light' | 'dark' | 'auto') */
  theme?: EmbedTheme;
  /** Global default brand color in hex */
  color?: string;
}

export interface ZyncroSDK {
  /**
   * Initialize global SDK configuration.
   * Optional when using standard Zyncro cloud (https://zyncro.in).
   */
  init: (config?: ZyncroGlobalConfig) => void;
  /** Embed an inline booking calendar into a DOM element */
  inline: (target: string | HTMLElement, options?: InlineEmbedOptions | string) => HTMLElement | null;
  /** Cleanly unmount an inline booking calendar from a DOM container element */
  unmount: (target: string | HTMLElement) => boolean;
  /** Open a booking page in a popup modal dialog */
  popup: (options: PopupEmbedOptions | string) => void;
  /** Alias for popup() */
  modal: (options: PopupEmbedOptions | string) => void;
  /** Programmatically close any active popup modal */
  close: () => void;
  /** Check if a popup modal is currently open */
  isModalOpen: () => boolean;
  /** Mount a persistent floating launcher button */
  floating: (options: FloatingButtonOptions | string) => HTMLElement | null;
  /** Pre-warm DNS and prefetch calendar assets for 0ms popup opening */
  preload: (url: string) => void;
  /** Scan DOM for [data-zyncro-*] elements and initialize them */
  scan: (root?: HTMLElement | Document) => void;
  /** Get current global default origin */
  getOrigin: () => string;
  /** Set global default origin */
  setOrigin: (origin: string) => void;
  /** Subscribe to a scheduling or UI event */
  on: <K extends ZyncroEventName>(event: K, listener: ZyncroEventListener<K>) => void;
  /** Subscribe to a scheduling event for a single occurrence */
  once: <K extends ZyncroEventName>(event: K, listener: ZyncroEventListener<K>) => void;
  /** Unsubscribe from an event */
  off: <K extends ZyncroEventName>(event: K, listener: ZyncroEventListener<K>) => void;
  /** Current SDK version */
  version: string;
}

