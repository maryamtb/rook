<!-- ROOK:HEADER -->
> Part of [Rook](https://userook.app), a notes app made for code. Download free at [userook.app](https://userook.app).
<!-- /ROOK:HEADER -->

## Single Responsibility Principle (SRP)

The **Single Responsibility Principle** states that a class should have one, and only one, reason to change. If a class does too much, it becomes "brittle"—changing the way you calculate taxes shouldn't accidentally break the way you send emails.

---

### Visual



```text
      BRITTLE (Too many jobs)                ROBUST (Single jobs)
      ┌──────────────────────┐               ┌─────────┐
      │        Order         │               │  Order  │──┐
      ├──────────────────────┤               └─────────┘  │
      │ + items              │                            │
      │ + calculate_tax()    │      ───►     ┌─────────┐  │  ┌─────────┐
      │ + send_email()       │               │   Tax   │◄─┴─►│  Mail   │
      │ + save_to_db()       │               └─────────┘     └─────────┘
      └──────────────────────┘
```

---

### How to Spot It
Look for "God Classes" or "Swiss Army Knife" modules. You have an SRP violation if:
*   The class name is vague (e.g., `OrderManager`, `CommonUtils`, `DataHandler`).
*   The `import` section is massive (it needs many libraries to do its many jobs).
*   You find yourself saying "I need to change the logic for **X**, but I'm afraid I'll break **Y**" while they are in the same file.

---

### Walkthrough (Python)

#### The Problem
This `Order` class is "fat." It handles business logic, accounting (tax), and notifications (email).

```python
class Order:
    def __init__(self, items):
        self.items = items

    def calculate_total(self):
        return sum(item.price for item in self.items)

    def get_tax(self, rate):
        # Violation: Order shouldn't care about tax laws
        return self.calculate_total() * rate

    def email_receipt(self):
        # Violation: Order shouldn't care about SMTP/Email protocols
        print(f"Sending email for order total: {self.calculate_total()}")
```

#### The Fix
We delegate the specialized tasks to specialized classes.

```python
class Order:
    def __init__(self, items):
        self.items = items

    def total(self):
        return sum(item.price for item in self.items)


class TaxCalculator:
    @staticmethod
    def calculate(amount, rate):
        return amount * rate


class EmailService:
    @staticmethod
    def send_receipt(order):
        print(f"Emailing receipt for ${order.total()}")
```

---

### Another Shape: The "Report"
Imagine a `Report` class. 
1.  **Job 1:** Gather data from a database.
2.  **Job 2:** Format data into a table.
3.  **Job 3:** Print the table to a PDF.

If you want to change from PDF to HTML, you shouldn't have to touch the code that queries the database. Split them into `ReportDataCollector`, `ReportFormatter`, and `ReportRenderer`.

---

### Try These
*   **Identify:** Look at a recent project. Find the largest class. Can you describe what it does without using the word "and"? If not, it's time to split it.
*   **Refactor:** Take a class that handles both **Logic** and **Logging**. Move the logging to a separate utility or a decorator.

---

**Tip**: Single Responsibility applies to functions too, not just classes

<!-- ROOK:SERIES -->
*More in this series: [Dependency Inversion Principle (DIP)](dependency-inversion.md) · [Interface Segregation Principle (ISP)](interface-segregation.md) · [Liskov Substitution Principle (LSP)](liskov-substitution.md) · [Open / Closed Principle (OCP)](open-closed.md).*
<!-- /ROOK:SERIES -->

<!-- ROOK:FOOTER -->
---

> ## About Rook
>
> If you're looking for the perfect app for your code notes, you should check out **Rook**. Rook is a native macOS notes app made for code.
>
> [Download free at userook.app](https://userook.app) · [More community notes](https://github.com/maryamtb/rook/tree/main/community-notes)
<!-- /ROOK:FOOTER -->
