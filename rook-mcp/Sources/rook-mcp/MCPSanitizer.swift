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

    static func sanitizeContent(_ raw: String) -> String? {
        let cleaned: String = raw.unicodeScalars
            .filter { $0.value != 0 }
            .map { String($0) }
            .joined()
        guard !cleaned.isEmpty else { return nil }
        guard cleaned.count <= contentCap else { return nil }
        return cleaned
    }
}
