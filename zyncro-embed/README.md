<p align="center">
  <a href="https://zyncro.in">
    <img src="https://zyncro.in/logo.png" alt="Zyncro Logo" width="80" height="80" onerror="this.style.display='none'"/>
  </a>
</p>

<h1 align="center">@zyncro/embed</h1>

<p align="center">
  <strong>Universal JavaScript Embed SDK for <a href="https://zyncro.in">Zyncro</a> — Embed booking calendars, popup modals, and floating scheduling launchers into any website (HTML, Webflow, WordPress, Framer, Shopify, React, Next.js, Vue).</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@zyncro/embed"><img src="https://img.shields.io/npm/v/@zyncro/embed?style=flat-square&color=7c3aed" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@zyncro/embed"><img src="https://img.shields.io/npm/dm/@zyncro/embed?style=flat-square&color=10b981" alt="npm downloads" /></a>
  <a href="https://cdn.jsdelivr.net/npm/@zyncro/embed/dist/embed.js"><img src="https://img.shields.io/badge/CDN-jsDelivr%20%7C%20unpkg-orange?style=flat-square" alt="CDN" /></a>
  <a href="https://github.com/zyncrohq/zyncro"><img src="https://img.shields.io/badge/github-zyncrohq%2Fzyncro-181717?style=flat-square&logo=github" alt="GitHub" /></a>
  <a href="https://zyncro.in"><img src="https://img.shields.io/badge/website-zyncro.in-0ea5e9?style=flat-square" alt="Website" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-purple?style=flat-square" alt="License" /></a>
</p>

---

## ⚡ Key Highlights

- 🪶 **Ultra Lightweight (~7KB gzipped)**: Zero third-party runtime dependencies. Built for blazingly fast page loads.
- 📐 **Dynamic Auto-Resizing**: Synchronizes iframe height in real time to eliminate internal scrollbars.
- 🎨 **Theme & Brand Styling**: Matches your site's dark/light mode and custom brand hex colors (`#7c3aed`).
- ✍️ **Guest Prefill**: Pre-populates guest names, emails, phone numbers, notes, dates, and custom question fields.
- 📊 **Analytics-Ready Event Callbacks**: Track booking confirmations in Google Analytics (`gtag`), PostHog, Segment, Meta Pixel, or your own analytics pipeline.
- 🔄 **SPA & Framework Friendly**: Built-in unmount lifecycle (`Zyncro.unmount()`) and debounced `MutationObserver` for React, Vue, Next.js, and HTMX.
- 🌐 **Universal Platform Support**: Native support for HTML, Webflow, WordPress, React, Next.js, Vue, Squarespace, and Shopify.

---

## 📦 Installation & Embed Options

### Option 1: Official Zyncro Direct Script (Recommended for HTML, Webflow, WordPress)
Fast, first-party script served directly from Zyncro's edge infrastructure:
```html
<script src="https://zyncro.in/embed.js" async></script>
```

### Option 2: npm / pnpm / yarn (React, Next.js, Vue, Vite)
Install via npm for typed JavaScript/TypeScript projects:
```bash
npm install @zyncro/embed
```

### Option 3: Global Open-Source CDN (Backup)
```html
<script src="https://cdn.jsdelivr.net/npm/@zyncro/embed/dist/embed.js" async></script>
```

---

## 🚀 Usage

> 💡 **URL Flexibility:** Both full URLs (`https://zyncro.in/prem/30min`) and shorthand booking paths (`prem/30min`) are automatically resolved and sanitized.

### 1. Declarative HTML (No JavaScript Required)

#### A. Inline Calendar Embed
Embed your booking calendar directly into any section or column on your page:
```html
<div 
  data-zyncro-inline 
  data-zyncro-url="https://zyncro.in/prem/30min"
  data-zyncro-theme="dark"
  data-zyncro-color="#7c3aed"
></div>

<script src="https://zyncro.in/embed.js" async></script>
```

#### B. Popup Modal Trigger with Guest Prefill
Open a glassmorphism booking modal on button click:
```html
<button 
  data-zyncro-modal 
  data-zyncro-url="prem/30min"
  data-zyncro-name="Aman Gupta"
  data-zyncro-email="aman@example.com"
  data-zyncro-phone="+919876543210"
  data-zyncro-prefill-company="Acme Corp"
>
  Book a Discovery Call
</button>

<script src="https://zyncro.in/embed.js" async></script>
```

#### C. Floating Action Launcher (Bottom-Right Corner)
Add a persistent floating CTA button to every page:
```html
<script 
  src="https://zyncro.in/embed.js" 
  data-zyncro-float 
  data-zyncro-url="prem/30min"
  data-zyncro-text="Schedule Meeting 🗓️"
  data-zyncro-color="#7c3aed"
  async
></script>
```

---

### 2. Programmatic JavaScript / TypeScript API

