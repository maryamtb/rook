import Foundation

enum MCPSanitizer {
    static let titleCap: Int = 200
    static let contentCap: Int = 100_000

    static func sanitizeTitle(_ raw: String) -> String? {
        let cleaned = raw.unicodeScalars
            .filter { $0.value >= 0x20 }
            .map { String($0) }
            .joined()
            .trimmingCharacters(in: .whitespaces)
        guard !cleaned.isEmpty else { return nil }
        return cleaned.count > titleCap ? String(cleaned.prefix(titleCap)) : cleaned
    }

    /// Distinguishes WHY content was rejected so the handler can tell the
    /// agent how to recover. Agents act on error text: a bare refusal for
    /// oversized content can make a client silently summarize to fit —
    /// perceived data loss. Oversize must instruct chunking instead.
    enum ContentVerdict: Equatable {
        case ok(String)
        case empty
        case tooLong(count: Int)
    }

    static func checkContent(_ raw: String) -> ContentVerdict {
        let cleaned: String = raw.unicodeScalars
            .filter { $0.value != 0 }
            .map { String($0) }
            .joined()
        guard !cleaned.isEmpty else { return .empty }
        guard cleaned.count <= contentCap else { return .tooLong(count: cleaned.count) }
        return .ok(cleaned)
    }

    static func sanitizeContent(_ raw: String) -> String? {
        if case .ok(let cleaned) = checkContent(raw) { return cleaned }
        return nil
    }

    /// The recovery instruction is part of the contract: it tells the agent
    /// to split and forbids the lossy alternative it would otherwise invent.
    static func tooLongMessage(count: Int) -> String {
        "content_too_long: content is \(count) characters; the limit is \(contentCap). "
        + "Split the content into multiple append_to_inbox calls in sequence, "
        + "passing each part verbatim. Do not summarize, shorten, or omit any "
        + "part to fit the limit."
    }
}
