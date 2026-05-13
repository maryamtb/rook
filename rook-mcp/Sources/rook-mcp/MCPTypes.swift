import Foundation

// MARK: - initialize

struct InitializeParams: Decodable {
    let clientInfo: ClientInfo?
}

struct ClientInfo: Decodable {
    let name: String
    let version: String
}

struct InitializeResult: Encodable {
    let protocolVersion: String
    let capabilities: Capabilities
    let serverInfo: ServerInfo
}

struct ServerInfo: Encodable {
    let name: String
    let version: String
}

/// Server capabilities sent in the initialize response. The `tools` capability
/// is supported with no list-change notifications, so this serializes to `"tools": {}`.
struct Capabilities: Encodable {
    let tools: [String: Bool]
}

// MARK: - tools/list

struct ToolsListResult: Encodable {
    let tools: [ToolDescriptor]
}

struct ToolDescriptor: Encodable {
    let name: String
    let description: String
    let inputSchema: InputSchema
    let annotations: ToolAnnotations
}

/// Hints to the client and model about how a tool behaves. Defined in
/// MCP 2024-11-05 and required for Anthropic's Connector Directory submission.
struct ToolAnnotations: Encodable {
    let title: String
    let readOnlyHint: Bool
    let destructiveHint: Bool
    let idempotentHint: Bool
    let openWorldHint: Bool
}

struct InputSchema: Encodable {
    let type: String = "object"
    let additionalProperties: Bool = false
    let properties: [String: SchemaProperty]
    let required: [String]
}

struct SchemaProperty: Encodable {
    let type: String
    let description: String
}

// MARK: - tools/call

struct ToolsCallParams: Decodable {
    let name: String
    let arguments: JSONValue?
}

struct AppendToInboxArgs: Decodable {
    let content: String
    let title: String?
}

struct ToolsCallResult: Encodable {
    let content: [TextContent]
}

struct TextContent: Encodable {
    let type: String = "text"
    let text: String
}