```typescript
import { Zyncro } from '@zyncro/embed';

// 1. Open Popup Modal
Zyncro.popup({
  url: 'https://zyncro.in/prem/30min', // Or 'prem/30min'
  theme: 'dark',
  color: '#7c3aed',
  prefill: {
    name: 'Aman Gupta',
    email: 'aman@example.com',
    phone: '+919876543210',
    notes: 'Interested in Enterprise Plan',
    company: 'Acme Corp', // Custom question fields
  },
  onBookingSuccessful: (event) => {
    console.log('Booking Confirmed!', event.data);
    // Track conversion in Google Analytics
    // if (typeof gtag === 'function') {
    //   gtag('event', 'conversion', { 'booking_id': event.data.bookingId });
    // }
  },
  onClose: () => {
    console.log('Modal closed by user');
  },
});

// 2. Inline Mount
Zyncro.inline('#booking-container', {
  url: 'prem/30min',
  theme: 'light',
  onResize: (height) => console.log('Iframe height adjusted:', height),
});

// 3. Mount Floating Button
Zyncro.floating({
  url: 'prem/30min',
  text: 'Book a Call',
  position: 'bottom-right',
  color: '#7c3aed',
});

// 4. Pre-warm Origin & Prefetch Assets for Faster Opening
Zyncro.preload('prem/30min');

// 5. Check if Modal is Open / Programmatically Close
if (Zyncro.isModalOpen()) {
  Zyncro.close();
}
```

---

### 3. React / Next.js Integration Example

```tsx
import React, { useEffect, useRef } from 'react';
import { Zyncro } from '@zyncro/embed';

export function BookingWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      Zyncro.inline(container, {
        url: 'prem/30min',
        theme: 'auto',
        color: '#7c3aed',
        onBookingSuccessful: (event) => {
          console.log('Booking Confirmed:', event.data.bookingId);
        },
      });
    }

    // Clean up iframe and listeners on unmount
    return () => {
      if (container) {
        Zyncro.unmount(container);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', minHeight: '580px' }} />;
}
```

---

## 📡 Event Tracking & Analytics

Subscribe to scheduling events globally using strongly typed event listeners:

```javascript
import { Zyncro } from '@zyncro/embed';

// Listen for successful bookings (Google Analytics, PostHog, Meta Pixel)
Zyncro.on('bookingSuccessful', (event) => {
  console.log('Booking details:', event.data);
  // {
  //   bookingId: "cm123...",
  //   bookingRef: "8F3A2B1C",
  //   eventTitle: "30 Min Discovery Call",
  //   guestName: "Aman Gupta",
  //   date: "2026-09-25",
  //   time: "15:00",
  //   duration: 30,
  //   meetLink: "https://meet.google.com/...",
  //   provider: "Google Meet"
  // }
});

// Listen for reschedules & cancellations
Zyncro.on('bookingRescheduled', (event) => console.log('Rescheduled:', event.data));
Zyncro.on('bookingCancelled', (event) => console.log('Cancelled:', event.data));

// Listen for modal state
Zyncro.on('modalOpen', () => console.log('Booking modal opened'));
Zyncro.on('modalClose', () => console.log('Booking modal closed'));
```

---

## ⚙️ Configuration Reference

### `InlineEmbedOptions` / `PopupEmbedOptions`

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `url` | `string` | **Required** | Booking URL (e.g. `zyncro.in/prem/30min` or `prem/30min`) |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Force light or dark mode inside the calendar |
| `color` | `string` (hex) | `'#7c3aed'` | Primary brand accent color (e.g. `#7c3aed`) |
| `prefill` | `EmbedPrefill` | `{}` | Prefill `name`, `email`, `phone`, `notes`, `date`, and custom fields |
| `origin` | `string` | `'https://zyncro.in'` | Custom Zyncro backend origin (HTTPS only) |
| `onBookingSuccessful` | `function` | `undefined` | Callback fired upon successful booking confirmation |
| `onClose` | `function` | `undefined` | Callback fired when modal popup is dismissed |
| `onResize` | `function` | `undefined` | Callback fired when iframe height resizes (inline mode) |
| `minHeight` | `number` | `580` | Minimum height in pixels (inline mode only) |

---

## 🔒 Security & Privacy

- **Strict Origin Validation:** Cross-window `postMessage` communication strictly checks HTTPS origin and target window source.
- **Least-Privilege Permissions:** Iframes only request `payment; clipboard-write` permissions, avoiding unnecessary device access.
- **Protocol Safety:** Blocks unsafe pseudo-protocols (`javascript:`, `data:`, `vbscript:`).
- **Data Isolation:** Booking flow executes in an isolated browsing context without exposing parent session tokens or cookies.

---

## 🤝 Documentation & Support

- 📖 **Official Documentation:** [zyncro.in/docs](https://zyncro.in/docs)
- 📘 **Embed SDK Guide:** [zyncro.in/docs/embed](https://zyncro.in/docs/embed)
- 🌐 **Website:** [zyncro.in](https://zyncro.in)
- 🐙 **GitHub:** [github.com/zyncrohq](https://github.com/zyncrohq)
- 🐛 **Issues:** [github.com/zyncrohq/zyncro/issues](https://github.com/zyncrohq/zyncro/issues)
- 📧 **Support:** [support@zyncro.in](mailto:support@zyncro.in)

---

## 📄 License

MIT © [Zyncro Infotech Private Limited](https://zyncro.in)



