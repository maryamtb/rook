import XCTest
@testable import rook_mcp

final class MCPSanitizerTests: XCTestCase {

    // MARK: sanitizeTitle

    func testSanitizeTitleStripsControlCharacters() {
        XCTAssertEqual(MCPSanitizer.sanitizeTitle("hello\tworld"), "helloworld")
        XCTAssertEqual(MCPSanitizer.sanitizeTitle("a\nb\rc"), "abc")
        XCTAssertEqual(MCPSanitizer.sanitizeTitle("\u{0001}\u{0002}test"), "test")
    }

    func testSanitizeTitleTrimsWhitespace() {
        XCTAssertEqual(MCPSanitizer.sanitizeTitle("  hello  "), "hello")
    }

    func testSanitizeTitleRejectsEmpty() {
        XCTAssertNil(MCPSanitizer.sanitizeTitle(""))
        XCTAssertNil(MCPSanitizer.sanitizeTitle("   "))
        XCTAssertNil(MCPSanitizer.sanitizeTitle("\u{0001}\u{0002}"))
    }

    func testSanitizeTitleTruncatesToCap() {
        let long = String(repeating: "a", count: 250)
        let result = MCPSanitizer.sanitizeTitle(long)
        XCTAssertNotNil(result)
        XCTAssertEqual(result?.count, 200)
    }

    func testSanitizeTitlePreservesEmoji() {
        XCTAssertEqual(MCPSanitizer.sanitizeTitle("hello 👋"), "hello 👋")
    }

    // MARK: sanitizeContent

    func testSanitizeContentStripsNullBytes() {
        XCTAssertEqual(MCPSanitizer.sanitizeContent("hello\u{0000}world"), "helloworld")
    }

    func testSanitizeContentPreservesControlCharacters() {
        // Content keeps tabs and newlines; only NUL is stripped.
        XCTAssertEqual(MCPSanitizer.sanitizeContent("line1\nline2"), "line1\nline2")
        XCTAssertEqual(MCPSanitizer.sanitizeContent("a\tb"), "a\tb")
    }

    func testSanitizeContentRejectsEmpty() {
        XCTAssertNil(MCPSanitizer.sanitizeContent(""))
        XCTAssertNil(MCPSanitizer.sanitizeContent("\u{0000}"))
        XCTAssertNil(MCPSanitizer.sanitizeContent("\u{0000}\u{0000}"))
    }

    func testSanitizeContentRejectsOversize() {
        let big = String(repeating: "a", count: 100_001)
        XCTAssertNil(MCPSanitizer.sanitizeContent(big))
    }

    func testSanitizeContentAcceptsAtCap() {
        let atCap = String(repeating: "a", count: 100_000)
        XCTAssertEqual(MCPSanitizer.sanitizeContent(atCap)?.count, 100_000)
    }

    func testSanitizeContentCountsGraphemes() {
        // ZWJ family emoji is one grapheme even though it spans multiple code points.
        let emoji = "👨‍👩‍👧"
        XCTAssertEqual(emoji.count, 1)

        // 99,999 'a' + 1 emoji = 100,000 graphemes = accepted at cap.
        let exactCap = String(repeating: "a", count: 99_999) + emoji
        XCTAssertEqual(MCPSanitizer.sanitizeContent(exactCap)?.count, 100_000)

        // 100,000 'a' + 1 emoji = 100,001 graphemes = rejected.
        let overCap = String(repeating: "a", count: 100_000) + emoji
        XCTAssertNil(MCPSanitizer.sanitizeContent(overCap))
    }
}
