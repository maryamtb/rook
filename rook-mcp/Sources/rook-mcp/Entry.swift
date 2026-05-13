import Foundation

@main
struct Entry {
    static func main() {
        // Skip the stdio loop when running under XCTest: Xcode's test target
        // sets TEST_HOST to rook-mcp.app, so this binary runs first as the
        // test host. Without this guard, readLine() blocks forever and tests
        // never start.
        if NSClassFromString("XCTestCase") != nil {
            return
        }
        Server.log("starting v\(Server.version)")
        Lifecycle.watchParentForExit()
        Server.runStdioLoop()
        Server.log("stdin closed; exiting")
        exit(0)
    }
}
