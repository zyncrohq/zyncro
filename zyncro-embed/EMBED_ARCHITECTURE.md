# @zyncro/embed — Enterprise Specification & Architecture

> **Official Package:** `@zyncro/embed`  
> **Entity:** Zyncro Infotech Private Limited  
> **Website:** https://zyncro.in  
> **Repository:** https://github.com/zyncrohq/zyncro

---

## 📁 Package Structure

```
packages/zyncro-embed/
├── src/
│   ├── index.ts               # Main Entry Point & window.Zyncro global attachment
│   ├── types.ts               # TypeScript interfaces, options & event contracts
│   ├── core/
│   │   ├── url-builder.ts     # Safe URL sanitization, parameter mapping & prefill
│   │   ├── message-bus.ts     # Security-hardened postMessage listener & event bus
│   │   └── iframe.ts          # Accessible iframe factory & dynamic height syncing
│   ├── ui/
│   │   ├── modal.ts           # Enterprise Popup Modal (glassmorphism, focus trap, ESC close)
│   │   ├── floating-button.ts # Corner Floating Action Button (FAB)
│   │   └── styles.ts          # Zero-runtime injected styles & animations
│   └── dom/
│       └── scanner.ts         # MutationObserver auto-scanner for data-zyncro-* attrs
├── dist/                      # ESM (index.mjs), CJS (index.cjs), IIFE (embed.js CDN)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 💎 Features & Capabilities

1. **3 Embedding Modes:** Inline, Popup Modal, Floating Action Button.
2. **Prefill Data:** `name`, `email`, `notes`, `phone`, `date`, custom fields.
3. **Theming & Branding:** `theme` (`light`/`dark`), `color` (hex).
4. **Event Bus:** `bookingSuccessful`, `bookingRescheduled`, `bookingCancelled`, `modalOpen`, `modalClose`, `resize`.
5. **Zero Dependencies & Lightweight:** ~7KB minified/gzipped.
6. **No-Code DOM Scanner:** Scans for `data-zyncro-*` attributes automatically.
