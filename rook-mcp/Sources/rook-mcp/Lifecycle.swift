import Foundation
import Darwin

enum Lifecycle {
    private static var parentExitSource: DispatchSourceProcess?

    /// Exits when the parent process exits. If the parent crashes without closing
    /// its end of stdin, the EOF we normally rely on never arrives and readLine
    /// would block forever.
    static func watchParentForExit() {
        let parentPid: pid_t = getppid()
        if parentPid <= 1 {
            Server.log("parent already gone at startup (ppid=\(parentPid)); exiting")
            exit(0)
        }
        let source: any DispatchSourceProcess = DispatchSource.makeProcessSource(
            identifier: parentPid,
            eventMask: .exit,
            queue: .global(qos: .utility)
        )
        source.setEventHandler {
            Server.log("parent pid \(parentPid) exited; shutting down")
            exit(0)
        }
        source.resume()
        parentExitSource = source
        Server.log("watching parent pid \(parentPid)")
    }
}
