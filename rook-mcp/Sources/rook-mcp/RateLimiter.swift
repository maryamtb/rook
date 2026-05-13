import Foundation

enum RateLimiter {
    static let window: TimeInterval = 60
    static let maxWrites: Int = 100
    private static var recentWriteTimes: [Date] = []

    /// Up to 100 writes in any rolling 60-second window, counted per process.
    static func check() -> Bool {
        let now: Date = Date()
        let cutoff: Date = now.addingTimeInterval(-window)
        recentWriteTimes = recentWriteTimes.filter { $0 > cutoff }
        if recentWriteTimes.count >= maxWrites { return false }
        recentWriteTimes.append(now)
        return true
    }

    #if DEBUG
    /// Clears recorded writes. Excluded from release builds; used only by tests.
    static func resetForTesting() {
        recentWriteTimes.removeAll()
    }
    #endif
}
