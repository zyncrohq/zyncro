<p align="center">
  <a href="https://zyncro.in">
    <img src="https://zyncro.in/logo.png" alt="Zyncro Logo" width="80" height="80" onerror="this.style.display='none'"/>
  </a>
</p>

<h1 align="center">@zyncro/react</h1>

<p align="center">
  <strong>Official React & Next.js component library for <a href="https://zyncro.in">Zyncro</a> — Embed booking calendars, modal scheduling buttons, and seamless meeting checkout into your React apps.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-coming--soon-amber?style=flat-square" alt="Status: Coming Soon" />
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-18%20%7C%2019-61dafb?style=flat-square" alt="React 18 & 19" /></a>
  <a href="https://github.com/zyncrohq/zyncro"><img src="https://img.shields.io/badge/github-zyncrohq%2Fzyncro-181717?style=flat-square&logo=github" alt="GitHub" /></a>
  <a href="https://zyncro.in"><img src="https://img.shields.io/badge/website-zyncro.in-0ea5e9?style=flat-square" alt="Website" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-purple?style=flat-square" alt="License" /></a>
</p>

---

> 🚧 **Status: Under Active Development — Coming Soon**  
> `@zyncro/react` is currently in active development.  
> You can embed Zyncro into any React or Next.js app today using the production-ready [`@zyncro/embed`](../zyncro-embed) package (see the [React Integration Guide in @zyncro/embed](../zyncro-embed#3-react--nextjs-integration-example)).

---


- 📅 **Inline Calendar Component**: Seamlessly embed your personal or team booking page directly into your webpage layout.
- 🔘 **Popup Modal Button**: Trigger high-converting booking modals with a single click.
- 🎨 **Theming & Customization**: Pass brand colors, hide branding headers, match dark/light modes automatically.
- 🔔 **Event Callbacks**: Listen for `onBookingSuccess`, `onDateSelect`, `onModalClose` for conversion tracking (Google Analytics, Meta Pixel, PostHog).
- 📱 **Fully Responsive**: Optimized for mobile touchscreens, tablets, and desktop screens.

---

## 📦 Installation

```bash
npm install @zyncro/react
# or
pnpm add @zyncro/react
# or
yarn add @zyncro/react
```

---

## 🚀 Usage

### 1. Inline Calendar Embed (`<ZyncroEmbed />`)

Embed a full calendar directly into any landing page or contact section:

```tsx
import { ZyncroEmbed } from "@zyncro/react";

export default function BookingSection() {
  return (
    <div className="w-full max-w-4xl mx-auto my-12">
      <h2 className="text-2xl font-bold mb-4">Book a Consultation</h2>
      <ZyncroEmbed
        url="https://zyncro.in/rahul/30min"
        style={{ width: "100%", height: "700px" }}
        theme="dark"
        onBookingSuccess={(booking) => {
          console.log("Booking Confirmed!", booking);
          // Trigger GA / Meta Pixel event
        }}
      />
    </div>
  );
}
```

---

### 2. Popup Modal Button (`<ZyncroButton />`)

Add a floating or inline button that opens the Zyncro scheduler in a sleek modal:

```tsx
import { ZyncroButton } from "@zyncro/react";

export function HeroCta() {
  return (
    <ZyncroButton
      url="https://zyncro.in/sales/demo"
      text="Schedule a Live Demo"
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all"
      modalProps={{
        theme: "auto",
        hideBranding: false,
      }}
    />
  );
}
```

---

### 3. Custom Hook (`useZyncroEmbed`)

For custom UI implementations where you control the modal trigger:

```tsx
import { useZyncroEmbed } from "@zyncro/react";

export function CustomSchedulingTrigger() {
  const { openModal, isLoaded } = useZyncroEmbed({
    url: "https://zyncro.in/team/consultation",
    onBookingSuccess: (data) => alert("Booked successfully!"),
  });

  return (
    <button onClick={openModal} disabled={!isLoaded}>
      Open Booking Window
    </button>
  );
}
```

---

## 🛠️ Props & Configuration

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `url` | `string` | **Required** | The public Zyncro booking link (e.g. `https://zyncro.in/username/slug`). |
| `theme` | `"light" \| "dark" \| "auto"` | `"auto"` | Forces light/dark theme or syncs with user's system preferences. |
| `hideBranding` | `boolean` | `false` | Hides header branding banner on supported subscription tiers. |
| `onBookingSuccess` | `(data: BookingData) => void` | `undefined` | Callback fired when attendee completes booking. |
| `onDateSelect` | `(date: string) => void` | `undefined` | Callback fired when attendee selects a date slot. |
| `style` | `React.CSSProperties` | `{ height: '680px', width: '100%' }` | CSS styles applied to the embed iframe container. |

---

## 🤝 Community & Links

- 🌐 **Website:** [https://zyncro.in](https://zyncro.in)
- 🐙 **GitHub Repository:** [https://github.com/zyncrohq/zyncro](https://github.com/zyncrohq/zyncro)
- 🐛 **Issue Tracker:** [https://github.com/zyncrohq/zyncro/issues](https://github.com/zyncrohq/zyncro/issues)

---

## 📄 License

MIT © [Zyncro Infotech Private Limited](https://zyncro.in)
