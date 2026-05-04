<!-- ROOK:HEADER -->
> Part of [Rook](https://userook.app), a notes app made for code. Download free at [userook.app](https://userook.app).
<!-- /ROOK:HEADER -->

# SOLID Principles

SOLID is five principles for object-oriented programming design. Each letter prevents a specific kind of design debt.

While these concepts apply to all OOP languages, the linked guides focus on Pythonic implementations.

```text
S  one job per class            ┌────────────┐        ┌───────┐ ┌─────┐ ┌──────┐
                                │   Order    │   →    │ Order │ │ Tax │ │ Mail │
                                │  + tax     │        └───────┘ └─────┘ └──────┘
                                │  + mail    │
                                └────────────┘


O  open to add,                 Shape ──┬── Circle
   closed to edit                       ├── Square
                                        └── Triangle      (add Hexagon
                                                           without editing Shape)


L  child works                  Bird ──┬── FlyingBird ── Sparrow (can fly) ✓
   wherever parent works               │
                                       └── Penguin (no fly method inherited,
                                                    does not break Bird) ✓


I  many small interfaces        ┌───────────────┐        ┌──────┐ ┌───────┐ ┌───────┐
   beat one giant one           │   do all      │   →    │ read │ │ write │ │ print │
                                └───────────────┘        └──────┘ └───────┘ └───────┘


D  depend on the idea,          Order ──► MySQL          Order ──► [ DB ] ◄── MySQL
   not the thing                (locked in)              (swap any DB later)
```

## Principles

- [Single Responsibility](single-responsibility.md): A class, function, or module should do one thing and do it well. If you have to use the word "and" to describe what it does, it's too big.
- [Open / Closed](open-closed.md): You should be able to add new features (like a new file format) by adding new code, not by reopening and changing your existing, working code.
- [Liskov Substitution](liskov-substitution.md): A subclass should be a perfect stand-in for its parent. If you swap a `Bird` for a `Penguin` and the `fly()` method crashes the app, you've violated this.
- [Interface Segregation](interface-segregation.md): Don't create "fat" interfaces. A class shouldn't be forced to implement methods it doesn't need (e.g., a `SimplePrinter` shouldn't have to implement a `fax()` method).
- [Dependency Inversion](dependency-inversion.md): Plug-and-play architecture. High-level logic stays clean by depending on interfaces, while the "messy" details (databases, APIs) are injected from the outside.

## Further Reading 📚

If you want to dive deeper into software architecture and clean code, these are the resources I personally recommend:

### The VIPs
*   **Clean Code** by Robert C. Martin: The foundational text for writing readable, maintainable code.
*   **Design Patterns** (GoF): The original catalog of reusable solutions to common design problems.

### Python-Specific Architecture
*   **Architecture Patterns with Python** by Harry Percival: Excellent for applying these concepts specifically to the Python ecosystem.
*   **Fluent Python** by Luciano Ramalho: Essential for understanding the Python data model so your "clean code" still feels like Python.

### Visual & Interactive
*   **[Refactoring.Guru](https://refactoring.guru)**: Exceptional visual breakdowns of patterns and SOLID principles. 
*   **[Python Design Patterns](https://python-patterns.guide)**: Brandon Rhodes’ collection of how patterns look when implemented using modern Python idioms.

---

## Contribute

If you want to contribute a new pattern (Factory, Strategy, Observer, etc.), open an issue or PR. Please match the existing format: 
1. **Visual:** ASCII or simple diagram.
2. **The "Why":** How to spot the problem.
3. **Walkthrough:** A clear code transformation.
4. **The AI Prompt:** How to ask an LLM to help you implement it.

<!-- ROOK:FOOTER -->
---

> ## About Rook
>
> If you're looking for the perfect app for your code notes, you should check out **Rook**. Rook is a native macOS notes app made for code.
>
> [Download free at userook.app](https://userook.app) · [More community notes](https://github.com/maryamtb/rook/tree/main/community-notes)
<!-- /ROOK:FOOTER -->
