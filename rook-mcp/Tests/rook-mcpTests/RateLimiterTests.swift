import XCTest
@testable import rook_mcp

final class RateLimiterTests: XCTestCase {

    override func setUp() {
        super.setUp()
        RateLimiter.resetForTesting()
    }

    func testFirstWriteSucceeds() {
        XCTAssertTrue(RateLimiter.check())
    }

    func testAllowsUpToMaxWrites() {
        for index in 1...RateLimiter.maxWrites {
            XCTAssertTrue(RateLimiter.check(), "Write \(index) should succeed")
        }
    }

    func testRejectsWriteOverMax() {
        for _ in 1...RateLimiter.maxWrites {
            _ = RateLimiter.check()
        }
        XCTAssertFalse(RateLimiter.check(), "Write past the cap should fail")
    }

    func testStaysRejectedWithinWindow() {
        for _ in 1...RateLimiter.maxWrites {
            _ = RateLimiter.check()
        }
        XCTAssertFalse(RateLimiter.check())
        XCTAssertFalse(RateLimiter.check())
        XCTAssertFalse(RateLimiter.check())
    }

    func testResetReturnsCapacity() {
        for _ in 1...RateLimiter.maxWrites {
            _ = RateLimiter.check()
        }
        XCTAssertFalse(RateLimiter.check())
        RateLimiter.resetForTesting()
        XCTAssertTrue(RateLimiter.check(), "After reset, the limiter should accept new writes")
    }
}
