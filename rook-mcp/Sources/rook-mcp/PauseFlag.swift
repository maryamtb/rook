import Foundation

enum PauseFlag {
    static let fileName: String = "mcp-paused.flag"

    /// True when MCP is paused. Rook creates a flag file in the shared app-group
    /// container when the user pauses from Settings. The trust boundary is the
    /// local user account: any process running as the user with the right
    /// entitlements could write here, but rook-mcp is the only such process
    /// we ship.
    static func isPaused() -> Bool {
        guard let container: URL = FileManager.default
            .containerURL(forSecurityApplicationGroupIdentifier: Constants.groupID) else { return false }
        return FileManager.default.fileExists(atPath: container.appendingPathComponent(fileName).path)
    }
}

enum DisabledFlag {
    static let fileName: String = "mcp-disabled.flag"

    /// True when MCP is disabled in Settings. Rook mirrors `mcpEnabled = false`
    /// to a flag file in the shared app-group container. The helper checks this
    /// before the pause check so a disabled MCP refuses tool calls outright
    /// rather than journaling them. Same trust boundary as PauseFlag.
    static func isDisabled() -> Bool {
        guard let container: URL = FileManager.default
            .containerURL(forSecurityApplicationGroupIdentifier: Constants.groupID) else { return false }
        return FileManager.default.fileExists(atPath: container.appendingPathComponent(fileName).path)
    }
}
