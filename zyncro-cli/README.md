<p align="center">
  <a href="https://zyncro.in">
    <img src="https://zyncro.in/logo.png" alt="Zyncro Logo" width="80" height="80" onerror="this.style.display='none'"/>
  </a>
</p>

<h1 align="center">@zyncro/cli</h1>

<p align="center">
  <strong>Official Command-Line Interface (CLI) for <a href="https://zyncro.in">Zyncro</a> — Manage calendars, check available slots, forward webhooks locally, and inspect booking analytics directly from your terminal.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@zyncro/cli"><img src="https://img.shields.io/npm/v/@zyncro/cli?style=flat-square&color=6366f1" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@zyncro/cli"><img src="https://img.shields.io/npm/dm/@zyncro/cli?style=flat-square&color=10b981" alt="npm downloads" /></a>
  <a href="https://github.com/zyncrohq/zyncro"><img src="https://img.shields.io/badge/github-zyncrohq%2Fzyncro-181717?style=flat-square&logo=github" alt="GitHub" /></a>
  <a href="https://zyncro.in"><img src="https://img.shields.io/badge/website-zyncro.in-0ea5e9?style=flat-square" alt="Website" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-purple?style=flat-square" alt="License" /></a>
</p>

---

## ⚡ Features

- 🔑 **Instant Terminal Login**: Authenticate your Zyncro account via browser or API token.
- 📅 **Interactive Availability & Booking**: Check open slots and create meetings without opening a browser.
- 🪝 **Webhook Local Tunneling**: Forward Zyncro webhook events (`booking.created`, `payment.captured`) directly to `localhost` for testing.
- 📊 **Terminal Funnel Analytics**: View conversion rates and drop-off tables right in your terminal.

---

## 📦 Installation

Run directly using `npx`:

```bash
npx @zyncro/cli --help
```

Or install globally:

```bash
npm install -g @zyncro/cli
# or
pnpm add -g @zyncro/cli
```

---

## 🚀 Common Commands

### 1. Authenticate

```bash
zyncro login
```

---

### 2. Check Availability

```bash
# Check today's slots for user
zyncro slots rahul --date 2026-10-15
```

---

### 3. Forward Webhooks to Local Server

Forward live Zyncro webhooks to your local development backend:

```bash
zyncro webhooks listen --forward-to http://localhost:3000/api/webhooks/zyncro
```

---

### 4. View Funnel Analytics

```bash
zyncro analytics funnel --range 30d
```

---

## 🛠️ Command Summary

| Command | Description |
| :--- | :--- |
| `zyncro login` | Authenticate CLI with your Zyncro account. |
| `zyncro whoami` | Show current active user, email, and subscription plan. |
| `zyncro slots <username>` | Query available booking time slots. |
| `zyncro book` | Interactive prompt to schedule a meeting. |
| `zyncro webhooks listen` | Real-time webhook forwarding to local dev server. |
| `zyncro analytics funnel` | Render ASCII conversion funnel table in terminal. |

---

## 🤝 Community & Links

- 🌐 **Website:** [https://zyncro.in](https://zyncro.in)
- 🐙 **GitHub Repository:** [https://github.com/zyncrohq/zyncro](https://github.com/zyncrohq/zyncro)
- 🐛 **Issue Tracker:** [https://github.com/zyncrohq/zyncro/issues](https://github.com/zyncrohq/zyncro/issues)

---

## 📄 License

MIT © [Zyncro Infotech Private Limited](https://zyncro.in)
