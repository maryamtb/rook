import Foundation
import Darwin

/// One row of `inbox-pending.jsonl`. Rook reads the same format, so keep field
/// names in sync.
struct InboxRow: Encodable {
    let ts: String
    let tool: String = "appendToInbox"
    let content: String
    let title: String?
    let clientName: String
    let clientVersion: String
    let status: String
}

enum AppendToInboxWriter {
    enum Result {
        case success(timestamp: String)
        case failure(code: Int, message: String)
    }

    private static let encoder: JSONEncoder = {
        let encoder: JSONEncoder = JSONEncoder()
        encoder.keyEncodingStrategy = .convertToSnakeCase
        encoder.outputFormatting = .sortedKeys
        return encoder
    }()
    private static let isoFormatter: ISO8601DateFormatter = ISO8601DateFormatter()

    static func write(
        content: String,
        title: String?,
        clientName: String,
        clientVersion: String,
        status: String = "ok"
    ) -> Result {
        guard let containerURL: URL = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: Constants.groupID) else {
            return .failure(code: -32001, message: "entitlement_unavailable: containerURL nil")
        }
        let pendingPath: String = containerURL.appendingPathComponent("inbox-pending.jsonl").path

        let timestamp: String = isoFormatter.string(from: Date())
        let row: InboxRow = InboxRow(
            ts: timestamp,
            content: content,
            title: title,
            clientName: clientName,
            clientVersion: clientVersion,
            status: status
        )

        guard let rowData: Data = try? encoder.encode(row) else {
            return .failure(code: -32005, message: "store_write_failed: encode")
        }
        let line: Data = rowData + Data([0x0a])

        // O_EXLOCK locks the file in the same step that opens it. As two separate
        // steps (open, then lock), Rook could rename inbox-pending.jsonl to
        // inbox-processing.jsonl in between. Our write would target the renamed
        // file and be lost when Rook deletes it.
        let fd: Int32 = open(pendingPath, O_WRONLY | O_APPEND | O_CREAT | O_NOFOLLOW | O_EXLOCK, 0o600)
        if fd < 0 {
            return .failure(code: -32005, message: "store_write_failed: open: \(errnoMsg())")
        }
        defer { close(fd) }

        var st: stat = stat()
        if fstat(fd, &st) != 0 {
            return .failure(code: -32005, message: "store_write_failed: fstat: \(errnoMsg())")
        }
        guard (st.st_mode & S_IFMT) == S_IFREG else {
            return .failure(code: -32005, message: "store_write_failed: not a regular file")
        }
        defer { flock(fd, LOCK_UN) }

        let written: Int = line.withUnsafeBytes { ptr -> Int in
            Darwin.write(fd, ptr.baseAddress, ptr.count)
        }
        if written < 0 {
            return .failure(code: -32005, message: "store_write_failed: write: \(errnoMsg())")
        }
        guard written == line.count else {
            return .failure(code: -32005, message: "store_write_failed: short write")
        }

        if fcntl(fd, F_FULLFSYNC) != 0 {
            return .failure(code: -32005, message: "store_write_failed: F_FULLFSYNC: \(errnoMsg())")
        }

        return .success(timestamp: timestamp)
    }

    private static func errnoMsg() -> String {
        String(cString: strerror(errno))
    }
}
