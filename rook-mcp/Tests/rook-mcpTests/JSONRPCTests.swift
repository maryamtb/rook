import XCTest
@testable import rook_mcp

final class JSONRPCIDTests: XCTestCase {

    private let encoder: JSONEncoder = JSONEncoder()
    private let decoder: JSONDecoder = JSONDecoder()

    func testDecodeInt() throws {
        let id = try decoder.decode(JSONRPCID.self, from: Data("42".utf8))
        XCTAssertEqual(id, .int(42))
    }

    func testDecodeString() throws {
        let id = try decoder.decode(JSONRPCID.self, from: Data("\"abc\"".utf8))
        XCTAssertEqual(id, .string("abc"))
    }

    func testDecodeNull() throws {
        let id = try decoder.decode(JSONRPCID.self, from: Data("null".utf8))
        XCTAssertEqual(id, .null)
    }

    func testEncodeInt() throws {
        let data = try encoder.encode(JSONRPCID.int(42))
        XCTAssertEqual(String(data: data, encoding: .utf8), "42")
    }

    func testEncodeString() throws {
        let data = try encoder.encode(JSONRPCID.string("xyz"))
        XCTAssertEqual(String(data: data, encoding: .utf8), "\"xyz\"")
    }

    func testEncodeNull() throws {
        let data = try encoder.encode(JSONRPCID.null)
        XCTAssertEqual(String(data: data, encoding: .utf8), "null")
    }

    func testRoundTrip() throws {
        let cases: [JSONRPCID] = [.int(42), .int(0), .int(-1), .string(""), .string("hello"), .null]
        for original in cases {
            let data = try encoder.encode(original)
            let decoded = try decoder.decode(JSONRPCID.self, from: data)
            XCTAssertEqual(decoded, original)
        }
    }

    func testRejectsInvalidShape() {
        // JSON-RPC id must be string, number, or null per spec.
        XCTAssertThrowsError(try decoder.decode(JSONRPCID.self, from: Data("true".utf8)))
        XCTAssertThrowsError(try decoder.decode(JSONRPCID.self, from: Data("[1,2]".utf8)))
        XCTAssertThrowsError(try decoder.decode(JSONRPCID.self, from: Data("{}".utf8)))
    }
}

final class JSONValueTests: XCTestCase {

    private let encoder: JSONEncoder = JSONEncoder()
    private let decoder: JSONDecoder = JSONDecoder()

    func testDecodePrimitives() throws {
        XCTAssertEqual(try decoder.decode(JSONValue.self, from: Data("null".utf8)), .null)
        XCTAssertEqual(try decoder.decode(JSONValue.self, from: Data("true".utf8)), .bool(true))
        XCTAssertEqual(try decoder.decode(JSONValue.self, from: Data("false".utf8)), .bool(false))
        XCTAssertEqual(try decoder.decode(JSONValue.self, from: Data("42".utf8)), .int(42))
        XCTAssertEqual(try decoder.decode(JSONValue.self, from: Data("3.14".utf8)), .double(3.14))
        XCTAssertEqual(try decoder.decode(JSONValue.self, from: Data("\"hello\"".utf8)), .string("hello"))
    }

    func testDecodeArray() throws {
        let value = try decoder.decode(JSONValue.self, from: Data("[1, \"two\", null]".utf8))
        XCTAssertEqual(value, .array([.int(1), .string("two"), .null]))
    }

    func testDecodeObject() throws {
        let value = try decoder.decode(JSONValue.self, from: Data("{\"key\":\"value\"}".utf8))
        XCTAssertEqual(value, .object(["key": .string("value")]))
    }

    func testDecodeAsTypedStruct() throws {
        struct Sample: Codable, Equatable {
            let name: String
            let count: Int
        }
        let raw = Data("{\"name\":\"test\",\"count\":5}".utf8)
        let value = try decoder.decode(JSONValue.self, from: raw)
        let typed = try value.decode(as: Sample.self)
        XCTAssertEqual(typed, Sample(name: "test", count: 5))
    }

    func testDecodeAsAppendToInboxArgs() throws {
        let raw = Data("{\"content\":\"hello\",\"title\":\"Test\"}".utf8)
        let value = try decoder.decode(JSONValue.self, from: raw)
        let args = try value.decode(as: AppendToInboxArgs.self)
        XCTAssertEqual(args.content, "hello")
        XCTAssertEqual(args.title, "Test")
    }

    func testDecodeAsAppendToInboxArgsTitleOptional() throws {
        let raw = Data("{\"content\":\"hello\"}".utf8)
        let value = try decoder.decode(JSONValue.self, from: raw)
        let args = try value.decode(as: AppendToInboxArgs.self)
        XCTAssertEqual(args.content, "hello")
        XCTAssertNil(args.title)
    }
}
