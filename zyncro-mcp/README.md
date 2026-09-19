<p align="center">
  <a href="https://zyncro.in">
    <img src="https://zyncro.in/logo.png" alt="Zyncro Logo" width="80" height="80" onerror="this.style.display='none'"/>
  </a>
</p>

<h1 align="center">@zyncro/mcp</h1>

<p align="center">
  <strong>Official <a href="https://modelcontextprotocol.io">Model Context Protocol (MCP)</a> Server for <a href="https://zyncro.in">Zyncro</a> — Connecting AI assistants (Claude, Cursor, AI Agents) directly to your calendar, meetings, and booking funnel analytics.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@zyncro/mcp"><img src="https://img.shields.io/npm/v/@zyncro/mcp?style=flat-square&color=6366f1" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@zyncro/mcp"><img src="https://img.shields.io/npm/dm/@zyncro/mcp?style=flat-square&color=10b981" alt="npm downloads" /></a>
  <a href="https://modelcontextprotocol.io"><img src="https://img.shields.io/badge/protocol-MCP_v1.0-orange?style=flat-square" alt="MCP Protocol" /></a>
  <a href="https://github.com/zyncrohq/zyncro"><img src="https://img.shields.io/badge/github-zyncrohq%2Fzyncro-181717?style=flat-square&logo=github" alt="GitHub" /></a>
  <a href="https://zyncro.in"><img src="https://img.shields.io/badge/website-zyncro.in-0ea5e9?style=flat-square" alt="Website" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-purple?style=flat-square" alt="License" /></a>
</p>

---

## 🌟 What is @zyncro/mcp?

`@zyncro/mcp` lets AI models like **Claude 3.7 / 3.5 Sonnet**, **Cursor**, **ChatGPT**, and autonomous sales/support agents interact directly with your Zyncro calendar in real-time.

Instead of switching back and forth to your browser:
- Ask Claude: *"What does my schedule look like on Thursday afternoon?"*
- Tell Cursor: *"Book a 30-min strategy call with dev@client.com for tomorrow at 3 PM."*
- Ask your agent: *"Show me where our booking funnel lost the most visitors this week."*

---

## 🚀 Quick Setup

### 1. In Claude Desktop

Add this to your `claude_desktop_config.json`:

* **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
* **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "zyncro": {
      "command": "npx",
      "args": ["-y", "@zyncro/mcp"],
      "env": {
        "ZYNCRO_API_KEY": "zync_live_your_api_key_here"
      }
    }
  }
}
```

---

### 2. In Cursor IDE

1. Open **Cursor Settings** ➔ **Features** ➔ **MCP Servers**.
2. Click **Add New MCP Server**.
3. Fill in:
   - **Name:** `zyncro`
   - **Type:** `command`
   - **Command:** `npx -y @zyncro/mcp`
   - **Environment Variables:** `ZYNCRO_API_KEY=zync_live_...`

---

## 🛠️ Available MCP Tools

| Tool | Parameters | Description |
| :--- | :--- | :--- |
| `zyncro_list_meetings` | `limit`, `status`, `from_date`, `to_date` | Retrieve upcoming or past scheduled meetings with attendee details and meet links. |
| `zyncro_check_availability` | `username`, `event_slug`, `date`, `timezone` | Check available open slots for any host considering all connected calendars. |
| `zyncro_create_booking` | `event_type_id`, `start_time`, `guest_name`, `guest_email` | Book and confirm a meeting with automated calendar invitations. |
| `zyncro_cancel_booking` | `booking_id`, `reason` | Cancel a booking, notify attendees, and release the slot. |
| `zyncro_get_event_types` | `username` | List all active public event types, durations, and pricing. |
| `zyncro_get_funnel_summary` | `range` (`7d`, `30d`, `90d`) | Query conversion rates, page views, and drop-off counts across booking steps. |

---

## 💬 Example AI Prompts

Once configured, simply talk naturally to your AI:

```text
"Do I have any meetings conflict on Friday morning?"
```
```text
"Find open 45-minute slots with rohit for next Tuesday after 2 PM."
```
```text
"Schedule a product demo with tanmay@acme.com on October 12th at 11:00 AM IST."
```
```text
"Give me a breakdown of our booking funnel conversion rate for the last 30 days."
```

---

## 🧪 Testing with MCP Inspector

You can test and inspect the tool outputs interactively using the official MCP Inspector:

```bash
npx @modelcontextprotocol/inspector npx @zyncro/mcp
```

---

## 🤝 Community & Links

- 🌐 **Website:** [https://zyncro.in](https://zyncro.in)
- 🐙 **GitHub Repository:** [https://github.com/zyncrohq/zyncro](https://github.com/zyncrohq/zyncro)
- 🐛 **Issue Tracker:** [https://github.com/zyncrohq/zyncro/issues](https://github.com/zyncrohq/zyncro/issues)

---

## 📄 License

MIT © [Zyncro Infotech Private Limited](https://zyncro.in)
