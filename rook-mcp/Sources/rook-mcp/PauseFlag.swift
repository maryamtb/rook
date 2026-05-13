import Foundation

enum PauseFlag {
    static let fileName: String = "mcp-paused.flag"

    /// True when MCP is paused. Rook creates a flag file in the shared app-group
    /// container when the user pauses from Settings. Only binaries signed with
    /// Rook's team ID can write to that container, so no other process can create
    /// this file.
    static func isPaused() -> Bool {
        guard let container: URL = FileManager.default
            .containerURL(forSecurityApplicationGroupIdentifier: Constants.groupID) else { return false }
        return FileManager.default.fileExists(atPath: container.appendingPathComponent(fileName).path)
    }
}
