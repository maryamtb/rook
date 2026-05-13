// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "rook-mcp",
    platforms: [
        .macOS(.v14)
    ],
    targets: [
        .executableTarget(
            name: "rook-mcp",
            path: "Sources/rook-mcp"
        ),
        .testTarget(
            name: "rook-mcpTests",
            dependencies: ["rook-mcp"],
            path: "Tests/rook-mcpTests"
        )
    ]
)
