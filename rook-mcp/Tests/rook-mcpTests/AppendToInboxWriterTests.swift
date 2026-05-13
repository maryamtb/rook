import XCTest
@testable import rook_mcp

final class AppendToInboxWriterTests: XCTestCase {

    func testWriteFailsWithoutTeamIDSignature() {
        // A test binary doesn't carry Rook's team-ID signature. Either
        // `containerURL(...)` returns nil (-32001 entitlement_unavailable)
        // or it returns a path that the open call then can't write to
        // (-32005 store_write_failed). Either result is a valid failure
        // for an unsigned binary.
        let result = AppendToInboxWriter.write(
            content: "hello",
            title: nil,
            clientName: "test-client",
            clientVersion: "1.0"
        )
        guard case .failure(let code, _) = result else {
            XCTFail("Expected failure without team-ID-signed entitlement")
            return
        }
        XCTAssertTrue(
            [-32001, -32005].contains(code),
            "Expected entitlement_unavailable or store_write_failed, got code: \(code)"
        )
    }
}
