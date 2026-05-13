import XCTest
@testable import rook_mcp

final class MCPTypesEncodingTests: XCTestCase {

    private let encoder: JSONEncoder = {
        let encoder: JSONEncoder = JSONEncoder()
        encoder.outputFormatting = .sortedKeys
        return encoder
    }()

    func testInitializeResultEncoding() throws {
        let result = InitializeResult(
            protocolVersion: "2024-11-05",
            capabilities: Capabilities(tools: [:]),
            serverInfo: ServerInfo(name: "rook-mcp", version: "1.3.0")
        )
        let json = String(data: try encoder.encode(result), encoding: .utf8)
        XCTAssertEqual(json, #"{"capabilities":{"tools":{}},"protocolVersion":"2024-11-05","serverInfo":{"name":"rook-mcp","version":"1.3.0"}}"#)
    }

    func testCapabilitiesEmptyToolsEncoding() throws {
        let json = String(data: try encoder.encode(Capabilities(tools: [:])), encoding: .utf8)
        XCTAssertEqual(json, #"{"tools":{}}"#)
    }

    func testToolsListResultEncoding() throws {
        let tool = ToolDescriptor(
            name: "append_to_inbox",
            description: "test description",
            inputSchema: InputSchema(
                properties: [
                    "content": SchemaProperty(type: "string", description: "test")
                ],
                required: ["content"]
            ),
            annotations: ToolAnnotations(
                title: "Save to Rook",
                readOnlyHint: false,
                destructiveHint: false,
                idempotentHint: false,
                openWorldHint: true
            )
        )
        let result = ToolsListResult(tools: [tool])
        let json = String(data: try encoder.encode(result), encoding: .utf8)
        XCTAssertEqual(json, #"{"tools":[{"annotations":{"destructiveHint":false,"idempotentHint":false,"openWorldHint":true,"readOnlyHint":false,"title":"Save to Rook"},"description":"test description","inputSchema":{"additionalProperties":false,"properties":{"content":{"description":"test","type":"string"}},"required":["content"],"type":"object"},"name":"append_to_inbox"}]}"#)
    }

    func testInputSchemaDefaults() throws {
        // type defaults to "object", additionalProperties defaults to false.
        let schema = InputSchema(properties: [:], required: [])
        let json = String(data: try encoder.encode(schema), encoding: .utf8)
        XCTAssertEqual(json, #"{"additionalProperties":false,"properties":{},"required":[],"type":"object"}"#)
    }

    func testTextContentDefaultType() throws {
        // type defaults to "text".
        let json = String(data: try encoder.encode(TextContent(text: "hello")), encoding: .utf8)
        XCTAssertEqual(json, #"{"text":"hello","type":"text"}"#)
    }

    func testToolsCallResultEncoding() throws {
        let result = ToolsCallResult(content: [TextContent(text: "Saved.")])
        let json = String(data: try encoder.encode(result), encoding: .utf8)
        XCTAssertEqual(json, #"{"content":[{"text":"Saved.","type":"text"}]}"#)
    }
}
