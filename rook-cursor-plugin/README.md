# Rook for Cursor

Save text, code, and snippets from Cursor straight into [Rook](https://userook.app), a native macOS notes app, without leaving chat.

Ask Cursor things like:

- "save this to Rook"
- "add this snippet to my Rook inbox"
- "remember this in Rook"

Each save lands in a per-vendor "Cursor Inbox" collection inside Rook, grouped by day, with the original code preserved in fenced blocks.

## Prerequisites

Rook must be installed at `/Applications/Rook.app`. Download from [userook.app](https://userook.app).

The plugin invokes the helper bundled inside the app at `/Applications/Rook.app/Contents/Helpers/rook-mcp.app`. No separate server install, no API keys, no network calls.

## What it adds

One MCP tool:

- **`append_to_inbox`** — saves `content` (markdown, up to 100k characters) with an optional `title` to Rook's inbox. Returns a confirmation including the day the row landed under.

## Privacy

The helper runs locally over stdio. No network access. All writes go to a shared app-group container on your Mac (`~/Library/Group Containers/AMKQ4HTK35.group.com.userook.rook/`) and from there into Rook's local-only JSON store. Rook itself is local-first with no cloud sync.

An audit log keeps a short preview of each save in the app-group container for the activity feed in Rook's menu bar popover. Treat any text you save the way you'd treat anything pasted into a local notes app.

## Controls

From Rook's menu bar, the popover gives you:

- **Pause** — temporarily refuse new saves while keeping the plugin installed. Saves return a `paused` error to Cursor.
- **Disable** — full kill switch. The helper refuses all calls with a `disabled` error.

## Source

The MCP server is open source: [maryamtb/rook (rook-mcp)](https://github.com/maryamtb/rook/tree/main/rook-mcp).

This repo is the plugin manifest only. The actual server logic ships inside Rook.

## License

MIT. See [LICENSE](LICENSE).
