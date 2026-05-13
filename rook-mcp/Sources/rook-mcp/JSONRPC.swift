import Foundation

// MARK: - ID

/// The `id` on a JSON-RPC 2.0 request. Can be a string, integer, or null.
enum JSONRPCID: Codable, Hashable {
    case string(String)
    case int(Int)
    case null

    init(from decoder: Decoder) throws {
        let container: any SingleValueDecodingContainer = try decoder.singleValueContainer()
        if container.decodeNil() {
            self = .null
        } else if let value = try? container.decode(Int.self) {
            self = .int(value)
        } else if let value = try? container.decode(String.self) {
            self = .string(value)
        } else {
            throw DecodingError.typeMismatch(
                JSONRPCID.self,
                .init(codingPath: decoder.codingPath,
                      debugDescription: "id must be string, number, or null per JSON-RPC 2.0")
            )
        }
    }

    func encode(to encoder: Encoder) throws {
        var container: any SingleValueEncodingContainer = encoder.singleValueContainer()
        switch self {
        case .string(let value): try container.encode(value)
        case .int(let value): try container.encode(value)
        case .null: try container.encodeNil()
        }
    }
}

// MARK: - Generic JSON value

/// A generic JSON value. Used for `params` on JSON-RPC requests, since each
/// method takes different fields. Handlers decode this into the specific struct
/// they expect.
indirect enum JSONValue: Codable, Equatable {
    case null
    case bool(Bool)
    case int(Int)
    case double(Double)
    case string(String)
    case array([JSONValue])
    case object([String: JSONValue])

    private static let encoder: JSONEncoder = JSONEncoder()
    private static let decoder: JSONDecoder = JSONDecoder()

    init(from decoder: Decoder) throws {
        let container: any SingleValueDecodingContainer = try decoder.singleValueContainer()
        if container.decodeNil() { self = .null; return }
        if let value: Bool = try? container.decode(Bool.self) { self = .bool(value); return }
        if let value: Int = try? container.decode(Int.self) { self = .int(value); return }
        if let value: Double = try? container.decode(Double.self) { self = .double(value); return }
        if let value: String = try? container.decode(String.self) { self = .string(value); return }
        if let value: [JSONValue] = try? container.decode([JSONValue].self) { self = .array(value); return }
        if let value: [String: JSONValue] = try? container.decode([String: JSONValue].self) { self = .object(value); return }
        throw DecodingError.typeMismatch(
            JSONValue.self,
            .init(codingPath: decoder.codingPath, debugDescription: "Not a JSON value")
        )
    }

    func encode(to encoder: Encoder) throws {
        var container: any SingleValueEncodingContainer = encoder.singleValueContainer()
        switch self {
        case .null: try container.encodeNil()
        case .bool(let value): try container.encode(value)
        case .int(let value): try container.encode(value)
        case .double(let value): try container.encode(value)
        case .string(let value): try container.encode(value)
        case .array(let value): try container.encode(value)
        case .object(let value): try container.encode(value)
        }
    }

    /// Re-encode as JSON bytes, then decode as the given type. Used to turn a generic
    /// `JSONValue` into a typed struct (e.g. `InitializeParams`).
    func decode<T: Decodable>(as type: T.Type) throws -> T {
        let data: Data = try Self.encoder.encode(self)
        return try Self.decoder.decode(type, from: data)
    }
}

// MARK: - Request

struct JSONRPCRequest: Decodable {
    let jsonrpc: String?
    let id: JSONRPCID?
    let method: String
    let params: JSONValue?
}

// MARK: - Error

struct JSONRPCError: Codable {
    let code: Int
    let message: String
}

// MARK: - Responses

struct JSONRPCSuccessResponse<Result: Encodable>: Encodable {
    let jsonrpc: String = "2.0"
    let id: JSONRPCID
    let result: Result
}

struct JSONRPCErrorResponse: Encodable {
    let jsonrpc: String = "2.0"
    let id: JSONRPCID
    let error: JSONRPCError
}
