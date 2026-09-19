<p align="center">
  <a href="https://zyncro.in">
    <img src="https://zyncro.in/logo.png" alt="Zyncro Logo" width="80" height="80" onerror="this.style.display='none'"/>
  </a>
</p>

<h1 align="center">Zyncro Official Client SDKs & Developer Tools</h1>

<p align="center">
  <strong>The official monorepo for <a href="https://zyncro.in">Zyncro</a> client libraries, embed widgets, React components, CLI tools, and developer utilities.</strong>
</p>

<p align="center">
  <a href="https://zyncro.in"><img src="https://img.shields.io/badge/website-zyncro.in-0ea5e9?style=flat-square" alt="Website" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-purple?style=flat-square" alt="License" /></a>
  <a href="https://github.com/zyncrohq/zyncro"><img src="https://img.shields.io/badge/github-zyncrohq%2Fzyncro-181717?style=flat-square&logo=github" alt="GitHub" /></a>
  <a href="https://github.com/zyncrohq/zyncro/issues"><img src="https://img.shields.io/github/issues/zyncrohq/zyncro?style=flat-square&color=10b981" alt="Issues" /></a>
</p>

---

## 📦 Packages in this Monorepo

> 💡 **Release Status:** Currently, **[`@zyncro/embed`](./zyncro-embed)** is fully production-ready (`v1.0.0`) and available for integrating into any website or application. All other packages listed below are under active development and marked as `🟡 Coming Soon`.

| Package | Status | Description | Directory |
| :--- | :---: | :--- | :--- |
| **[`@zyncro/embed`](./zyncro-embed)** | `🟢 Production (v1.0.0)` | Zero-dependency universal JS/TS embed engine for inline calendars, popups, and floating CTA launchers (~7KB gzipped). | [`/zyncro-embed`](./zyncro-embed) |
| **[`@zyncro/react`](./zyncro-react)** | `🟡 Coming Soon` | Official React wrapper components (`<ZyncroEmbed />`, `<ZyncroModalButton />`, `useZyncro` hook). | [`/zyncro-react`](./zyncro-react) |
| **[`@zyncro/sdk`](./zyncro-sdk)** | `🟡 Coming Soon` | Official TypeScript / Node.js API client for interacting with the Zyncro REST API. | [`/zyncro-sdk`](./zyncro-sdk) |
| **[`create-zyncro-app`](./create-zyncro-app)** | `🟡 Coming Soon` | CLI scaffolding tool to quickly generate pre-configured scheduling web applications. | [`/create-zyncro-app`](./create-zyncro-app) |
| **[`zyncro-cli`](./zyncro-cli)** | `🟡 Coming Soon` | Command line interface for developer operations, webhooks testing, and API keys management. | [`/zyncro-cli`](./zyncro-cli) |
| **[`zyncro-mcp`](./zyncro-mcp)** | `🟡 Coming Soon` | Model Context Protocol (MCP) server connecting AI agents (Claude, Cursor, Antigravity) to Zyncro scheduling. | [`/zyncro-mcp`](./zyncro-mcp) |


---

## 🚀 Quick Embed Guide

### 1. HTML / Webflow / WordPress / Shopify (Direct Script)
```html
<!-- Container for inline booking calendar -->
<div 
  data-zyncro-inline 
  data-zyncro-url="https://zyncro.in/prem/30min"
  data-zyncro-theme="dark"
  data-zyncro-color="#7c3aed"
></div>

<!-- First-party CDN script -->
<script src="https://zyncro.in/embed.js" async></script>
```

### 2. Modern JavaScript / TypeScript (npm)
```typescript
import { Zyncro } from '@zyncro/embed';

// Open Popup Modal
Zyncro.popup({
  url: 'prem/30min',
  theme: 'dark',
  color: '#7c3aed',
  prefill: {
    name: 'Aman Gupta',
    email: 'aman@example.com',
    phone: '+919876543210',
  },
  onBookingSuccessful: (event) => {
    console.log('Booking Confirmed! ID:', event.data.bookingId);
  },
});
```

---

## 🛠️ Monorepo Structure & Local Development

This repository uses npm workspaces for managing sub-packages:

```bash
# 1. Clone the repository
git clone https://github.com/zyncrohq/zyncro.git
cd zyncro

# 2. Build the Embed package
cd zyncro-embed
npm install
npm run build
```

---

## 🔒 Security & Privacy Architecture

All client packages follow enterprise-grade security standards:

- **Strict Origin Validation:** All cross-window `postMessage` communications enforce HTTPS origin checking and window source identity matching.
- **Least-Privilege Permissions:** Iframes request only `payment; clipboard-write` without device or microphone access.
- **Data Isolation:** Client embeds run in isolated contexts with zero access to parent website cookies or sensitive session tokens.
- **Protocol Safety:** Blocks unsafe pseudo-protocols (`javascript:`, `data:`, `vbscript:`).

---

## 🤝 Documentation & Support

- 📖 **Official Documentation:** [zyncro.in/docs](https://zyncro.in/docs)
- 📘 **Embed SDK Guide:** [zyncro.in/docs/embed](https://zyncro.in/docs/embed)
- 🌐 **Platform:** [zyncro.in](https://zyncro.in)
- 🐙 **GitHub Organization:** [github.com/zyncrohq](https://github.com/zyncrohq)
- 🐛 **Issues & Bug Reports:** [github.com/zyncrohq/zyncro/issues](https://github.com/zyncrohq/zyncro/issues)
- 📧 **Developer Support:** [support@zyncro.in](mailto:support@zyncro.in)

---

## 📄 License

MIT © [Zyncro Infotech Private Limited](https://zyncro.in). All rights reserved.

