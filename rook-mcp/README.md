# rook-mcp

A Model Context Protocol server that saves text into the [Rook](https://userook.app) notes app on macOS. Speaks stdio JSON-RPC 2.0, exposes one tool: `append_to_inbox`.

When an MCP client (Claude Desktop, Cursor, Claude Code, Codex, Gemini CLI, etc.) calls `append_to_inbox`, this server writes a JSON line to a shared macOS app-group container. Rook drains that container and turns each line into a note in your inbox.

## Install

`rook-mcp` is included inside `Rook.app` at `Contents/Helpers/rook-mcp.app`. Install Rook from [userook.app](https://userook.app), then point your MCP client at the bundled binary:

```
/Applications/Rook.app/Contents/Helpers/rook-mcp.app/Contents/MacOS/rook-mcp
```

### Claude Desktop

`~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "rook": {
      "command": "/Applications/Rook.app/Contents/Helpers/rook-mcp.app/Contents/MacOS/rook-mcp"
    }
  }
}
```

### Cursor

`~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "rook": {
      "command": "/Applications/Rook.app/Contents/Helpers/rook-mcp.app/Contents/MacOS/rook-mcp"
    }
  }
}
```

### Claude Code

Install with user scope so the server is available from any directory:

```
claude mcp add rook -s user /Applications/Rook.app/Contents/Helpers/rook-mcp.app/Contents/MacOS/rook-mcp
```

### Codex

```
codex mcp add rook -- /Applications/Rook.app/Contents/Helpers/rook-mcp.app/Contents/MacOS/rook-mcp
```

Or add it manually to `~/.codex/config.toml`:

```toml
[mcp_servers.rook]
command = "/Applications/Rook.app/Contents/Helpers/rook-mcp.app/Contents/MacOS/rook-mcp"
```

### Gemini CLI

`~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "rook": {
      "command": "/Applications/Rook.app/Contents/Helpers/rook-mcp.app/Contents/MacOS/rook-mcp"
    }
  }
}
```

Gemini CLI prompts for trust on first use of the server.

## Tools

### `append_to_inbox`

Saves text to the user's Rook notes app. The model should call this when the user asks to save, capture, remember, jot down, note, log, add, or stash something in Rook.

**Input:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `content` | string | yes | The text to save. Up to 100,000 characters. |
| `title` | string | no | Short heading shown above the content. Up to 200 characters. |

**Response:** a confirmation like `Saved to Rook inbox 2026-05-12 under "Test"`.

**Errors:**

| Code | Slug | Meaning |
|------|------|---------|
| -32600 | invalid request | Missing or wrong `jsonrpc` version, or method called before `initialize` |
| -32001 | entitlement_unavailable | App-group container not reachable (unsigned build) |
| -32002 | rate_limited | More than 100 writes in the last 60 seconds |
| -32003 | paused | MCP is paused in Rook (Settings → MCP → Resume) |
| -32004 | input_invalid | Content or title failed validation, or params had wrong shape |
| -32005 | store_write_failed | File write to the inbox failed |

## Building

Requires Swift 5.9+ and macOS 14+:

```
swift build -c release
```

The resulting binary returns `entitlement_unavailable` on every tool call because it lacks Rook's team-ID signature and app-group entitlement. Only the binary inside `Rook.app/Contents/Helpers/` can deliver content to Rook.

## Security

See [SECURITY.md](SECURITY.md) for the trust boundary, sanitizer, rate limit, pause flag, and vulnerability reporting policy.
