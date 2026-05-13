import Foundation
import Darwin
import os

enum Server {
    static let name: String = "rook-mcp"
    static let version: String = {
        (Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String) ?? "1.3.0"
    }()
    static let protocolVersion: String = "2024-11-05"

    private static let logger: Logger = Logger(subsystem: "com.userook.rook.mcp", category: "rook-mcp")
    private static let decoder: JSONDecoder = JSONDecoder()
    private static let encoder: JSONEncoder = {
        let encoder: JSONEncoder = JSONEncoder()
        encoder.outputFormatting = .sortedKeys
        return encoder
    }()

    static func log(_ message: String) {
        logger.info("\(message, privacy: .public)")
        FileHandle.standardError.write(Data("\(name)[\(getpid())]: \(message)\n".utf8))
    }

    static func runStdioLoop() {
        while let line: String = readLine(strippingNewline: true) {
            guard !line.isEmpty else { continue }
            guard let data: Data = line.data(using: .utf8) else { continue }

            let request: JSONRPCRequest
            do {
                request = try decoder.decode(JSONRPCRequest.self, from: data)
            } catch {
                writeError(id: nil, code: -32700, message: "parse error")
                continue
            }

            guard request.jsonrpc == "2.0" else {
                writeError(id: request.id, code: -32600, message: "invalid request: jsonrpc field missing or not \"2.0\"")
                continue
            }

            let preInitOK: Set<String> = ["initialize", "notifications/initialized"]
            if !AppendToInboxHandler.isInitialized && !preInitOK.contains(request.method) {
                writeError(id: request.id, code: -32600, message: "invalid request: server not initialized")
                continue
            }

            switch request.method {
            case "initialize":
                AppendToInboxHandler.handleInitialize(id: request.id, params: request.params)
            case "notifications/initialized":
                break
            case "tools/list":
                AppendToInboxHandler.handleToolsList(id: request.id)
            case "tools/call":
                AppendToInboxHandler.handleToolsCall(id: request.id, params: request.params)
            default:
                writeError(id: request.id, code: -32601, message: "method not found: \(request.method)")
            }
        }
    }

    static func writeResult<T: Encodable>(id: JSONRPCID?, result: T) {
        writeEncodable(JSONRPCSuccessResponse(id: id ?? .null, result: result))
    }

    static func writeError(id: JSONRPCID?, code: Int, message: String) {
        writeEncodable(JSONRPCErrorResponse(id: id ?? .null, error: JSONRPCError(code: code, message: message)))
    }

    private static func writeEncodable<T: Encodable>(_ value: T) {
        guard let data: Data = try? encoder.encode(value) else { return }
        FileHandle.standardOutput.write(data)
        FileHandle.standardOutput.write(Data([0x0a]))
    }
}
