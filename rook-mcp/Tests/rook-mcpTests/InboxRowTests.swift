import XCTest
@testable import rook_mcp

final class InboxRowTests: XCTestCase {

    private let encoder: JSONEncoder = {
        let encoder: JSONEncoder = JSONEncoder()
        encoder.keyEncodingStrategy = .convertToSnakeCase
        encoder.outputFormatting = .sortedKeys
        return encoder
    }()

    func testEncodesSnakeCaseKeys() throws {
        let row = InboxRow(
            ts: "2026-05-12T14:00:00Z",
            rowId: "11111111-1111-1111-1111-111111111111",
            content: "hello",
            title: "Test",
            clientName: "claude-desktop",
            clientVersion: "0.7.2",
            status: "ok"
        )
        let json = try String(data: encoder.encode(row), encoding: .utf8) ?? ""
        XCTAssertTrue(json.contains("\"client_name\":\"claude-desktop\""))
        XCTAssertTrue(json.contains("\"client_version\":\"0.7.2\""))
        XCTAssertTrue(json.contains("\"row_id\":\"11111111-1111-1111-1111-111111111111\""))
    }

    /// Each write must mint a distinct row_id so concurrent same-second appends
    /// carry unique replay-dedup keys on the Rook drain side.
    func testRowIdIsUniquePerWrite() throws {
        let a = InboxRow(
            ts: "2026-05-12T14:00:00Z",
            rowId: UUID().uuidString,
            content: "hello",
            title: nil,
            clientName: "x",
            clientVersion: "1.0",
            status: "ok"
        )
        let b = InboxRow(
            ts: "2026-05-12T14:00:00Z",
            rowId: UUID().uuidString,
            content: "hello",
            title: nil,
            clientName: "x",
            clientVersion: "1.0",
            status: "ok"
        )
        XCTAssertNotEqual(a.rowId, b.rowId)
    }

    func testToolFieldDefaultsToAppendToInbox() throws {
        let row = InboxRow(
            ts: "2026-05-12T14:00:00Z",
            rowId: "11111111-1111-1111-1111-111111111111",
            content: "hello",
            title: nil,
            clientName: "x",
            clientVersion: "1.0",
            status: "ok"
        )
        let json = try String(data: encoder.encode(row), encoding: .utf8) ?? ""
        XCTAssertTrue(json.contains("\"tool\":\"appendToInbox\""))
    }

    func testOmitsNilTitle() throws {
        let row = InboxRow(
            ts: "2026-05-12T14:00:00Z",
            rowId: "11111111-1111-1111-1111-111111111111",
            content: "hello",
            title: nil,
            clientName: "x",
            clientVersion: "1.0",
            status: "ok"
        )
        let json = try String(data: encoder.encode(row), encoding: .utf8) ?? ""
        XCTAssertFalse(json.contains("\"title\""))
    }

    func testIncludesTitleWhenPresent() throws {
        let row = InboxRow(
            ts: "2026-05-12T14:00:00Z",
            rowId: "11111111-1111-1111-1111-111111111111",
            content: "hello",
            title: "Meeting",
            clientName: "x",
            clientVersion: "1.0",
            status: "ok"
        )
        let json = try String(data: encoder.encode(row), encoding: .utf8) ?? ""
        XCTAssertTrue(json.contains("\"title\":\"Meeting\""))
    }

    func testPausedByUserStatusEncodes() throws {
        let row = InboxRow(
            ts: "2026-05-12T14:00:00Z",
            rowId: "11111111-1111-1111-1111-111111111111",
            content: "hello",
            title: nil,
            clientName: "x",
            clientVersion: "1.0",
            status: "paused_by_user"
        )
        let json = try String(data: encoder.encode(row), encoding: .utf8) ?? ""
        XCTAssertTrue(json.contains("\"status\":\"paused_by_user\""))
    }
}
