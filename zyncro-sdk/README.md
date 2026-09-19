<p align="center">
  <a href="https://zyncro.in">
    <img src="https://zyncro.in/logo.png" alt="Zyncro Logo" width="80" height="80" onerror="this.style.display='none'"/>
  </a>
</p>

<h1 align="center">@zyncro/sdk</h1>

<p align="center">
  <strong>The official JavaScript & TypeScript SDK for <a href="https://zyncro.in">Zyncro</a> — Modern scheduling, multi-calendar synchronization, and booking funnel analytics.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-coming--soon-amber?style=flat-square" alt="Status: Coming Soon" />
  <a href="https://github.com/zyncrohq/zyncro"><img src="https://img.shields.io/badge/types-TypeScript-blue?style=flat-square" alt="TypeScript" /></a>
  <a href="https://zyncro.in"><img src="https://img.shields.io/badge/website-zyncro.in-0ea5e9?style=flat-square" alt="Website" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-purple?style=flat-square" alt="License" /></a>
</p>

---

> 🚧 **Status: Under Active Development — Coming Soon**  
> `@zyncro/sdk` is currently in development and will be published in an upcoming release.  
> If you need to integrate Zyncro booking calendar popups, modals, or inline widgets into your web app today, use the production-ready [`@zyncro/embed`](../zyncro-embed) package.

---

## ⚡ Features

- 🎯 **100% Type-Safe**: Full TypeScript declarations with autocompletion and strict typing.
- 📅 **Availability & Booking Engine**: Query real-time available slots and create confirmed or paid bookings programmatically.
- 🪝 **Secure Webhook Verification**: Constant-time HMAC signature verification for incoming webhook events (`booking.created`, `booking.cancelled`, `payment.captured`).
- 📈 **Funnel Analytics**: Programmatically extract drop-off rates, conversion rates, and campaign source metrics.
- 🌐 **Edge & Serverless Ready**: Works seamlessly in Node.js 18+, Next.js (App Router / Pages), Cloudflare Workers, Vercel Edge, Bun, and Deno.

---

## 📦 Installation

```bash
npm install @zyncro/sdk
# or
pnpm add @zyncro/sdk
# or
yarn add @zyncro/sdk
# or
bun add @zyncro/sdk
```

---

## 🚀 Quick Start

### 1. Initialize the Client

```typescript
import { Zyncro } from "@zyncro/sdk";

const zyncro = new Zyncro({
  apiKey: process.env.ZYNCRO_API_KEY, // e.g. "zync_live_..."
});
```

### 2. Check Available Slots

```typescript
const slots = await zyncro.availability.get({
  username: "rahul",
  eventType: "30min",
  date: "2026-10-15",
  timezone: "Asia/Kolkata",
});

console.log("Available Slots:", slots);
// Output: ["10:00", "10:30", "14:00", "16:30"]
```

### 3. Create a Booking Programmatically

```typescript
const booking = await zyncro.bookings.create({
  eventTypeId: "evt_30min_consultation",
  username: "rahul",
  startTime: "2026-10-15T10:00:00+05:30",
  endTime: "2026-10-15T10:30:00+05:30",
  guest: {
    name: "Aman Sharma",
    email: "aman@example.com",
    timezone: "Asia/Kolkata",
    notes: "Discussion regarding API integration",
  },
});

console.log("Meeting Confirmed:", booking.meetLink);
```

### 4. Verify & Process Webhooks

```typescript
import { verifyWebhookSignature } from "@zyncro/sdk/webhooks";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-zyncro-signature") || "";
  const webhookSecret = process.env.ZYNCRO_WEBHOOK_SECRET!;

  const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);
  if (!isValid) {
    return new Response("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(rawBody);

  switch (event.type) {
    case "booking.created":
      console.log("New booking created:", event.data.id);
      break;
    case "booking.cancelled":
      console.log("Booking cancelled:", event.data.id);
      break;
  }

  return new Response("OK", { status: 200 });
}
```

---

## 🛠️ API Reference Summary

| Module | Method | Description |
| :--- | :--- | :--- |
| **`zyncro.eventTypes`** | `.list()` | List all active personal & team event types |
| | `.get(id)` | Get event type details, pricing, and custom questions |
| **`zyncro.availability`** | `.get(params)` | Fetch available time slots taking into account all synced calendars |
| **`zyncro.bookings`** | `.list(filters)` | Query bookings with status, date range, and attendee filters |
| | `.create(payload)` | Create a new manual or automated booking |
| | `.cancel(id, reason)` | Cancel an existing booking and release the slot |
| | `.reschedule(id, ...)` | Reschedule to a new date/time |
| **`zyncro.funnel`** | `.getSummary(range)` | Retrieve funnel conversion rates, leak stages, and drop-off counts |
| **`zyncro.webhooks`** | `.verifySignature(...)` | Constant-time HMAC cryptographic verification |

---

## 🤝 Community & Support

- 🌐 **Website:** [https://zyncro.in](https://zyncro.in)
- 📖 **Documentation:** [https://zyncro.in/docs](https://zyncro.in/docs)
- 💬 **Support:** [support@zyncro.in](mailto:support@zyncro.in)
- 🐙 **GitHub Repository:** [https://github.com/zyncrohq/zyncro](https://github.com/zyncrohq/zyncro)
- 🐛 **Issue Tracker:** [https://github.com/zyncrohq/zyncro/issues](https://github.com/zyncrohq/zyncro/issues)

---

## 📄 License

MIT © [Zyncro Infotech Private Limited](https://zyncro.in)
