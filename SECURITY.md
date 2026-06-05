# Security Policy

## Reporting a Vulnerability

Please report security vulnerabilities using GitHub's private vulnerability reporting for this repository:

Security tab -> Report a vulnerability

Do not file public issues for security findings. Public issues are fine for regular bugs and feature requests, but security reports should stay private until a fix is ready.

Include as much detail as you can:

- Affected component or path
- Steps to reproduce
- Expected and actual behavior
- Impact or data exposed
- Relevant logs, screenshots, or proof-of-concept code

## Scope

Security reports are in scope for code and distributed artifacts maintained in this repository, including:

- The Rook macOS app distribution and update surface
- `rook-mcp`
- `rook-landing`
- Community notes and repository automation

The Rook macOS app itself is closed source and distributed separately as a signed binary. If a report affects the closed-source app, a fix may be prepared privately and reflected here or in release notes when appropriate.

## MCP Security Notes

The MCP helper has additional security documentation in [`rook-mcp/SECURITY.md`](rook-mcp/SECURITY.md), including its trust boundary, input sanitization, rate limits, pause flag, app group access, and inbox write behavior.

## Response Expectations

We will review private reports as soon as practical. If the report is reproducible and in scope, we will coordinate a fix privately before public disclosure.

Please avoid accessing, modifying, or sharing data that does not belong to you while investigating a vulnerability.
