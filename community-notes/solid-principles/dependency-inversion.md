<!-- ROOK:HEADER -->
> Part of [Rook](https://userook.app), a notes app made for code. Download free at [userook.app](https://userook.app).
<!-- /ROOK:HEADER -->

## Dependency Inversion Principle (DIP)

**"Depend on abstractions, not concretions."**

High level logic (the "What") should not be hard wired to low level tools (the "How"). Both should depend on a shared interface. This keeps your core logic clean and makes your code "pluggable."

### Visual

```text
      HARD-WIRED (Rigid)                      PLUGGABLE (Flexible)
      ┌────────────┐                         ┌────────────┐
      │   App      │                         │    App     │
      └─────┬──────┘                         └─────┬──────┘
            ▼                                      ▼
      ┌────────────┐                         ┌────────────┐
      │ SQLite DB  │                         │ [Database] │ (The Interface)
      └────────────┘                         └────────────┘
     (To swap to a                           ▲            ▲
      JSON file,                             │            │
      you must rewrite                ┌──────┴───┐    ┌───┴────────┐
      the App class)                  │ SQLite   │    │ JSON File  │
                                      └──────────┘    └────────────┘
                                     (Swap tools; App never changes)
```

---

### How to Spot It
You are likely violating DIP if:
*   You see "helper" classes being created inside a constructor (e.g., `self.storage = LocalStorage()`).
*   You cannot test your logic without a real database or a real internet connection.
*   Changing a tool or library requires you to open and edit your "main" business logic files.

---

### Walkthrough (Python)

#### The Problem
The `UserStore` is stuck. It is physically tied to `MySQLDatabase`. If you want to use a simple JSON file for a lightweight version of the app, you have to rewrite the `UserStore` logic.

```python
class MySQLDatabase:
    def save(self, user):
        print(f"Saving {user} to MySQL...")


class UserStore:
    def __init__(self):
        # Violation: Hard-coded to one specific tool
        self.db = MySQLDatabase()

    def add_user(self, name):
        self.db.save(name)
```

#### The Fix
We create an interface (a "contract"). The `UserStore` does not care which database you use, as long as it has a `.save()` method. We "inject" the database when we create the store.

```python
from abc import ABC, abstractmethod


class Database(ABC):
    @abstractmethod
    def save(self, data):
        pass


class MySQLDatabase(Database):
    def save(self, data):
        print(f"MySQL Save: {data}")


class JSONDatabase(Database):
    def save(self, data):
        print(f"JSON Save: {data}")


class UserStore:
    def __init__(self, db: Database):  # Depend on the abstraction
        self.db = db

    def add_user(self, name):
        # The store just calls the method; it doesn't care how it works!
        self.db.save(name)


# Now the high-level logic is flexible:
store = UserStore(JSONDatabase())
store.add_user("Alice")
```

---

### Relatable Example: The Wall Outlet
Your toaster does not care if your house is powered by a coal plant, solar panels, or a giant battery. It only cares that the plug fits the **interface** (the wall outlet). If the toaster was hard wired to a specific power plant, you would have to buy a new toaster every time you changed your energy provider.

---

### Try These
*   **Identify:** Look at your classes. Are they "importing" and "creating" their own tools?
*   **Refactor:** Take those tools and pass them in through the `__init__` method instead. This is called **Dependency Injection**, and it is the primary way we achieve Dependency Inversion.

<!-- ROOK:SERIES -->
*More in this series: [Interface Segregation Principle (ISP)](interface-segregation.md) · [Liskov Substitution Principle (LSP)](liskov-substitution.md) · [Open / Closed Principle (OCP)](open-closed.md) · [Single Responsibility Principle (SRP)](single-responsibility.md).*
<!-- /ROOK:SERIES -->

<!-- ROOK:FOOTER -->
---

> ## About Rook
>
> If you're looking for the perfect app for your code notes, you should check out **Rook**. Rook is a native macOS notes app made for code.
>
> [Download free at userook.app](https://userook.app) · [More community notes](https://github.com/maryamtb/rook/tree/main/community-notes)
<!-- /ROOK:FOOTER -->
