import Foundation

enum AppendToInboxHandler {
    static var clientName: String = "unknown"
    static var clientVersion: String = "unknown"
    static var isInitialized: Bool = false

    static func handleInitialize(id: JSONRPCID?, params: JSONValue?) {
        if let params: JSONValue,
           let initParams: InitializeParams = try? params.decode(as: InitializeParams.self),
           let info: ClientInfo = initParams.clientInfo {
            clientName = info.name
            clientVersion = info.version
        }
        isInitialized = true
        Server.log("initialized by client: \(clientName) v\(clientVersion)")
        Server.writeResult(id: id, result: InitializeResult(
            protocolVersion: Server.protocolVersion,
            capabilities: Capabilities(tools: [:]),
            serverInfo: ServerInfo(name: Server.name, version: Server.version)
        ))
    }

    static func handleToolsList(id: JSONRPCID?) {
        Server.log("tools/list requested")
        let appendToInbox: ToolDescriptor = ToolDescriptor(
            name: "append_to_inbox",
            description: "Save text to the user's Rook notes app. Use this whenever the user asks to save, capture, remember, jot down, note, log, add, or stash something in Rook (or simply 'in my notes' / 'in my inbox' when Rook is the active notes app). Examples: 'save this to Rook', 'add this to my Rook inbox', 'remember this in Rook'.\n\nContent is rendered as markdown. Use ``` fenced code blocks (with a language hint like ```swift) for multi-line code. Use single backticks for inline code references like `foo()`. Headings: # through ######. Emphasis: **bold**, *italic*, ~~strikethrough~~. Lists: -, *, +, or 1.. Task lists: - [ ] and - [x] for todos. Links: [label](url).",
            inputSchema: InputSchema(
                properties: [
                    "content": SchemaProperty(
                        type: "string",
                        description: "The text to save, written in markdown. Up to 100,000 characters. Use ``` fenced code blocks with a language hint for code, ## for section headings, **bold** for emphasis, - or 1. for lists. Pass the user-provided text verbatim unless they asked for changes. If the text exceeds 100,000 characters, split it into multiple append_to_inbox calls in order, each part verbatim, so the complete text is saved."
                    ),
                    "title": SchemaProperty(
                        type: "string",
                        description: "Short heading shown above the saved content. Up to 200 characters. Provide one when the snippet has a natural name (a file path, a function name, a topic). When omitted, the first line of content becomes the heading, so do NOT start content with a markdown heading marker if you're omitting this field."
                    )
                ],
                required: ["content"]
            ),
            annotations: ToolAnnotations(
                title: "Save to Rook",
                readOnlyHint: false,
                destructiveHint: false,
                idempotentHint: false,
                openWorldHint: false
            )
        )
        Server.writeResult(id: id, result: ToolsListResult(tools: [appendToInbox]))
    }

    static func handleToolsCall(id: JSONRPCID?, params: JSONValue?) {
        guard let params: JSONValue,
              let callParams: ToolsCallParams = try? params.decode(as: ToolsCallParams.self) else {
            Server.log("input_invalid: tools/call params missing or wrong shape")
            Server.writeError(id: id, code: -32004, message: "input_invalid: tools/call params missing or wrong shape")
            return
        }

        Server.log("tools/call: \(callParams.name)")

        switch callParams.name {
        case "append_to_inbox":
            handleAppendToInbox(id: id, arguments: callParams.arguments)
        default:
            Server.log("tool not found: \(callParams.name)")
            Server.writeError(id: id, code: -32601, message: "tool not found: \(callParams.name)")
        }
    }

    private static func handleAppendToInbox(id: JSONRPCID?, arguments: JSONValue?) {
        // Kill switch check runs first — before rate limiting, before any
        // argument parsing. A disabled MCP refuses everything outright.
        // Distinct error code (-32006) so the agent can disambiguate from
        // pause (-32003).
        if DisabledFlag.isDisabled() {
            Server.log("disabled: MCP is disabled in Rook, refusing tool call")
            Server.writeError(id: id, code: -32006, message: "disabled: MCP is disabled in Rook (Settings → MCP → Enable)")
            return
        }

        if !RateLimiter.check() {
            Server.log("rate_limited: 100 writes/minute exceeded")
            Server.writeError(id: id, code: -32002, message: "rate_limited: 100 writes per minute exceeded")
            return
        }

        guard let arguments: JSONValue,
              let args: AppendToInboxArgs = try? arguments.decode(as: AppendToInboxArgs.self) else {
            Server.log("input_invalid: arguments missing or wrong shape")
            Server.writeError(id: id, code: -32004, message: "input_invalid: arguments missing or wrong shape")
            return
        }

        let cleanedContent: String
        switch MCPSanitizer.checkContent(args.content) {
        case .ok(let cleaned):
            cleanedContent = cleaned
        case .empty:
            Server.log("input_invalid: content empty after sanitize")
            Server.writeError(id: id, code: -32004, message: "input_invalid: content is empty")
            return
        case .tooLong(let count):
            // Distinct code + recovery instruction. Agents act on error
            // text; a bare refusal here makes clients summarize to fit.
            Server.log("content_too_long: \(count) graphemes (cap \(MCPSanitizer.contentCap))")
            Server.writeError(id: id, code: -32005, message: MCPSanitizer.tooLongMessage(count: count))
            return
        }

        let cleanedTitle: String?
        if let raw: String = args.title {
            guard let stripped: String = MCPSanitizer.sanitizeTitle(raw) else {
                Server.log("input_invalid: title empty after sanitize")
                Server.writeError(id: id, code: -32004, message: "input_invalid: title empty after sanitize")
                return
            }
            cleanedTitle = stripped
        } else {
            cleanedTitle = nil
        }

        if PauseFlag.isPaused() {
            Server.log("paused: writing paused_by_user row for audit, returning -32003")
            _ = AppendToInboxWriter.write(
                content: cleanedContent,
                title: cleanedTitle,
                clientName: clientName,
                clientVersion: clientVersion,
                status: "paused_by_user"
            )
            Server.writeError(id: id, code: -32003, message: "paused: MCP is paused in Rook (Settings → MCP → Resume)")
            return
        }

        let result: AppendToInboxWriter.Result = AppendToInboxWriter.write(
            content: cleanedContent,
            title: cleanedTitle,
            clientName: clientName,
            clientVersion: clientVersion
        )

        switch result {
        case .success(let timestamp):
            Server.log("appended \(cleanedContent.count) chars (title: \(cleanedTitle ?? "none"), client: \(clientName))")
            let dayLabel: String = String(timestamp.prefix(10))
            let summary: String
            if let title: String = cleanedTitle {
                summary = "Saved to Rook inbox \(dayLabel) under \"\(title)\"."
            } else {
                summary = "Saved to Rook inbox \(dayLabel)."
            }
            Server.writeResult(id: id, result: ToolsCallResult(content: [TextContent(text: summary)]))
        case .failure(let code, let message):
            Server.log("append failed: code=\(code) msg=\(message)")
            Server.writeError(id: id, code: code, message: message)
        }
    }
}
